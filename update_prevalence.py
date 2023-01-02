#!/usr/bin/env python3

import sys

if sys.version_info < (3, 6):
    sys.exit("This script requires Python 3.6 or later.")

import abc
import collections
import csv
from dataclasses import dataclass
from functools import reduce
import json
import logging
import re
import os
import shutil
from datetime import date, datetime, timedelta
from operator import attrgetter
from pathlib import Path
from time import sleep
from typing import (
    Optional,
    ClassVar,
    Iterator,
    List,
    Dict,
    Generator,
    Tuple,
    Type,
    TypeVar,
    Any,
    Union,
    TypedDict,
    Counter,
    Iterable,
    Literal,
)
from us_state_abbrev import us_state_name_by_abbrev

try:
    import pydantic
    import requests
    import sentry_sdk
    from sentry_sdk.integrations.logging import LoggingIntegration
except ImportError:
    print("Virtual environment not set up correctly.")
    print("Run:")
    print("  python3 -m venv .venv")
    print("  source .venv/bin/activate")
    print("  pip install -r requirements-manual.txt")
    print("and then try running this script again.")
    print()
    raise

logger = logging.getLogger("update_prevalence")


class LogAggregator:
    population_affected_by_issue: Dict[str, int] = {}

    def add_issue(self, msg: str, place: "PopulationFilteredLogging") -> None:
        existing_population = self.population_affected_by_issue.get(msg, 0)
        self.population_affected_by_issue[msg] = existing_population + place.population_as_int

    def log(self) -> None:
        for msg in self.population_affected_by_issue:
            population_affected = self.population_affected_by_issue[msg]
            level = logging.WARNING
            if population_affected < 10000:
                level = logging.DEBUG
            elif population_affected < 100000:
                level = logging.INFO

            logger.log(level, f"{population_affected:,d} people affected by {msg}")


log_aggregator = LogAggregator()


class PopulationFilteredLogging(abc.ABC):
    @property
    @abc.abstractmethod
    def population_as_int(self) -> int:
        ...

    def issue(self, category: str, detail: str) -> None:
        log_aggregator.add_issue(category, self)
        logger.info(f"{category} ({self.population_as_int:,d} people): {detail}")


class ExtraWarningAnnotationFormatter(logging.Formatter):
    def __init__(self) -> None:
        super().__init__("%(message)s")

    def format(self, record: logging.LogRecord) -> str:
        s = super().format(record)
        if record.levelno >= logging.WARNING:
            s = f"{record.levelname}: {s}"
        return s


def configure_logging() -> None:
    #
    # Configure logging so we can treat filter messages from this script
    # separately from those from libraries
    #
    # https://docs.python.org/3/howto/logging.html
    logger.setLevel(logging.DEBUG)

    #
    # Configure how things appear on stdout separately from how sentry
    # backend treats things
    #
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    # don't decorate messages for readability on console
    formatter = ExtraWarningAnnotationFormatter()
    ch.setFormatter(formatter)

    # use this formatting for all logging; set it on the root handler
    logging.getLogger().addHandler(ch)

    sentry_logging = LoggingIntegration(
        level=logging.WARNING,  # Capture warning and above as breadcrumbs
        event_level=logging.WARNING,  # Send warnings as events
    )

    if os.environ.get("DAILY_RUN"):
        # https://docs.sentry.io/platforms/python/guides/logging/
        # https://getsentry.github.io/sentry-python/integrations.html#module-sentry_sdk.integrations.logging
        sentry_sdk.init(
            dsn="https://2f4e0fbfce7d40b8a0bf134a3c42a716@o4504284257255424.ingest.sentry.io/4504305860804608",
            # Set traces_sample_rate to 1.0 to capture 100%
            # of transactions for performance monitoring.
            # We recommend adjusting this value in production.
            traces_sample_rate=1.0,
            integrations=[sentry_logging],
        )
        # set which level of logging will also be sent to sentry
        sentry_sdk.set_level("warning")


CAN_API_KEY = os.environ.get("CAN_API_KEY")

Model = TypeVar("Model", bound=pydantic.BaseModel)


def print_and_log_to_sentry(message: str) -> None:
    logger.warning(message)


@dataclass
class DateSpan:
    first_date: date
    last_date: date

    def __iter__(self) -> Iterator[date]:
        num_days = (self.last_date - self.first_date).days + 1
        return (self.first_date + timedelta(days=x) for x in range(0, num_days))

    @staticmethod
    def history_from(last_date: date, total_num_days: int) -> "DateSpan":
        first_date = last_date - timedelta(days=(total_num_days - 1))
        return DateSpan(first_date=first_date, last_date=last_date)


def calc_effective_date() -> date:
    now = datetime.utcnow() - timedelta(days=1)
    # JHU daily reports are posted between 04:45 and 05:15 UTC the next day
    if now.hour < 6:
        now -= timedelta(days=1)
    return now.date()


effective_date = calc_effective_date()


def calc_last_two_weeks_evaluation_range() -> DateSpan:
    # Upstream data sources offer cumulative case counts for different
    # places.
    #
    # To translate these to the number of cases in the last week and
    # the week before that, we need to collect data points for two
    # weeks, plus the day before that two week period starts as a
    # baseline value.
    #
    # https://www.microcovid.org/paper/7-basic-method
    #
    # 7 for the current week
    # 7 for the week before
    # 1 more to compare numbers from the day before the week before
    num_days_of_history = 15
    return DateSpan.history_from(effective_date, num_days_of_history)


last_two_weeks_evaluation_range = calc_last_two_weeks_evaluation_range()


# The list of DateSpans used to determine which dates
# Place#cumulative_cases should contain when we're done
def calc_cumulative_cases_evaluation_ranges() -> List[DateSpan]:
    return [last_two_weeks_evaluation_range]


cumulative_cases_evaluation_ranges = calc_cumulative_cases_evaluation_ranges()


# Read the Risk Tracker's vaccine table.
# Format:
# Type,0 dose,1 dose,2 dose
def import_vaccine_multipliers() -> Dict[str, Dict[str, float]]:
    vaccines = {}
    with open("./public/tracker/vaccine_table.csv", newline="") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            vaccine_name = row[0]
            if vaccine_name in ["No Vaccine", "Unknown vaccine, unknown date"]:
                continue
            if vaccine_name == "Johnson & Johnson":
                # JHU dataset uses 'Janssen' for this vaccine.
                vaccine_name = "Janssen"
            elif vaccine_name == "AstraZenica":
                # AstraZenEca is mispelled in the csv. Can't change it without
                # breaking the risk tracker.
                vaccine_name = "AstraZeneca"
            vaccines[vaccine_name] = {
                "partial": float(row[2]),
                "complete": float(row[3]),
            }
    vaccines["Unknown"] = vaccines["AstraZeneca"]
    return vaccines


VACCINE_MULTIPLIERS = import_vaccine_multipliers()


# Johns Hopkins dataset


class JHUCommonFields(pydantic.BaseModel):
    FIPS: Optional[int]
    Admin2: Optional[str]
    Province_State: Optional[str]
    Country_Region: str
    Lat: Optional[float]
    Long_: Optional[float]
    Combined_Key: str


class JHUPlaceFacts(JHUCommonFields):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"

    UID: int
    iso2: str
    iso3: str
    code3: Optional[int]
    Population: Optional[int]


class JHUDailyReport(JHUCommonFields):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/%m-%d-%Y.csv"

    # Last_Update: datetime, but not always in consistent format - we ignore
    Confirmed: int
    Deaths: int
    Recovered: Optional[int]
    Active: Optional[int]
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


