import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import {
  BsExclamationOctagonFill,
  BsExclamationTriangleFill,
} from 'react-icons/bs'

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
  name: string
  style: string
  max: number
  icon?: IconType
}

// Risk levels and max points for each (assuming a 1% budget)
const riskLevels: RiskLevel[] = [
  { name: 'very-low', style: 'very-low', max: 3 },
  { name: 'low', style: 'low', max: 25 },
  { name: 'moderate', style: 'moderate', max: 100 },
  { name: 'high', style: 'high', max: 300 },
  { name: 'very-high', style: 'very-high', max: 1000 },
  {
    name: 'dangerously-high',
    style: 'dangerous',
    max: 100000,
    icon: BsExclamationTriangleFill,
  },
  {
    name: 'extreme',
    style: 'dangerous',
    max: Infinity,
    icon: BsExclamationOctagonFill,
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
  const { t } = useTranslation()
  const riskLabel = (name: string): string => {
    // we call these out here explicitly so that i18next can pick this up and
    // generate entries in locales automatically
    if (name === 'very-low') return t('calculator.category_very_low')
    if (name === 'low') return t('calculator.category_low')
    if (name === 'moderate') return t('calculator.category_moderate')
    if (name === 'high') return t('calculator.category_high')
    if (name === 'very-high') return t('calculator.category_very_high')
    if (name === 'dangerously-high')
      return t('calculator.category_dangerously_high')
    if (name === 'extreme') return t('calculator.category_extreme')
    return 'Undefined'
  }
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
            <span>
              {riskLabel(activeRiskLevel.name)}{' '}
              <Trans>calculator.category_postfix</Trans>
            </span>
          </div>
        )}
        <div className="budget-consumption">
          {doShowPoints && (
            <>
              {budgetConsumption(
                props.points,
                props.riskBudget,
                t('calculator.explanationcard.multiple_suffix'),
                t('calculator.explanationcard.percentage_suffix'),
              )}{' '}
              <span className="points-range d-md-inline d-none">
                (
                <Trans
                  values={{
                    weekly_budget: displayPoints(
                      getWeekBudget(props.riskBudget),
                    ),
                  }}
                >
                  calculator.pointsdisplay.weekly_budget
                </Trans>
                )
              </span>
            </>
          )}
        </div>
        <div className="points">
          {doShowPoints ? (
            <>
              ~{displayPoints(props.points)}{' '}
              <Trans>calculator.pointsdisplay.microCOVIDs</Trans>{' '}
              {props.repeatedEvent ? t('per week') : t('each time')}{' '}
              <span className="points-range d-md-inline d-none">
                {props.upperBound >= ONE_MILLION ? null : (
                  <>
                    (
                    <Trans
                      values={{
                        from: displayPoints(props.lowerBound),
                        to: displayPoints(props.upperBound),
                      }}
                    >
                      calculator.pointsdisplay.range
                    </Trans>
                    )
                  </>
                )}
              </span>
            </>
          ) : (
            <Trans>calculator.pointsdisplay.empty_warning</Trans>
          )}
        </div>
      </Col>
    </Row>
  )
}
