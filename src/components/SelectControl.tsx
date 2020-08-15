import React from 'react'

import { FormValue } from 'data/data'

export const SelectControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  value: string
  data: { [key: string]: FormValue }
  label?: string
}> = (props) => (
  <div className="form-group">
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    <select
      id={props.id}
      className="form-control form-control-lg"
      onChange={(e) => props.setter(e.target.value)}
      value={props.value}
    >
      {Object.keys(props.data).map((value, index) => (
        <option key={index} value={value}>
          {props.data[value].label}
        </option>
      ))}
      <optgroup label=""></optgroup>
    </select>
  </div>
)
