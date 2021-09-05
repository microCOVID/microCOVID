import React from 'react'
import { Trans } from 'react-i18next'

import { CalculatorData } from 'data/calculate'
import { intimateDurationFloor } from 'data/data'

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
        <input
          className="form-control form-control-lg col-md-3"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={props.data.duration}
          onChange={(e) =>
            props.setter({
              ...props.data,
              duration: Math.max(0, parseInt(e.target.value)),
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
