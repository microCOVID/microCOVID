#!/usr/bin/env python3

import sys

if sys.version_info < (3, 6):
    sys.exit("This script requires Python 3.6 or later.")

import abc
import collections
import csv
import json
import re
import os
import shutil
from datetime import date, datetime, timedelta
from operator import attrgetter
from pathlib import Path
from typing import Optional, ClassVar, Iterator, List, Dict, Type, TypeVar, Any
from us_state_abbrev import us_state_name_by_abbrev

try:
    import pydantic
    import requests
except ImportError:
    print("Virtual environment not set up correctly.")
    print("Run:")
    print("  python3 -m venv .venv")
    print("  source .venv/bin/activate")
    print("  pip install pydantic requests")
    print("and then try running this script again.")
    print()
    sys.exit(1)

CAN_API_KEY = os.environ.get("CAN_API_KEY")

Model = TypeVar("Model", bound=pydantic.BaseModel)


def calc_effective_date() -> date:
    now = datetime.utcnow() - timedelta(days=1)
    # JHU daily reports are posted between 04:45 and 05:15 UTC the next day
    if now.hour < 6:
        now -= timedelta(days=1)
    return now.date()


effective_date = calc_effective_date()


# Johns Hopkins dataset


class JHUCommonFields(pydantic.BaseModel):
    FIPS: Optional[int]
    Admin2: Optional[str]
    Province_State: Optional[str]
    Country_Region: str
    Lat: float
    Long_: float
    Combined_Key: str


class JHUPlaceFacts(JHUCommonFields):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"

    UID: int
    iso2: str
    iso3: str
    code3: int
    Population: int


class JHUDailyReport(JHUCommonFields):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/%m-%d-%Y.csv"

    # Last_Update: datetime, but not always in consistent format - we ignore
    Confirmed: int
    Deaths: int
    Recovered: int
    Active: int
    # Incident_Rate: float, was renamed from Incidence_Rate in early November
    # Case_Fatality_Ratio: float


class JHUCasesTimeseriesUS(JHUCommonFields):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"

    UID: int
    iso2: str
    iso3: str
    code3: int
    cumulative_cases: Dict[date, int] = {}


