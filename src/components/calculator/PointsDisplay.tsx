import React from 'react'
import { Col, Popover, Row } from 'react-bootstrap'
import { IconType } from 'react-icons'
import {
  BsExclamationOctagonFill,
  BsExclamationTriangleFill,
} from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { GenericSelectControl } from './SelectControl'
import Card from 'components/Card'
import { MAX_POINTS, ONE_MILLION } from 'data/calculate'
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
export function ExplanationCard(props: {
  points: number
  repeatedEvent: boolean
  riskBudget: number
  riskBudgetSetter: (newValue: number) => void
}): React.ReactElement {
  const points = props.points

  const currentRiskLevel = howRisky(points, props.riskBudget)

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
        setter={(e: string) => props.riskBudgetSetter(Number.parseInt(e))}
        value={props.riskBudget}
        source={{
          '10000': {
            label: '1% per year (suggested if not at increased risk)',
            multiplier: 1,
          },
          '1000': {
            label:
              '0.1% per year (suggest if at increased risk or regularly interacting with people at increased risk)',
            multiplier: 0.1,
          },
        }}
      />
      <p className="readout">
        ... then for you this is a{' '}
        <span className={currentRiskLevel.style}>
          <b>{showPoints(points) ? currentRiskLevel.title : '——'}</b>
        </span>{' '}
        risk activity.
      </p>
      <h2>What does this mean numerically?</h2>
      <p>
        This is a roughly ~{displayPoints(points)}-in-a-million (
        {displayPercent(points)}){props.repeatedEvent ? ' per week ' : ' '}
        chance of getting COVID from this activity with these people.
      </p>
      <p>{budgetConsumption(points, props.riskBudget)}</p>
    </Card>
  )
}

export interface RiskLevel {
  style: string
  title: string
  max: number
  icon?: IconType
}

// Risk levels and max points for each (assuming a 1% budget)
const riskLevels: RiskLevel[] = [
  { style: 'very-low', title: 'Very Low', max: 3 },
  { style: 'low', title: 'Low', max: 25 },
  { style: 'moderate', title: 'Moderate', max: 100 },
  { style: 'high', title: 'High', max: 300 },
  { style: 'very-high', title: 'Very High', max: 1000 },
  {
    style: 'dangerous',
    title: 'Dangerously High',
    max: 100000,
    icon: BsExclamationTriangleFill,
  },
]

const lifeThreateningRisk = {
  style: 'dangerous',
  title: 'Life-Threatening',
  max: 1e15, // Very large number
  icon: BsExclamationOctagonFill,
}

const RISK_LEVELS_TO_SHOW_ON_LEGEND = 5 // Shows up through 'Very High'

function howRisky(points: number, budget: number): RiskLevel {
  // First check against dangerous risk levels. Don't normalize points here because we primarily want to indicate the risk to others, not the risk to you others at these "dangerous" levels
  const highestNormalRisklevel = riskLevels[riskLevels.length - 1]
  if (points >= highestNormalRisklevel.max) {
    return lifeThreateningRisk
  }

  // Then check against normalized points
  const normalizedPoints = points / (budget / 10000)
  const curLevel = riskLevels.find((level) => normalizedPoints < level.max)
  return (
    curLevel || riskLevels[riskLevels.length - 1] // Default to the highest risk level
  )
}

const getWeekBudget = (budget: number) => {
  return budget / 50 // Numbers look cleaner than 52.
}

const budgetConsumption = (points: number, budget: number) => {
  const weekBudget = getWeekBudget(budget)
  const weeksConsumed = points / weekBudget
  if (weeksConsumed >= 1.5) {
    return `
        ${fixedPointPrecision(weeksConsumed)}x  your weekly risk budget`
  }
  return `${fixedPointPrecision(
    (points / weekBudget) * 100,
  )}% of your weekly risk budget`
}

export function PointsDisplay(props: {
  points: number
  repeatedEvent: boolean
  riskBudget: number
  riskBudgetSetter: (newValue: number) => void
  upperBound: number
  lowerBound: number
}): React.ReactElement {
  const currentRiskLevel = howRisky(props.points, props.riskBudget)
  const doShowPoints = showPoints(props.points)
  return (
    <Row className="top-half-card no-gutters">
      <Col className="legend-container">
        {doShowPoints && currentRiskLevel.icon ? (
          <>
            <currentRiskLevel.icon
              className={'risk-icon text-risk-' + currentRiskLevel.style}
            />
          </>
        ) : (
          riskLevels
            .map((level) => level.style)
            .slice(0, RISK_LEVELS_TO_SHOW_ON_LEGEND) // Makes a shallow copy of the displayable risk levels
            .reverse() // Reverse the sort so the lowest items are at the bottom
            .map((level) => (
              <div
                key={level}
                className={
                  `legend-piece risk-${level}` +
                  (!doShowPoints || level !== currentRiskLevel.style
                    ? ''
                    : ' current-level')
                }
              ></div>
            ))
        )}
      </Col>
      <Col md="11" sm="10" xs="10" className="points-container">
        {!doShowPoints ? (
          <div className="risk-level"></div>
        ) : (
          <div className={'risk-level risk-' + currentRiskLevel.style}>
            <span>{currentRiskLevel.title} Risk</span>
          </div>
        )}
        <div className="points">
          {doShowPoints ? (
            <>
              {tooManyPoints(props.points) ? '>' : '~'}
              {displayPoints(props.points)} microCOVIDs
              {props.repeatedEvent ? ' per week' : ' each time'}{' '}
              <span className="points-range d-md-inline d-none">
                {props.upperBound >= ONE_MILLION ? null : (
                  <>
                    (range: {displayPoints(props.lowerBound)} to{' '}
                    {displayPoints(props.upperBound)})
                  </>
                )}
              </span>
            </>
          ) : (
            <>Fill in calculator to see risk level</>
          )}
        </div>
        <div className="budget-consumption">
          {doShowPoints && (
            <>
              {budgetConsumption(props.points, props.riskBudget)}{' '}
              <span className="points-range d-md-inline d-none">
                ({displayPoints(getWeekBudget(props.riskBudget))}{' '}
                microCOVIDs/week)
              </span>
            </>
          )}
        </div>
      </Col>
    </Row>
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
