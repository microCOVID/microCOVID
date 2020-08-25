import React from 'react'
import { Badge, OverlayTrigger } from 'react-bootstrap'

import { CalculatorData } from 'data/calculate'
import { FormValue } from 'data/data'

export const SelectControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: FormValue }
  label?: string
  popover?: JSX.Element
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
      onChange={(e) =>
        props.setter({ ...props.data, [props.id]: e.target.value })
      }
      value={props.data[props.id] || ''}
    >
      <option value="">Select one...</option>
      {Object.keys(props.source).map((value, index) => (
        <option key={index} value={value}>
          {props.source[value].label}
        </option>
      ))}
    </select>
  </div>
)
