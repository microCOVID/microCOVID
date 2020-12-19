import React from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import { RadioControl } from '../RadioControl'

import RiskReduction from './RiskReduction'
import riskTolerancePopover from './riskTolerancePopover'
import {
  budgetConsumption,
  getWeekBudget,
} from 'components/calculator/util/budgetUtil'
import {
  displayPercent,
  displayPoints,
  showPoints,
} from 'components/calculator/util/displayUtil'
import { fixedPointPrecisionPercent } from 'components/calculator/util/FormatPrecision'
import Card from 'components/Card'
import Expandable from 'components/Expandable'
import {
  CalculatorData,
  MAX_ACTIVITY_RISK,
  calculateActivityRisk,
  calculateLocationPersonAverage,
  calculatePersonRiskEach,
} from 'data/calculate'
import {
  Interaction,
  RiskProfile,
  budgetOptions,
  intimateDurationFloor,
} from 'data/data'
import 'components/calculator/ExplanationCard/ExplanationCard.scss'

const calculationStepHeader = (header: string, value: string): JSX.Element => {
  return (
    <strong>
      {header}: <code>{value}</code>
    </strong>
  )
}

export default function ExplanationCard(props: {
  points: number
  lowerBound: number
  upperBound: number
  repeatedEvent: boolean
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): React.ReactElement {
  const points = props.points
  const { t } = useTranslation()

  const locationRisk = calculateLocationPersonAverage(props.data) || 0
  const personRiskEach = Math.round(
    calculatePersonRiskEach(props.data, locationRisk) || 0,
  )
  const activityRisk = calculateActivityRisk(props.data)

  const personRiskEachFormatted = personRiskEach.toLocaleString()
  const pointsFormatted = displayPoints(points)
  const pointsPercentFormatted = displayPercent(points)
  const activityRiskFormatted = fixedPointPrecisionPercent(activityRisk)
  const personCountSuffixFormatted = t('calculator.explanationcard.person', {
    count: props.data.personCount,
  })
  const frequencyFormatted = props.repeatedEvent
    ? t('per week')
    : t('each time you do it')
  const lowerBoundFormatted = displayPoints(props.lowerBound)
  const upperBoundFormatted = displayPoints(props.upperBound)
  const budgetFormatted = displayPoints(props.data.riskBudget)
  const budgetAnnualPercentFormatted = fixedPointPrecisionPercent(
    props.data.riskBudget / 1000000,
  )
  const weekBudgetFormatted = getWeekBudget(props.data.riskBudget)
  const budgetConsumptionFormatted = budgetConsumption(
    props.points,
    props.data.riskBudget,
    t('calculator.explanationcard.multiple_suffix'),
    t('calculator.explanationcard.percentage_suffix'),
  )
  const repeatedTypeSuggestion =
    props.data.distance === 'intimate'
      ? Interaction.partner.label.split(' [')[0]
      : Interaction.repeated.label.split(' [')[0]
  const calculationBreakdown = () => {
    return (
      <>
        <Expandable
          id="calculation-explanation"
          header={t('calculator.explanationcard.details_header_closed')}
          headerExpanded={t('calculator.explanationcard.details_header_open')}
        >
          <div>
            <h4>{t('calculator.explanationcard.details_overview_header')}:</h4>
            <div id="calculation-breakdown">
              <code>
                ({personRiskEachFormatted}{' '}
                <Trans>calculator.explanationcard.details_person_risk</Trans>
                {') x ('}
                {activityRiskFormatted}{' '}
                <Trans>calculator.explanationcard.details_activity_risk</Trans>
                {') x ('}
                {props.data.personCount} {personCountSuffixFormatted})
                <br />
                <strong style={{ fontSize: '1.5em' }}>
                  = ~{pointsFormatted}{' '}
                  <Trans>calculator.pointsdisplay.microCOVIDs</Trans>{' '}
                  {frequencyFormatted}
                </strong>{' '}
                <br />(
                <Trans
                  values={{
                    from: lowerBoundFormatted,
                    to: upperBoundFormatted,
                  }}
                >
                  calculator.pointsdisplay.range
                </Trans>
                )
              </code>{' '}
            </div>
          </div>
          <h4>{t('calculator.explanationcard.details_steps_header')}:</h4>
          <ol>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.details_person_risk'),
                t('calculator.explanationcard.details_person_risk_number', {
                  person_risk: personRiskEachFormatted,
                }),
              )}
              <br />
              <Trans values={{ person_risk: personRiskEachFormatted }}>
                {props.data.interaction !== 'oneTime' &&
                RiskProfile[props.data.riskProfile].numHousemates > 1
                  ? 'calculator.explanationcard.details_person_risk_explanation_housemate'
                  : 'calculator.explanationcard.details_person_risk_explanation'}
              </Trans>
            </li>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.details_activity_risk'),
                `${activityRiskFormatted} ${t(
                  'calculator.explanationcard.chance',
                )}`,
              )}
              <br />
              <Trans values={{ activity_risk: activityRiskFormatted }}>
                calculator.explanationcard.details_activity_risk_explanation
              </Trans>

              <b>
                {activityRisk && activityRisk >= MAX_ACTIVITY_RISK ? (
                  <>
                    (NOTE: We have{' '}
                    <a href="/paper/13-q-and-a#what-if-i-hang-out-with-someone-indoors-for-a-long-time-if-we-hang-out-for-5-hours-thats-an-activity-risk-of-6-⨉-5--30-which-is-the-same-risk-as-for-a-household-member">
                      capped this number at the maximum Activity Risk
                    </a>
                    .)
                  </>
                ) : (
                  ''
                )}
                {props.data.distance === 'intimate' &&
                props.data.duration < intimateDurationFloor
                  ? t('calculator.intimate_risk_warning')
                  : ''}
              </b>
            </li>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.details_number_of_people'),
                `${props.data.personCount} ${personCountSuffixFormatted}`,
              )}
            </li>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.details_total_risk'),
                t('calculator.explanationcard.details_total_risk_number', {
                  points: pointsFormatted,
                  percentage: pointsPercentFormatted,
                }),
              )}
              <br />
              <Trans
                values={{
                  points: pointsFormatted,
                  percentage: pointsPercentFormatted,
                  frequency: frequencyFormatted,
                }}
              >
                calculator.explanationcard.details_total_risk_explanation
              </Trans>
            </li>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.details_frequency'),
                frequencyFormatted,
              )}
              <br />
              {props.repeatedEvent ? (
                <Trans>
                  calculator.explanationcard.frequency_explanation_repeated
                </Trans>
              ) : (
                <Trans
                  values={{
                    repeated_type_suggestion: repeatedTypeSuggestion,
                  }}
                >
                  calculator.explanationcard.frequency_explanation_oneoff
                </Trans>
              )}
            </li>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.details_range'),
                t('calculator.explanationcard.details_range_number', {
                  from: lowerBoundFormatted,
                  to: upperBoundFormatted,
                }),
              )}
              <br />
              <Trans i18nKey="calculator.explanationcard.details_range_explanation">
                Lorem ipsum{' '}
                <a href="paper/14-research-sources#uncertainty-estimation">
                  uncertainty link
                </a>{' '}
                dolor sic amet
              </Trans>
            </li>
          </ol>
          <h4>{t('calculator.explanationcard.risk_budget_header')}</h4>
          <ul>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.risk_budget_available'),
                `${weekBudgetFormatted} ${t(
                  'calculator.pointsdisplay.microCOVIDs',
                )} ${t('per week')}`,
              )}
              <br />
              <Trans
                values={{
                  budget_percent: budgetAnnualPercentFormatted,
                  budget_points: budgetFormatted,
                  budget_weekly: weekBudgetFormatted,
                }}
              >
                calculator.explanationcard.risk_budget_explanation
              </Trans>
            </li>
            <li>
              {calculationStepHeader(
                t('calculator.explanationcard.risk_budget_used'),
                `${budgetConsumptionFormatted} ${frequencyFormatted}`,
              )}
              <br />
              <Trans
                values={{
                  usage: budgetConsumptionFormatted,
                  frequency: frequencyFormatted,
                }}
              >
                calculator.explanationcard.risk_budget_usage_explanation
              </Trans>
            </li>
          </ul>
        </Expandable>
        <RiskReduction repeatedEvent={props.repeatedEvent} />
      </>
    )
  }

  return (
    <Card>
      {showPoints(props.points) ? calculationBreakdown() : ''}

      <Form.Group>
        <RadioControl
          id="budget-selector"
          header={t(
            'calculator.explanationcard.risk_tolerance_selector_header',
          )}
          popover={riskTolerancePopover}
          setter={(value) => {
            props.setter({ ...props.data, riskBudget: Number.parseInt(value) })
          }}
          value={props.data.riskBudget.toString()}
          source={budgetOptions}
        />
      </Form.Group>
    </Card>
  )
}
