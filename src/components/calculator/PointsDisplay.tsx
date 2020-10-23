import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { IconType } from 'react-icons'
import { BsExclamationTriangleFill } from 'react-icons/bs'

import {
  budgetConsumption,
  getWeekBudget,
} from 'components/calculator/util/budgetUtil'
import {
  displayPoints,
  showPoints,
} from 'components/calculator/util/displayUtil'
import { ONE_MILLION } from 'data/calculate'

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

const RISK_LEVELS_TO_SHOW_ON_THERMOMETER = 5 // Shows up through 'Very High'

/**
 * Pick the top X risk levels for display and use reverse the order (so they display correctly)
 */
const riskLevelsForThermometer = riskLevels
  .slice(0, RISK_LEVELS_TO_SHOW_ON_THERMOMETER)
  .reverse()

const howRisky = (points: number, budget: number): RiskLevel => {
  const highestNormalRisklevel = riskLevels[riskLevels.length - 1]

  // Then check against normalized points
  const normalizedPoints = points / (budget / 10000)
  const curLevel = riskLevels.find((level) => normalizedPoints < level.max)
  return (
    curLevel || highestNormalRisklevel // Default to the highest risk level
  )
}

function Thermometer(props: {
  doShowPoints: boolean
  activeRiskLevel: RiskLevel
}): React.ReactElement {
  const getActiveLevelClass = (
    doShowPoints: boolean,
    activeRiskLevel: RiskLevel,
    comparisonRiskLevel: RiskLevel,
  ) => {
    return doShowPoints && activeRiskLevel === comparisonRiskLevel
      ? ' current-level'
      : ''
  }

  return (
    <>
      {props.doShowPoints && props.activeRiskLevel.icon ? (
        <>
          <props.activeRiskLevel.icon
            className={'risk-icon text-risk-' + props.activeRiskLevel.style}
          />
        </>
      ) : (
        // Iterate on the risk levels to build each pieces of the thermometer, and set the active level.
        riskLevelsForThermometer.map((level) => (
          <div
            key={level.style}
            className={
              `thermometer-piece risk-${level.style}` +
              getActiveLevelClass(
                props.doShowPoints,
                props.activeRiskLevel,
                level,
              )
            }
          ></div>
        ))
      )}
    </>
  )
}

export default function PointsDisplay(props: {
  points: number
  repeatedEvent: boolean
  riskBudget: number
  riskBudgetSetter: (newValue: number) => void
  upperBound: number
  lowerBound: number
}): React.ReactElement {
  const activeRiskLevel = howRisky(props.points, props.riskBudget)
  const doShowPoints = showPoints(props.points)
  return (
    <Row className="top-half-card no-gutters">
      <Col className="thermometer-container">
        <Thermometer
          doShowPoints={doShowPoints}
          activeRiskLevel={activeRiskLevel}
        />
      </Col>
      <Col md="11" sm="10" xs="10" className="points-container">
        {!doShowPoints ? (
          <div className="risk-level"></div>
        ) : (
          <div className={'risk-level risk-' + activeRiskLevel.style}>
            <span>{activeRiskLevel.title} Risk</span>
          </div>
        )}
        <div className="budget-consumption">
          {doShowPoints && (
            <>
              {budgetConsumption(props.points, props.riskBudget)}{' '}
              <span className="points-range d-md-inline d-none">
                (of {displayPoints(getWeekBudget(props.riskBudget))}{' '}
                microCOVIDs/week)
              </span>
            </>
          )}
        </div>
        <div className="points">
          {doShowPoints ? (
            <>
              ~{displayPoints(props.points)} microCOVIDs
              {props.repeatedEvent ? ' per week' : ' each time'}{' '}
              <span className="points-range d-md-inline d-none">
                {props.upperBound >= ONE_MILLION ? null : (
                  <>
                    (probably between: {displayPoints(props.lowerBound)} to{' '}
                    {displayPoints(props.upperBound)})
                  </>
                )}
              </span>
            </>
          ) : (
            <>Fill in calculator to see risk level</>
          )}
        </div>
      </Col>
    </Row>
  )
}
