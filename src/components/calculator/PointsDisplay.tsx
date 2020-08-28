import React, { useState } from 'react'

import Card from 'components/Card'
import { MAX_POINTS } from 'data/calculate'
import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from 'data/FormatPrecision'

export function PointsDisplay(props: {
  points: number
  repeatedEvent: boolean
}): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(1000)

  const points = props.points

  const showPoints = points >= 0
  const tooManyPoints = points >= MAX_POINTS

  const displayPoints = showPoints ? fixedPointPrecision(points) : '-'
  const displayPercent = showPoints
    ? fixedPointPrecisionPercent(points * 1e-6)
    : '-%'

  const [risky, allowedFrequency] = howRisky(points, riskBudget)

  return (
    <Card title="Result">
      <p className="readout">
        In total, you have a {tooManyPoints ? '>' : ''}
        {displayPoints}
        -in-a-million ({tooManyPoints ? '>' : ''}
        {displayPercent}) chance of getting COVID from this activity with these
        people.
      </p>
      <h1>
        {tooManyPoints ? '>' : ''}
        {displayPoints} microCOVIDs
        {props.repeatedEvent && '/week'}
      </h1>
      <p>
        <b>
          {showPoints && tooManyPoints
            ? "NOTE: We don't display results higher than this, because our estimation method is only accurate for small probabilities."
            : ''}
        </b>
      </p>
      <p>
        <strong>Relative Risk</strong>
      </p>
      <p>If your risk tolerance is...</p>
      <select
        id="budget-selector"
        className="form-control form-control-lg"
        onChange={(e) => setRiskBudget(Number.parseInt(e.target.value))}
        value={riskBudget}
      >
        <option value="1000">
          0.1% per year (over 40 years old or regularly interracting with people
          over 40)
        </option>
        <option value="10000">
          1% per year (under 40 years old, not interracting with anyone elderly)
        </option>
      </select>
      <p className="readout">
        If you have a budget of {riskBudget} microCOVIDs per year (
        {riskBudget * 1e-4}% chance of COVID), this is a{' '}
        <b>{showPoints ? risky : '--'}</b> risk activity.
      </p>
      {allowedFrequency == '' ? null : (
        <p className="readout">
          You could do it
          <b>{showPoints ? allowedFrequency : '--'}</b>
          if you were not doing much else.
        </p>
      )}
    </Card>
  )
}

function howRisky(points: number, budget: number): string[] {
  const normalizedPoints = points / (budget / 10000)
  if (normalizedPoints < 3) {
    return ['very low', 'dozens of times per week']
  } else if (normalizedPoints < 30) {
    return ['low', 'several times per week']
  } else if (normalizedPoints < 100) {
    return ['moderate', 'a few times a month']
  } else if (normalizedPoints < 300) {
    return ['high', 'once or twice a month']
  } else if (normalizedPoints < 1000) {
    return ['high', '']
  } else {
    return ['dangerously high', '']
  }
}

export default PointsDisplay
