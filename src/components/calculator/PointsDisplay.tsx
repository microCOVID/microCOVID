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

function pointsPerWeekToAnnual(points: number): string {
  return showPoints(points)
    ? fixedPointPrecisionPercent(1 - (1 - points * 1e-6) ** 52)
    : '—%'
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
            label: '1% per year (suggested if not at elevated risk)',
            multiplier: 1,
          },
          '1000': {
            label:
              '0.1% per year (suggest if at elevated risk or regularly interracting with people at elevated risk)',
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

const riskTolerancePopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About At Risk Populations</Popover.Title>
    <Popover.Content>
      <p>
        In our living group, we have agreed to a 1% risk of getting covid per
        year. For people not at elevated risk, this&nbsp;
        <Link to="/paper/2-riskiness">
          conveys a similar level of risk of long-term health effects as
          driving.
        </Link>
      </p>
      <p>
        For people at elevated risk, we recommend being more cautious. These
        populations include:
        <ul>
          <li>
            <a href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/older-adults.html">
              People over the age of 60
            </a>
          </li>
          <li>Cancer patients</li>
          <li>People with chronic kidney disease</li>
          <li>People with COPD or other heart conditions</li>
          <li>Immunocompromised from solid organ transplant</li>
          <li>BMI of 30 or higher</li>
          <li>Sickle cell disease</li>
          <li>Type 2 diabetes mellitus</li>
        </ul>
        <i>
          Source:&nbsp;
          <a href="https://www.worldometers.info/coronavirus/coronavirus-death-rate/">
            worldometers
          </a>
          ,&nbsp;
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html">
            CDC
          </a>
          ,
        </i>
      </p>
      <p>
        Additionally, if you are not in an at-risk category but regularly come
        into contact with someone in an at-risk category (ex: living with a
        grandparent), we suggest being more cautious as well - your actions
        affect more than just you!
      </p>
    </Popover.Content>
  </Popover>
)
