import { isNumber } from 'lodash'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsDash } from 'react-icons/bs'

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
  className?: string
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
}): React.ReactElement => {
  let body: React.ReactElement = (
    <Form.Control
      className={'form-control form-control-lg col-md-3 col-lg-6 ' + className}
      type={inputType}
      value={value}
      readOnly={false}
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

export const ManualPrevalenceDetails: React.FunctionComponent<{
  id: string
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <div id={props.id}>
      <span className="details-header">
        <BsDash /> {t('calculator.prevalence.details_header')}
      </span>
      <PrevalenceResult data={props.data} />
      <PrevalenceField
        id="reported-cases"
        label={t('calculator.prevalence.last_week_cases')}
        value={props.data.casesPastWeek || 0}
        setter={(value) =>
          props.setter({ ...props.data, casesPastWeek: parseInt(value || '') })
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
      />
      <PrevalenceField
        id="percent-increase"
        label={t('calculator.prevalence.percent_increase_in_cases')}
        value={props.data.casesIncreasingPercentage}
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
      />
      <PrevalenceField
        id="positive-test-rate"
        label={t('calculator.prevalence.positive_case_percentage')}
        value={
          props.data.positiveCasePercentage
            ? props.data.positiveCasePercentage.toString()
            : ''
        }
        unit="%"
        setter={(value) => {
          props.setter({ ...props.data, positiveCasePercentage: Number(value) })
        }}
        inputType="number"
        max={100}
        min={0}
        className="hide-number-buttons"
      />
    </div>
  )
}
export default ManualPrevalenceDetails
