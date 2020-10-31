import num2fraction from 'num2fraction'
import React from 'react'
import { Form } from 'react-bootstrap'

import ControlLabel from './ControlLabel'
import IosOptgroup from 'components/IosOptgroup'
import { CalculatorData } from 'data/calculate'
import { FormValue } from 'data/data'

function getSuffix(frac: string): string {
  const denom = frac.split('/')[1]
  if (denom === '2') return ''
  else if (denom === '3') return 'rd'
  else return 'th'
}

function showRiskMultiplier(multiplier: number): string {
  if (multiplier === 1) {
    return 'baseline risk'
  } else if (multiplier > 0 && multiplier < 1) {
    // Fraction format: "1/5th the risk"
    const frac = num2fraction(multiplier)
    return `${frac}${getSuffix(frac)} the risk`
  } else {
    return `${multiplier}x the risk`
  }
}

export const GenericSelectControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: FormValue }
  value: string | number
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  hideRisk?: boolean
  className?: string
}> = (props) => (
  <div className="form-group">
    <ControlLabel
      id={props.id}
      label={props.label}
      header={props.header}
      popover={props.popover}
    />
    <select
      id={props.id}
      className={'form-control form-control-lg ' + props.className}
      onChange={(e) => props.setter(e.target.value)}
      value={props.value}
    >
      <option value="">Select one...</option>
      {Object.keys(props.source).map((value, index) => (
        <option key={index} value={value}>
          {props.source[value].label}{' '}
          {props.hideRisk !== true &&
            `[${showRiskMultiplier(props.source[value].multiplier)}]`}
        </option>
      ))}
      <IosOptgroup />
    </select>
    {props.helpText && (
      <Form.Text id={props.id + 'HelpText'} muted>
        {props.helpText}
      </Form.Text>
    )}
  </div>
)

export const SelectControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: FormValue }
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  hideRisk?: boolean
  className?: string
}> = (props) => (
  <GenericSelectControl
    id={props.id}
    setter={(value) => props.setter({ ...props.data, [props.id]: value })}
    source={props.source}
    value={props.data[props.id] || ''}
    label={props.label}
    helpText={props.helpText}
    header={props.header}
    popover={props.popover}
    hideRisk={props.hideRisk}
    className={props.className}
  />
)

export default SelectControl
