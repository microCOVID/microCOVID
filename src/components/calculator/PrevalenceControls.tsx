import { isNullOrUndefined } from 'util'

import { isNumber } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'

import CopyToSpreadsheetButton from './CopyToSpreadsheetButton'
import { ControlledExpandable } from 'components/Expandable'
import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculateLocationReportedPrevalence,
} from 'data/calculate'
import { TOP_LOCATION_MANUAL_ENTRY } from 'data/data'
import { Locations, PrevalenceDataDate } from 'data/location'

const isFilled = (val: string): boolean => {
  return !isNullOrUndefined(val) && val !== ''
}

const isTopLocation = (val: string): boolean => {
  return isFilled(val) && !!Locations[val]
}

const isManualEntry = (val: string): boolean => {
  return val === TOP_LOCATION_MANUAL_ENTRY
}

const PrevalenceField: React.FunctionComponent<{
  id: string
  label: string
  value: string | number
  unit?: string
  setter: (newValue: string) => void
  inputType: string
  isEditable: boolean
  max?: number
  min?: number
  helpText?: string
  className?: string
}> = ({
  id,
  label,
  value,
  setter,
  unit,
  inputType,
  isEditable,
  max,
  min,
  helpText,
  className,
}): React.ReactElement => {
  if (!isEditable) {
    return (
      <div>
        {label}: {value}
        {unit}
      </div>
    )
  }
  let body: React.ReactElement = (
    <Form.Control
      className={'form-control form-control-lg col-md-3 col-lg-6 ' + className}
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
      <InputGroup className="mb-3">
        {body}
        <InputGroup.Append>
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    )
  }
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      {body}
      {helpText && (
        <Form.Text id={id + 'HelpText'} muted>
          {helpText}
        </Form.Text>
      )}
    </Form.Group>
  )
}

export const PrevalenceControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => {
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
    if (isManualEntry(topLocation)) {
      setDetailsOpen(true)
    }
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

  let subPrompt = 'Entire country, or select region...'
  if (isTopLocation(data.topLocation) && data.topLocation.startsWith('US_')) {
    if (Locations[data.topLocation].label === 'Louisiana') {
      subPrompt = 'Entire state, or select parish...'
    } else if (Locations[data.topLocation].label === 'Alaska') {
      subPrompt = 'Entire state, or select borough...'
    } else {
      subPrompt = 'Entire state, or select county...'
    }
  }

  const showSubLocation =
    isTopLocation(data.topLocation) &&
    Locations[data.topLocation].subdivisions.length > 1

  const locationSet = isTopLocation(data.topLocation)

  const [detailsOpen, setDetailsOpen] = useState(
    false || isManualEntry(data.topLocation),
  )

  const isManualEntryCurrently = isManualEntry(data.topLocation)

  const prevalenceResult = (
    <Card className="prevelance-result">
      <Card.Body>
        <div>
          Reported prevalence:{' '}
          {((calculateLocationReportedPrevalence(data) || 0) * 100).toFixed(2)}%
        </div>
        <div>
          <strong>
            Adjusted prevalence:{' '}
            {(
              ((calculateLocationPersonAverage(data) || 0) * 100) /
              1e6
            ).toFixed(2)}
            %
          </strong>
        </div>
      </Card.Body>
    </Card>
  )

  return (
    <React.Fragment>
      <header id="location">Step 1: Enter your location</header>
      <div className="form-group">
        <select
          className="form-control form-control-lg"
          value={data.topLocation}
          onChange={(e) => {
            setLocationData(e.target.value, '')
          }}
        >
          <option value="">Select location...</option>
          <option value={TOP_LOCATION_MANUAL_ENTRY}>
            Enter data manually...
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

      <ControlledExpandable
        id="prevelance-details"
        header="Details"
        headerClassName={isManualEntryCurrently ? 'd-none' : ''}
        open={detailsOpen}
        setter={setDetailsOpen}
      >
        {!isManualEntryCurrently && prevalenceResult}

        <PrevalenceField
          id="reported-cases"
          label="Reported cases in past week"
          value={(data.casesPastWeek || 0).toString()}
          setter={(value) =>
            setter({ ...data, casesPastWeek: parseInt(value || '') })
          }
          inputType="number"
          isEditable={!locationSet}
          className="hide-number-buttons"
        />
        <PrevalenceField
          id="population"
          label="Total population"
          value={data.population}
          setter={(value) => setter({ ...data, population: value })}
          inputType="text"
          isEditable={!locationSet}
          className="hide-number-buttons"
        />
        {locationSet && data.casesIncreasingPercentage === 0 ? (
          <div>Cases are stable or decreasing.</div>
        ) : (
          <PrevalenceField
            id="precent-increase"
            label="Percent increase in cases from last week to this week"
            value={data.casesIncreasingPercentage}
            unit="%"
            setter={(value) => {
              setter({ ...data, casesIncreasingPercentage: Number(value) })
            }}
            inputType="number"
            min={0}
            isEditable={!locationSet}
            className="hide-number-buttons"
          />
        )}
        {data.positiveCasePercentage === null ? (
          <PrevalenceField
            id="positive-test-rate"
            label="Percent of tests that come back positive"
            value="no data available"
            unit="%"
            setter={(_value) => null}
            inputType="text"
            isEditable={false}
          />
        ) : (
          <PrevalenceField
            id="positive-test-rate"
            label="Percent of tests that come back positive"
            value={data.positiveCasePercentage.toString()}
            unit="%"
            setter={(value) => {
              setter({ ...data, positiveCasePercentage: Number(value) })
            }}
            inputType="number"
            max={100}
            min={0}
            isEditable={!locationSet}
            className="hide-number-buttons"
          />
        )}

        {isManualEntryCurrently && prevalenceResult}

        {!locationSet ? null : (
          <>
            <div>
              <em>Data last updated: {PrevalenceDataDate}</em>
            </div>
            <CopyToSpreadsheetButton data={data} />
            <div>
              <p className="mt-3">
                Prevalence data consolidated from {}
                <a
                  href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data"
                  target="_blank"
                  rel="noreferrer"
                >
                  Johns Hopkins CSSE
                </a>{' '}
                (reported cases), {}
                <a
                  href="https://apidocs.covidactnow.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Covid Act Now
                </a>{' '}
                (US positive test rates), and {}
                <a
                  href="https://ourworldindata.org/coronavirus-testing#testing-for-covid-19-background-the-our-world-in-data-covid-19-testing-dataset"
                  target="_blank"
                  rel="noreferrer"
                >
                  Our World in Data
                </a>{' '}
                (international positive test rates).
              </p>
            </div>
          </>
        )}
      </ControlledExpandable>
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
