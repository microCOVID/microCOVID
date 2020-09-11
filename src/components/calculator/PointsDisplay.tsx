import React, { useState } from 'react'
import { Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { GenericSelectControl } from './SelectControl'
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

function maybeGreater(points: number): string {
  return tooManyPoints(points) ? '>' : ''
}

export function ExplanationCard(props: { points: number }): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(10000)

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
      <GenericSelectControl
        id="budget-selector"
        label="If your risk tolerance is..."
        popover={riskTolerancePopover}
        setter={(e: string) => setRiskBudget(Number.parseInt(e))}
        value={riskBudget}
        source={{
          '10000': {
            label: '1% per year (suggested if not at increased risk)',
            multiplier: 1,
          },
          '1000': {
            label:
              '0.1% per year (suggest if at increased risk or regularly interracting with people at increased risk)',
            multiplier: 0.1,
          },
        }}
      />
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
      {budgetConsumption(points, riskBudget)}
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

const budgetConsumption = (points: number, budget: number) => {
  const weekBudget = budget / 50 // Numbers look cleaner than 52.
  if (points > weekBudget) {
    const weeksConsumed = fixedPointPrecision(points / weekBudget)
    return (
      <p>
        Doing this activity once would use up your entire risk allocation for ~
        {weeksConsumed} {Number.parseInt(weeksConsumed) > 1 ? 'weeks' : 'week'}.
      </p>
    )
  }
  return (
    <p>
      Doing this activity once would use up ~
      {fixedPointPrecision((points / weekBudget) * 100)}% of your risk
      allocation for one week.
    </p>
  )
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

const riskTolerancePopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About At Risk Populations</Popover.Title>
    <Popover.Content>
      <p>
        Our living group (all at average risk) has agreed to a{' '}
        <Link to="/paper/2-riskiness">1% risk of getting COVID per year. </Link>
      </p>
      <p>
        We suggest more caution (0.1% risk per year) for people at increased
        risk of severe illness (or in contact with people at increased risk).
      </p>
      <p>
        <p>
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/older-adults.html"
            target="_blank"
            rel="noreferrer"
          >
            Risk increases with age.
          </a>{' '}
          We think age over 60 confers substantial increased risk.
        </p>
        <p>
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html"
            target="_blank"
            rel="noreferrer"
          >
            Certain underlying medical conditions
          </a>{' '}
          also confer increased risk:
        </p>
        <ul>
          <li>BMI of 30 or higher</li>
          <li>Type 2 diabetes mellitus</li>
          <li>COPD or other heart conditions</li>
          <li>Cancer</li>
          <li>Chronic kidney disease</li>
          <li>Immunocompromise from solid organ transplant</li>
          <li>Sickle cell disease</li>
        </ul>
      </p>
    </Popover.Content>
  </Popover>
)
