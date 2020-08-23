import React, { useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { ActivityRiskControls } from 'components/calculator/ActivityRiskControls'
import { PersonRiskControls } from 'components/calculator/PersonRiskControls'
import { PrevalanceControls } from 'components/calculator/PrevalenceControls'
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

    // Round points < 10
    return computedValue > 10
      ? Math.round(computedValue)
      : computedValue.toFixed(2)
  }, [calculatorData])

  const prevalenceIsFilled =
    parsePopulation(calculatorData.population) > 0 &&
    calculatorData.casesPastWeek > 0 &&
    calculatorData.casesWeekBefore > 0 &&
    calculatorData.positiveCasePercentage > 0
  const showPoints = points >= 0

  const saveForm = (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        placeholder="Enter metric name"
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
        Save parameters
      </button>
    </span>
  )
  const pointsDisplay = (
    <Card title="Result">
      <h1>
        {showPoints ? points : '-'} µCoV
        {calculatorData.interaction === 'repeated' && '/week'}
      </h1>
      {showPoints && (showSaveForm ? saveForm : saveButton)}
    </Card>
  )

  return (
    <div id="calculator">
      <Row>
        <Col md="12" lg="8">
          <p>
            We created a calculator to assess “cost” of various activities in
            microCOVIDs (µCoV), where 1&nbsp;microCOVID is a one-in-a-million
            chance of getting COVID.
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
          </button>
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

            <PrevalanceControls
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
                    />
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <div className="empty">
                First, fill out prevalance information.
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
