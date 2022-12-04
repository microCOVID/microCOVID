from unittest.mock import Mock, patch
import json
import logging
import pytest
import requests
import typing
from datetime import timedelta, date, datetime


from update_prevalence import (
    parse_jhu_vaccines_us,
    parse_can_region_summary_by_county,
    AllData,
    DataCache,
    County,
    LogAggregator,
    log_aggregator,
    PopulationFilteredLogging,
    AppLocation,
    parse_romania_prevalence_data,
)
from logging import Logger
import update_prevalence


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


@pytest.fixture
def my_county(effective_date: date) -> County:
    my_county = County(
        fullname="My County, My State",
        name="My County",
        country="My Country",
        state="My State",
        population=123,
    )
    my_county.cumulative_cases[effective_date] = 123
    return my_county


@pytest.fixture
def data() -> AllData:
    data = AllData()
    # creates entry
    data.get_country("US")
    return data


@pytest.fixture
def effective_date() -> date:
    return date(2020, 12, 15)


@pytest.fixture
def cache(effective_date: date) -> DataCache:
    return DataCache(effective_date=effective_date, data={})


@pytest.fixture(autouse=True)
def set_effective_date(effective_date: date) -> None:
    update_prevalence.effective_date = effective_date


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


def test_County_as_app_data(effective_date: date) -> None:
    my_county = County(
        fullname="My County, My State",
        name="My County",
        country="My Country",
        state="My State",
        population=123,
    )
    my_county.test_positivity_rate = 0.5
    my_county.cumulative_cases[effective_date] = 123
    app_location = my_county.as_app_data()
    assert app_location.positiveCasePercentage == 50


@patch("update_prevalence.logger", spec=Logger)
def test_County_as_app_data_validates_positivity_rate(
    mock_logger: Mock, effective_date: date, my_county: County
) -> None:
    my_county.test_positivity_rate = 1.5
    app_location = my_county.as_app_data()
    assert app_location.positiveCasePercentage is None
    mock_logger.info.assert_called_with(
        "Invalid test positivity rate (123 people): test rate for My County is 1.5"
    )


@patch("update_prevalence.logger", spec=Logger)
def test_AppLocation_also_validates_positivity_rate(
    mock_logger: Mock, effective_date: date, my_county: County
) -> None:
    increase = 0.3
    app_location = AppLocation(
        label=my_county.name,
        population=f"{my_county.population:,}",
        casesPastWeek=my_county.cases_last_week,
        casesIncreasingPercentage=increase * 100,
        averageFullyVaccinatedMultiplier=my_county.average_fully_vaccinated_multiplier(),
        updatedAt=effective_date.strftime("%B %d, %Y"),
    )
    app_location.positiveCasePercentage = -23
    ratio = app_location.prevalenceRatio()
    assert ratio is not None
    mock_logger.info.assert_called_with("Positivity rate is negative (123 people): -23")


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
        "No case data (10 people): discarding County(fullname='mumble, Wyoming, US', name='mumble', population=10, test_positivity_rate=None, cumulative_cases=Counter(), tests_in_past_week=None, vaccines_by_type=None, vaccines_total=Vaccination(partial_vaccinations=0, completed_vaccinations=0), country='US', state='Wyoming', fips=None) with no case data"
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
        "No case data (50 people): Discarding State(fullname='Montana, US', name='Montana', population=50, test_positivity_rate=None, cumulative_cases=Counter(), tests_in_past_week=None, vaccines_by_type=None, vaccines_total=Vaccination(partial_vaccinations=0, completed_vaccinations=0), country='US', fips=None, counties={}) with no case data"
    )


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
        "Discarding stale county-level data (0 people): from Romania due to staleness - last update was 2020-04-02"
    )
