from unittest.mock import Mock, patch
import requests
import typing
from datetime import timedelta, date, datetime


from update_prevalence import parse_jhu_vaccines_us, AllData, DataCache
import update_prevalence


@patch("update_prevalence.datetime")
@patch("update_prevalence.requests.get", spec=requests.get)
def test_parse_jhu_vaccines_us(mock_get: typing.Any, mock_datetime: typing.Any) -> None:
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.text = """Date,UID,Province_State,Country_Region,Doses_admin,People_at_least_one_dose,People_fully_vaccinated,Total_additional_doses
2022-12-02,84000056,Wyoming,US,835616,350112,305397,142731"""
    mock_get.return_value = mock_response
    mock_datetime.datetime.utcnow.return_value = 123
    effective_date = date(2020, 12, 15)
    update_prevalence.effective_date = effective_date
    cache = DataCache(effective_date=effective_date, data={})
    data = AllData()
    # creates entry so next call doesn't fail
    data.get_country("US")
    # ditto
    wyoming = data.get_state("Wyoming", country="US")
    parse_jhu_vaccines_us(cache, data)

    assert wyoming.vaccines_total.completed_vaccinations == 305397
