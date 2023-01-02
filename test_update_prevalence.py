from unittest.mock import Mock, patch, call
import pydantic
import json
import logging
import pytest
import requests
from typing import Dict, List, Tuple, Optional
import typing
from datetime import timedelta, date, datetime, tzinfo
from sentry_sdk.integrations.logging import LoggingIntegration


from update_prevalence import (
    calc_last_two_weeks_evaluation_range,
    calc_evaluation_ranges,
    parse_jhu_vaccines_us,
    parse_can_region_summary_by_county,
    AllData,
    DataCache,
    DateSpan,
    County,
    LogAggregator,
    log_aggregator,
    Place,
    PopulationFilteredLogging,
    AppLocation,
    parse_romania_prevalence_data,
    parse_canada_prevalence_data,
    parse_json,
    main,
    Vaccination,
)
from logging import Logger
import update_prevalence


@pytest.fixture
def effective_date() -> date:
    return date(2020, 12, 15)


@pytest.fixture(autouse=True)
def set_effective_date(effective_date: date) -> None:
    update_prevalence.effective_date = effective_date
    update_prevalence.last_two_weeks_evaluation_range = calc_last_two_weeks_evaluation_range()
    update_prevalence.evaluation_ranges = calc_evaluation_ranges()


class MyPlace(PopulationFilteredLogging):
    pop: int

    def __init__(self, pop: int):
        self.pop = pop

    @property
    def population_as_int(self) -> int:
        return self.pop


@pytest.fixture
def small_place() -> PopulationFilteredLogging:
    return MyPlace(5000)


@pytest.fixture
def medium_place() -> PopulationFilteredLogging:
    return MyPlace(10000)


@pytest.fixture
def large_place() -> PopulationFilteredLogging:
    return MyPlace(100000)


def add_cumulative_cases(place: Place, effective_date: date, cases_over_time: List[int]) -> None:
    for i in range(0, len(cases_over_time)):
        days_since_effective_date = len(cases_over_time) - i - 1
        place.cumulative_cases[effective_date - timedelta(days=days_since_effective_date)] = cases_over_time[
            i
        ]


