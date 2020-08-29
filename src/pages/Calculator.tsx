import React, { useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { ActivityRiskControls } from 'components/calculator/ActivityRiskControls'
import { PersonRiskControls } from 'components/calculator/PersonRiskControls'
import {
  ExplanationCard,
  PointsDisplay,
} from 'components/calculator/PointsDisplay'
import { PrevalenceControls } from 'components/calculator/PrevalenceControls'
import { SavedDataSelector } from 'components/calculator/SavedDataSelector'
import { Card } from 'components/Card'
import {
  CalculatorData,
  calculate,
  defaultValues,
  parsePopulation,
} from 'data/calculate'
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

  return (
    <div id="calculator">
      <Row>
        <Col md="12" lg="8">
          <h2>NOTE: Please wait until Saturday 8/29 to share this widely</h2>
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
          {points > 0 && (showSaveForm ? saveForm : saveButton)}
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
      </Row>
      <Row className="sticky">
        <Col lg={{ span: 8, offset: 4 }}>
          <PointsDisplay points={points} repeatedEvent={repeatedEvent} />
        </Col>
      </Row>
      <Row className="explanation">
        <Col lg={{ span: 8, offset: 4 }}>
          <ExplanationCard points={points} />
        </Col>
      </Row>
    </div>
  )
}
