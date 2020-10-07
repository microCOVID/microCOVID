import num2fraction from 'num2fraction'
import React from 'react'
import { Badge, OverlayTrigger } from 'react-bootstrap'

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
    console.log(`test: ${num2fraction(0.3)}`)
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
  popover?: JSX.Element
  hideRisk?: boolean
}> = (props) => (
  <div className="form-group">
    {props.label && (
      <div className="label-wrapper">
        <label htmlFor={props.id}>{props.label}</label>
        {props.popover && (
          <OverlayTrigger
            trigger="click"
            overlay={props.popover}
            rootClose={true}
          >
            <Badge variant="secondary">?</Badge>
          </OverlayTrigger>
        )}
      </div>
    )}
    <select
      id={props.id}
      className="form-control form-control-lg"
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
      <optgroup></optgroup>
    </select>
  </div>
)

export const SelectControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: FormValue }
  label?: string
  popover?: JSX.Element
  hideRisk?: boolean
}> = (props) => (
  <GenericSelectControl
    id={props.id}
    setter={(value) => props.setter({ ...props.data, [props.id]: value })}
    source={props.source}
    value={props.data[props.id] || ''}
    label={props.label}
    popover={props.popover}
    hideRisk={props.hideRisk}
  />
)

export default SelectControl
