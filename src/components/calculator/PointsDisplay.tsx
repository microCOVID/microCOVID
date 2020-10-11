import React, { useState } from 'react'
import { Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { GenericSelectControl } from './SelectControl'
import Card from 'components/Card'
import { MAX_POINTS } from 'data/calculate'
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
}): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(10000)
  const points = props.points
  const { t } = useTranslation()

  return (
    <Card>
      <p className="readout">
        <b>
          {' '}
          {showPoints && tooManyPoints(points)
            ? t('calculator.too_many_points_note')
            : ''}
        </b>
      </p>
      <h2>
        <Trans>calculator.risk_points_header</Trans>
      </h2>
      <GenericSelectControl
        id="budget-selector"
        label={t('calculator.risk_tolerance_rating_start')}
        popover={riskTolerancePopover}
        setter={(e: string) => setRiskBudget(Number.parseInt(e))}
        value={riskBudget}
        source={{
          '10000': {
            label: t('calculator.risk_tolerance_1_percent_label'),
            multiplier: 1,
          },
          '1000': {
            label: t('calculator.risk_tolerance_point1_percent_label'),
            multiplier: 0.1,
          },
        }}
      />
      <p className="readout">
        <Trans>calculator.risk_tolerance_rating_middle</Trans>{' '}
        <HowRiskyLabel points={points} budget={riskBudget} />{' '}
        <Trans>calculator.risk_tolerance_rating_end</Trans>
      </p>
      <h2>
        <Trans>calculator.score_explain_header</Trans>
      </h2>
      <p>
        <Trans
          values={{
            points: displayPoints(points),
            percentage: displayPercent(points),
            repeated_label: props.repeatedEvent
              ? ' ' + t('per week') + ' '
              : ' ',
          }}
        >
          calculator.score_explanation
        </Trans>
      </p>
      <p>
        <BudgetConsumption
          points={points}
          budget={riskBudget}
          repeatedEvent={props.repeatedEvent}
        />
      </p>
    </Card>
  )
}

export function HowRiskyLabel(props: {
  points: number
  budget: number
}): React.ReactElement {
  const { t } = useTranslation()
  const riskyStyles = ['low-risk', 'medium-risk', 'high-risk']
  const STYLE_LOW = 0
  const STYLE_MEDIUM = 1
  const STYLE_HIGH = 2
  function howRisky(points: number, budget: number): string[] {
    const normalizedPoints = points / (budget / 10000)
    if (normalizedPoints < 3) {
      return [t('calculator.category_very_low'), riskyStyles[STYLE_LOW]]
    } else if (normalizedPoints < 25) {
      return [t('calculator.category_low'), riskyStyles[STYLE_LOW]]
    } else if (normalizedPoints < 100) {
      return [t('calculator.category_moderate'), riskyStyles[STYLE_MEDIUM]]
    } else if (normalizedPoints < 300) {
      return [t('calculator.category_high'), riskyStyles[STYLE_HIGH]]
    } else if (normalizedPoints < 1000) {
      return [t('calculator.category_very_high'), riskyStyles[STYLE_HIGH]]
    } else {
      return [
        t('calculator.category_dangerously_high'),
        riskyStyles[STYLE_HIGH],
      ]
    }
  }

  const [risky, riskyStyle] = howRisky(props.points, props.budget)

  return (
    <span className={riskyStyle}>
      <b>{showPoints(props.points) ? risky : '——'}</b>
    </span>
  )
}

export function BudgetConsumption(props: {
  points: number
  budget: number
  repeatedEvent: boolean
}): React.ReactElement {
  if (props.repeatedEvent) {
    return (
      <Trans
        values={{
          risk_percentage: fixedPointPrecision(
            ((props.points * 52) / props.budget) * 100,
          ),
        }}
      >
        calculator.budget_consumption_regular_event
      </Trans>
    )
  }
  const weekBudget = props.budget / 50 // Numbers look cleaner than 52.
  if (props.points > weekBudget) {
    const weeksConsumed = props.points / weekBudget
    return (
      <Trans
        count={Math.round(weeksConsumed)}
        values={{
          weeks: fixedPointPrecision(weeksConsumed),
        }}
      >
        calculator.budget_consumption_one_off_event_over_weekly_budget
      </Trans>
    )
  }
  return (
    <Trans
      values={{
        risk_percentage: fixedPointPrecision((props.points / weekBudget) * 100),
      }}
    >
      calculator.budget_consumption_one_off_event_under_weekly_budget
    </Trans>
  )
}

export function PointsDisplay(props: {
  points: number
  repeatedEvent: boolean
  upperBound: number
  lowerBound: number
}): React.ReactElement {
  const { t } = useTranslation()
  return (
    <div className="top-half-card">
      <strong>
        <Trans>calculator.points_display_header</Trans>:
      </strong>
      {showPoints(props.points) ? (
        <h1>
          {displayPoints(props.points)} <Trans>calculator.microCOVIDs</Trans>
          {' ('}
          <Trans
            values={{
              from: displayPoints(props.lowerBound),
              to: displayPoints(props.upperBound)
            }}
          >
            calculator.range
          </Trans>
          {') '}
          {props.repeatedEvent ? t('per week') : t('each time')}
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
