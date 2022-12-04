from unittest.mock import Mock, patch
import json
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
)
from logging import Logger
import update_prevalence


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
