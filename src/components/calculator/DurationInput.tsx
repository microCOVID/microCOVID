import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import { CalculatorData } from 'data/calculate'
import { intimateDurationFloor } from 'data/data'

interface HoursMinutesInputProps {
  value: number
  onChange: (duration: number) => void
}

const HoursMinutesInput: React.FunctionComponent<HoursMinutesInputProps> = (
  props: HoursMinutesInputProps,
): JSX.Element => {
  const { t } = useTranslation()
  const [hours, setHours] = useState(Math.floor(props.value / 60))
  const [minutes, setMinutes] = useState(props.value % 60)
  const calculateDuration = (hours: number, minutes: number) => {
    const h = Number.isNaN(hours) ? 0 : hours
    const m = Number.isNaN(minutes) ? 0 : minutes
    return h * 60 + m
  }
  return (
    <Row>
      <Form.Group controlId="duration-hours" as={Col} className="col-md-2 mb-0">
        <Form.Label className="field-label mb-0">
          {t('calculator.duration_hours')}
        </Form.Label>
        <Form.Control
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={hours}
          onChange={(e) => {
            const newHours = Math.max(0, parseInt(e.target.value))
            setHours(newHours)
            props.onChange(calculateDuration(newHours, minutes))
          }}
          size="lg"
        />
      </Form.Group>
      <Form.Group
        controlId="duration-minutes"
        as={Col}
        className="col-md-2 mb-0"
      >
        <Form.Label className="field-label mb-0">
          {t('calculator.duration_minutes')}
        </Form.Label>
        <Form.Control
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={minutes}
          onChange={(e) => {
            const newMinutes = Math.max(0, parseInt(e.target.value))
            setMinutes(newMinutes)
            props.onChange(calculateDuration(hours, newMinutes))
          }}
          size="lg"
        />
      </Form.Group>
    </Row>
  )
}

export function DurationInput(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  return (
    <>
      <div className="form-group">
        <label htmlFor="duration">
          <strong>
            <Trans>calculator.duration_header</Trans>:
          </strong>{' '}
          <Trans>calculator.duration_question</Trans>
        </label>
        <HoursMinutesInput
          value={props.data.duration}
          onChange={(duration) =>
            props.setter({
              ...props.data,
              duration,
            })
          }
        />
      </div>
      {props.data.distance === 'intimate' &&
      props.data.duration < intimateDurationFloor ? (
        <div className="warning">
          <Trans>calculator.intimate_risk_warning</Trans>
        </div>
      ) : null}
    </>
  )
}
