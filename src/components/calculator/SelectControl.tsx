import React from 'react'
import { Badge, OverlayTrigger } from 'react-bootstrap'

import { CalculatorData } from 'data/calculate'
import { FormValue } from 'data/data'
const fracty = require('fracty');

function showRiskMultiplier(multiplier: number): string {
  // console.log(multiplier)
  // console.log(multiplier < 0)
  // debugger
  if (multiplier === 1) {
    return '(default risk)'
  } else if (multiplier > 0 && multiplier < 1) {
    return `(${fracty(multiplier)}th the risk)`
  } else {
    return `(${multiplier}x the risk)`
  }
}

export const GenericSelectControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: FormValue }
  value: string | number
  label?: string
  popover?: JSX.Element
  hiderisk?: boolean
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
          {!props.hiderisk &&
            showRiskMultiplier(props.source[value].multiplier)}
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
  hiderisk?: boolean
}> = (props) => (
  <GenericSelectControl
    id={props.id}
    setter={(value) => props.setter({ ...props.data, [props.id]: value })}
    source={props.source}
    value={props.data[props.id] || ''}
    label={props.label}
    popover={props.popover}
    hiderisk={props.hiderisk}
  />
)

export default SelectControl
