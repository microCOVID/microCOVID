import React from 'react'
import { Accordion, Form } from 'react-bootstrap'

import ControlLabel from './ControlLabel'
import { recordCalculatorOptionSelected } from 'components/Analytics'
import { CheckBoxFormValue } from 'data/data'

export const RadioControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: CheckBoxFormValue }
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
    <Accordion activeKey={props.value.toString()}>
      {Object.entries(props.source).map(([key, formValue], index) => (
        <Form.Check key={index} id={props.id + index}>
          <Form.Check.Input
            type="radio"
            name={props.id}
            value={key}
            onChange={() => {
              recordCalculatorOptionSelected(props.id, key)
              props.setter(key)
            }}
            defaultChecked={key === props.value.toString()}
          />
          <Form.Check.Label>
            <strong>{formValue.label}</strong>
          </Form.Check.Label>
          {formValue.sublabel && (
            <Accordion.Collapse eventKey={key}>
              <Form.Text as="div">{formValue.sublabel}</Form.Text>
            </Accordion.Collapse>
          )}
        </Form.Check>
      ))}
    </Accordion>
    {props.helpText && (
      <Form.Text id={props.id + 'HelpText'} muted>
        {props.helpText}
      </Form.Text>
    )}
  </Form.Group>
)
