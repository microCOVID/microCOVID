import React from 'react'
import { Badge, Form, OverlayTrigger } from 'react-bootstrap'

import { CheckBoxFormValue } from 'data/data'

export const RadioControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: Array<CheckBoxFormValue>
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
    {props.source.map((current, index) => (
      <Form.Check key={index} id={props.id + index}>
        <Form.Check.Input
          type="radio"
          name={props.id}
          value={current.value}
          onChange={() => props.setter(current.value)}
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