def add_increasing_cumulative_cases(place: Place, effective_date: date) -> None:
    cases_over_time = [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    add_cumulative_cases(place, effective_date, cases_over_time)


def add_stable_cumulative_cases(place: Place, effective_date: date) -> None:
    cases_over_time = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    add_cumulative_cases(place, effective_date, cases_over_time)


@pytest.fixture
def my_county(effective_date: date) -> County:
    my_county = County(
        fullname="My County, My State",
        name="My County",
        country="My Country",
        state="My State",
        population=123,
    )
    add_stable_cumulative_cases(my_county, effective_date)
    return my_county


@pytest.fixture
def my_app_location(effective_date: date, my_county: County) -> AppLocation:
    increase = 0.3
    app_location = AppLocation(
        label=my_county.name,
        population=f"{my_county.population:,}",
        casesPastWeek=my_county.cases_last_week,
        casesIncreasingPercentage=increase * 100,
        averageFullyVaccinatedMultiplier=my_county.average_fully_vaccinated_multiplier(),
        updatedAt=effective_date.strftime("%B %d, %Y"),
    )
    return app_location


@pytest.fixture
def data() -> AllData:
    data = AllData()
    # creates entry
    data.get_country("US")
    return data


@pytest.fixture
def cache(effective_date: date) -> DataCache:
    return DataCache(effective_date=effective_date, data={})


@pytest.fixture
def mock_canada_regions_response() -> Mock:
    mock_canada_regions_response = Mock()
    mock_canada_regions_response.status_code = 200
    mock_canada_regions_response.text = """"region","pruid","hruid","name_canonical","name_canonical_fr","name_short","name_ccodwg","name_other_1","name_other_2","name_other_3","pop","pop_2019_07","pop_2020_07","pop_2021_07"
"AB",48,4831,"South Zone","South Zone","South","South","South zone",,,308346,305937,307967,308346"""
    return mock_canada_regions_response


@pytest.fixture
def mock_canada_regions_response_with_duplicate_region() -> Mock:
    mock_canada_regions_response_with_duplicate_region = Mock()
    mock_canada_regions_response_with_duplicate_region.status_code = 200
    mock_canada_regions_response_with_duplicate_region.text = """"region","pruid","hruid","name_canonical","name_canonical_fr","name_short","name_ccodwg","name_other_1","name_other_2","name_other_3","pop","pop_2019_07","pop_2020_07","pop_2021_07"
"AB",48,4831,"South Zone","South Zone","South","South","South zone",,,308346,305937,307967,308346
"AB",48,4831,"South Zone","South Zone","South","South","South zone",,,308346,305937,307967,308346"""
    return mock_canada_regions_response_with_duplicate_region


@pytest.fixture
def mock_canada_provinces_response() -> Mock:
    mock_canada_provinces_response = Mock()
    mock_canada_provinces_response.status_code = 200
    mock_canada_provinces_response.text = """"region","pruid","name_canonical","name_canonical_fr","name_ccodwg","pop","pop_2020_01","pop_2020_04","pop_2020_07","pop_2020_10","pop_2021_01","pop_2021_04","pop_2021_07","pop_2021_10","pop_2022_01","pop_2022_04","pop_2022_07"
"AB",48,"Alberta","Alberta","Alberta",4543111,4401362,4414332,4416682,4421857,4429077,4436944,4443773,4466124,4482385,4502858,4543111
"""
    return mock_canada_provinces_response


@pytest.fixture
def mock_canada_regional_vaccination_reports_response() -> Mock:
    mock_canada_regional_vaccination_reports_response = Mock()
    mock_canada_regional_vaccination_reports_response.status_code = 200
    mock_canada_regional_vaccination_reports_response.text = json.dumps(
        {
            "hr_uid": 4831,
            "last_updated": "2022-12-30 23:55:06",
            "data": [
                {
                    "date": "2022-12-21",
                    "change_cases": 152,
                    "change_fatalities": 14,
                    "change_tests": None,
                    "change_hospitalizations": -3,
                    "change_criticals": 1,
                    "change_recoveries": None,
                    "change_vaccinations": 532,
                    "change_vaccinated": 95,
                    "change_boosters_1": 352,
                    "change_boosters_2": None,
                    "total_cases": 40637,
                    "total_fatalities": 493,
                    "total_tests": None,
                    "total_hospitalizations": 70,
                    "total_criticals": 3,
                    "total_recoveries": 33617,
                    "total_vaccinations": 494473,
                    "total_vaccinated": 194952,
                    "total_boosters_1": 94748,
                    "total_boosters_2": None,
                }
            ],
        }
    )

    return mock_canada_regional_vaccination_reports_response


@pytest.fixture
def mock_canada_empty_regional_vaccination_reports_response() -> Mock:
    mock_canada_regional_vaccination_reports_response = Mock()
    mock_canada_regional_vaccination_reports_response.status_code = 200
    mock_canada_regional_vaccination_reports_response.text = json.dumps(
        {
            "hr_uid": 4831,
            "last_updated": "2022-12-30 23:55:06",
            "data": [],
        }
    )

    return mock_canada_regional_vaccination_reports_response


@pytest.fixture
def mock_canada_regional_case_reports_response() -> Mock:
    mock_canada_regional_case_reports_response = Mock()
    mock_canada_regional_case_reports_response.status_code = 200
    mock_canada_regional_case_reports_response.text = json.dumps(
        {
            "data": {
                "cases": [
                    {
                        "name": "cases",
                        "region": "AB",
                        "sub_region_1": "4831",
                        "date": "2022-12-16",
                        "value": 40610,
                        "value_daily": 8,
                    },
                    {
                        "name": "cases",
                        "region": "AB",
                        "sub_region_1": "4831",
                        "date": "2022-12-17",
                        "value": 40623,
                        "value_daily": 13,
                    },
                ],
            },
        }
    )

    return mock_canada_regional_case_reports_response


@pytest.fixture
def mock_canada_vaccine_distribution_response() -> Mock:
    mock_canada_vaccine_distribution_response = Mock()
    mock_canada_vaccine_distribution_response.status_code = 200
    mock_canada_vaccine_distribution_response.text = json.dumps(
        {
            "data": [
                {
                    "province": "AB",
                    "date": "2022-02-03",
                    "pfizer_biontech": 7056075,
                    "pfizer_biontech_administered": None,
                    "moderna": 2687654,
                    "moderna_administered": None,
                    "astrazeneca": 318700,
                    "astrazeneca_administered": None,
                    "johnson": 10000,
                    "johnson_administered": None,
                    "pfizer_biontech_paediatric": 394000,
                    "pfizer_biontech_paediatric_administered": None,
                },
            ]
        }
    )

    return mock_canada_vaccine_distribution_response


@pytest.fixture
def mock_canada_provincial_reports_response() -> Mock:
    mock_canada_provincial_reports_response = Mock()
    mock_canada_provincial_reports_response.status_code = 200
    mock_canada_provincial_reports_response.text = json.dumps(
        {
            "data": [
                {
                    "region": "AB",
                    "date": "2020-12-05",
                    "cases": 68113,
                    "cases_daily": 1828,
                    "deaths": 615,
                    "deaths_daily": 19,
                    "hospitalizations": 563,
                    "hospitalizations_daily": 30,
                    "icu": 101,
                    "icu_daily": 2,
                    "tests_completed": 2371900,
                    "tests_completed_daily": 23544,
                    "vaccine_coverage_dose_1": 0,
                    "vaccine_coverage_dose_1_daily": 0,
                    "vaccine_coverage_dose_2": 0,
                    "vaccine_coverage_dose_2_daily": 0,
                    "vaccine_coverage_dose_3": 0,
                    "vaccine_coverage_dose_3_daily": 0,
                    "vaccine_coverage_dose_4": 0,
                    "vaccine_coverage_dose_4_daily": 0,
                    "vaccine_administration_total_doses": 0,
                    "vaccine_administration_total_doses_daily": 0,
                    "vaccine_administration_dose_1": 0,
                    "vaccine_administration_dose_1_daily": 0,
                    "vaccine_administration_dose_2": 0,
                    "vaccine_administration_dose_2_daily": 0,
                    "vaccine_administration_dose_3": 0,
                    "vaccine_administration_dose_3_daily": 0,
                    "vaccine_administration_dose_4": 0,
                    "vaccine_administration_dose_4_daily": 0,
                },
                {
                    "region": "AB",
                    "date": "2020-12-08",
                    "cases": 73126,
                    "cases_daily": 1494,
                    "deaths": 653,
                    "deaths_daily": 13,
                    "hospitalizations": 654,
                    "hospitalizations_daily": 45,
                    "icu": 112,
                    "icu_daily": 4,
                    "tests_completed": 2428461,
                    "tests_completed_daily": 16894,
                    "vaccine_coverage_dose_1": 0,
                    "vaccine_coverage_dose_1_daily": 0,
                    "vaccine_coverage_dose_2": 0,
                    "vaccine_coverage_dose_2_daily": 0,
                    "vaccine_coverage_dose_3": 0,
                    "vaccine_coverage_dose_3_daily": 0,
                    "vaccine_coverage_dose_4": 0,
                    "vaccine_coverage_dose_4_daily": 0,
                    "vaccine_administration_total_doses": 0,
                    "vaccine_administration_total_doses_daily": 0,
                    "vaccine_administration_dose_1": 0,
                    "vaccine_administration_dose_1_daily": 0,
                    "vaccine_administration_dose_2": 0,
                    "vaccine_administration_dose_2_daily": 0,
                    "vaccine_administration_dose_3": 0,
                    "vaccine_administration_dose_3_daily": 0,
                    "vaccine_administration_dose_4": 0,
                    "vaccine_administration_dose_4_daily": 0,
                },
                {
                    "region": "AB",
                    "date": "2020-12-14",
                    "cases": 622102,
                    "cases_daily": 114,
                    "deaths": 5308,
                    "deaths_daily": 0,
                    "hospitalizations": 1042,
                    "hospitalizations_daily": 0,
                    "icu": 38,
                    "icu_daily": 0,
                    "tests_completed": 7363742,
                    "tests_completed_daily": 933,
                    "vaccine_coverage_dose_1": 79.5,
                    "vaccine_coverage_dose_1_daily": 0,
                    "vaccine_coverage_dose_2": 75.6,
                    "vaccine_coverage_dose_2_daily": 0,
                    "vaccine_coverage_dose_3": 39.5,
                    "vaccine_coverage_dose_3_daily": 0,
                    "vaccine_coverage_dose_4": 16.4,
                    "vaccine_coverage_dose_4_daily": 0,
                    "vaccine_administration_total_doses": 9586987,
                    "vaccine_administration_total_doses_daily": 0,
                    "vaccine_administration_dose_1": 3609940,
                    "vaccine_administration_dose_1_daily": 0,
                    "vaccine_administration_dose_2": 3435139,
                    "vaccine_administration_dose_2_daily": 0,
                    "vaccine_administration_dose_3": 1795849,
                    "vaccine_administration_dose_3_daily": 0,
                    "vaccine_administration_dose_4": 746059,
                    "vaccine_administration_dose_4_daily": 0,
                },
            ],
        }
    )

    return mock_canada_provincial_reports_response


@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_jhu_vaccines_us(
    mock_get: Mock,
    data: AllData,
    cache: DataCache,
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = """Date,UID,Province_State,Country_Region,Doses_admin,People_at_least_one_dose,People_fully_vaccinated,Total_additional_doses
2022-12-02,84000056,Wyoming,US,835616,350112,305397,142731"""
    mock_get.return_value = mock_response
    # ditto
    wyoming = data.get_state("Wyoming", country="US")
    parse_jhu_vaccines_us(cache, data)

    assert wyoming.vaccines_total.completed_vaccinations == 305397


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_jhu_vaccines_us_known_unknown_state(
    mock_get: Mock,
    mock_logger: Mock,
    data: AllData,
    cache: DataCache,
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = """Date,UID,Province_State,Country_Region,Doses_admin,People_at_least_one_dose,People_fully_vaccinated,Total_additional_doses
2022-12-02,84000056,Wyoming,US,835616,350112,305397,142731
2022-12-02,84070022,Long Term Care (LTC) Program,US,7897367,4317892,3930082,2335790"""
    mock_get.return_value = mock_response
    # ditto
    data.get_state("Wyoming", country="US")
    parse_jhu_vaccines_us(cache, data)

    mock_logger.warning.assert_not_called()


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_jhu_vaccines_us_unknown_unknown_state(
    mock_get: Mock,
    mock_logger: Mock,
    data: AllData,
    cache: DataCache,
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = """Date,UID,Province_State,Country_Region,Doses_admin,People_at_least_one_dose,People_fully_vaccinated,Total_additional_doses
2022-12-02,84000056,Wyoming,US,835616,350112,305397,142731
2022-12-02,8675309,Some Unknown Entry,US,7897367,4317892,3930082,2335790"""
    mock_get.return_value = mock_response
    # ditto
    data.get_state("Wyoming", country="US")
    parse_jhu_vaccines_us(cache, data)

    mock_logger.warning.assert_called()


@patch("update_prevalence.requests.get", spec=requests.get)
@patch("update_prevalence.sleep", autospec=True)
@patch("update_prevalence.logger", spec=Logger)
def test_parse_json_retry(
    mock_logger: Mock,
    mock_sleep: Mock,
    mock_get: Mock,
    cache: DataCache,
) -> None:
    mock_response_failure = Mock()
    mock_response_failure.status_code = 429
    url = "http://fake"

    e = requests.exceptions.HTTPError(response=mock_response_failure)
    mock_response_failure.raise_for_status.side_effect = e

    mock_response_success = Mock()
    mock_response_success.status_code = 200
    mock_response_success.text = """{"field1": 123}"""

    mock_get.side_effect = [mock_response_failure, mock_response_success]

    class FakeModel(pydantic.BaseModel):
        field1: str

    parse_json(cache, FakeModel, url)

    mock_logger.info.assert_has_calls(
        [
            call("Fetching http://fake..."),
            call("Fetching http://fake (try 2/4)..."),
        ]
    )


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_can_region_summary_by_county(
    mock_get: Mock,
    mock_logger: Mock,
    data: AllData,
    cache: DataCache,
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = json.dumps(
        [
            {
                "fips": "02013",
                "country": "US",
                "state": "AK",
                "population": 3337,
                "metrics": {
                    "testPositivityRatio": None,
                },
                "actuals": {
                    "vaccinationsInitiated": 2899,
                    "vaccinationsCompleted": 2498,
                },
            },
        ]
    )

    _state = data.get_state("Alaska", country="US")
    county = data.get_county("Aleutians East", state="Alaska", country="US")
    county.fips = "02013"
    data.populate_fips_cache()

    mock_get.return_value = mock_response
    parse_can_region_summary_by_county(cache, data)

    mock_logger.warning.assert_not_called()

    assert county.test_positivity_rate is None
    assert county.vaccines_total.partial_vaccinations == 401
    assert county.vaccines_total.completed_vaccinations == 2498


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_can_region_summary_by_county_unknown_unknown_county(
    mock_get: Mock,
    mock_logger: Mock,
    data: AllData,
    cache: DataCache,
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = json.dumps(
        [
            {
                "fips": "8675309",
                "country": "US",
                "state": "MP",
                "county": "aslkdjfa",
                "population": 48000,
            },
        ]
    )

    mock_get.return_value = mock_response
    parse_can_region_summary_by_county(cache, data)

    mock_logger.warning.assert_called()


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_can_region_summary_by_county_known_unknown_county(
    mock_get: Mock,
    mock_logger: Mock,
    data: AllData,
    cache: DataCache,
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = json.dumps(
        [
            {
                "fips": "69100",
                "country": "US",
                "state": "MP",
                "county": "Rota Municipality",
                "population": 48000,
            },
        ]
    )

    mock_get.return_value = mock_response
    parse_can_region_summary_by_county(cache, data)

    mock_logger.warning.assert_not_called()


@patch("update_prevalence.logger", spec=Logger)
def test_Log_Aggregator_logs_small_impacts_as_debug(
    mock_logger: Mock, small_place: PopulationFilteredLogging
) -> None:
    aggregator = LogAggregator()
    aggregator.add_issue("issue type one", small_place)
    aggregator.log()
    mock_logger.log.assert_called_with(logging.DEBUG, "5,000 people affected by issue type one")


@patch("update_prevalence.logger", spec=Logger)
def test_Log_Aggregator_logs_small_impacts_as_info(
    mock_logger: Mock, medium_place: PopulationFilteredLogging
) -> None:
    aggregator = LogAggregator()
    aggregator.add_issue("issue type two", medium_place)
    aggregator.log()
    mock_logger.log.assert_called_with(logging.INFO, "10,000 people affected by issue type two")


@patch("update_prevalence.logger", spec=Logger)
def test_Log_Aggregator_logs_large_impacts_as_warning(
    mock_logger: Mock, large_place: PopulationFilteredLogging
) -> None:
    aggregator = LogAggregator()
    aggregator.add_issue("issue type three", large_place)
    aggregator.log()
    mock_logger.log.assert_called_with(logging.WARNING, "100,000 people affected by issue type three")


@patch("update_prevalence.logger", spec=Logger)
def test_Log_Aggregator_combines_small_impacts_as_info(
    mock_logger: Mock, small_place: PopulationFilteredLogging
) -> None:
    aggregator = LogAggregator()
    aggregator.add_issue("issue type four", small_place)
    aggregator.add_issue("issue type four", small_place)
    aggregator.log()
    mock_logger.log.assert_called_with(logging.INFO, "10,000 people affected by issue type four")


@patch("update_prevalence.logger", spec=Logger)
def test_PopulationFilteredLogging_issue_delegates_to_log_aggregator(
    mock_logger: Mock, small_place: PopulationFilteredLogging
) -> None:
    small_place.issue("issue type five", "detail")
    log_aggregator.log()
    mock_logger.log.assert_called_with(logging.DEBUG, "5,000 people affected by issue type five")


def test_County_as_app_data_positiveCasePercentage(effective_date: date, my_county: County) -> None:
    my_county.test_positivity_rate = 0.5
    app_location = my_county.as_app_data()
    assert app_location.positiveCasePercentage == 50


def test_County_as_app_data_updatedAt(effective_date: date, my_county: County) -> None:
    add_increasing_cumulative_cases(my_county, effective_date)
    app_location = my_county.as_app_data()
    assert app_location.updatedAt == (effective_date - timedelta(days=8)).strftime("%B %d, %Y")


@patch("update_prevalence.logger", spec=Logger)
def test_County_as_app_data_validates_positivity_rate(
    mock_logger: Mock, effective_date: date, my_county: County
) -> None:
    my_county.test_positivity_rate = 1.5
    app_location = my_county.as_app_data()
    assert app_location.positiveCasePercentage is None
    mock_logger.info.assert_has_calls(
        [call("Invalid test positivity rate (123 people): test rate for My County is 1.5")]
    )


@patch("update_prevalence.logger", spec=Logger)
def test_County_as_app_data_logs_before_returning_very_low_cases_last_week(
    mock_logger: Mock, my_county: County, effective_date: date
) -> None:
    for i in range(0, 5):
        d = effective_date - timedelta(days=i)
        my_county.cumulative_cases[d] = 101
    for i in range(5, 16):
        d = effective_date - timedelta(days=i)
        my_county.cumulative_cases[d] = 100
    my_county.population = 2_000_000
    cases_last_week = my_county.cases_last_week
    assert cases_last_week == 1
    cases_week_before = my_county.cases_week_before
    assert cases_week_before == 0
    data = my_county.as_app_data()
    assert data is not None
    mock_logger.info.assert_called_with(
        "Less than 1 case per million - County level (2,000,000 people): Only 1 cases last week when population is 2000000 in My County"
    )


@patch("update_prevalence.logger", spec=Logger)
def test_County_as_app_data_logs_before_returning_zero_cases_last_week(
    mock_logger: Mock, my_county: County, effective_date: date
) -> None:
    for i in range(0, 10):
        d = effective_date - timedelta(days=i)
        my_county.cumulative_cases[d] = 123
    for i in range(10, 16):
        d = effective_date - timedelta(days=i)
        my_county.cumulative_cases[d] = 100
    cases_last_week = my_county.cases_last_week
    assert cases_last_week == 0
    cases_week_before = my_county.cases_week_before
    assert cases_week_before > 0
    data = my_county.as_app_data()
    assert data is not None
    mock_logger.info.assert_called_with(
        "No cases noted for a week - County level (123 people): No cases reported in at least one week in My County, My State for period"
    )
    assert data.updatedAt == (effective_date - timedelta(days=9)).strftime("%B %d, %Y")


@patch("update_prevalence.logger", spec=Logger)
def test_County_as_app_data_logs_before_returning_zero_cases_week_before(
    mock_logger: Mock, my_county: County, effective_date: date
) -> None:
    for i in range(0, 5):
        d = effective_date - timedelta(days=i)
        my_county.cumulative_cases[d] = 123
    for i in range(5, 16):
        d = effective_date - timedelta(days=i)
        my_county.cumulative_cases[d] = 100
    assert my_county.cases_last_week > 0
    assert my_county.cases_week_before == 0
    data = my_county.as_app_data()
    assert data is not None
    mock_logger.info.assert_called_with(
        "No cases noted for a week - County level (123 people): No cases reported in at least one week in My County, My State for period"
    )
    assert data.updatedAt == (effective_date - timedelta(days=4)).strftime("%B %d, %Y")


@patch("update_prevalence.logger", spec=Logger)
def test_Place_recent_daily_cumulative_cases(
    mock_logger: Mock, my_county: County, effective_date: date
) -> None:
    assert [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] == my_county.recent_daily_cumulative_cases


@patch("update_prevalence.logger", spec=Logger)
def test_Place_recent_daily_cumulative_cases_date_missing(
    mock_logger: Mock, my_county: County, effective_date: date
) -> None:
    del my_county.cumulative_cases[effective_date - timedelta(days=3)]
    with pytest.raises(ValueError) as e:
        my_county.recent_daily_cumulative_cases
    assert "Missing data for" in str(e.value)


@patch("update_prevalence.logger", spec=Logger)
def test_AppLocation_prevalenceRatio_also_validates_positivity_rate(
    mock_logger: Mock, my_app_location: AppLocation
) -> None:
    my_app_location.positiveCasePercentage = -23
    ratio = my_app_location.prevalenceRatio()
    assert ratio is not None
    mock_logger.info.assert_called_with("Positivity rate is negative (123 people): -23")


class NewDatetime(datetime):
    @classmethod
    def now(cls, tz: Optional[tzinfo] = None) -> typing.Any:
        return datetime(2022, 1, 1, 12, 0, 0)


@patch("update_prevalence.datetime", new=NewDatetime)
@patch("update_prevalence.logger", spec=Logger)
def test_AppLocation_prevalenceRatio_caps_positivity_rate(
    mock_logger: Mock,
    my_app_location: AppLocation,
    effective_date: date,
) -> None:
    my_app_location.positiveCasePercentage = 150
    assert my_app_location.prevalenceRatio() == 3.430615164520744


def test_AllData_get_country_or_raise_raises() -> None:
    all_data = AllData()
    with pytest.raises(Exception):
        all_data.get_country_or_raise("unknown country")


def test_AllData_get_country_or_raise_returns_data() -> None:
    all_data = AllData()
    all_data.get_country("new country")
    assert all_data.get_country_or_raise("new country") is not None


@patch("update_prevalence.logger", spec=Logger)
def test_AllData_rollup_totals_no_county_data(mock_logger: Mock, effective_date: date) -> None:
    all_data = AllData()
    us = all_data.get_country("US")
    wyoming = all_data.get_state("Wyoming", country="US")
    wyoming.population = 50
    wyoming.cumulative_cases[effective_date] = 123
    county = all_data.get_county("mumble", state="Wyoming", country="US")
    county.population = 10
    all_data.rollup_totals()
    mock_logger.warning.assert_not_called()
    mock_logger.info.assert_called_with(
        "No county-level case data (10 people): discarding County(fullname='mumble, Wyoming, US', name='mumble', population=10, test_positivity_rate=None, cumulative_cases=Counter(), tests_in_past_week=None, vaccines_by_type=None, vaccines_total=Vaccination(partial_vaccinations=0, completed_vaccinations=0), country='US', state='Wyoming', fips=None) with no case data"
    )


@patch("update_prevalence.logger", spec=Logger)
def test_AllData_rollup_totals_no_state_data(mock_logger: Mock, effective_date: date) -> None:
    all_data = AllData()
    us = all_data.get_country("US")
    wyoming = all_data.get_state("Wyoming", country="US")
    wyoming.population = 50
    wyoming.cumulative_cases[effective_date] = 123
    montana = all_data.get_state("Montana", country="US")
    montana.population = 50
    all_data.rollup_totals()
    mock_logger.warning.assert_not_called()
    mock_logger.info.assert_called_with(
        "No state-level case data (50 people): Discarding State(fullname='Montana, US', name='Montana', population=50, test_positivity_rate=None, cumulative_cases=Counter(), tests_in_past_week=None, vaccines_by_type=None, vaccines_total=Vaccination(partial_vaccinations=0, completed_vaccinations=0), country='US', fips=None, counties={}) with no case data"
    )


@patch("update_prevalence.logger", spec=Logger)
def test_AllData_rollup_totals_no_country_data(mock_logger: Mock, effective_date: date) -> None:
    all_data = AllData()
    us = all_data.get_country("US")
    us.population = 999
    all_data.rollup_totals()
    mock_logger.warning.assert_called_with(
        "Discarding country US due to error: ValueError(\"No country-level case data for Country(fullname='US', name='US', population=999, test_positivity_rate=None, cumulative_cases=Counter(), tests_in_past_week=None, vaccines_by_type=None, vaccines_total=Vaccination(partial_vaccinations=0, completed_vaccinations=0), iso3=None, states={})\")"
    )


@patch("update_prevalence.logger", spec=Logger)
def test_AllData_rollup_totals_state_no_population(mock_logger: Mock, effective_date: date) -> None:
    all_data = AllData()
    us = all_data.get_country("US")
    wyoming = all_data.get_state("Wyoming", country="US")
    wyoming.population = 0
    wyoming.cumulative_cases[effective_date] = 123
    all_data.rollup_totals()
    mock_logger.warning.assert_called_with(
        "Discarding country US due to error: ValueError(\"Missing population data for State(fullname='Wyoming, US', name='Wyoming', population=0, test_positivity_rate=None, cumulative_cases=Counter({datetime.date(2020, 12, 15): 123}), tests_in_past_week=None, vaccines_by_type=None, vaccines_total=Vaccination(partial_vaccinations=0, completed_vaccinations=0), country='US', fips=None, counties={})\")"
    )
    mock_logger.info.assert_not_called()


@patch("update_prevalence.logger", spec=Logger)
def test_AllData_rollup_totals_fake_region_with_no_cases_last_week_removed(
    mock_logger: Mock, effective_date: date
) -> None:
    all_data = AllData()
    us = all_data.get_country("US")
    us.population = 123
    unk = all_data.get_state("Unknown", country="US")
    unk.population = 0
    add_stable_cumulative_cases(unk, effective_date)
    all_data.rollup_totals()
    assert len(us.states) == 0


@patch("update_prevalence.logger", spec=Logger)
def test_AllData_rollup_totals(mock_logger: Mock, effective_date: date) -> None:
    all_data = AllData()
    us = all_data.get_country("US")
    wyoming = all_data.get_state("Wyoming", country="US")
    wyoming.population = 50
    wyoming.cumulative_cases[effective_date] = 123
    all_data.rollup_totals()
    mock_logger.warning.assert_not_called()
    mock_logger.info.assert_not_called()


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_romania_prevalence_data_stale(
    mock_get: Mock, mock_logger: Mock, cache: Mock, data: AllData
) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = json.dumps(
        [
            {"Data": "2020-04-02", "Judet": "Alba", "Populatie": 323778, "Cazuri total": 9, "Cazuri noi": 0},
        ]
    )
    mock_get.return_value = mock_response
    data.get_country("Romania")

    parse_romania_prevalence_data(cache, data)
    mock_logger.info.assert_called_with(
        "No county-level case data (0 people): from Romania due to staleness - last update was 2020-04-02"
    )


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_canada_prevalence_data(
    mock_get: Mock,
    mock_logger: Mock,
    cache: Mock,
    data: AllData,
    effective_date: date,
    mock_canada_regions_response: Mock,
    mock_canada_provinces_response: Mock,
    mock_canada_regional_vaccination_reports_response: Mock,
    mock_canada_regional_case_reports_response: Mock,
    mock_canada_vaccine_distribution_response: Mock,
    mock_canada_provincial_reports_response: Mock,
) -> None:
    mock_get.side_effect = [
        mock_canada_regions_response,
        mock_canada_provinces_response,
        mock_canada_regional_vaccination_reports_response,
        mock_canada_regional_case_reports_response,
        mock_canada_vaccine_distribution_response,
        mock_canada_provincial_reports_response,
    ]
    data.get_country("Canada")

    parse_canada_prevalence_data(cache, data)
    assert len(data.countries["Canada"].states) == 1
    mock_get.assert_has_calls(
        [
            call("https://raw.githubusercontent.com/ccodwg/CovidTimelineCanada/main/geo/hr.csv"),
            call("https://raw.githubusercontent.com/ccodwg/CovidTimelineCanada/main/geo/pt.csv"),
            call(
                "https://api.covid19tracker.ca/reports/regions/4831?fill_dates=true&after=2020-12-01&before=2020-12-15"
            ),
            call(
                "https://api.opencovid.ca/timeseries?stat=cases&loc=4831&geo=hr&ymd=true&fill=true&before=2020-12-15&after=2020-12-01"
            ),
            call("https://api.covid19tracker.ca/vaccines/distribution/split"),
            call("https://api.opencovid.ca/summary?loc=AB&ymd=true&before=2020-12-15&after=2020-12-01"),
        ]
    )
    place = data.get_state_or_raise("Alberta", country="Canada")
    assert place.vaccines_by_type == {
        "AstraZeneca": Vaccination(partial_vaccinations=5536, completed_vaccinations=108799),
        "Moderna": Vaccination(partial_vaccinations=46689, completed_vaccinations=917519),
        "Pfizer": Vaccination(partial_vaccinations=122576, completed_vaccinations=2408822),
    }
    assert place.tests_in_past_week == 4935281


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_canada_prevalence_data_no_vaccination_data(
    mock_get: Mock,
    mock_logger: Mock,
    cache: Mock,
    data: AllData,
    effective_date: date,
    mock_canada_regions_response: Mock,
    mock_canada_provinces_response: Mock,
    mock_canada_empty_regional_vaccination_reports_response: Mock,
    mock_canada_regional_case_reports_response: Mock,
    mock_canada_vaccine_distribution_response: Mock,
    mock_canada_provincial_reports_response: Mock,
) -> None:
    mock_get.side_effect = [
        mock_canada_regions_response,
        mock_canada_provinces_response,
        mock_canada_empty_regional_vaccination_reports_response,
        mock_canada_regional_case_reports_response,
        mock_canada_vaccine_distribution_response,
        mock_canada_provincial_reports_response,
    ]
    data.get_country("Canada")

    parse_canada_prevalence_data(cache, data)
    assert len(data.countries["Canada"].states) == 1
    mock_get.assert_has_calls(
        [
            call("https://raw.githubusercontent.com/ccodwg/CovidTimelineCanada/main/geo/hr.csv"),
            call("https://raw.githubusercontent.com/ccodwg/CovidTimelineCanada/main/geo/pt.csv"),
            call(
                "https://api.covid19tracker.ca/reports/regions/4831?fill_dates=true&after=2020-12-01&before=2020-12-15"
            ),
            call(
                "https://api.opencovid.ca/timeseries?stat=cases&loc=4831&geo=hr&ymd=true&fill=true&before=2020-12-15&after=2020-12-01"
            ),
            call("https://api.covid19tracker.ca/vaccines/distribution/split"),
            call("https://api.opencovid.ca/summary?loc=AB&ymd=true&before=2020-12-15&after=2020-12-01"),
        ]
    )
    mock_logger.info.assert_any_call(
        "No vaccination data (308,346 people): No vaccination data available from api.covid19tracker.ca in range for South, Alberta, Canada"
    )


@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_canada_prevalence_data_doubled_region_in_data(
    mock_get: Mock,
    mock_logger: Mock,
    cache: Mock,
    data: AllData,
    effective_date: date,
    mock_canada_regions_response_with_duplicate_region: Mock,
    mock_canada_provinces_response: Mock,
    mock_canada_regional_vaccination_reports_response: Mock,
    mock_canada_regional_case_reports_response: Mock,
    mock_canada_vaccine_distribution_response: Mock,
    mock_canada_provincial_reports_response: Mock,
) -> None:
    mock_get.side_effect = [
        mock_canada_regions_response_with_duplicate_region,
        mock_canada_provinces_response,
        mock_canada_regional_vaccination_reports_response,
        mock_canada_regional_case_reports_response,
        mock_canada_vaccine_distribution_response,
        mock_canada_provincial_reports_response,
    ]
    data.get_country("Canada")

    with pytest.raises(ValueError) as e:
        parse_canada_prevalence_data(cache, data)
    assert "Duplicate population info" in str(e.value)


@patch("update_prevalence.DataCache", spec=DataCache)
@patch("update_prevalence.LoggingIntegration", spec=LoggingIntegration)
@patch("update_prevalence.logger", spec=Logger)
@patch("update_prevalence.requests.get", spec=requests.get)
def test_main_empty_data(
    mock_get: Mock,
    mock_logger: Mock,
    mock_LoggingIntegration: Mock,
    mock_DataCache: Mock,
    cache: Mock,
    data: AllData,
) -> None:
    mock_DataCache.load.return_value = cache

    mock_jhu_place_facts_response = Mock()
    mock_jhu_place_facts_response.status_code = 200
    mock_jhu_place_facts_response.text = (
        """UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,Population"""
    )

    mock_jhu_daily_report = Mock()
    mock_jhu_daily_report.status_code = 200
    mock_jhu_daily_report.text = """FIPS,Admin2,Province_State,Country_Region,Last_Update,Lat,Long_,Confirmed,Deaths,Recovered,Active,Combined_Key,Incident_Rate,Case_Fatality_Ratio"""

    # https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/time_series_covid19_vaccine_global.csv
    mock_jhu_vaccine_global = Mock()
    mock_jhu_vaccine_global.status_code = 200
    mock_jhu_vaccine_global.text = (
        """Date,UID,Province_State,Country_Region,Doses_admin,People_at_least_one_dose"""
    )

    mock_get.side_effect = [
        mock_jhu_place_facts_response,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,
        mock_jhu_daily_report,  # 12-02-2020
        mock_jhu_daily_report,  # 12-01-2020
        mock_jhu_daily_report,  # 11-30-2020
        mock_jhu_daily_report,  # 11-29-2020
        mock_jhu_vaccine_global,
    ]
    with pytest.raises(ValueError) as e:
        main()

    assert "Not able to gain data" in str(e.value)


def test_DateSpan_history_from_one_day(effective_date: date) -> None:
    date_span = DateSpan.history_from(effective_date, 1)
    assert [effective_date] == list(date_span)


def test_DateSpan_history_from_zero_days(effective_date: date) -> None:
    date_span = DateSpan.history_from(effective_date, 0)
    assert [] == list(date_span)


def test_DateSpan_history_from_two_days(effective_date: date) -> None:
    date_span = DateSpan.history_from(effective_date, 2)
    assert [effective_date - timedelta(days=1), effective_date] == list(date_span)


def test_DateSpan_constructor(effective_date: date) -> None:
    date_span = DateSpan(first_date=effective_date - timedelta(days=1), last_date=effective_date)
    assert [effective_date - timedelta(days=1), effective_date] == list(date_span)
