import React, { useState } from 'react'
import { Col, Collapse, Form, Popover, Row } from 'react-bootstrap'
import { IconType } from 'react-icons'
import { BsExclamationTriangleFill } from 'react-icons/bs'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { GenericSelectControl } from './SelectControl'
import Card from 'components/Card'
import {
  CalculatorData,
  MAX_ACTIVITY_RISK,
  ONE_MILLION,
  calculateActivityRisk,
  calculateLocationPersonAverage,
  calculatePersonRiskEach,
} from 'data/calculate'
import { intimateDurationFloor } from 'data/data'
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
  riskBudget: number
  riskBudgetSetter: (newValue: number) => void
  data: CalculatorData
}): React.ReactElement {
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
                {props.data.personCount} {personCountSuffixFormatted})<br />
                <strong style={{ fontSize: '1.5em' }}>
                  = ~{pointsFormatted} microCOVIDs {frequencyFormatted}
                </strong>{' '}
                <br />
                (margin of error: {lowerBoundFormatted} to {upperBoundFormatted}
                )
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
              <b>
                {activityRisk && activityRisk >= MAX_ACTIVITY_RISK
                  ? ' (NOTE: We have capped this number at the maximum Activity Risk.)'
                  : ''}
                {props.data.distance === 'intimate' &&
                props.data.duration < intimateDurationFloor
                  ? ' (NOTE: We have applied a minimum Activity Risk for kissing.)'
                  : ''}
              </b>
            </li>
            <li>
              <strong>
                Number of people:{' '}
                <code>
                  {props.data.personCount} {personCountSuffixFormatted}
                </code>
              </strong>
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
                Frequency: <code>{frequencyFormatted}</code>
              </strong>
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
                Budget avaialble:{' '}
                <code>{weekBudgetFormatted} microCOVIDs per week</code>
              </strong>
              <br />
              You select an annual budget is {budgetAnnualPercentFormatted}{' '}
              chance of getting COVID per year ({budgetFormatted} microCOVIDs).
              That equates to a weekly budget of{' '}
              <strong>{weekBudgetFormatted} microCOVIDs per week</strong>.
            </li>
            <li>
              <strong>
                Budget used:{' '}
                <code>
                  {budgetConsumptionFormatted} {frequencyFormatted}{' '}
                </code>
              </strong>
              <br />
              This ineraction uses <strong>{budgetConsumptionFormatted}</strong>
              . This amount of your budget will be used{' '}
              <strong>{frequencyFormatted}</strong> .
            </li>
          </ul>
        </div>
      </Collapse>

      <div className="mt-2" id="additional-precautions">
        {props.repeatedEvent ? (
          <>
            <h4>Here are some ways of reducing the risk of this activity:</h4>
            <em>These may or may not apply to your activity.</em>
            <ol className="mt-2">
              <li>
                MODify your activities (make them Masked, Outdoors, Distanced)
              </li>
              <li>
                Wear the best mask you can get! [link “learn more about masks”]
              </li>
              <li>Visit public places during less crowded hours</li>
              <li>Use delivery services to replace shopping trips</li>
            </ol>
          </>
        ) : (
          <>
            <h4>
              Here are some ways you can work with close contacts to reduce
              their risk:
            </h4>
            <ol className="mt-2">
              <li>
                Talk to them about how their choices affect your risk, as well
                as theirs
              </li>
              <li>
                Ask them to MODify their activities (Masked, Outdoors,
                Distanced)
              </li>
              <li>
                Essential workers can wear a top quality mask N95 (or KN95) to
                work
              </li>
              <li>
                Encourage them to limit their socializing to as few people as
                possible
              </li>
              <li>
                Encrouage them to be in a closed pod with you and a small group
                of others
              </li>
              <li>
                If they are very risky and you must be inside with them, you can
                wear masks inside or isolate within the house by staying in
                different rooms.
              </li>
            </ol>
          </>
        )}
      </div>

      <Form.Group>
        <GenericSelectControl
          id="budget-selector"
          label=" "
          header="Adjust your risk tolerance"
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
      </Form.Group>
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

export function PointsDisplay(props: {
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
