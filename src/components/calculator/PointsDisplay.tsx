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

  const [showCalculatorExplanation, setShowCalculatorExplanation] = useState(
    false,
  )
  const [showMaskDetails, setShowMaskDetails] = useState(false)

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
              <strong>
                Probably between:{' '}
                <code>
                  {lowerBoundFormatted} and {upperBoundFormatted} microCOVIDs
                </code>
              </strong>
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
              This interaction uses{' '}
              <strong>{budgetConsumptionFormatted}</strong>. This amount of your
              budget will be used <strong>{frequencyFormatted}</strong> .
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
                <abbr title="Masked, Ourdoors, Distanced">MOD</abbr>ify your
                activities (make them Masked, Outdoors, Distanced)
              </li>
              <li>
                Wear the best mask you can get!
                <br />
                <span
                  className="expandable-header"
                  onClick={() => setShowMaskDetails(!showMaskDetails)}
                  aria-controls="mask-details"
                  aria-expanded={showMaskDetails}
                >
                  {showMaskDetails ? <BsChevronDown /> : <BsChevronRight />}
                  Learn more about masks
                </span>
                <Collapse in={showMaskDetails}>
                  <div id="mask-details">{maskDetails}</div>
                </Collapse>
              </li>
              <li>Visit public places during less crowded hours</li>
              <li>
                Reduce shopping trips by doing one trip for multiple people,
                using delivery services, or shopping online
              </li>
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
                Ask them to <abbr title="Masked, Ourdoors, Distanced">MOD</abbr>
                ify their activities (Masked, Outdoors, Distanced)
              </li>
              <li>
                Essential workers can wear a top quality mask (e.g., N95 or
                KN95) to work
              </li>
              <li>
                Ask them to limit undistanced socializing to as few people as
                possible
              </li>
              <li>
                Encourage close contacts to isolate and get tested at the first
                sign of COVID symptoms
              </li>
              <li>
                If they have high COVID risk and you must be inside with them:
                <ul>
                  <li>Wear masks inside</li>
                  <li>
                    Maximize ventilation using open windows, fans blowing in
                    outside air, and HEPA filters
                  </li>
                  <li>
                    Isolate within the house by staying in different rooms.
                  </li>
                </ul>
              </li>
            </ol>
          </>
        )}
      </div>
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

const maskDetails = (
  <>
    <ul>
      <li>
        Here are the different mask types ranked from most protective to least
        protective:
      </li>
      <ul>
        <li>
          [P100 + Goggles] &gt; N95 &gt; KN95 &gt; Surgical mask or mask with
          PM2.5 filter insert &gt; Cloth mask / bandana / buff
        </li>
      </ul>
      <li>
        For maximum protection, goggles and face shields provide additional
        protection for the eyes, which are another possible site of infection.
      </li>
      <li>It’s vital that your mask forms a tight seal around your mouth.</li>
      <ul>
        <li>
          It is VERY important to learn how to make sure your mask{' '}
          <a href="https://youtu.be/5-Ihvw5X3ks?t=57">fits properly</a>.
        </li>
        <li>
          No facial hair where the mask touches your face! Wearing an N95 over a
          beard is no better than wearing a surgical mask.
        </li>
      </ul>
      <li>
        P100 respirators provide you the best protection but are cumbersome and
        thus only ideal for high-risk scenarios.
      </li>
      <ul>
        <li>
          Note that P100 respirators have an outflow valve, which means you are
          not protecting others. To fix this, put a surgical mask or cloth mask
          over the outflow valve.
        </li>
        <li>
          P100s come with a range of possible filter cartridges. We recommend
          the basic particle filters, not the VOC filters, which are harder to
          breathe through and do not provide additional protection.
        </li>
        <li>
          In the US,{' '}
          <a href="https://www.amazon.com/3M-Facepiece-Respirator-Respiratory-Protection/dp/B001NDN29O/ref=sxts_sxwds-bia-wc-p13n1_0?cv_ct_cx=p100+respirator&amp;dchild=1&amp;keywords=p100+respirator&amp;pd_rd_i=B001NDN29O&amp;pd_rd_r=c5f2ecd8-38a2-4d27-8285-c201d17129a9&amp;pd_rd_w=mWGA9&amp;pd_rd_wg=SQBbr&amp;pf_rd_p=aa27be45-7294-48a8-8c11-546cebd55a37&amp;pf_rd_r=H7PHTRCQDAVYQNN96XPD&amp;psc=1&amp;qid=1602444258&amp;sr=1-1-a14f3e51-9e3d-4cb5-bc68-d89d95c82244">
            3M
          </a>{' '}
          and{' '}
          <a href="https://www.amazon.com/Miller-Electric-ML00895-Respirator-Single/dp/B00WIH1OVM/ref=sr_1_14?dchild=1&amp;keywords=p100+respirator&amp;qid=1602444258&amp;sr=8-14">
            Miller
          </a>{' '}
          (GVS Elipse) are two reputable brands we like.
        </li>
      </ul>
      <li>
        N95 masks and KN95 masks provide very good protection IF AND ONLY IF you
        get a good seal. You also need to be careful to get a reputable brand.
      </li>
      <ul>
        <li>
          Here are a few sites that we believe sell only high quality products:{' '}
          <a href="https://n95maskco.com/collections/n95-masks">Respokare</a>{' '}
          (let them air out for a week first),{' '}
          <a href="https://westcoastppe.com/">West Coast PPE</a>, and{' '}
          <a href="https://honestppe.supply/">Honest PPE</a>.
        </li>
        <li>
          If you find an unknown KN95 brand in the store, you can look it up at
          the{' '}
          <a href="https://www.cdc.gov/niosh/npptl/respirators/testing/NonNIOSHresults.html">
            CDC’s testing site
          </a>{' '}
          . You want the “minimum filtration efficiency” to be above 90.
        </li>
      </ul>
      <li>
        Surgical masks are very cheap and widely available, as are masks with
        PM2.5 filter inserts. They are both an easy upgrade over cloth masks.
      </li>
      <li>
        Cloth masks provide very limited protection to you, but still provide
        good protection to others. Of the various cloth materials,{' '}
        <a href="https://citizensofhumanity.com/products/cotton-mask-5-pack">
          denim
        </a>{' '}
        has the highest filtration efficiency. Cloth also has the benefit of
        being reusable after a wash. Here’s{' '}
        <a href="https://www.rickshawbags.com/face-masks">one brand</a> we like.
      </li>
      <li>
        Make sure you learn how to{' '}
        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks">
          handle and fit
        </a>{' '}
        masks properly.
      </li>
    </ul>
  </>
)

const riskTolerancePopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About At Risk Populations</Popover.Title>
    <Popover.Content>
      <p>
        Our living group (all at average risk) has agreed to a{' '}
        <Link to="/paper/2-riskiness">1% risk of getting COVID per year. </Link>
      </p>
      <p>
        We suggest more caution (0.1% risk per year) for people who are more
        vulnerable to severe illness from COVID (or in contact with more
        vulnerable people)
      </p>
      <p>
        <p>
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/older-adults.html"
            target="_blank"
            rel="noreferrer"
          >
            Vulnerability increases with age.
          </a>{' '}
          We think age over 60 confers substantial increased vulnerability to
          severe illness from COVID.
        </p>
        <p>
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html"
            target="_blank"
            rel="noreferrer"
          >
            Certain underlying medical conditions
          </a>{' '}
          also confer increased vulnerability:
        </p>
        <ul>
          <li>BMI of 30 or higher</li>
          <li>Type 2 diabetes mellitus</li>
          <li>Smoking</li>
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
