import React from 'react'
import { Badge, Form, OverlayTrigger } from 'react-bootstrap'

import { FormValue } from 'data/data'

export const RadioControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: FormValue }
  value: string | number
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  className?: string
}> = (props) => (
  <Form.Group controlId={props.id}>
    {(props.label || props.header) && (
      <div className="label-wrapper">
        <Form.Label>
          <div>
            {props.header && <strong>{props.header}:</strong>} {props.label}
          </div>
        </Form.Label>
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
    {Object.keys(props.source).map((value, index) => (
      <Form.Check
        key={index}
        type="radio"
        label={props.source[value].label}
        name={props.id}
        id={props.id + index}
        value={value}
        onChange={() => props.setter(value)}
      />
    ))}
    {props.helpText && (
      <Form.Text id={props.id + 'HelpText'} muted>
        {props.helpText}
      </Form.Text>
    )}
  </Form.Group>
)