class JHUCasesTimeseriesGlobal(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

    Province_State: Optional[str]
    Country_Region: str
    Lat: float
    Long: float
    cumulative_cases: Dict[date, int] = {}


# Our World in Data dataset:


class OWIDTestingData(pydantic.BaseModel):
    # https://ourworldindata.org/coronavirus-testing#download-the-data
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/testing/covid-testing-all-observations.csv"

    Entity: str
    Date: date
    ISO_code: str
    Source_URL: str
    Source_label: str
    Notes: str
    Daily_change_in_cumulative_total: int  # new tests today
    Cumulative_total: int
    Cumulative_total_per_thousand: float  # "per thousand" means population
    Daily_change_in_cumulative_total_per_thousand: float
    Seven_day_smoothed_daily_change: float  # 7-day moving average
    Seven_day_smoothed_daily_change_per_thousand: float
    Short_term_tests_per_case: Optional[float]  # appears to also be 7-day
    Short_term_positive_rate: Optional[float]


# CovidActNow dataset:


class CANMetrics(pydantic.BaseModel):
    testPositivityRatio: Optional[float]  # 7-day rolling average
    caseDensity: Optional[float]  # cases per 100k pop, 7-day rolling average


class CANRegionSummary(pydantic.BaseModel):
    # https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md#RegionSummary
    COUNTY_SOURCE: ClassVar[
        str
    ] = f"https://api.covidactnow.org/v2/counties.json?apiKey={CAN_API_KEY}"
    STATE_SOURCE: ClassVar[
        str
    ] = f"https://api.covidactnow.org/v2/states.json?apiKey={CAN_API_KEY}"

    country: str
    fips: int
    lat: Optional[float]
    long_: Optional[float] = pydantic.Field(alias="long")
    state: str
    county: Optional[str]
    # lastUpdatedDate: datetime in nonstandard format, ignored for now
    # projections: ignored
    # actuals: ignored
    metrics: Optional[CANMetrics]
    population: int


# Romanian sub-national dataset:
class RomaniaPrevalenceData(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://covid19.geo-spatial.org/external/charts_vasile/assets/json/cazuri_zile_long.json"

    Date: date = pydantic.Field(alias="Data")
    County: str = pydantic.Field(alias="Judet")
    Population: int = pydantic.Field(alias="Populatie")
    TotalCases: int = pydantic.Field(alias="Cazuri total")


# Our unified representation:


class Place(pydantic.BaseModel):
    fullname: str  # "San Francisco, California, US"
    name: str  # "San Francisco"
    population: int = 0  # 881549
    test_positivity_rate: Optional[float]  # 0.05
    cumulative_cases: Dict[date, int] = collections.Counter()

    # For some international data we don't get the positivity rate,
    # just the number of tests. We can approximate positivity rate
    # from that and the known number of cases.
    tests_in_past_week: Optional[int]

    @property
    def recent_daily_cases(self) -> List[int]:
        """Returns a list whose last entry is the most recent day's
        case count, and earlier entries are earlier days' counts.
        So recent_daily_cases[-5] is the number of cases reported
        5 days ago.
        """
        daily_cases = []
        current = effective_date
        if current not in self.cumulative_cases:
            raise ValueError(f"Missing data for {self.fullname} on {current:%Y-%m-%d}")
        while len(daily_cases) < 14:
            prev = current - timedelta(days=1)
            if prev not in self.cumulative_cases:
                if prev > min(self.cumulative_cases.keys()):
                    # Gaps in the data shouldn't happen
                    raise ValueError(
                        f"Missing case count for {self.fullname} on {prev:%Y-%m-%d}"
                    )
                # But missing data at the beginning is normal -- counties
                # typically only show up when they have any cases.
                self.cumulative_cases[prev] = self.cumulative_cases[current]
            daily_cases.append(
                self.cumulative_cases[current] - self.cumulative_cases[prev]
            )
            current = prev
        return daily_cases[::-1]

    @property
    def cases_last_week(self) -> int:
        return sum(self.recent_daily_cases[-7:])

    @property
    @abc.abstractmethod
    def app_key(self) -> str:
        ...

    def as_app_data(self) -> "AppLocation":
        last_week = self.cases_last_week
        week_before = sum(self.recent_daily_cases[-14:-7])
        if last_week <= week_before or week_before <= 0:
            increase = 0
        else:
            increase = last_week / week_before - 1

        return AppLocation(
            label=self.name,
            population=f"{self.population:,}",
            casesPastWeek=self.cases_last_week,
            casesIncreasingPercentage=increase * 100,
            positiveCasePercentage=(
                self.test_positivity_rate * 100
                if self.test_positivity_rate is not None
                else None
            ),
        )


class County(Place):
    country: str
    state: str
    fips: Optional[str]  # US only: 5-digit code

    @property
    def app_key(self) -> str:
        if self.fips is not None:
            return f"US_{self.fips.rjust(5, '0')}"
        else:
            slug = "_".join([self.country, self.state, self.name])
            return re.sub(r"[^A-Za-z0-9_]", "_", slug)


class State(Place):
    country: str
    fips: Optional[str]  # US only: 2-digit code
    counties: Dict[str, County] = {}

    @property
    def app_key(self) -> str:
        if self.fips is not None:
            return f"US_{self.fips.rjust(2, '0')}"
        else:
            slug = "_".join([self.country, self.name])
            return re.sub(r"[^A-Za-z0-9_]", "_", slug)

    def as_app_data(self) -> "AppLocation":
        result = super().as_app_data()
        if self.country == "US":
            result.topLevelGroup = "US states"
            result.subdivisions = [county.app_key for county in self.counties.values()]
        return result


class Country(Place):
    iso3: Optional[str]  # USA
    states: Dict[str, State] = {}

    @property
    def app_key(self) -> str:
        return re.sub(r"[^A-Za-z0-9_]", "_", self.name)

    def as_app_data(self) -> "AppLocation":
        result = super().as_app_data()
        result.topLevelGroup = "Countries"
        if self.name == "US":
            result.label = "United States (all)"
        else:
            result.subdivisions = [
                state.app_key
                for state in self.states.values()
                if state.name != "Unknown"
            ]
        result.iso3 = self.iso3
        return result


class AppLocation(pydantic.BaseModel):
    label: str
    iso3: Optional[str]
    population: str
    casesPastWeek: int
    casesIncreasingPercentage: float
    positiveCasePercentage: Optional[float]
    topLevelGroup: Optional[str] = None
    subdivisions: List[str] = []

    # https://covid19-projections.com/estimating-true-infections-revisited/
    def prevalanceRatio(self) -> float:
        DAY_0 = datetime(2020, 2, 12)
        day_i = (datetime.now() - DAY_0).days
        positivityRate = self.positiveCasePercentage
        if positivityRate is None or positivityRate > 100:
            positivityRate = 100
        final = (1250 / (day_i + 25)) * (positivityRate / 100) ** 0.5 + 2
        return final

    def as_csv_data(self) -> Dict[str, str]:
        population = int(self.population.replace(",", ""))
        reported = (self.casesPastWeek + 1) / population
        underreporting = self.prevalanceRatio()
        delay = min(1.0 + (self.casesIncreasingPercentage / 100), 2.0)
        return {
            "Name": self.label,
            "Population": str(population),
            "Cases in past week": str(self.casesPastWeek),
            "Reported prevalence": str(round(reported, 6)),
            "Underreporting factor": str(round(underreporting, 4)),
            "Delay factor": str(round(delay, 4)),
            "Estimated prevalence": str(round(reported * underreporting * delay, 6)),
        }


class AppLocations(pydantic.BaseModel):
    __root__: Dict[str, AppLocation]


class AllData:
    def __init__(self) -> None:
        self.countries: Dict[str, Country] = {}
        self.fips_to_county: Dict[int, County] = {}

    def get_country(self, name: str) -> Country:
        if name not in self.countries:
            self.countries[name] = Country(name=name, fullname=name)
        return self.countries[name]

    def get_state(self, name: str, *, country: str) -> State:
        parent = self.get_country(country)
        if name not in parent.states:
            parent.states[name] = State(
                name=name, fullname=f"{name}, {country}", country=country
            )
        return parent.states[name]

    def get_county(self, name: str, *, state: str, country: str) -> County:
        parent = self.get_state(state, country=country)
        if name not in parent.counties:
            parent.counties[name] = County(
                name=name,
                fullname=f"{name}, {state}, {country}",
                state=state,
                country=country,
            )
        return parent.counties[name]

    def get_jhu_place(self, jhu_line: JHUCommonFields) -> Place:
        if jhu_line.Admin2:
            return self.get_county(
                jhu_line.Admin2,
                state=jhu_line.Province_State,
                country=jhu_line.Country_Region,
            )
        elif jhu_line.Province_State:
            return self.get_state(
                jhu_line.Province_State,
                country=jhu_line.Country_Region,
            )
        else:
            return self.get_country(jhu_line.Country_Region)

    def populate_fips_cache(self) -> None:
        self.fips_to_county.clear()
        for country in self.countries.values():
            for state in country.states.values():
                for county in state.counties.values():
                    if county.fips is not None:
                        fips = int(county.fips)
                        if fips in self.fips_to_county:
                            raise ValueError(
                                f"FIPS code {fips} refers to both "
                                f"{self.fips_to_county[fips]!r} and "
                                f"{county!r}"
                            )
                        self.fips_to_county[fips] = county

    def rollup_totals(self) -> None:
        fake_names = ("Unknown", "Unassigned", "Recovered")

        def rollup_population(parent: Place, child_attr: str) -> None:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if parent.population == 0:
                for child in children.values():
                    parent.population += child.population
                if not parent.population and parent.name not in fake_names:
                    raise ValueError(f"Missing population data for {parent!r}")

        def rollup_cases(parent: Place, child_attr: str) -> None:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if not parent.cumulative_cases:
                for child in children.values():
                    parent.cumulative_cases += child.cumulative_cases
                if not parent.cumulative_cases:
                    return False
            if parent.population == 0:  # fake region (Unknown, etc)
                try:
                    cases_last_week = parent.cases_last_week
                except ValueError:
                    cases_last_week = 0
                if not cases_last_week:
                    return False
            return True

        def rollup_testing(parent: Place, child_attr: str) -> None:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if parent.test_positivity_rate is None:
                if parent.tests_in_past_week:
                    parent.test_positivity_rate = (
                        parent.cases_last_week / parent.tests_in_past_week
                    )

                tests_last_week = 0
                valid = bool(children)
                for child in children.values():
                    if child.test_positivity_rate is None:
                        valid = False
                    elif child.test_positivity_rate > 0:
                        tests_last_week += (
                            child.cases_last_week / child.test_positivity_rate
                        )
                if valid and tests_last_week:
                    parent.test_positivity_rate = (
                        parent.cases_last_week / tests_last_week
                    )

        for country in self.countries.values():
            for state in country.states.values():
                for county in state.counties.values():
                    if county.population == 0 and county.name not in fake_names:
                        raise ValueError(f"Missing population data for {county!r}")
                rollup_population(state, "counties")
            rollup_population(country, "states")

        for country in list(self.countries.values()):
            for state in list(country.states.values()):
                for county in list(state.counties.values()):
                    if not county.cumulative_cases:
                        if (
                            county.fullname
                            in (
                                # These just don't have any reported cases
                                "Hoonah-Angoon, Alaska, US",
                                "Lake and Peninsula, Alaska, US",
                                "Skagway, Alaska, US",
                                "Unassigned, District of Columbia, US",
                                "Kalawao, Hawaii, US",
                                # These are reported under a combined name
                                "Dukes, Massachusetts, US",
                                "Nantucket, Massachusetts, US",
                                "Bronx, New York, US",
                                "Kings, New York, US",
                                "Queens, New York, US",
                                "Richmond, New York, US",
                                # Utah reports by region, not county
                            )
                            or county.state == "Utah"
                        ):
                            pass  # don't warn
                        else:
                            print(f"Discarding {county!r} with no case data")
                        del state.counties[county.name]

                    if county.test_positivity_rate is None:
                        if county.tests_in_past_week:
                            county.test_positivity_rate = (
                                county.cases_last_week / county.tests_in_past_week
                            )
                        elif state.test_positivity_rate is not None:
                            # Some US counties don't have data; fall back to
                            # assuming they're average for their state.
                            county.test_positivity_rate = state.test_positivity_rate

                if not rollup_cases(state, "counties"):
                    if state.country == "Nigeria":
                        pass  # Nigeria only reports nation-level cases
                    elif state.name in ("American Samoa", "Unknown", "Recovered"):
                        pass
                    else:
                        print(f"Discarding {state!r} with no case data")
                    del country.states[state.name]

                for county in list(state.counties.values()):
                    if county.name in fake_names:
                        # Now that we've incorporated these unassigned/etc
                        # cases into the state totals, we have no further need
                        # of the county-level data.
                        del state.counties[county.name]

                if state.test_positivity_rate is None:
                    if state.counties or state.tests_in_past_week:
                        rollup_testing(state, "counties")
                    elif country.test_positivity_rate is not None:
                        state.test_positivity_rate = country.test_positivity_rate

            if not rollup_cases(country, "states"):
                raise ValueError(f"Missing case data for {country!r}")
            rollup_testing(country, "states")


class DataCache(pydantic.BaseModel):
    effective_date: date
    data: Dict[str, str] = {}

    @classmethod
    def load(cls) -> "DataCache":
        try:
            result = cls.parse_file(".prevalence_data.json")
        except OSError:
            pass
        except Exception as exc:
            print(f"discarding corrupted cache: {exc!r}")
            os.unlink(".prevalence_data.json")
        else:
            if result.effective_date == effective_date:
                return result
        return cls(effective_date=effective_date)

    def save(self) -> None:
        with open(".prevalence_data.json", "w") as fp:
            fp.write(self.json())

    def get(self, url: str) -> str:
        try:
            return self.data[url]
        except KeyError:
            pass
        self.data[url] = requests.get(url).text
        return self.data[url]


def parse_csv(cache: DataCache, model: Type[Model], url: str) -> List[Model]:
    print(f"Fetching {url}...", end=" ", flush=True)
    lines = cache.get(url).splitlines()
    reader = csv.reader(lines)
    fields = [
        re.sub("^7", "Seven", re.sub("[^A-Za-z0-9_]", "_", name))
        for name in next(reader)
    ]

    result = []
    for line in reader:
        kw: Dict[str, Optional[str]] = {}
        for field, val in zip(fields, line):
            info = model.__fields__.get(field)
            if info is None:
                continue
            if val == "":
                if not info.required:
                    kw[field] = None
                elif info.type_ in (int, float):
                    kw[field] = "0"
                else:
                    kw[field] = ""
            elif val.endswith(".0") and val[:-2].isdigit():
                kw[field] = val[:-2]
            elif info.type_ is int and "e+" in val:
                kw[field] = int(float(val))
            else:
                kw[field] = val
        result.append(model(**kw))

    print(f"read {len(lines)} objects")
    return result


def parse_json(cache: DataCache, model: Type[Model], url: str) -> List[Model]:
    print(f"Fetching {url}...", end=" ", flush=True)
    result = pydantic.parse_obj_as(List[model], json.loads(cache.get(url)))
    print(f"read {len(result)} objects")
    return result


def ignore_jhu_place(line: JHUCommonFields) -> bool:
    if line.Combined_Key == "":
        return True
    if line.Province_State in (
        "Diamond Princess",
        "Grand Princess",
        "Port Quarantine",
        "US Military",
        "Federal Bureau of Prisons",
        "Veteran Hospitals",
        "Repatriated Travellers",
    ):
        return True
    if line.Country_Region in (
        "Diamond Princess",
        "Grand Princess",
        "MS Zaandam",
        "Western Sahara",
        "Micronesia",
        "Palau",
    ):
        return True
    if line.Country_Region == "US":
        if line.Province_State == "Recovered":
            return True
        if line.Admin2 and line.Admin2.startswith("Out of "):
            return True
        if line.Admin2 in (
            "Federal Correctional Institution (FCI)",
            "Michigan Department of Corrections (MDOC)",
        ):
            return True
    return False


def main() -> None:
    if not CAN_API_KEY:
        print("Usage: CAN_API_KEY=${COVID_ACT_NOW_API_KEY} python3 %s" % sys.argv[0])
        sys.exit(1)
    cache = DataCache.load()
    try:
        data = AllData()
        country_by_iso3: Dict[str, Country] = {}

        # List of regions and their population
        for line in parse_csv(cache, JHUPlaceFacts, JHUPlaceFacts.SOURCE):
            if ignore_jhu_place(line):
                continue
            if {line.Country_Region, line.Province_State} & {"Unknown", "Unassigned"}:
                # These mark cases not attached to a more specific region.
                # We want to count their cases, but they don't have population.
                continue
            if (
                line.Province_State == "Alaska"
                and line.Admin2 == "Bristol Bay plus Lake Peninsula"
            ):
                # These are strangely combined; Lake and Peninsula already
                # has its own entry so turn the combo into just Bristol Bay
                line.Admin2 = "Bristol Bay"
                line.Population = 877  # from Google
            if (
                line.Province_State == "Alaska"
                and line.Admin2 == "Yakutat plus Hoonah-Angoon"
            ):
                # These are strangely combined; Lake and Peninsula already
                # has its own entry so turn the combo into just Bristol Bay
                line.Admin2 = "Yakutat"
                line.Population = 604  # from Google
            place = data.get_jhu_place(line)
            if place.population != 0:
                raise ValueError(
                    f"Duplicate population info for {place!r}: {line.Population}"
                )
            if isinstance(place, Country):
                place.iso3 = line.iso3
                country_by_iso3[line.iso3] = place
            place.population = line.Population
            if isinstance(place, (County, State)) and line.FIPS is not None:
                place.fips = str(line.FIPS)
        data.populate_fips_cache()

        # Cumulative cases per region
        populate_since = effective_date - timedelta(days=15)
        current = effective_date
        while current >= populate_since:
            for line in parse_csv(
                cache, JHUDailyReport, current.strftime(JHUDailyReport.SOURCE)
            ):
                if ignore_jhu_place(line):
                    continue
                place = data.get_jhu_place(line)
                if place.population == 0 and place.name not in (
                    "Unassigned",
                    "Unknown",
                ):
                    raise ValueError(
                        f"JHU data has cases but no population for {place!r} with line data: {line!r}"
                    )
                place.cumulative_cases[current] = line.Confirmed
            current -= timedelta(days=1)

        # Test positivity per US county and state
        for item in parse_json(cache, CANRegionSummary, CANRegionSummary.COUNTY_SOURCE):
            assert (
                type(item.fips) is int
            ), "Expected item.fips to be int but got {}".format(type(item.fips))
            if item.fips not in data.fips_to_county:
                # Ignore e.g. Northern Mariana Islands
                print(f"ignoring unknown county fips {item.fips}")
                continue
            county = data.fips_to_county[item.fips]
            assert (
                us_state_name_by_abbrev[item.state] == county.state
            ), f"expected {item.state} to be {county.state}"
            if item.metrics is not None:
                county.test_positivity_rate = item.metrics.testPositivityRatio

        for item in parse_json(cache, CANRegionSummary, CANRegionSummary.STATE_SOURCE):
            state_name = us_state_name_by_abbrev[item.state]
            state = data.countries["US"].states[state_name]
            if item.metrics is not None:
                state.test_positivity_rate = item.metrics.testPositivityRatio

        # Test positivity per non-US country
        for line in parse_csv(cache, OWIDTestingData, OWIDTestingData.SOURCE):
            # These are in sorted order so we'll keep overwriting with
            # more recent data per country
            country = country_by_iso3.get(line.ISO_code)
            if country is not None:
                if line.Short_term_positive_rate is not None:
                    country.test_positivity_rate = line.Short_term_positive_rate
                elif line.Seven_day_smoothed_daily_change:
                    country.tests_in_past_week = (
                        line.Seven_day_smoothed_daily_change * 7
                    )

        # Romanian county (judet) data. Treat as states internally.
        for line in parse_json(cache, RomaniaPrevalenceData, RomaniaPrevalenceData.SOURCE):
            state = data.get_state(line.County, country="Romania")
            state.population = line.Population
            state.cumulative_cases[line.Date] = line.TotalCases


    finally:
        cache.save()

    data.rollup_totals()

    app_locations: Dict[str, AppLocation] = {}
    namegetter = attrgetter("name")

    # US states first so they float to the top of the list
    for state in sorted(data.countries["US"].states.values(), key=namegetter):
        if state.fips is not None and int(state.fips) < 60:  # real states
            app_locations[state.app_key] = state.as_app_data()

    for state in sorted(data.countries["US"].states.values(), key=namegetter):
        if state.app_key not in app_locations:  # then territories etc
            app_locations[state.app_key] = state.as_app_data()

    # Then everything else
    for country in sorted(data.countries.values(), key=namegetter):
        app_locations[country.app_key] = country.as_app_data()
        for state in country.states.values():
            if state.app_key not in app_locations:
                app_locations[state.app_key] = state.as_app_data()
            for county in state.counties.values():
                app_locations[county.app_key] = county.as_app_data()

    # Format the result
    to_insert: List[str] = []

    def format_obj(obj: Dict[str, Any], indent: str = "  ") -> None:
        for key, value in obj.items():
            if isinstance(value, dict):
                to_insert.append(indent + key + ": {\n")
                format_obj(value, indent + "  ")
                to_insert.append(indent + "},\n")
            elif isinstance(value, list) and len(value) > 5:
                to_insert.append(indent + key + ": [\n")
                for elem in value:
                    to_insert.append(f"{indent}  {elem!r},\n")
                to_insert.append(indent + "],\n")
            elif value is None:
                to_insert.append(f"{indent}{key}: null,\n")
            else:
                to_insert.append(f"{indent}{key}: {value!r},\n")

    format_obj(json.loads(AppLocations(__root__=app_locations).json()))

    # And use it to update the app code
    locations_path = "src/data/location.ts"
    with open(locations_path) as fp:
        lines = fp.readlines()

    output: List[str] = []
    skipping = False
    missing_markers = {"locations", "date"}
    for line in lines:
        if "// update_prevalence locations end" in line:
            assert skipping
            skipping = False
        if "// update_prevalence date" in line:
            output.append(
                "export const PrevalenceDataDate = '{}' // update_prevalence date\n".format(
                    effective_date.strftime("%B %d, %Y")
                )
            )
            missing_markers.remove("date")
            continue
        if not skipping:
            output.append(line)
        if "// update_prevalence locations start" in line:
            missing_markers.remove("locations")
            skipping = True
            output.extend(to_insert)

    if missing_markers:
        sys.exit(
            f"{locations_path} does not contain markers {list(missing_markers)}; "
            f"can't update"
        )

    with open(locations_path, "w") as fp:
        fp.writelines(output)

    # Also write CSVs containing the data, for the spreadsheet to import.
    csvdir = Path("public/prevalence_data")
    if csvdir.exists():
        shutil.rmtree(csvdir)
    csvdir.mkdir()
    (csvdir / "date.csv").write_text(
        "Date\n{}".format(effective_date.strftime("%Y-%m-%d"))
    )
    with (csvdir / "index.csv").open("w") as topfile:
        topfile.write("Location,Slug\n")
        for slug, data in app_locations.items():
            if not data.topLevelGroup:
                continue

            topfile.write(f"{data.label},{slug}\n")
            with (csvdir / slug).with_suffix(".csv").open("w") as subfile:
                top_row = data.as_csv_data()
                subfile.write(",".join(top_row.keys()) + "\n")
                if "states" in data.topLevelGroup.lower():
                    top_row["Name"] = "Entire state"
                else:
                    top_row["Name"] = "Entire country"
                subfile.write(",".join(top_row.values()) + "\n")

                for subkey in data.subdivisions:
                    subfile.write(
                        ",".join(app_locations[subkey].as_csv_data().values()) + "\n"
                    )


if __name__ == "__main__":
    main()
