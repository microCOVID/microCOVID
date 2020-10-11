import { isNullOrUndefined } from 'util'

import { isNumber } from 'lodash'
import React, { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculateLocationReportedPrevalence,
} from 'data/calculate'
import { Locations, PrevalenceDataDate } from 'data/location'

const isFilled = (val: string): boolean => {
  return !isNullOrUndefined(val) && val !== ''
}

const isTopLocation = (val: string): boolean => {
  return isFilled(val) && !!Locations[val]
}

const PrevalenceField: React.FunctionComponent<{
  label: string
  value: string | number
  unit?: string
  setter: (newValue: string) => void
  inputType: string
  isEditable: boolean
  max?: number
  min?: number
}> = ({
  label,
  value,
  setter,
  unit,
  inputType,
  isEditable,
  max,
  min,
}): React.ReactElement => {
  let body: React.ReactElement = (
    <input
      className="form-control form-control-lg"
      type={inputType}
      value={value}
      readOnly={!isEditable}
      onChange={(e) => {
        if (isNumber(max) || isNumber(min)) {
          let newValue = Number.parseFloat(e.target.value)
          console.log(newValue)
          newValue = isNumber(max) && newValue > max ? max : newValue
          newValue = isNumber(min) && newValue < min ? min : newValue
          console.log(newValue)
          setter(newValue.toString())
        } else {
          setter(e.target.value)
        }
      }}
    />
  )
  if (unit) {
    body = (
      <div className="input-group mb-3">
        {body}
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2">
            %
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="form-group">
      <label htmlFor="duration">{label}</label>
      {body}
    </div>
  )
}

export const PrevalenceControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => {
  const { t } = useTranslation()
  const locationGroups: { [key: string]: Array<string> } = {}
  for (const key in Locations) {
    const location = Locations[key]
    if (location.topLevelGroup !== null) {
      let members = locationGroups[location.topLevelGroup]
      if (members === undefined) {
        members = []
        locationGroups[location.topLevelGroup] = members
      }
      members.push(key)
    }
  }

  const setLocationData = (topLocation: string, subLocation: string) => {
    setter({
      ...data,
      ...dataForLocation(subLocation || topLocation),
      topLocation,
      subLocation,
    })
  }

  // If a stored location exists, load latest data for that location.
  useEffect(() => {
    if (isFilled(data.subLocation) || isTopLocation(data.topLocation)) {
      setLocationData(data.topLocation, data.subLocation)
    }
    // Intentionally not depending on data so that this runs once on mount.
    // eslint-disable-next-line
  }, [])

  let subPrompt = t('calculator.location_subprompt_country_or_regions')
  if (isTopLocation(data.topLocation) && data.topLocation.startsWith('US_')) {
    if (Locations[data.topLocation].label === 'Louisiana') {
      subPrompt = t('calculator.location_subprompt_US-LA')
    } else if (Locations[data.topLocation].label === 'Alaska') {
      subPrompt = t('calculator.location_subprompt_US-AK')
    } else {
      subPrompt = t('calculator.location_subprompt_US')
    }
  }

  const showSubLocation =
    isTopLocation(data.topLocation) &&
    Locations[data.topLocation].subdivisions.length > 1

  const locationSet = isTopLocation(data.topLocation)

  return (
    <React.Fragment>
      <header id="location">
        <Trans>calculator.location_selector_header</Trans>
      </header>
      <div className="form-group">
        <select
          className="form-control form-control-lg"
          value={data.topLocation}
          onChange={(e) => {
            setLocationData(e.target.value, '')
          }}
        >
          <option value="">
            {t('calculator.select_location_placeholder')}
          </option>
          {Object.keys(locationGroups).map((groupName, groupInd) => (
            <optgroup key={groupInd} label={groupName}>
              {locationGroups[groupName].map((locKey, locInd) => (
                <option key={locInd} value={locKey}>
                  {Locations[locKey].label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {!showSubLocation ? null : (
        <div className="form-group">
          <select
            className="form-control form-control-lg"
            value={data.subLocation}
            onChange={(e) => {
              if (e.target.value === '') {
                setLocationData(data.topLocation, '')
              } else {
                setLocationData(data.topLocation, e.target.value)
              }
            }}
          >
            <option value="">{subPrompt}</option>
            {Locations[data.topLocation].subdivisions.map((key, index) => (
              <option key={index} value={key}>
                {Locations[key].label}
              </option>
            ))}
          </select>
        </div>
      )}
      <PrevalenceField
        label={t('calculator.last_week_cases')}
        value={(data.casesPastWeek || 0).toString()}
        setter={(value) =>
          setter({ ...data, casesPastWeek: parseInt(value || '') })
        }
        inputType="number"
        isEditable={!locationSet}
      />
      <PrevalenceField
        label={t('calculator.per_people')}
        value={data.population}
        setter={(value) => setter({ ...data, population: value })}
        inputType="text"
        isEditable={!locationSet}
      />
      {locationSet && data.casesIncreasingPercentage === 0 ? (
        <p>Cases are stable or decreasing.</p>
      ) : (
        <PrevalenceField
          label={t('calculator.percent_increase_in_cases')}
          value={data.casesIncreasingPercentage}
          unit="%"
          setter={(value) => {
            setter({ ...data, casesIncreasingPercentage: Number(value) })
          }}
          inputType="number"
          min={0}
          isEditable={!locationSet}
        />
      )}
      {data.positiveCasePercentage === null ? (
        <PrevalenceField
          label={t('calculator.positive_case_percentage')}
          value="no data available"
          unit="%"
          setter={(_value) => null}
          inputType="text"
          isEditable={false}
        />
      ) : (
        <PrevalenceField
          label={t('calculator.positive_case_percentage')}
          value={data.positiveCasePercentage.toString()}
          unit="%"
          setter={(value) => {
            setter({ ...data, positiveCasePercentage: Number(value) })
          }}
          inputType="number"
          max={100}
          min={0}
          isEditable={!locationSet}
        />
      )}
      <p>
        <Trans>calculator.reported_prevalence</Trans>:{' '}
        {((calculateLocationReportedPrevalence(data) || 0) * 100).toFixed(2)}%
        <br />
        <Trans>calculator.adjusted_prevalence</Trans>:{' '}
        {(((calculateLocationPersonAverage(data) || 0) * 100) / 1e6).toFixed(2)}
        %
      </p>
      {!locationSet ? null : (
        <div>
          <p>
            <Trans i18nKey="calculator.prevalence_info_source_information">
              Prevalence data consolidated from {}
              <a href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data">
                Johns Hopkins CSSE
              </a>{' '}
              (reported cases), {}
              <a href="https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md">
                Covid Act Now
              </a>{' '}
              (US positive test rates), and {}
              <a href="https://ourworldindata.org/coronavirus-testing#testing-for-covid-19-background-the-our-world-in-data-covid-19-testing-dataset">
                Our World in Data
              </a>{' '}
              (international positive test rates).
            </Trans>
          </p>
          <p>
            <Trans>calculator.data_last_updated</Trans> {PrevalenceDataDate}.
          </p>
        </div>
      )}
    </React.Fragment>
  )
}

interface PrevalanceData {
  population: string
  casesPastWeek: number
  casesIncreasingPercentage: number
  positiveCasePercentage: number | null
}

function dataForLocation(location: string): PrevalanceData {
  const locationData = Locations[location]

  if (locationData) {
    return {
      population: locationData.population,
      casesPastWeek: locationData.casesPastWeek,
      casesIncreasingPercentage:
        Math.round(locationData.casesIncreasingPercentage * 10) / 10,
      positiveCasePercentage:
        locationData.positiveCasePercentage === null
          ? null
          : Math.round(locationData.positiveCasePercentage * 10) / 10,
    }
  }

  return {
    population: '',
    casesPastWeek: 0,
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 0,
  }
}
