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
  return showPoints(points) ? fixedPointPrecision(points) : '—'
}

function displayPercent(points: number): string {
  return showPoints(points) ? fixedPointPrecisionPercent(points * 1e-6) : '—%'
}

function tooManyPoints(points: number): boolean {
  return points >= MAX_POINTS
}

function pointsPerWeekToAnnual(points: number): string {
  return showPoints(points)
    ? fixedPointPrecisionPercent(1 - (1 - points * 1e-6) ** 52)
    : '—%'
}

function maybeGreater(points: number): string {
  return tooManyPoints(points) ? '>' : ''
}

export function ExplanationCard(props: { points: number }): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(1000)

  const points = props.points

  const [risky, riskyStyle] = howRisky(points, riskBudget)

  return (
    <Card>
      <p className="readout">
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
        className="form-control"
        onChange={(e) => setRiskBudget(Number.parseInt(e.target.value))}
        value={riskBudget}
      >
        <optgroup label=""></optgroup>
        <option value="1000">
          0.1% per year (suggested if at high risk or interacting with people at
          high risk)
        </option>
        <option value="10000">
          1% per year (suggested if not at high risk nor interacting with people
          at high risk)
        </option>
      </select>
      <p className="readout">
        ... then for you this is a{' '}
        <span className={riskyStyle}>
          <b>{showPoints(points) ? risky : '——'}</b>
        </span>{' '}
        risk activity.
      </p>
      <h2>What does this mean numerically?</h2>
      <p>
        This is a roughly {maybeGreater(points)}
        {displayPoints(points)}-in-a-million ({maybeGreater(points)}
        {displayPercent(points)}) chance of getting COVID from this activity
        with these people.
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
  } else if (normalizedPoints < 25) {
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
      {showPoints(props.points) ? (
        <h1>
          {tooManyPoints(props.points) ? '>' : '~'}
          {displayPoints(props.points)} microCOVIDs (
          {maybeGreater(props.points)}
          {displayPoints(props.points / ERROR_FACTOR)} to{' '}
          {maybeGreater(props.points)}
          {displayPoints(props.points * ERROR_FACTOR)})
        </h1>
      ) : (
        <h1>fill in calculator to see</h1>
      )}
    </div>
  )
}