class JHUVaccinesTimeseriesUS(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/us_data/time_series/time_series_covid19_vaccine_us.csv"

    # Data collection date
    Date: date
    # Name of the state
    Province_State: str
    # Name of the country (US)
    Country_Region: Literal["US"]
    # Cumulative number of doses administered including booster doses
    # for states where it is reported as part of the total.
    Doses_admin: Optional[int]
    # Cumulative number of people who received at least one vaccine
    # dose. When the person receives a prescribed second dose it is
    # not counted twice
    People_at_least_one_dose: Optional[int]
    # Cumulative number of people who received a complete primary
    # series. This means having received one dose of a single-dose
    # vaccine or two doses on different days (regardless of time
    # interval) of either a mRNA or a protein-based series. When the
    # vaccine manufacturer is not reported the recipient is considered
    # fully vaccinated with two doses.
    People_fully_vaccinated: Optional[int]
    # Cumulative number of all the additional or booster doses
    # administered. This metric does not reflect individual people and
    # each dose is counted independently
    Total_additional_doses: Optional[int]


class JHUVaccinesTimeseriesGlobal(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/time_series_covid19_vaccine_global.csv"
    # Data collection date
    Date: date
    # Country code:
    # https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv
    UID: Optional[int]
    # Province or State name
    Province_State: Optional[str]
    # Country or region name
    Country_Region: str
    # Cumulative number of doses administered. When a vaccine requires
    # multiple doses, each one is counted independently
    Doses_admin: Optional[int]
    # Cumulative number of people who received at least one vaccine
    # dose. When the person receives a prescribed second dose, it is
    # not counted twice
    People_at_least_one_dose: Optional[int]


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
    Daily_change_in_cumulative_total: Optional[int]  # new tests today
    Cumulative_total: Optional[int]
    Cumulative_total_per_thousand: Optional[float]  # "per thousand" means population
    Daily_change_in_cumulative_total_per_thousand: Optional[float]
    Seven_day_smoothed_daily_change: Optional[float]  # 7-day moving average
    Seven_day_smoothed_daily_change_per_thousand: Optional[float]
    Short_term_tests_per_case: Optional[float]  # appears to also be 7-day
    Short_term_positive_rate: Optional[float]


# CovidActNow dataset:


class CANMetrics(pydantic.BaseModel):
    testPositivityRatio: Optional[float]  # 7-day rolling average
    caseDensity: Optional[float]  # cases per 100k pop, 7-day rolling average


class CANActuals(pydantic.BaseModel):
    vaccinationsInitiated: Optional[int]  # Raw numbers of people vaccinated
    vaccinationsCompleted: Optional[int]


class CANRegionSummary(pydantic.BaseModel):
    # https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md#RegionSummary
    COUNTY_SOURCE: ClassVar[str] = f"https://api.covidactnow.org/v2/counties.json?apiKey={CAN_API_KEY}"
    STATE_SOURCE: ClassVar[str] = f"https://api.covidactnow.org/v2/states.json?apiKey={CAN_API_KEY}"

    country: str
    fips: int
    lat: Optional[float]
    long_: Optional[float] = pydantic.Field(alias="long")
    state: str
    county: Optional[str]
    # lastUpdatedDate: datetime in nonstandard format, ignored for now
    # projections: ignored
    actuals: Optional[CANActuals]
    metrics: Optional[CANMetrics]
    population: int


# Romanian sub-national dataset:
class RomaniaPrevalenceData(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://covid19.geo-spatial.org/external/charts_vasile/assets/json/cazuri_zile_long.json"

    Date: date = pydantic.Field(alias="Data")
    County: str = pydantic.Field(alias="Judet")
    Population: str = pydantic.Field(alias="Populatie")
    TotalCases: int = pydantic.Field(alias="Cazuri total")


# Covid Timeline Canada region info dataset:
class CovidTimelineCanadaRegion(pydantic.BaseModel):
    SOURCE: ClassVar[str] = "https://raw.githubusercontent.com/ccodwg/CovidTimelineCanada/main/geo/hr.csv"

    # two letter province/territory - e.g. AB
    region: str
    # numeric health region ID - e.g. 4831
    hruid: int
    # brief health region name - e.g. South
    name_short: str
    # number of people who live in health region as of last count - e.g. 308346
    pop: int


# Canada Health Region cases dataset:


class CanadaOpenCovidCases(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://api.opencovid.ca/timeseries?stat=cases&loc={hr_uid}&geo=hr&ymd=true&fill=true&before={before}&after={after}"

    class Data(pydantic.BaseModel):
        class Report(pydantic.BaseModel):
            # type of reporting returned - always "cases" - with
            # Literal type, pydantic will validate that we got only
            # cases reports back
            name: Literal["cases"]
            # date of report - e.g. "2022-05-08"
            date: date
            # cumulative cases - e.g. 4744
            value: int
            # cases on this day - e.g. 6
            value_daily: int

        cases: List[Report]

    data: Data


class CovidTimelineCanadaProvinceOrTerritory(pydantic.BaseModel):
    SOURCE: ClassVar[str] = "https://raw.githubusercontent.com/ccodwg/CovidTimelineCanada/main/geo/pt.csv"

    region: str  # PE
    name_ccodwg: str  # PEI
    name_canonical: str  # Prince Edward Island


# Canada provincial case and test data


class CanadaOpenCovidProvincialSummary(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://api.opencovid.ca/summary?loc={province}&ymd=true&before={before}&after={after}"

    class Report(pydantic.BaseModel):
        cases: int
        # number of total tests given cumulatively - e.g. 9129
        tests_completed: int

        # number of tests given on this date - e.g. 0
        tests_completed_daily: int

        # Note that in Canada it is common for people to have mixed
        # shots (e.g.  first shot Pfizer second shot Moderna).

        # cumulative number of people who have had at least one shot - e.g. 36267
        vaccine_administration_dose_1: int
        # cumulative number of people who have had at least two shots - e.g. 34945
        vaccine_administration_dose_2: int
        date_: date = pydantic.Field(alias="date")

    data: List[Report]


# Canada Health Region vaccination dataset:


class CanadaRegionalVaccinationReports(pydantic.BaseModel):
    SOURCE: ClassVar[
        str
    ] = "https://api.covid19tracker.ca/reports/regions/{hr_uid}?fill_dates=true&after={after}&before={before}"

    class Report(pydantic.BaseModel):
        date_: date = pydantic.Field(alias="date")
        # number of shots administered - e.g. 92155
        total_vaccinations: Optional[int]
        # number of people who have completed all shots - e.g. 35206
        total_vaccinated: Optional[int]

    hr_uid: int
    last_updated: datetime
    data: List[Report]


class CanadaVaccineDistribution(pydantic.BaseModel):
    SOURCE: ClassVar[str] = "https://api.covid19tracker.ca/vaccines/distribution/split"

    # no qualifier: distributed
    # administered: total number of doses given including both first and second
    # doses
    class Data(pydantic.BaseModel):
        province: str  # 2-letter abbrev
        pfizer_biontech: Optional[int]
        pfizer_biontech_administered: Optional[int]
        moderna: Optional[int]
        moderna_administered: Optional[int]
        astrazeneca: Optional[int]
        astrazeneca_administered: Optional[int]
        johnson: Optional[int]
        johnson_administered: Optional[int]

    data: List[Data]


# Represents number of people vaccinated.
class Vaccination(pydantic.BaseModel):
    partial_vaccinations: int = 0
    completed_vaccinations: int = 0


# Our unified representation:


class Place(pydantic.BaseModel, PopulationFilteredLogging):
    fullname: str  # "San Francisco, California, US"
    name: str  # "San Francisco"
    population: int = 0  # 881549
    test_positivity_rate: Optional[float]  # 0.05
    cumulative_cases: Counter[date] = collections.Counter()

    # For some international data we don't get the positivity rate,
    # just the number of tests. We can approximate positivity rate
    # from that and the known number of cases.
    tests_in_past_week: Optional[int]

    vaccines_by_type: Optional[Dict[str, Vaccination]]
    vaccines_total = Vaccination()

    @property
    def population_as_int(self) -> int:
        return self.population

    @property
    def recent_daily_cumulative_cases(self) -> List[int]:
        """Returns a list whose last entry is the most recent day's
        cumulative case count, and earlier entries are earlier days' counts.
        So recent_daily_cumulative_cases[-5] is the total number of cases reported
        up to 5 days ago.
        """
        daily_cumulative_cases: List[int] = []

        for current in reversed(list(last_two_weeks_evaluation_range)):
            if current not in self.cumulative_cases:
                raise ValueError(
                    f"Missing data for {self.fullname} on {current:%Y-%m-%d} - {self.cumulative_cases}"
                )
            daily_cumulative_cases.append(self.cumulative_cases[current])
        return daily_cumulative_cases[::-1]

    # Makes an estimate of the number of new cases in a slice of daily cumulative
    # cases. Nominally is values[-1] - values[0], but sometimes regions post
    # corrections which result in the number of cases decreasing.
    def cases_in_cum_cases(self, values: List[int]) -> int:
        # list of indices right before negative corrections. If values = [3,2,3,0,5],
        # then negative_corrections == [0, 2]
        negative_corrections = [i for i, val in enumerate(values[:-1]) if val > values[i + 1]]
        corrections_within_bounds = min(values) == values[0] and max(values) == values[-1]
        if len(negative_corrections) == 0 or corrections_within_bounds:
            return values[-1] - values[0]

        # Always use values[-1] rather than max(values) because max(values) is
        # either values[-1] or there's been a negative correction that should be examined.
        if min(values[:-1]) <= values[-1]:
            possibly_suspect_correction = False
            for correction_index in negative_corrections:
                value_before_correction = values[correction_index]
                value_correction = values[correction_index + 1]
                value_after_correction = (
                    None if correction_index + 2 >= len(values) else values[correction_index + 2]
                )

                if value_after_correction is not None:
                    correction_size = value_before_correction - value_correction  # flipped
                    change_without_correction = value_after_correction - value_before_correction
                    # arbitrary heuristic to look for cases where the negative correction
                    # itself might be the data that's wrong. Warn if:
                    #   * removing the negative correction would create usable
                    #     monotonically nondecreasing data,
                    #   * the correction is substantial (more than 5 people) and
                    #   * the correction is proportionally much larger than the change
                    #     ignoring the correction

                    if value_before_correction <= value_after_correction and correction_size > max(
                        5, 3 * change_without_correction
                    ):
                        possibly_suspect_correction = True
                        break

            if values[0] > min(values[:-1]) and possibly_suspect_correction:
                self.issue(
                    "Negative correction is suspect",
                    f"Check numbers manually for {self.fullname}. {len(negative_corrections)} negative cumulative case corrections {negative_corrections}, values={values}",
                )
            if min(values[:-1]) == values[-1] and max(values) > values[-1]:
                self.issue(
                    "Endpoints say no new cases and max(values) says new cases",
                    f"check numbers manually for {self.fullname}. {len(negative_corrections)} negative cumulative case corrections {negative_corrections}, values={values}, discrepancy {max(values) - values[-1]}",
                )
            return values[-1] - min(values[:-1])

        # looks complicated. Print a warning.
        self.issue(
            "Decreasing cumulative case counts.",
            f"Assuming no cases for {self.fullname}. {len(negative_corrections)} negative cumulative case corrections {negative_corrections}, values={values}",
        )
        return 0

    @property
    def cases_last_week(self) -> int:
        # len([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16][-8:]) == 8
        # [9, 10, 11, 12, 13, 14, 15, 16]
        last_week = self.recent_daily_cumulative_cases[-8:]
        assert len(last_week) == 8
        return self.cases_in_cum_cases(last_week)

    @property
    def cases_week_before(self) -> int:
        # len([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16][-15:-7]) == 8
        # [2, 3, 4, 5, 6, 7, 8, 9]
        week_before = self.recent_daily_cumulative_cases[-15:-7]
        assert len(week_before) == 8
        return self.cases_in_cum_cases(week_before)

    @property
    def updatedAt(self) -> date:
        cases_from_effective_date_on = self.recent_daily_cumulative_cases[::-1]
        last_num_cases = cases_from_effective_date_on[0]
        for i in range(len(cases_from_effective_date_on)):
            if cases_from_effective_date_on[i] != last_num_cases:
                return effective_date - timedelta(days=(i - 1))
            last_num_cases = cases_from_effective_date_on[i]
        return effective_date - timedelta(days=len(cases_from_effective_date_on))

    @property
    @abc.abstractmethod
    def app_key(self) -> str:
        ...

    def set_total_vaccines(
        self, partial_vaccinations: Optional[int], complete_vaccinations: Optional[int]
    ) -> None:
        if partial_vaccinations is None or complete_vaccinations is None:
            return
        self.vaccines_total.partial_vaccinations = partial_vaccinations
        self.vaccines_total.completed_vaccinations = complete_vaccinations

    def set_vaccines_of_type(
        self, vaccine_type: str, partial: Optional[int], complete: Optional[int]
    ) -> None:
        if partial is None or complete is None:
            return
        if self.vaccines_by_type is None:
            self.vaccines_by_type = {}

        self.vaccines_by_type[vaccine_type] = Vaccination()
        self.vaccines_by_type[vaccine_type].partial_vaccinations = partial
        self.vaccines_by_type[vaccine_type].completed_vaccinations = complete

    def completed_vaccination_total(self) -> int:
        if self.vaccines_by_type is not None:
            return reduce(
                lambda x, key: x + self.vaccines_by_type[key].completed_vaccinations, self.vaccines_by_type, 0  # type: ignore
            )
        return self.vaccines_total.completed_vaccinations

    def partial_vaccination_total(self) -> int:
        if self.vaccines_by_type is not None:
            return reduce(
                lambda x, key: x + self.vaccines_by_type[key].partial_vaccinations, self.vaccines_by_type, 0  # type: ignore
            )
        return self.vaccines_total.partial_vaccinations

    # Compute estimated risk ratio for an unvaccinated person vs an average person,
    # so that we can convert average risk (which we know from prevalence data) to
    # unvaccinated risk if we have sufficiently detailed vaccination information.
    #
    # Define risk_sum to be
    #     sum(multiplier_from_vaccination_status) over the entire population
    # where the multiplier from being unvaccinated is 1 and the multiplier from
    # being vaccinated with e.g. 1 dose of Pfizer is determined from vaccine_table.csv.
    #
    # risk_sum / population will then be the average vaccine multiplier across the
    # entire population, including unvaccinated individuals.
    #
    # Note that if absolutely nobody were vaccinated, the average vaccine multiplier
    # would be 1 (since every person contributes a multiplier of 1 and then it all
    # gets divided out by the number of people).
    #
    # If we then assume that vaccinated and unvaccinated people behave
    # identically (have the same patterns of shopping, socializing, etc), then
    #     average_person_risk
    #         = average_unvaccinated_person_risk * average_vaccine_multiplier
    #
    # and so we can compute a conversion factor
    # unvaccinated_relative_prevalence
    #      := average_unvaccinated_person_risk / average_person_risk  <-- by definition
    #       = average_unvaccinated_person_risk /                      <-- using above assumption
    #           (average_unvaccinated_person_risk * average_vaccine_multiplier)
    #       = 1 / avg_vaccine_multiplier
    #       = 1 / (risk_sum / population)
    #       = population / risk_sum
    #
    # that we can use like so:
    # estimated_unvaccinated_person_risk
    #   = unvaccinated_relative_prevalence * average_person_risk_from_prevalence_data
    def unvaccinated_relative_prevalence(self) -> Optional[float]:
        total_vaccinated = 0  # combined total of partially and fully vaccinated people
        risk_sum = 0

        if self.vaccines_by_type is not None:
            for vaccine_type, vaccine_status in self.vaccines_by_type.items():
                total_vaccinated += vaccine_status.completed_vaccinations
                total_vaccinated += vaccine_status.partial_vaccinations
                risk_sum += round(
                    VACCINE_MULTIPLIERS[vaccine_type]["complete"] * vaccine_status.completed_vaccinations
                )
                risk_sum += round(
                    VACCINE_MULTIPLIERS[vaccine_type]["partial"] * vaccine_status.partial_vaccinations
                )
        else:
            risk_sum = round(
                VACCINE_MULTIPLIERS["Unknown"]["complete"] * self.vaccines_total.completed_vaccinations
                + VACCINE_MULTIPLIERS["Unknown"]["partial"] * self.vaccines_total.partial_vaccinations
            )
            total_vaccinated = (
                self.vaccines_total.completed_vaccinations + self.vaccines_total.partial_vaccinations
            )

        if total_vaccinated == 0:
            return None

        if total_vaccinated >= self.population:
            # This probably means people from other counties have gotten their
            # vaccine here. Just assume 100% vaccination.
            return total_vaccinated / risk_sum

        total_unvaccinated = self.population - total_vaccinated
        risk_sum += 1 * total_unvaccinated
        return float(self.population) / risk_sum

    # Computes the average vaccine multiplier of the region. For use in computing
    # "Average vaccinated" person

    def average_fully_vaccinated_multiplier(self) -> float:
        if self.vaccines_by_type is None:
            return VACCINE_MULTIPLIERS["Unknown"]["complete"]

        vaccine_multiplier = 0
        total_fully_vaccinated = 0
        for vaccine_type, vaccine_status in self.vaccines_by_type.items():
            total_fully_vaccinated += vaccine_status.completed_vaccinations
            vaccine_multiplier += round(
                vaccine_status.completed_vaccinations * VACCINE_MULTIPLIERS[vaccine_type]["complete"]
            )

        if total_fully_vaccinated == 0:
            return VACCINE_MULTIPLIERS["Unknown"]["complete"]
        return vaccine_multiplier / total_fully_vaccinated

    def as_app_data(self) -> "AppLocation":
        last_week = self.cases_last_week
        week_before = self.cases_week_before
        if last_week <= week_before or week_before <= 0:
            increase = 0.0
        else:
            increase = last_week / week_before - 1

        if self.population <= 0 and self.name != "Unknown":
            raise ValueError(f"Population for {self.name} is {self.population}")

        if self.cases_last_week < 0:
            raise ValueError(f"Cases for {self.name} is {self.cases_last_week}.")

        cases_per_million = (self.cases_last_week * 1_000_000) / self.population
        if self.cases_last_week == 0 and self.cases_week_before == 0:
            self.issue(
                f"No cases noted for either week - {type(self).__name__} level",
                f"No cases reported in either week in {self.fullname} for period",
            )
        if self.cases_last_week == 0 or self.cases_week_before == 0:
            self.issue(
                f"No cases noted for a week - {type(self).__name__} level",
                f"No cases reported in at least one week in {self.fullname} for period",
            )
        cases_per_million = (1_000_000 * self.cases_last_week) / self.population
        if self.cases_last_week != 0 and (cases_per_million < 1):
            self.issue(
                f"Less than 1 case per million - {type(self).__name__} level",
                f"Only {self.cases_last_week} cases last week when population is {self.population} in {self.name}",
            )

        if self.test_positivity_rate is not None and (
            self.test_positivity_rate < 0 or self.test_positivity_rate > 1
        ):
            self.issue(
                "Invalid test positivity rate", f"test rate for {self.name} is {self.test_positivity_rate}"
            )
            self.test_positivity_rate = None

        return AppLocation(
            label=self.name,
            population=f"{self.population:,}",
            casesPastWeek=self.cases_last_week,
            casesIncreasingPercentage=increase * 100,
            positiveCasePercentage=(
                self.test_positivity_rate * 100 if self.test_positivity_rate is not None else None
            ),
            incompleteVaccinations=self.partial_vaccination_total() or None,
            completeVaccinations=self.completed_vaccination_total() or None,
            unvaccinatedPrevalenceRatio=self.unvaccinated_relative_prevalence(),
            averageFullyVaccinatedMultiplier=self.average_fully_vaccinated_multiplier(),
            # we have to format the date like this to get it to be parsed correctly by JS
            # Otherwise it assumes UTC time and will sometimes subtract a day
            updatedAt=self.updatedAt.strftime("%B %d, %Y"),
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
        if self.country == "Canada":
            # actually provinces, but reflecting that might break the spreadsheet.
            result.topLevelGroup = "Canada states"
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
            result.subdivisions = [state.app_key for state in self.states.values() if state.name != "Unknown"]
        result.iso3 = self.iso3
        return result


class AppLocation(pydantic.BaseModel, PopulationFilteredLogging):
    label: str
    iso3: Optional[str]
    population: str
    casesPastWeek: int
    casesIncreasingPercentage: float
    positiveCasePercentage: Optional[float]
    topLevelGroup: Optional[str] = None
    subdivisions: List[str] = []
    incompleteVaccinations: Optional[int]
    completeVaccinations: Optional[int]
    unvaccinatedPrevalenceRatio: Optional[float]
    averageFullyVaccinatedMultiplier: float
    updatedAt: str

    # https://covid19-projections.com/estimating-true-infections-revisited/
    def prevalenceRatio(self) -> float:
        DAY_0 = datetime(2020, 2, 12)
        day_i = (datetime.now() - DAY_0).days
        positivityRate = self.positiveCasePercentage
        if positivityRate is None or positivityRate > 100:
            positivityRate = 100
        if positivityRate < 0:
            self.issue("Positivity rate is negative", f"{positivityRate}")
            positivityRate = 0
        final: float = (1000 / (day_i + 10)) * (positivityRate / 100) ** 0.5 + 2
        return final

    @property
    def population_as_int(self) -> int:
        return int(self.population.replace(",", ""))

    def as_csv_data(self) -> Dict[str, str]:
        population = self.population_as_int
        reported = (self.casesPastWeek + 1) / population
        underreporting = self.prevalenceRatio()
        delay = min(1.0 + (self.casesIncreasingPercentage / 100), 2.0)
        estimated_prevalence = reported * underreporting * delay
        return {
            "Name": self.label,
            # These two columns were replaced after Risk Tracker version 2.2.5 to make room for vax/unvax prevalence
            # "Population": str(population),
            # "Cases in past week": str(self.casesPastWeek),
            "Estimated unvaccinated prevalence": (
                str(round(self.unvaccinatedPrevalenceRatio * estimated_prevalence, 6))
                if self.unvaccinatedPrevalenceRatio is not None
                else "Unknown"
            ),
            "Estimated vaccinated prevalence": (
                str(
                    round(
                        self.unvaccinatedPrevalenceRatio
                        * estimated_prevalence
                        * self.averageFullyVaccinatedMultiplier,
                        6,
                    )
                )
                if self.unvaccinatedPrevalenceRatio is not None
                else "Unknown"
            ),
            "Reported prevalence": str(round(reported, 6)),
            "Underreporting factor": str(round(underreporting, 4)),
            "Delay factor": str(round(delay, 4)),
            "Estimated prevalence": str(round(estimated_prevalence, 6)),
        }


class AppLocations(pydantic.BaseModel):
    __root__: Dict[str, AppLocation]


class AllData:
    def __init__(self) -> None:
        self.countries: Dict[str, Country] = {}
        self.fips_to_county: Dict[int, County] = {}
        self.uid_to_place: Dict[int, Place] = {}

    def get_country(self, name: str) -> Country:
        if name not in self.countries:
            self.countries[name] = Country(name=name, fullname=name)
        return self.countries[name]

    def get_country_or_raise(self, name: str) -> Country:
        return self.countries[name]

    def get_state(self, name: str, *, country: str) -> State:
        parent = self.get_country(country)
        if name not in parent.states:
            parent.states[name] = State(name=name, fullname=f"{name}, {country}", country=country)
        return parent.states[name]

    def get_state_or_raise(self, name: str, country: str) -> State:
        return self.countries[country].states[name]

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
            assert jhu_line.Province_State is not None
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
        elif jhu_line.Country_Region == "Korea, South":
            return self.get_country("South Korea")
        else:
            return self.get_country(jhu_line.Country_Region)

    def get_canada_region_place(
        self, health_region: CovidTimelineCanadaRegion, province_or_territory: str
    ) -> Place:
        return self.get_county(health_region.name_short, state=province_or_territory, country="Canada")

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

    def add_place_to_uid_cache(self, uid: int, place: Place) -> None:
        self.uid_to_place[uid] = place

    # Attempt to set the population, cases, and positive test rates of a region
    # based on the stats of all its sub-regions
    def rollup_totals(self) -> None:
        fake_names = ("Unknown", "Unassigned", "Recovered", "Repatriated")

        def rollup_population(parent: Place, child_attr: str) -> None:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if parent.population == 0:
                for child in children.values():
                    parent.population += child.population
                if not parent.population and parent.name not in fake_names:
                    raise ValueError(f"Missing population data for {parent!r}")

        def rollup_cases(parent: Place, child_attr: str) -> bool:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if not parent.cumulative_cases:
                for child in children.values():
                    parent.cumulative_cases += child.cumulative_cases
                if not parent.cumulative_cases:
                    return False
            if parent.population == 0 and not parent.cases_last_week:  # fake region (Unknown, etc)
                return False
            return True

        def rollup_testing(parent: Place, child_attr: str) -> None:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if parent.test_positivity_rate is None:
                if parent.tests_in_past_week:
                    parent.test_positivity_rate = parent.cases_last_week / parent.tests_in_past_week

                tests_last_week = 0
                valid = bool(children)
                for child in children.values():
                    if child.test_positivity_rate is None:
                        valid = False
                    elif child.test_positivity_rate > 0:
                        tests_last_week += round(child.cases_last_week / child.test_positivity_rate)
                if valid and tests_last_week:
                    parent.test_positivity_rate = parent.cases_last_week / tests_last_week

        def rollup_vaccines(parent: Place, child_attr: str) -> None:
            children: Dict[str, Place] = getattr(parent, child_attr)

            if (
                parent.population > 0
                and parent.vaccines_total.partial_vaccinations == 0
                and parent.vaccines_total.completed_vaccinations == 0
            ):
                all_children_total_population = 0
                all_children_total_completed_vaccinations = 0
                all_children_total_partial_vaccinations = 0
                for child in children.values():
                    all_children_total_population += child.population
                    all_children_total_completed_vaccinations += child.vaccines_total.completed_vaccinations
                    all_children_total_partial_vaccinations += child.vaccines_total.partial_vaccinations
                if all_children_total_population > 0:
                    parent.set_total_vaccines(
                        round(
                            parent.population
                            * all_children_total_partial_vaccinations
                            / all_children_total_population
                        ),
                        round(
                            parent.population
                            * all_children_total_completed_vaccinations
                            / all_children_total_population
                        ),
                    )

        def rolldown_vaccine_types(parent: Place, children: Iterable[Place]) -> None:
            for child in children:
                if child.vaccines_by_type is None:
                    child_vaccinations = child.vaccines_total
                    # Assume that sub-places have the same ratio of vaccine types
                    completed_vaccination_total = parent.completed_vaccination_total()
                    partial_vaccination_total = parent.partial_vaccination_total()
                    assert parent.vaccines_by_type is not None
                    for vaccine_type, parent_vaccinations in parent.vaccines_by_type.items():
                        child_partials = round(
                            parent_vaccinations.partial_vaccinations
                            * child_vaccinations.partial_vaccinations
                            / partial_vaccination_total
                        )
                        child_completes = round(
                            parent_vaccinations.completed_vaccinations
                            * child_vaccinations.completed_vaccinations
                            / completed_vaccination_total
                        )
                        child.set_vaccines_of_type(vaccine_type, child_partials, child_completes)

        class FailedCountry(TypedDict):
            country_name: str
            error: ValueError

        # Keep a list of countries where an exception was raised so we can discard them rather than fail the whole update
        failed_countries: List[FailedCountry] = list()

        for country in self.countries.values():
            try:
                for state in country.states.values():
                    if state.test_positivity_rate is None and state.tests_in_past_week is not None:
                        try:
                            state.test_positivity_rate = state.cases_last_week / state.tests_in_past_week
                        except ZeroDivisionError:
                            state.issue(
                                "No tests last week",
                                f"couldn't calculate {state.fullname}'s test positivity rate because there were no tests last week.",
                            )
                            state.test_positivity_rate = None
                    if state.vaccines_by_type is not None:
                        rolldown_vaccine_types(state, state.counties.values())
                    for county in state.counties.values():
                        if county.population == 0 and county.name not in fake_names:
                            raise ValueError(f"Missing population data for {county!r}")
                    rollup_population(state, "counties")
                    rollup_vaccines(state, "counties")
                rollup_population(country, "states")
            except ValueError as err:
                failed_countries.append(dict(country_name=country.name, error=err))

        # Delete any countries that had an error
        for country_data in failed_countries:
            print_and_log_to_sentry(
                f"Discarding country {country_data['country_name']} due to error: {country_data['error']!r}"
            )
            del self.countries[country_data["country_name"]]

        # Clear out the list for the next pass below
        failed_countries = list()

        for country in list(self.countries.values()):
            try:
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
                                county.issue(
                                    "No county-level case data", f"discarding {county!r} with no case data"
                                )
                            del state.counties[county.name]

                        if county.test_positivity_rate is None:
                            if county.tests_in_past_week:
                                county.test_positivity_rate = (
                                    county.cases_last_week / county.tests_in_past_week
                                )
                                if county.cases_last_week > county.tests_in_past_week:
                                    print_and_log_to_sentry(
                                        f"Falling back to state data for {county.name} because it has more cases than tests in the last week with a positivity rate of {county.test_positivity_rate}."
                                    )
                                    county.test_positivity_rate = state.test_positivity_rate

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
                            state.issue("No state-level case data", f"Discarding {state!r} with no case data")
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
                    raise ValueError(f"No country-level case data for {country!r}")
                rollup_testing(country, "states")
                for state in list(country.states.values()):
                    if state.name in fake_names:
                        # Now that we've incorporated these unassigned/etc state
                        # cases into the country totals, we have no further need
                        # of the state-level data.
                        del country.states[state.name]
            except ValueError as err:
                failed_countries.append(dict(country_name=country.name, error=err))

        # Delete any countries that had an error
        for country_data in failed_countries:
            print_and_log_to_sentry(
                f"Discarding country {country_data['country_name']} due to error: {country_data['error']!r}"
            )
            del self.countries[country_data["country_name"]]


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
            sentry_sdk.capture_exception(exc)
            logger.warning(f"discarding corrupted cache: {exc!r}")
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
        response = requests.get(url)
        response.raise_for_status()
        self.data[url] = response.text
        return self.data[url]

    def remove(self, url: str) -> None:
        del self.data[url]


def parse_csv(cache: DataCache, model: Type[Model], url: str) -> List[Model]:
    logger.info(f"Fetching {url}...")
    lines = cache.get(url).splitlines()
    reader = csv.reader(lines)
    fields = [re.sub("^7", "Seven", re.sub("[^A-Za-z0-9_]", "_", name)) for name in next(reader)]

    # verify we have every field we expect
    for field_name in model.__fields__:
        if field_name not in fields:
            raise ValueError(f"Did not find expected '{field_name}' column in header of {url}")

    result = []
    for line in reader:
        kw: Dict[str, Optional[Union[str, int]]] = {}
        for field, val in zip(fields, line):
            info = model.__fields__.get(field)
            if info is None:
                continue
            if val == "":
                if not info.required:
                    kw[field] = None
                elif info.type_ in (int, float):
                    raise ValueError(f"Expected an int in column {field} in this line: {line} of {url}")
                else:
                    kw[field] = ""
            elif val.endswith(".0") and val[:-2].isdigit():
                kw[field] = val[:-2]
            elif info.type_ is int and "e+" in val:
                kw[field] = int(float(val))
            else:
                kw[field] = val
        result.append(model(**kw))

    logger.info(f"read {len(lines)} objects")
    return result


def parse_json_list(cache: DataCache, model: Type[Model], url: str) -> List[Model]:
    logger.info(f"Fetching {url}...")
    result = pydantic.parse_obj_as(List[model], json.loads(cache.get(url)))  # type: ignore
    logger.debug(f"read {len(result)} objects")
    return result


def parse_json(cache: DataCache, model: Type[Model], url: str) -> Model:
    max_attempts = 4
    retry_time_seconds = 60
    for attempt in range(max_attempts + 1):
        log_message = f"Fetching {url}"
        if attempt > 0:
            log_message += f" (try {attempt + 1}/{max_attempts})"
        log_message += "..."
        logger.info(log_message)
        # Error case
        if attempt == max_attempts:
            raise ValueError(f"Reached max attempts ({attempt}) attempting to get JSON from {url}")

        try:
            cache.get(url)
            break
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                # Lengthen the delay time each time it fails, to give the API more of a break
                # This can lead to very very long script runs, but it (usually) eventually works
                # TODO: We can hopefully greatly reduce the delay time once this issue is resolved: https://github.com/andrewthong/covid19tracker-api/issues/88
                retry_time_seconds *= 2
                print_and_log_to_sentry(
                    f"requests.exceptions.HTTPError: {e}\nTrying again after {retry_time_seconds} seconds ({attempt + 1} attempts so far)..."
                )
                sleep(retry_time_seconds)
            else:
                raise
    logger.debug(f"read {len(cache.get(url))} bytes")
    result = pydantic.parse_obj_as(model, json.loads(cache.get(url)))
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
        "Summer Olympics 2020",
    ):
        return True
    if line.Country_Region in (
        "Diamond Princess",
        "Grand Princess",
        "MS Zaandam",
        "Western Sahara",
        "Summer Olympics 2020",
        "Winter Olympics 2022",
        "Antarctica",
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
    if line.Country_Region == "Canada":
        if line.Province_State == "Recovered":
            return True
    return False


def parse_jhu_place_facts(cache: DataCache, data: AllData, country_by_iso3: Dict[str, Country]) -> None:
    # List of regions and their population
    for line in parse_csv(cache, JHUPlaceFacts, JHUPlaceFacts.SOURCE):
        if ignore_jhu_place(line):
            continue
        if {line.Country_Region, line.Province_State} & {"Unknown", "Unassigned"}:
            # These mark cases not attached to a more specific region.
            # We want to count their cases, but they don't have population.
            continue
        if line.Province_State == "Alaska" and line.Admin2 == "Bristol Bay plus Lake Peninsula":
            # These are strangely combined; Lake and Peninsula already
            # has its own entry so turn the combo into just Bristol Bay
            line.Admin2 = "Bristol Bay"
            line.Population = 877  # from Google
        if line.Province_State == "Alaska" and line.Admin2 == "Yakutat plus Hoonah-Angoon":
            # These are strangely combined; Lake and Peninsula already
            # has its own entry so turn the combo into just Bristol Bay
            line.Admin2 = "Yakutat"
            line.Population = 604  # from Google
        if line.Population is None:
            if line.Admin2 == "Unassigned":
                line.Population = 0
            else:
                raise ValueError(f"Please manually provide population for {line}")
        if line.Country_Region == "Korea, South":
            line.Country_Region = "South Korea"
        place = data.get_jhu_place(line)
        data.add_place_to_uid_cache(line.UID, place)
        if place.population != 0:
            raise ValueError(f"Duplicate population info for {place!r}: {line.Population}")
        if isinstance(place, Country):
            place.iso3 = line.iso3
            country_by_iso3[line.iso3] = place
        place.population = line.Population
        if isinstance(place, (County, State)) and line.FIPS is not None:
            place.fips = str(line.FIPS)


def parse_jhu_daily_report(cache: DataCache, data: AllData, current: date) -> None:
    # Cumulative cases per region
    for line in parse_csv(cache, JHUDailyReport, current.strftime(JHUDailyReport.SOURCE)):
        if ignore_jhu_place(line):
            continue
        place = data.get_jhu_place(line)
        if place.population == 0 and place.name not in (
            "Unassigned",
            "Unknown",
        ):
            print_and_log_to_sentry(
                f"JHU data has cases but no population for {place!r} with line data: {line!r}"
            )
        place.cumulative_cases[current] = line.Confirmed


# returns estimate of number of people who completed their primary
# series (regardless of their booster status) given number of people
# with at least one dose
def estimate_primary_series_complete(
    # people with at least one dose
    partial_vaccinations: int,
) -> int:
    # https://covid.cdc.gov/covid-data-tracker/#vaccinations_vacc-people-additional-dose-totalpop
    #
    # As of 2022-09, CDC says: 68% of population has completed
    # primary series; 49% of those who completed a primary series
    # got first booster, 36% of those who got a first booster shot
    # got a second.
    #
    # 1 dose: 263,812,108
    # completed primary series: 224,980,931
    # People with a First Booster Dose: 109,578,270
    # People with a Second Booster Dose: 23,118,101
    #
    # Let's assume that these trends can be applied world-wide,
    # and thus if n people had at least one dose,
    # 224980931/263812108 = 85% of them completed the primary
    # series.
    primary_series_completion_ratio = 0.85

    return round(partial_vaccinations * primary_series_completion_ratio)


def parse_jhu_vaccines_global(cache: DataCache, data: AllData) -> None:
    num_success = 0
    # Global vaccination rates
    for item in parse_csv(cache, JHUVaccinesTimeseriesGlobal, JHUVaccinesTimeseriesGlobal.SOURCE):
        if effective_date > item.Date:
            # this file is an entire timeseries history - only pay
            # attention to most recent date
            continue

        if item.UID is None:
            if item.Country_Region == "World":
                continue
            else:
                raise ValueError(f"Unexpected None for UID: {item}")
        if item.Doses_admin is None or item.People_at_least_one_dose is None:
            if item.Country_Region == "Eritrea":
                # https://er.usembassy.gov/covid-19-information/
                # "Has the government of Eritrea approved a COVID-19 vaccine for use?  No"
                item.Doses_admin = 0
                item.People_at_least_one_dose = 0
            else:
                raise ValueError(f"Unexpected Doses_admin for {item}")
        try:
            place = data.uid_to_place[item.UID]
        except KeyError:
            print_and_log_to_sentry(f"Could not find UID {item.UID}")
            continue

        complete_vaccinations: int = estimate_primary_series_complete(item.People_at_least_one_dose)
        partial_vaccinations: int = item.People_at_least_one_dose - complete_vaccinations
        place.set_total_vaccines(partial_vaccinations, complete_vaccinations)
        num_success += 1
    if num_success == 0:
        raise ValueError(f"Not able to gain data from {JHUVaccinesTimeseriesGlobal.SOURCE}")


# JHU provides these as 'states' in time_series_covid19_vaccine_us.csv
# but does not map back in UID_ISO_FIPS_LookUp_Table.csv
#
# Not being location-based categories, they wouldn't be helpful for
# microCOVID users regardless, so silently ignore them.
EXPECTED_MISSING_JHU_US_STATES = {
    "",  # Used to indicate all-of-USA values
    "Department of Defense",
    "Federal Bureau of Prisons",
    "Indian Health Services",
    "Long Term Care (LTC) Program",
    "Veterans Health Administration",
}


def parse_jhu_vaccines_us(cache: DataCache, data: AllData) -> None:
    num_success = 0
    # US vaccination rates
    for item in parse_csv(cache, JHUVaccinesTimeseriesUS, JHUVaccinesTimeseriesUS.SOURCE):
        if effective_date > item.Date:
            # this file is an entire timeseries history - only pay
            # attention to most recent date
            continue

        assert item.Province_State is not None
        if item.Country_Region == "":
            # overall US stats - not currently used, and was
            # unreliably populated as of 2022-09 - empty values were
            # being manually fixed up but then broken again by JHU
            # pipeline - see
            # https://github.com/govex/COVID-19/commit/426347815a55c14579ce2c6a8a534b28def924c4
            continue

        try:
            state = data.get_state_or_raise(name=item.Province_State, country=item.Country_Region)
        except KeyError:
            if item.Province_State not in EXPECTED_MISSING_JHU_US_STATES:
                logger.warning(f"Could not find state {item.Province_State}")
            continue
            # Suppressed debug info - includes things like DoD, VHA, etc.
            # logger.warning(f"Could not find state {item.Province_State}")

        if (
            item.People_at_least_one_dose is None
            or item.People_fully_vaccinated is None
            or item.People_fully_vaccinated is None
        ):
            raise ValueError(f"Vaccination data missing for {state}")
        partial_vaccinations: int = item.People_at_least_one_dose - item.People_fully_vaccinated
        complete_vaccinations: int = item.People_fully_vaccinated
        state.set_total_vaccines(partial_vaccinations, complete_vaccinations)
        num_success += 1
    if num_success == 0:
        raise ValueError(f"Not able to gain data from {JHUVaccinesTimeseriesUS.SOURCE}")


# Ignore places not in JHU place facts - it does not
# recognize 'counties' inside the Northern Mariana Islands
EXPECTED_MISSING_JHU_FIPS_CODES = (
    69100,  # Rota, Northern Mariana Islands, population 1,893
    69110,  # Saipan, Northern Mariana Islands, population 43,385
    69120,  # Tinian, Northern Mariana Islands, population 3,136
)


def parse_can_region_summary_by_county(cache: DataCache, data: AllData) -> None:
    # Test positivity and vaccination status per US county
    for item in parse_json_list(cache, CANRegionSummary, CANRegionSummary.COUNTY_SOURCE):
        assert type(item.fips) is int, "Expected item.fips to be int but got {}".format(type(item.fips))
        if item.fips not in data.fips_to_county:
            if item.fips not in EXPECTED_MISSING_JHU_FIPS_CODES:
                print_and_log_to_sentry(f"ignoring unknown county fips {item.fips}")
            continue
        county = data.fips_to_county[item.fips]
        assert (
            us_state_name_by_abbrev[item.state] == county.state
        ), f"expected {item.state} to be {county.state}"
        if item.metrics is not None:
            county.test_positivity_rate = item.metrics.testPositivityRatio
        if item.actuals is not None and item.actuals.vaccinationsCompleted is not None:
            completed_vaccinations = item.actuals.vaccinationsCompleted
            assert item.actuals.vaccinationsInitiated is not None
            partial_vaccinations = item.actuals.vaccinationsInitiated - completed_vaccinations
            county.set_total_vaccines(partial_vaccinations, completed_vaccinations)


def parse_can_region_summary_by_state(cache: DataCache, data: AllData) -> None:
    # Test positivity and vaccination status per US state
    for item in parse_json_list(cache, CANRegionSummary, CANRegionSummary.STATE_SOURCE):
        state_name = us_state_name_by_abbrev[item.state]
        state = data.countries["US"].states[state_name]
        if item.metrics is not None:
            state.test_positivity_rate = item.metrics.testPositivityRatio


def parse_owid_testing_data(cache: DataCache, country_by_iso3: Dict[str, Country]) -> None:
    # Test positivity per non-US country
    for line in parse_csv(cache, OWIDTestingData, OWIDTestingData.SOURCE):
        # These are in sorted order so we'll keep overwriting with
        # more recent data per country
        country = country_by_iso3.get(line.ISO_code)
        if country is not None:
            if line.Short_term_positive_rate is not None:
                country.test_positivity_rate = line.Short_term_positive_rate
            elif line.Seven_day_smoothed_daily_change:
                country.tests_in_past_week = round(line.Seven_day_smoothed_daily_change * 7)


def parse_romania_prevalence_data(cache: DataCache, data: AllData) -> None:
    try:
        romania_regions = parse_json_list(cache, RomaniaPrevalenceData, RomaniaPrevalenceData.SOURCE)
    except pydantic.error_wrappers.ValidationError as e:
        print_and_log_to_sentry(f"Discarding county-level data from Romania due to error: {e}")
        return
    latest_date = max([region.Date for region in romania_regions])
    if effective_date > latest_date:
        romania = data.get_country_or_raise("Romania")
        romania.issue(
            "No county-level case data",
            f"from Romania due to staleness - last update was {latest_date}",
        )
        return

    for line in romania_regions:
        state = data.get_state(line.County, country="Romania")
        state.population = int(float(line.Population.replace(",", "")))
        state.cumulative_cases[line.Date] = line.TotalCases


def parse_canada_prevalence_data(cache: DataCache, data: AllData) -> None:
    try:
        # pull lists of health regions, provinces and territories and
        # their abbreviations

        canada_regions = parse_csv(cache, CovidTimelineCanadaRegion, CovidTimelineCanadaRegion.SOURCE)

        canada_provinces = parse_csv(
            cache, CovidTimelineCanadaProvinceOrTerritory, CovidTimelineCanadaProvinceOrTerritory.SOURCE
        )
    except pydantic.error_wrappers.ValidationError as e:
        print_and_log_to_sentry(f"Discarding supplemental data from Canada due to error: {e}")
        return

    province_by_two_letter_abbrev = {
        province.region: province.name_canonical for province in canada_provinces
    }

    def get_partially_vaccinated(
        total_shots: int, total_fully_vaccinated: int, shots_for_full_vaccination: int
    ) -> int:
        return total_shots - shots_for_full_vaccination * total_fully_vaccinated

    counter = 0
    for region in canada_regions:
        if region.hruid == 9999:  # Repatriated/not reported. Skip.
            continue
        counter += 1
        logger.info(f"Fetching region {counter}: {region.name_short} ({region.hruid})")

        # pull or create our master record of this region
        region_place = data.get_canada_region_place(region, province_by_two_letter_abbrev[region.region])
        if region_place.population != 0:
            raise ValueError(f"Duplicate population info for {region_place!r}: {region.pop}")
        region_place.population = region.pop

        def process_regional_vaccination_reports() -> None:
            # This API requires a date or date range, but will not
            # provide data for any dates it doesn't itself have data
            # for.
            #
            # While we of course want the latest data, it's
            # realistically fine if it's delayed - total number of
            # vaccinations is a relatively slow-moving number and
            # won't affect the result significantly.  As a result, we
            # ask the API for an arbitrary number of days of history
            # to give a grace period for delayed reporting and then
            # take whatever the latest datapoint it gives.
            buffer_days = 14
            # this doesn't need to be tied to the case data date, but
            # we'll use this date in case we're doing historical
            # analysis or something like that.
            before_date = effective_date
            after_date = before_date - timedelta(days=buffer_days)

            # get region vaccination counts from covid19tracker.ca.
            # Canada is not using J&J as of 2021-07-14; all vaccines in use are 2-shot.
            vaccination_reports = parse_json(
                cache,
                CanadaRegionalVaccinationReports,
                CanadaRegionalVaccinationReports.SOURCE.format(
                    hr_uid=region.hruid,
                    before=before_date.strftime("%Y-%m-%d"),
                    after=after_date.strftime("%Y-%m-%d"),
                ),
            )

            for report in vaccination_reports.data:
                shots_for_full_vaccination = 2
                if report.total_vaccinated and report.total_vaccinations:
                    people_partially_vaccinated = get_partially_vaccinated(
                        report.total_vaccinations, report.total_vaccinated, shots_for_full_vaccination
                    )
                    region_place.set_total_vaccines(people_partially_vaccinated, report.total_vaccinated)
            if (
                region_place.vaccines_total.partial_vaccinations == 0
                or region_place.vaccines_total.completed_vaccinations == 0
            ):
                region_place.issue(
                    "No vaccination data",
                    f"No vaccination data available from api.covid19tracker.ca in range for {region_place.fullname}",
                )

        def process_regional_case_reports(date_span: DateSpan) -> None:
            # get region case counts from opencovid.ca, which seems to have
            # cleaner data than covid19tracker.ca
            case_reports = parse_json(
                cache,
                CanadaOpenCovidCases,
                CanadaOpenCovidCases.SOURCE.format(
                    hr_uid=region.hruid,
                    before=date_span.last_date.strftime("%Y-%m-%d"),
                    after=date_span.first_date.strftime("%Y-%m-%d"),
                ),
            )
            for report in case_reports.data.cases:
                region_place.cumulative_cases[report.date] = report.value

        process_regional_vaccination_reports()
        for date_span in cumulative_cases_evaluation_ranges:
            process_regional_case_reports(date_span)

    #
    # get vaccination and test rates (number of tests given) per-province from
    # opencovid.ca.
    #

    populate_since = last_two_weeks_evaluation_range.first_date
    one_week_ago = effective_date - timedelta(days=6)
    # one_week_ago is the start of one week ago, but go back one day
    # so we can compare the baseline number before this week as well
    # when calculating tests_in_past_week.
    one_week_cumulative_baseline = one_week_ago - timedelta(days=1)

    # Pull vaccine distribution numbers for use a proxy if administered numbers
    # aren't broken down by manufacturer under the assumption that the
    # relative proportions of distribution by manufacturer is roughly
    # the same as relative proportions of administration by
    # manufacturer
    vaccine_distribution_reports = parse_json(
        cache, CanadaVaccineDistribution, CanadaVaccineDistribution.SOURCE
    )

    for province in canada_provinces:
        min_test_count = None
        max_test_count = None
        province_place = data.get_state(province.name_canonical, country="Canada")
        # has both vaccination and number-of-tests-given information by province
        provincial_reports = parse_json(
            cache,
            CanadaOpenCovidProvincialSummary,
            CanadaOpenCovidProvincialSummary.SOURCE.format(
                province=province.region,
                before=effective_date.strftime("%Y-%m-%d"),
                after=populate_since.strftime("%Y-%m-%d"),
            ),
        )

        #
        # populate tests_in_past_week for the province
        #
        for report in provincial_reports.data:
            # only look at last week when calculating tests_in_past_week
            if one_week_cumulative_baseline <= report.date_ and report.date_ <= effective_date:
                if report.tests_completed:
                    min_test_count = (
                        report.tests_completed
                        if min_test_count is None
                        else min(min_test_count, report.tests_completed)  # type: ignore
                    )
                    max_test_count = (
                        report.tests_completed
                        if max_test_count is None
                        else max(max_test_count, report.tests_completed)  # type: ignore
                    )

        if min_test_count is not None and max_test_count is not None:
            province_place.tests_in_past_week = max_test_count - min_test_count

        #
        # populate vaccine distribution per-type (Pfizer, Moderna, etc) by province.
        #
        provincial_dist = next(
            (d for d in vaccine_distribution_reports.data if d.province == province.region), None
        )
        if provincial_dist is not None:
            administered_shots_by_manufacturer = {
                manufacturer: administered if administered is not None else (distributed or 0)
                for (manufacturer, administered, distributed) in zip(
                    # match JHU naming convention
                    ["Pfizer", "Moderna", "AstraZeneca"],
                    [
                        provincial_dist.pfizer_biontech_administered,
                        provincial_dist.moderna_administered,
                        provincial_dist.astrazeneca_administered,
                    ],
                    [
                        provincial_dist.pfizer_biontech,
                        provincial_dist.moderna,
                        provincial_dist.astrazeneca,
                    ],
                )
            }
            total_administered_shots = sum([shots for shots in administered_shots_by_manufacturer.values()])

            proportional_weights = {
                manufacturer: shots / total_administered_shots
                for (manufacturer, shots) in administered_shots_by_manufacturer.items()
            }
            for manufacturer, proportion in proportional_weights.items():
                most_recent = provincial_reports.data[-1]
                total_fully_vaccinated = most_recent.vaccine_administration_dose_2
                partially_vaccinated = (
                    most_recent.vaccine_administration_dose_1 - most_recent.vaccine_administration_dose_2
                )
                province_place.set_vaccines_of_type(
                    manufacturer,
                    round(proportion * partially_vaccinated),
                    round(proportion * total_fully_vaccinated),
                )


def main() -> None:
    configure_logging()

    if not CAN_API_KEY:
        print("Usage: CAN_API_KEY=${COVID_ACT_NOW_API_KEY} python3 %s" % sys.argv[0])
        sys.exit(1)
    cache = DataCache.load()
    try:
        data = AllData()
        country_by_iso3: Dict[str, Country] = {}

        # List of regions and their population
        parse_jhu_place_facts(cache, data, country_by_iso3)
        data.populate_fips_cache()

        # Cumulative cases per region
        for evaluation_range in cumulative_cases_evaluation_ranges:
            for current in evaluation_range:
                parse_jhu_daily_report(cache, data, current)

        # Global vaccination rates
        parse_jhu_vaccines_global(cache, data)

        # US vaccination rates
        parse_jhu_vaccines_us(cache, data)

        # Test positivity and vaccination status per US county and state
        parse_can_region_summary_by_county(cache, data)
        parse_can_region_summary_by_state(cache, data)

        # Test positivity per non-US country
        parse_owid_testing_data(cache, country_by_iso3)

        # Romanian county (judet) data. Treat as states internally.
        parse_romania_prevalence_data(cache, data)

        # Add Canada Public Health Unit (county-level) data
        parse_canada_prevalence_data(cache, data)

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
    missing_markers = {"locations"}
    for line in lines:
        if "// update_prevalence locations end" in line:
            assert skipping
            skipping = False
        if not skipping:
            output.append(line)
        if "// update_prevalence locations start" in line:
            missing_markers.remove("locations")
            skipping = True
            output.extend(to_insert)

    if missing_markers:
        sys.exit(f"{locations_path} does not contain markers {list(missing_markers)}; " f"can't update")

    with open(locations_path, "w") as fp:
        fp.writelines(output)

    # Also write CSVs containing the data, for the spreadsheet to import.
    csvdir = Path("public/prevalence_data")
    if csvdir.exists():
        shutil.rmtree(csvdir)
    csvdir.mkdir()
    (csvdir / "date.csv").write_text("Date\n{}".format(effective_date.strftime("%Y-%m-%d")))
    with (csvdir / "index.csv").open("w") as topfile:
        topfile.write("Location,Slug\n")
        for slug, location_date in app_locations.items():
            if not location_date.topLevelGroup:
                continue

            topfile.write(f"{location_date.label},{slug}\n")
            with (csvdir / slug).with_suffix(".csv").open("w") as subfile:
                top_row = location_date.as_csv_data()
                subfile.write(",".join(top_row.keys()) + "\n")
                if "states" in location_date.topLevelGroup.lower():
                    top_row["Name"] = "Entire state"
                else:
                    top_row["Name"] = "Entire country"
                subfile.write(",".join(top_row.values()) + "\n")

                for subkey in location_date.subdivisions:
                    subfile.write(",".join(app_locations[subkey].as_csv_data().values()) + "\n")

    log_aggregator.log()


if __name__ == "__main__":
    main()
