import React, { useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { ActivityRiskControls } from 'components/calculator/ActivityRiskControls'
import { PersonRiskControls } from 'components/calculator/PersonRiskControls'
import { PrevalenceControls } from 'components/calculator/PrevalenceControls'
import { SavedDataSelector } from 'components/calculator/SavedDataSelector'
import { Card } from 'components/Card'
import {
  CalculatorData,
  MAX_POINTS,
  calculate,
  defaultValues,
  parsePopulation,
} from 'data/calculate'
import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from 'data/FormatPrecision'
import { saveCalculation } from 'data/localStorage'

const localStorage = window.localStorage
const FORM_STATE_KEY = 'formData'

export const Calculator = (): React.ReactElement => {
  const previousData = JSON.parse(
    localStorage.getItem(FORM_STATE_KEY) || 'null',
  )

  const [showSaveForm, setShowSaveForm] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [calculatorData, setCalculatorData] = useState<CalculatorData>(
    previousData || defaultValues,
  )

  const resetForm = () => {
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(defaultValues))
    setCalculatorData(defaultValues)
  }

  const persistForm = () => {
    saveCalculation(saveName, calculatorData)
    setShowSaveForm(false)
    setSaveName('')
  }

  const points = useMemo(() => {
    // Risk calculation
    const computedValue = calculate(calculatorData)

    // Store data for refresh
    localStorage.setItem(
      FORM_STATE_KEY,
      JSON.stringify({
        ...calculatorData,
        persistedAt: Date.now(),
      }),
    )

    if (computedValue === null) {
      return -1
    }

    return computedValue
  }, [calculatorData])

  const prevalenceIsFilled =
    parsePopulation(calculatorData.population) > 0 &&
    calculatorData.casesPastWeek > 0 &&
    calculatorData.casesIncreasingPercentage >= 0 &&
    calculatorData.positiveCasePercentage > 0
  const repeatedEvent = ['repeated', 'partner'].includes(
    calculatorData.interaction,
  )

  const showPoints = points >= 0
  const tooManyPoints = points >= MAX_POINTS

  const howRisky = (points: number): string[] => {
    if (points < 3) {
      return ['close to negligible', 'dozens of times per week']
    } else if (points < 30) {
      return ['low', 'several times per week']
    } else if (points < 100) {
      return ['moderate', 'a few times a month']
    } else if (points < 300) {
      return ['substantial', 'once or twice a month']
    } else if (points < 1000) {
      return ['high', 'a few times a year']
    } else if (points < 3000) {
      return ['very high', 'once a year']
    } else {
      return ['dangerously high', 'zero times per year']
    }
  }

  const saveForm = (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        placeholder="Enter name to save your custom scenario to the scenario list"
        value={saveName}
        onChange={(e) => setSaveName(e.target.value)}
      />
      <div className="input-group-append">
        <button type="button" className="btn btn-info" onClick={persistForm}>
          Save
        </button>
      </div>
    </div>
  )

  const saveButton = (
    <span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowSaveForm(true)}
      >
        Save as custom scenario
      </button>
    </span>
  )

  const displayPoints = showPoints ? fixedPointPrecision(points) : '-'
  const displayPercent = showPoints
    ? fixedPointPrecisionPercent(points * 1e-6)
    : '-%'

  const pointsDisplay = (
    <Card title="Result">
      <p className="readout">
        In total, you have a {tooManyPoints ? '>' : ''}
        {displayPoints}
        -in-a-million ({tooManyPoints ? '>' : ''}
        {displayPercent}) chance of getting COVID from this activity with these
        people.
      </p>
      <h1>
        {tooManyPoints ? '>' : ''}
        {displayPoints} microCOVIDs
        {repeatedEvent && '/week'}
      </h1>
      <p>
        <b>
          {showPoints && tooManyPoints
            ? "NOTE: We don't display results higher than this, because our estimation method is only accurate for small probabilities."
            : ''}
        </b>
      </p>
      <p className="readout">
        If you have a budget of 10,000 microCOVIDs per year (1% chance of
        COVID), this is a <b>{showPoints ? howRisky(points)[0] : '--'}</b> risk
        activity and you could afford to do it{' '}
        <b>{showPoints ? howRisky(points)[1] : '--'}</b> if you were not doing
        much else.
      </p>
    </Card>
  )

  return (
    <div id="calculator">
      <Row>
        <Col md="12" lg="8">
          <h2>NOTE: Please wait until Saturday 8/29 to share this widely</h2>
          <p>
            We hear that some folks are circulating this website beyond our
            circle of beta testers ;). While we appreciate the publicity, we the
            maintainers are still trying to finish our workweek of our full-time
            jobs in peace and quiet, and we are NOT personally ready for hordes
            of attention until the weekend. Please wait until Saturday before
            sharing this link any further.
          </p>
          <p>
            That said, in the meantime YES you are definitely welcome to be
            here, to check out our tool privately and send us any feedback :)
          </p>
          <p>
            We created a calculator to assess “cost” of various activities in
            microCOVIDs, where 1&nbsp;microCOVID is a one-in-a-million chance of
            getting COVID.
          </p>
          <p>
            We hope you’ll use this tool to build your intuition about the
            comparative risk of different activities and as a harm-reduction
            tool to make safer choices.
          </p>
          <p>
            Play around with the calculator! Change the variables and see how
            they affect the total.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset form
          </button>{' '}
          {showPoints && (showSaveForm ? saveForm : saveButton)}
        </Col>
        <Col lg="4" md="12" className="d-none d-lg-block">
          {pointsDisplay}
        </Col>
      </Row>

      <hr />

      <Row id="calculator-fields">
        <Col md="12" lg="4">
          <Card id="location" title="Location & Prevalence">
            <div className="subheading">
              First, select a location to use in your calculations, or fill in
              your own values based on data available in your area....
            </div>

            <PrevalenceControls
              data={calculatorData}
              setter={setCalculatorData}
            />
          </Card>
        </Col>

        <Col md="12" lg="8">
          <Card id="person-risk" title="Risk">
            {prevalenceIsFilled ? (
              <React.Fragment>
                <div className="subheading">
                  <p>
                    ...then select a scenario from the list below (or make your
                    own).
                  </p>
                  <SavedDataSelector
                    currentData={calculatorData}
                    setter={setCalculatorData}
                  />
                </div>

                <Row>
                  <Col md="12" lg="6">
                    <PersonRiskControls
                      data={calculatorData}
                      setter={setCalculatorData}
                    />
                  </Col>
                  <Col md="12" lg="6">
                    <ActivityRiskControls
                      data={calculatorData}
                      setter={setCalculatorData}
                      repeatedEvent={repeatedEvent}
                    />
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <div className="empty">
                First, fill out prevalence information.
              </div>
            )}
          </Card>
        </Col>

        <Col lg="4" md="12" className="d-lg-none">
          {pointsDisplay}
        </Col>
      </Row>
    </div>
  )
}
