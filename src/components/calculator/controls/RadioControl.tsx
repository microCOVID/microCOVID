import React from 'react'
import { Form } from 'react-bootstrap'

import ControlLabel from './ControlLabel'
import { recordCalculatorOptionSelected } from 'components/Analytics'
import { CheckBoxFormValue } from 'data/data'

export const RadioControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: Array<CheckBoxFormValue>
  value: string
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  className?: string
}> = (props) => (
  <Form.Group controlId={props.id}>
    <ControlLabel
      id={props.id}
      label={props.label}
      header={props.header}
      popover={props.popover}
    />
    {props.source.map((current, index) => (
      <Form.Check key={index} id={props.id + index}>
        <Form.Check.Input
          type="radio"
          name={props.id}
          value={current.value}
          onChange={() => {
            recordCalculatorOptionSelected(props.id, current.value)
            props.setter(current.value)
          }}
          defaultChecked={current.value === props.value.toString()}
        />
        <Form.Check.Label>
          {current.sublabel ? (
            <>
              <strong>{current.label}</strong>
              <br />
              {current.sublabel}
            </>
          ) : (
            current.label
          )}
        </Form.Check.Label>
      </Form.Check>
    ))}
    {props.helpText && (
      <Form.Text id={props.id + 'HelpText'} muted>
        {props.helpText}
      </Form.Text>
    )}
  </Form.Group>
)
