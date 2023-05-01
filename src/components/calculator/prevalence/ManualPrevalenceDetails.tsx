import { isNumber } from 'lodash'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React from 'react'
import { Card, Form, InputGroup, Row, Tooltip } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import ControlLabel from '../controls/ControlLabel'

import { PrevalenceResult } from './PrevalenceResult'
import { CalculatorData } from 'data/calculate'

const PrevalenceField: React.FunctionComponent<{
  id: string
  label: string
  value: string | number
  unit?: string
  setter: (newValue: string) => void
  inputType: string
  max?: number
  min?: number
  helpText?: string
  warningText?: string
  showWarningText?: boolean
  className?: string
  rowClassName?: string
  readOnly?: boolean
}> = ({
  id,
  label,
  value,
  setter,
  unit,
  inputType,
  max,
  min,
  helpText,
  className,
  readOnly,
  warningText,
  showWarningText,
  rowClassName,
}): React.ReactElement => {
  let body: React.ReactElement = (
    <Form.Control
      className={'form-control form-control-lg col-md-3 col-lg-6 ' + className}
      data-testid={id}
      type={inputType}
      value={value}
      readOnly={readOnly}
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
          <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    )
  }
  return (
    <Row className={rowClassName}>
      <Form.Group controlId={id} className="mb-3">
        <ControlLabel
          id={`${id}-control-label`}
          label={label}
          popover={
            helpText ? (
              <Tooltip id={`${id}-tooltip`}>{helpText}</Tooltip>
            ) : undefined
          }
        />
        {body}
        {showWarningText && warningText ? (
          <div className="mt-3 text-danger">{warningText}</div>
        ) : null}
      </Form.Group>
    </Row>
  )
}

export const ManualPrevalenceDetails: React.FunctionComponent<{
  id: string
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <Card id={props.id}>
      <Card.Body>
        <div>
          <Trans i18nKey="calculator.prevalence.instructions">
            <a
              href="https://covidactnow.org"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </Trans>
        </div>
        <PrevalenceResult data={props.data} />

        <Slider
          className="my-5"
          trackStyle={{
            height: '8px',
          }}
          handleStyle={{
            height: '30px',
            width: '30px',
            top: '-3px',
          }}
          dotStyle={{
            height: '25px',
            width: '25px',
            top: '-10px',
          }}
          activeDotStyle={{
            height: '25px',
            width: '25px',
            top: '-10px',
          }}
          value={props.data.casesPastWeek / 100 || 0}
          onChange={(value) => {
            props.setter({ ...props.data, casesPastWeek: (value as number) as never * 100 })
          }}
          marks={{
            0: {
              style: {
                fontSize: '1.2em',
                fontWeight: 'bold',
              },
              label: '0%',
            },
            20: {
              style: {
                color: 'green',
                fontSize: '1.2em',
                fontWeight: 'bold',
              },
              label: 'Low',
            },
            40: {
              style: {
                color: 'cornflowerblue',
                fontSize: '1.2em',
                fontWeight: 'bold',
              },
              label: 'Medium',
            },
            60: {
              style: {
                color: 'orange',
                fontSize: '1.2em',
                fontWeight: 'bold',
              },
              label: 'High',
            },
            80: {
              style: {
                color: 'red',
                fontSize: '1.2em',
                fontWeight: 'bold',
              },
              label: 'Extreme',
            },
            100: {
              style: {
                fontSize: '1.2em',
                fontWeight: 'bold',
              },
              label: '10%',
            }
          }}
        />
        <PrevalenceField
          id="reported-cases"
          label={t('calculator.prevalence.last_week_cases')}
          value={props.data.casesPastWeek || 0}
          setter={(value) =>
            props.setter({
              ...props.data,
              casesPastWeek: parseFloat(value || ''),
            })
          }
          inputType="number"
          className="hide-number-buttons"
        />
        <PrevalenceField
          id="population"
          label={t('calculator.prevalence.population')}
          value={props.data.population}
          setter={(value) => props.setter({ ...props.data, population: value })}
          inputType="text"
          className="hide-number-buttons"
          warningText="Warning: if you are entering cases per 100,000, this field should be set to 100,000"
          showWarningText={
            parseInt(props.data.population.replace(/,/g, '')) !== 100000
          }
        />
        <PrevalenceField
          id="percent-increase"
          label={t('calculator.prevalence.percent_increase_in_cases')}
          // value={props.data.casesIncreasingPercentage}
          value={0} // this field is no longer adjustable
          unit="%"
          setter={(value) => {
            props.setter({
              ...props.data,
              casesIncreasingPercentage: Number(value),
            })
          }}
          inputType="number"
          min={0}
          className="hide-number-buttons"
          rowClassName="d-none"
        />
        <PrevalenceField
          id="positive-test-rate"
          label={t('calculator.prevalence.positive_case_percentage')}
          // value={
          //   props.data.positiveCasePercentage
          //     ? props.data.positiveCasePercentage.toString()
          //     : ''
          // }
          value={'10'} // this field is no longer adjustable
          unit="%"
          setter={(value) => {
            props.setter({
              ...props.data,
              positiveCasePercentage: Number(value),
            })
          }}
          inputType="number"
          max={100}
          min={0}
          className="hide-number-buttons"
          rowClassName="d-none"
        />
        <PrevalenceField
          id="vaccinated-rate"
          label={t('calculator.prevalence.completed_vaccinations')}
          // value={
          //   props.data.percentFullyVaccinated
          //     ? props.data.percentFullyVaccinated.toString()
          //     : ''
          // }
          value={'0'} // this field is no longer adjustable
          unit="%"
          setter={(value) => {
            props.setter({
              ...props.data,
              percentFullyVaccinated: Number(value),
            })
          }}
          inputType="number"
          max={100}
          min={0}
          className="hide-number-buttons"
          rowClassName="d-none"
          readOnly={props.data.unvaccinatedPrevalenceRatio !== null}
          helpText={
            props.data.unvaccinatedPrevalenceRatio !== null
              ? undefined
              : t('calculator.prevalence.completed_vaccinations_tooltip')
          }
        />
      </Card.Body>
    </Card>
  )
}
export default ManualPrevalenceDetails
