import { isNullOrUndefined } from 'util'

import { isNumber } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import CopyToSpreadsheetButton from './CopyToSpreadsheetButton'
import { ControlledExpandable } from 'components/Expandable'
import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculateLocationReportedPrevalence,
} from 'data/calculate'
import { TOP_LOCATION_MANUAL_ENTRY } from 'data/data'
import { Locations, PrevalenceDataDate } from 'data/location'
import 'components/calculator/styles/PrevalenceControls.scss'

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
        {label}: {typeof value === 'number' ? value.toLocaleString() : value}
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

export const PrevalenceResult = (props: {
  data: CalculatorData
}): React.ReactElement => {
  return (
    <Card className="prevelance-result">
      <Card.Body>
        <div>
          <Trans>calculator.prevalence.reported_prevalence</Trans>:{' '}
          {(
            (calculateLocationReportedPrevalence(props.data) || 0) * 100
          ).toFixed(2)}
          %
        </div>
        <div>
          <strong>
            <Trans>calculator.prevalence.adjusted_prevalence</Trans>:{' '}
            {(
              ((calculateLocationPersonAverage(props.data) || 0) * 100) /
              1e6
            ).toFixed(2)}
            %
          </strong>
        </div>
      </Card.Body>
    </Card>
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

  const [detailsOpen, setDetailsOpen] = useState(
    false || isManualEntry(data.topLocation),
  )

  const isManualEntryCurrently = isManualEntry(data.topLocation)

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
          aria-label={t('calculator.select_location_placeholder')}
        >
          <option value="">
            {t('calculator.select_location_placeholder')}
          </option>
          <option value={TOP_LOCATION_MANUAL_ENTRY}>
            {t('calculator.select_location_enter_manually')}
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
            aria-label={subPrompt}
            data-testid="sublocation"
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
        header={t('calculator.prevalence.details_header')}
        headerClassName={isManualEntryCurrently ? 'd-none' : ''}
        open={detailsOpen}
        setter={setDetailsOpen}
      >
        {!isManualEntryCurrently && <PrevalenceResult data={data} />}

        <PrevalenceField
          id="reported-cases"
          label={t('calculator.prevalence.last_week_cases')}
          value={data.casesPastWeek || 0}
          setter={(value) =>
            setter({ ...data, casesPastWeek: parseInt(value || '') })
          }
          inputType="number"
          isEditable={!locationSet}
          className="hide-number-buttons"
        />
        <PrevalenceField
          id="population"
          label={t('calculator.prevalence.population')}
          value={data.population}
          setter={(value) => setter({ ...data, population: value })}
          inputType="text"
          isEditable={!locationSet}
          className="hide-number-buttons"
        />
        {locationSet && data.casesIncreasingPercentage === 0 ? (
          <div>{t('calculator.prevalence.cases_stable_or_decreasing')}</div>
        ) : (
          <PrevalenceField
            id="precent-increase"
            label={t('calculator.prevalence.percent_increase_in_cases')}
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
            label={t('calculator.prevalence.positive_case_percentage')}
            value="no data available"
            unit="%"
            setter={(_value) => null}
            inputType="text"
            isEditable={false}
          />
        ) : (
          <PrevalenceField
            id="positive-test-rate"
            label={t('calculator.prevalence.positive_case_percentage')}
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
        {!locationSet ? null : (
          <>
            <div>
              <em>
                <Trans>calculator.prevalence.data_last_updated</Trans>:{' '}
                {PrevalenceDataDate}
              </em>
            </div>
            <CopyToSpreadsheetButton data={data} />
            <div>
              <p className="mt-3">
                <Trans i18nKey="calculator.prevalence_info_source_information">
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
                </Trans>
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
  prevalanceDataDate: Date
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
      prevalanceDataDate: new Date(PrevalenceDataDate),
    }
  }

  return {
    population: '',
    casesPastWeek: 0,
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 0,
    prevalanceDataDate: new Date(),
  }
}
