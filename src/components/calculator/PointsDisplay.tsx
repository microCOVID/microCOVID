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

function pointsPerWeekToAnnual(points: number): string {
  return showPoints(points)
    ? fixedPointPrecisionPercent(1 - (1 - points * 1e-6) ** 52)
    : '-%'
}

export function ExplanationCard(props: { points: number }): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(1000)

  const points = props.points
  const maybeGreater = tooManyPoints(points) ? '>' : ''

  const risky = howRisky(points, riskBudget)[0]
  const riskyStyle = howRisky(points, riskBudget)[1]
  return (
    <Card>
      <p className="readout">
        In total, we guess you have somewhere between a {maybeGreater}
        {displayPoints(points / ERROR_FACTOR)}
        -in-a-million ({maybeGreater}
        {displayPercent(points / ERROR_FACTOR)}) and a {maybeGreater}
        {displayPoints(points * ERROR_FACTOR)}-in-a-million ({maybeGreater}
        {displayPercent(points * ERROR_FACTOR)}) chance of getting COVID from
        this activity with these people.
        <b>
          {' '}
          {showPoints && tooManyPoints(points)
            ? "NOTE: We don't display results higher than this, because our estimation method is only accurate for small probabilities."
            : ''}
        </b>
      </p>
      <h2>How risky is this?</h2>
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
        ... then for you this is a{' '}
        <span className={riskyStyle}>
          <b>{showPoints(points) ? risky : '--'}</b>
        </span>{' '}
        risk activity.
      </p>
      <p>
        If you did this once per week, you would have an additional{' '}
        {pointsPerWeekToAnnual(points)}-or-so chance of getting COVID this year
        (<i>not</i> including your risk from everything else you do!)
      </p>
    </Card>
  )
}

const riskyStyles = ['low-risk', 'medium-risk', 'high-risk']
const STYLE_LOW = 0
const STYLE_MEDIUM = 1
const STYLE_HIGH = 2

function howRisky(points: number, budget: number): string[] {
  const normalizedPoints = points / (budget / 10000)
  if (normalizedPoints < 3) {
    return ['very low', riskyStyles[STYLE_LOW]]
  } else if (normalizedPoints < 30) {
    return ['low', riskyStyles[STYLE_LOW]]
  } else if (normalizedPoints < 100) {
    return ['moderate', riskyStyles[STYLE_MEDIUM]]
  } else if (normalizedPoints < 300) {
    return ['high', riskyStyles[STYLE_HIGH]]
  } else if (normalizedPoints < 1000) {
    return ['very high', riskyStyles[STYLE_HIGH]]
  } else {
    return ['dangerously high', riskyStyles[STYLE_HIGH]]
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
