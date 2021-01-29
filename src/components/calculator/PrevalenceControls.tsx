import i18n from 'i18n'
import countries from 'i18n-iso-countries'
import { isNumber } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Trans, useTranslation } from 'react-i18next'

import ControlLabel from './controls/ControlLabel'
import { ControlledExpandable } from 'components/Expandable'
import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculateLocationReportedPrevalence,
} from 'data/calculate'
import { TOP_LOCATION_MANUAL_ENTRY } from 'data/data'
import { Locations, PrevalenceDataDate } from 'data/location'
import 'components/calculator/styles/PrevalenceControls.scss'

interface Option {
  label: string
  value: string
}

const isFilled = (val: string): boolean => {
  return val !== null && val !== undefined && val !== ''
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
          newValue = isNumber(max) && newValue > max ? max : newValue
          newValue = isNumber(min) && newValue < min ? min : newValue
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
    <Card className="prevalence-result">
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
  for (const iso_code of Object.keys(i18n.services.resourceStore.data)) {
    countries.registerLocale(
      require('i18n-iso-countries/langs/' + iso_code + '.json'), // eslint-disable-line @typescript-eslint/no-var-requires
    )
  }
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

  const handleEnterDataButtonOnClick = () => {
    setLocationData(TOP_LOCATION_MANUAL_ENTRY, '')
  }

  const handleSelectLocationButtonOnClick = () => {
    setLocationData('', '')
    setDetailsOpen(false)
  }

  // If a stored location exists, load latest data for that location.
  useEffect(() => {
    if (isFilled(data.subLocation) || isTopLocation(data.topLocation)) {
      setLocationData(data.topLocation, data.subLocation)
    }
    // Intentionally not depending on data so that this runs once on mount.
    // eslint-disable-next-line
  }, [])

  let subPromptType = 'country_or_regions'
  if (isTopLocation(data.topLocation) && data.topLocation.startsWith('US_')) {
    if (Locations[data.topLocation].label === 'Louisiana') {
      subPromptType = 'US-LA'
    } else if (Locations[data.topLocation].label === 'Alaska') {
      subPromptType = 'US-AK'
    } else {
      subPromptType = 'US'
    }
  }

  const showSubLocation =
    isTopLocation(data.topLocation) &&
    Locations[data.topLocation].subdivisions.length > 1

  const locationSet = isTopLocation(data.topLocation)

  const isManualEntryCurrently = isManualEntry(data.topLocation)

  const [detailsOpen, setDetailsOpen] = useState(
    false || isManualEntryCurrently,
  )

  const topLocationOptions = Object.keys(locationGroups).flatMap(
    (groupName) => {
      return locationGroups[groupName].map((locKey) => {
        const country_label =
          Locations[locKey].iso3 &&
          countries.getName(Locations[locKey].iso3!, i18n.language, {
            select: 'official',
          })
            ? countries.getName(Locations[locKey].iso3!, i18n.language, {
                select: 'official',
              })
            : Locations[locKey].label
        return { label: country_label, value: locKey }
      })
    },
  )

  // reorder the list according to the current locale, but keep
  // English as-is to make sure US states remain at the top
  if (i18n.language !== 'en-US') {
    topLocationOptions.sort((a, b) => a.label.localeCompare(b.label))
  }

  const selectedTopLocation = topLocationOptions.find(
    (option) => option.value === data.topLocation,
  )

  const subLocationOptions = !showSubLocation
    ? []
    : Locations[data.topLocation].subdivisions.map((locKey) => {
        // We assume that sublocation names are either localized or don't have
        // proper localized names. This is not always true, but the overhead of
        // providing locallizations for them would not be worth it.
        return { label: Locations[locKey].label, value: locKey }
      })
  const selectedSubLocation = subLocationOptions.find(
    (option) => option.value === data.subLocation,
  )

  return (
    <React.Fragment>
      <header id="location">
        <Trans>calculator.location_selector_header</Trans>
      </header>
      <div className="form-group" hidden={isManualEntryCurrently}>
        <ControlLabel
          id="top-location-typeahead"
          header={t('calculator.select_location_label')}
        />
        <Typeahead
          clearButton={true}
          highlightOnlyResult={true}
          id="top-location-typeahead"
          inputProps={{ autoComplete: 'off' }}
          onChange={(e: Option[]) => {
            if (e.length !== 1) {
              setLocationData('', '')
              return
            }
            setLocationData(e[0].value, '')
          }}
          options={topLocationOptions}
          placeholder={t('calculator.select_location_placeholder')}
          selected={
            selectedTopLocation === undefined ? [] : [selectedTopLocation]
          }
        />
      </div>
      {!showSubLocation ? null : (
        <div className="form-group">
          <ControlLabel
            id="sub-location-typeahead"
            header={t(`calculator.location_sublabel.${subPromptType}`)}
          />
          <Typeahead
            clearButton={true}
            highlightOnlyResult={true}
            id="sub-location-typeahead"
            inputProps={{ autoComplete: 'chrome-off' }}
            onChange={(e: Option[]) => {
              if (e.length !== 1) {
                setLocationData(data.topLocation, '')
                return
              }
              setLocationData(data.topLocation, e[0].value)
            }}
            options={subLocationOptions}
            placeholder={t(`calculator.location_subprompt.${subPromptType}`)}
            selected={
              selectedSubLocation === undefined ? [] : [selectedSubLocation]
            }
          />
        </div>
      )}
      {isManualEntryCurrently ? (
        <span>
          <button
            id="switchBetweenManualDataAndLocationSelection"
            className="btn btn-link text-muted"
            onClick={handleSelectLocationButtonOnClick}
          >
            {t('calculator.switch_button.select_location')}
          </button>
        </span>
      ) : (
        <span>
          <button
            id="switchBetweenManualDataAndLocationSelection"
            className="btn btn-link text-muted"
            onClick={handleEnterDataButtonOnClick}
          >
            {t('calculator.switch_button.enter_data_manually')}
          </button>
        </span>
      )}
      <ControlledExpandable
        id="prevalence-details"
        header={t('calculator.prevalence.details_header')}
        headerClassName={isManualEntryCurrently ? 'd-none' : ''}
        open={detailsOpen}
        setter={setDetailsOpen}
      >
        <PrevalenceResult data={data} />

        <PrevalenceField
          id="reported-cases"
          label={t('calculator.prevalence.last_week_cases')}
          value={data.casesPastWeek || 0}
          setter={(value) =>
            setter({ ...data, casesPastWeek: parseInt(value || '') })
          }
          inputType="number"
          isEditable={isManualEntryCurrently}
          className="hide-number-buttons"
        />
        <PrevalenceField
          id="population"
          label={t('calculator.prevalence.population')}
          value={data.population}
          setter={(value) => setter({ ...data, population: value })}
          inputType="text"
          isEditable={isManualEntryCurrently}
          className="hide-number-buttons"
        />
        {locationSet && data.casesIncreasingPercentage === 0 ? (
          <div>{t('calculator.prevalence.cases_stable_or_decreasing')}</div>
        ) : (
          <PrevalenceField
            id="percent-increase"
            label={t('calculator.prevalence.percent_increase_in_cases')}
            value={data.casesIncreasingPercentage}
            unit="%"
            setter={(value) => {
              setter({ ...data, casesIncreasingPercentage: Number(value) })
            }}
            inputType="number"
            min={0}
            isEditable={isManualEntryCurrently}
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
            isEditable={isManualEntryCurrently}
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
