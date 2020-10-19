import React, { useState } from 'react'
import { Collapse, Form, Popover } from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { GenericSelectControl } from './SelectControl'
import Card from 'components/Card'
import {
  CalculatorData,
  calculateActivityRisk,
  calculateLocationPersonAverage,
  calculatePersonRiskEach,
} from 'data/calculate'
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

export function ExplanationCard(props: {
  points: number
  lowerBound: number
  upperBound: number
  repeatedEvent: boolean
  data: CalculatorData
}): React.ReactElement {
  const [riskBudget, setRiskBudget] = useState(10000)

  const points = props.points

  const [displayCalculationExplanation, setCalculationExplanation] = useState(
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
  const frequencyFormatted = props.repeatedEvent
    ? 'per week'
    : 'each time you do it'
  const lowerBoundFormatted = displayPoints(props.lowerBound)
  const upperBoundFormatted = displayPoints(props.upperBound)
  const budgetFormatted = displayPoints(riskBudget)
  const budgetAnnualPercentFormatted = fixedPointPrecisionPercent(
    riskBudget / 1000000,
  )
  const weekBudgetFormatted = getWeekBudget(riskBudget)
  const budgetConsumptionFormatted = budgetConsumption(
    props.points,
    riskBudget,
    props.repeatedEvent,
  )

  return (
    <Card>
      <span
        className="expandable-header"
        onClick={() =>
          setCalculationExplanation(!displayCalculationExplanation)
        }
        aria-controls="calculation-explanation"
        aria-expanded={displayCalculationExplanation}
      >
        {displayCalculationExplanation ? (
          <>
            <BsChevronDown /> How this was calculated
          </>
        ) : (
          <>
            <BsChevronRight /> Learn how this was calculated
          </>
        )}
      </span>
      <Collapse in={displayCalculationExplanation}>
        <div id="calculation-explanation">
          <div>
            <h4>Calculation:</h4>
            <div id="calculation-breakdown">
              <code>
                ({personRiskEachFormatted} Person Risk) x (
                {activityRiskFormatted} Activity Risk) x (
                {props.data.personCount}{' '}
                {props.data.personCount === 1 ? 'person' : 'people'})<br />
                <strong>
                  = ~{pointsFormatted} microCOVIDs {frequencyFormatted}
                </strong>{' '}
                (range: {lowerBoundFormatted} to {upperBoundFormatted})
              </code>{' '}
            </div>
          </div>
          <h4>Calculation Steps:</h4>
          <ol>
            <li>
              <strong>
                Person Risk:{' '}
                <code>{personRiskEachFormatted}-in-a-million chance</code>
              </strong>{' '}
              <br />
              First, we calculate that each other person in this area has a{' '}
              <strong>{personRiskEachFormatted}-in-a-million chance</strong>
              {'  '} of currently having COVID.
            </li>
            <li>
              <strong>
                Activity Risk: <code>{activityRiskFormatted} chance</code>
              </strong>
              <br /> Next, we calcualte the risk of the activity. Assuming 1
              person at this activity has COVID, then you would have a{' '}
              <strong>{activityRiskFormatted} chance</strong> of getting COVID.
              [Optional message if triggered: (NOTE: We have capped this number
              at the maximum Activity Risk.)]
            </li>
            <li>
              <strong>
                Total risk:{' '}
                <code>
                  ~{pointsFormatted}-in-a-million ({pointsPercentFormatted})
                </code>
              </strong>
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
              <strong>
                Frequency: <code>microCOVIDs {frequencyFormatted}</code>
              </strong>
              <br />
              {props.repeatedEvent ? (
                <>
                  Since you are seeing these people many times per week, the
                  result you see is{' '}
                  <strong>
                    microCOVIDs <u>per week</u>
                  </strong>
                  . (As opposed to one-time interactions show a total that you
                  count <em>each time</em> you have that interaction.)
                </>
              ) : (
                <>
                  Since this is a one-time interaction, the results is shown as{' '}
                  <strong>
                    microCOVIDs <u>each time</u> you have this interaction
                  </strong>
                  . If you do this activity many times in a week, each time you
                  do it, it will count against your weekly budget.
                </>
              )}
            </li>
            <li>
              <strong>
                Margin of error:{' '}
                <code>
                  {lowerBoundFormatted} to {upperBoundFormatted} microCOVIDs
                </code>
              </strong>
              <br />
              (some explanation text here)
            </li>
          </ol>
          <h4>How much of this can I do given my risk budget?</h4>
          <ul>
            <li>
              <strong>
                Budget used:{' '}
                <code>
                  {budgetConsumptionFormatted}% of your {weekBudgetFormatted}{' '}
                  microCOVIDs per week budget
                </code>
              </strong>{' '}
              <br />
              You select an annual budget is {budgetAnnualPercentFormatted}{' '}
              chance of getting COVID per year ({budgetFormatted} microCOVIDs).
              That equates to a weekly budget of{' '}
              <strong>{weekBudgetFormatted} microCOVIDs per week</strong>. This
              ineraction takes up{' '}
              <code>
                {budgetConsumptionFormatted}% of your weekly budget{' '}
                {frequencyFormatted}
              </code>{' '}
              .
            </li>
          </ul>
        </div>
      </Collapse>

      <Form.Group>
        <GenericSelectControl
          id="budget-selector"
          label=" "
          header="Adjust your risk tolerance"
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
                '0.1% per year (suggest if at increased risk or regularly interacting with people at increased risk)',
              multiplier: 0.1,
            },
          }}
        />
      </Form.Group>
    </Card>
  )
}

const getWeekBudget = (budget: number) => {
  return budget / 50 // Numbers look cleaner than 52.
}

const budgetConsumption = (
  points: number,
  budget: number,
  repeatedEvent: boolean,
) => {
  if (repeatedEvent) {
    return `Having this interaction regularly would use up
        ~${fixedPointPrecision(
          ((points * 52) / budget) * 100,
        )}% of your annual risk
        allocation.`
  }
  const weekBudget = budget / 50 // Numbers look cleaner than 52.
  if (points > weekBudget) {
    const weeksConsumed = fixedPointPrecision(points / weekBudget)
    return `Doing this activity once would use up your entire risk allocation for
        ~${weeksConsumed} ${
      Number.parseInt(weeksConsumed) > 1 ? 'weeks' : 'week'
    }.`
  }
  return `Doing this activity once would use up
      ~${fixedPointPrecision((points / weekBudget) * 100)}% of your risk
      allocation for one week.`
}

export function PointsDisplay(props: {
  points: number
  repeatedEvent: boolean
  upperBound: number
  lowerBound: number
}): React.ReactElement {
  return (
    <div className="top-half-card">
      <strong>Results:</strong>
      {showPoints(props.points) ? (
        <h1>
          {displayPoints(props.points)} microCOVIDs (
          {displayPoints(props.lowerBound)} to {displayPoints(props.upperBound)}
          ){props.repeatedEvent ? ' per week' : ' each time'}
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
