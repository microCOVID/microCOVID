import React, { useState } from 'react'

import Card from 'components/Card'
import { ERROR_FACTOR, MAX_POINTS } from 'data/calculate'
import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from 'data/FormatPrecision'

function showPoints(points: number): boolean {
  return points >= 0
}

function displayPoints(points: number): string {
  return showPoints(points) ? fixedPointPrecision(points) : '-'
}

function displayPercent(points: number): string {
  return showPoints(points) ? fixedPointPrecisionPercent(points * 1e-6) : '-%'
}

function tooManyPoints(points: number): boolean {
  return points >= MAX_POINTS
}

export function ExplanationCard(props: { points: number }): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(1000)

  const points = props.points

  const [risky, allowedFrequency] = howRisky(points, riskBudget)

  return (
    <Card>
      <p className="readout">
        In total, we guess you have somewhere between a{' '}
        {tooManyPoints(points) ? '>' : ''}
        {displayPoints(points / ERROR_FACTOR)}
        -in-a-million ({tooManyPoints(points) ? '>' : ''}
        {displayPercent(points / ERROR_FACTOR)}) and a{' '}
        {tooManyPoints(points) ? '>' : ''}
        {displayPoints(points * ERROR_FACTOR)}-in-a-million (
        {tooManyPoints(points) ? '>' : ''}
        {displayPercent(points * ERROR_FACTOR)}) chance of getting COVID from
        this activity with these people.
      </p>
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
        <b>{showPoints(points) ? risky : '--'}</b> risk activity.
      </p>
      {allowedFrequency === '' ? null : (
        <p className="readout">
          You could do it
          <b>{showPoints(points) ? allowedFrequency : '--'}</b>
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

export function PointsDisplay(props: {
  points: number
  repeatedEvent: boolean
}): React.ReactElement {
  return (
    <div className="top-half-card">
      <strong>Results:</strong>
      <h1>
        about {tooManyPoints(props.points) ? '>' : ''}
        {displayPoints(props.points)} microCOVIDs
      </h1>
    </div>
  )
}
