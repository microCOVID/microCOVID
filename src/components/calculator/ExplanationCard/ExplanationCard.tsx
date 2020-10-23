import React, { useState } from 'react'
import { Collapse, Form } from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

import { GenericSelectControl } from '../SelectControl'

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
import {
  CalculatorData,
  MAX_ACTIVITY_RISK,
  calculateActivityRisk,
  calculateLocationPersonAverage,
  calculatePersonRiskEach,
} from 'data/calculate'
import { intimateDurationFloor } from 'data/data'

export function CalculationStepHeader(props: {
  header: string
  value: string
}): React.ReactElement {
  return (
    <strong>
      {props.header}: <code>{props.value}</code>
    </strong>
  )
}

export default function ExplanationCard(props: {
  points: number
  lowerBound: number
  upperBound: number
  repeatedEvent: boolean
  riskBudget: number
  riskBudgetSetter: (newValue: number) => void
  data: CalculatorData
}): React.ReactElement {
  const points = props.points

  const [showCalculatorExplanation, setShowCalculatorExplanation] = useState(
    false,
  )

  const locationRisk = calculateLocationPersonAverage(props.data) || 0
  const personRiskEach = Math.round(
    calculatePersonRiskEach(props.data, locationRisk) || 0,
  )
  const activityRisk = calculateActivityRisk(props.data)

  const personRiskEachFormatted = personRiskEach.toLocaleString()
  const pointsFormatted = displayPoints(points)
  const pointsPercentFormatted = displayPercent(points)
  const activityRiskFormatted = fixedPointPrecisionPercent(activityRisk)
  const personCountSuffixFormatted =
    props.data.personCount === 1 ? 'person' : 'people'
  const frequencyFormatted = props.repeatedEvent
    ? 'per week'
    : 'each time you do it'
  const lowerBoundFormatted = displayPoints(props.lowerBound)
  const upperBoundFormatted = displayPoints(props.upperBound)
  const budgetFormatted = displayPoints(props.riskBudget)
  const budgetAnnualPercentFormatted = fixedPointPrecisionPercent(
    props.riskBudget / 1000000,
  )
  const weekBudgetFormatted = getWeekBudget(props.riskBudget)
  const budgetConsumptionFormatted = budgetConsumption(
    props.points,
    props.riskBudget,
  )

  const calculationBreakdown = (
    <>
      <span
        className="expandable-header"
        onClick={() => setShowCalculatorExplanation(!showCalculatorExplanation)}
        aria-controls="calculation-explanation"
        aria-expanded={showCalculatorExplanation}
      >
        {showCalculatorExplanation ? (
          <>
            <BsChevronDown /> How this was calculated
          </>
        ) : (
          <>
            <BsChevronRight /> Learn how this was calculated
          </>
        )}
      </span>
      <Collapse in={showCalculatorExplanation}>
        <div id="calculation-explanation">
          <div>
            <h4>Calculation:</h4>
            <div id="calculation-breakdown">
              <code>
                ({personRiskEachFormatted} Person Risk) x (
                {activityRiskFormatted} Activity Risk) x (
                {props.data.personCount} {personCountSuffixFormatted})<br />
                <strong style={{ fontSize: '1.5em' }}>
                  = ~{pointsFormatted} microCOVIDs {frequencyFormatted}
                </strong>{' '}
                <br />
                (probably between: {lowerBoundFormatted} to{' '}
                {upperBoundFormatted})
              </code>{' '}
            </div>
          </div>
          <h4>Calculation Steps:</h4>
          <ol>
            <li>
              <CalculationStepHeader
                header="Person Risk"
                value={`${personRiskEachFormatted}-in-a-million chance`}
              />
              <br />
              First, we calculate that each other person in this area has a{' '}
              <strong>{personRiskEachFormatted}-in-a-million chance</strong>
              {'  '} of currently having COVID.
            </li>
            <li>
              <CalculationStepHeader
                header="Activity Risk"
                value={`${activityRiskFormatted} chance`}
              />
              <br /> Next, we calculate the risk of the activity. A person at
              this activity with COVID would have a{' '}
              <strong>{activityRiskFormatted} chance</strong> of transmitting it
              to you.{' '}
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
                  ? ' (NOTE: We have applied a minimum Activity Risk for kissing.)'
                  : ''}
              </b>
            </li>
            <li>
              <CalculationStepHeader
                header="Number of people"
                value={`${props.data.personCount} ${personCountSuffixFormatted}`}
              />
            </li>
            <li>
              <CalculationStepHeader
                header="Total risk"
                value={`~${pointsFormatted}-in-a-million (${pointsPercentFormatted})`}
              />
              <br />
              Finally, we multiply Person Risk, Activity Risk, and the number of
              people to get the total result of roughly{' '}
              <strong>
                {pointsFormatted}-in-a-million ({pointsPercentFormatted})
              </strong>{' '}
              chance of getting COVID from this activity with these people{' '}
              <strong>{frequencyFormatted}</strong>.
            </li>
            <li>
              <CalculationStepHeader
                header="Frequency"
                value={`${frequencyFormatted}`}
              />
              <br />
              {props.repeatedEvent ? (
                <>
                  Since you are seeing these people many times per week, the
                  result you see is{' '}
                  <strong>
                    microCOVIDs <u>per week</u>
                  </strong>
                  .
                </>
              ) : (
                <>
                  Since this is a one-time interaction, the results is shown as{' '}
                  <strong>
                    microCOVIDs <u>each time</u> you have this interaction
                  </strong>
                  . If you do this activity many times in a week, each time you
                  do it, it will count against your weekly budget. If you do
                  this activity many times with the same people each week, enter
                  it as{' '}
                  {props.data.distance
                    ? '"household member"'
                    : '"partner / spouse"'}{' '}
                  to see what the maximum transmission rate is per week.
                </>
              )}
            </li>
            <li>
              <CalculationStepHeader
                header="Probably between"
                value={`${lowerBoundFormatted} and ${upperBoundFormatted} microCOVIDs`}
              />
              <br />
              We believe with roughly 90% confidence that the actual risk falls
              between these two values. See our{' '}
              <a href="paper/14-research-sources#uncertainty-estimation">
                uncertainty estimation
              </a>
              .
            </li>
          </ol>
          <h4>How much of this can I do given my risk budget?</h4>
          <ul>
            <li>
              <CalculationStepHeader
                header="Budget available"
                value={`${weekBudgetFormatted} microCOVIDs per week`}
              />
              <br />
              You select an annual budget is {budgetAnnualPercentFormatted}{' '}
              chance of getting COVID per year ({budgetFormatted} microCOVIDs).
              That equates to a weekly budget of{' '}
              <strong>{weekBudgetFormatted} microCOVIDs per week</strong>.
            </li>
            <li>
              <CalculationStepHeader
                header="Budget used"
                value={`${budgetConsumptionFormatted} ${frequencyFormatted}`}
              />
              <br />
              This interaction uses{' '}
              <strong>{budgetConsumptionFormatted}</strong>. This amount of your
              budget will be used <strong>{frequencyFormatted}</strong> .
            </li>
          </ul>
        </div>
      </Collapse>
      <RiskReduction repeatedEvent={props.repeatedEvent} />
    </>
  )

  return (
    <Card>
      {showPoints(props.points) ? calculationBreakdown : ''}

      <Form.Group>
        <GenericSelectControl
          id="budget-selector"
          header="Adjust your risk tolerance"
          popover={riskTolerancePopover}
          setter={(e: string) => props.riskBudgetSetter(Number.parseInt(e))}
          value={props.riskBudget}
          hideRisk={true}
          source={{
            '10000': {
              label:
                '1% chance of COVID per year (suggested for healthy people NOT in close contact with more vulnerable people)',
              multiplier: 1,
            },
            '1000': {
              label:
                '0.1% chance of COVID per year (suggested if you or your close contacts are more vulnerable to COVID)',
              multiplier: 0.1,
            },
          }}
        />
      </Form.Group>
    </Card>
  )
}
