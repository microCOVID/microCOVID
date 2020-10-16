import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useQueryParams } from 'use-query-params'

import {
  recordCalculatorChanged,
  recordSavedCustom,
} from 'components/Analytics'
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
  migrateDataToCurrent,
  parsePopulation,
} from 'data/calculate'
import { saveCalculation } from 'data/localStorage'
import {
  filterParams,
  queryConfig,
  useQueryDataIfPresent,
} from 'data/queryParams'

const localStorage = window.localStorage
const FORM_STATE_KEY = 'formData'

export const Calculator = (): React.ReactElement => {
  const [query, setQuery] = useQueryParams(queryConfig)

  // Mount / unmount
  useEffect(() => {
    scrollListener()
    window.addEventListener('scroll', scrollListener, true)
    window.addEventListener('resize', scrollListener, true)
    return () => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', scrollListener)
    }
  }, [])

  const previousData = JSON.parse(
    localStorage.getItem(FORM_STATE_KEY) || 'null',
  )

  const migratedPreviousData = migrateDataToCurrent(previousData)

  const [showSaveForm, setShowSaveForm] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [calculatorData, setCalculatorData] = useState<CalculatorData>(
    useQueryDataIfPresent(query, migratedPreviousData),
  )

  const resetForm = () => {
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(defaultValues))
    setCalculatorData(defaultValues)
  }

  const persistForm = () => {
    saveCalculation(saveName, calculatorData)
    setShowSaveForm(false)
    setSaveName('')
    recordSavedCustom(points)
  }

  const { points, lowerBound, upperBound } = useMemo(() => {
    // Risk calculation
    const result = calculate(calculatorData)
    if (result === null) {
      document.getElementById('points-row')?.classList.remove('has-points')
      return { points: -1, lowerBound: -1, upperBound: -1 }
    }

    const { expectedValue, lowerBound, upperBound } = result

    if (expectedValue) {
      recordCalculatorChanged(expectedValue)
    }

    // Store data for refresh
    localStorage.setItem(
      FORM_STATE_KEY,
      JSON.stringify({
        ...calculatorData,
        persistedAt: Date.now(),
      }),
    )

    setQuery(filterParams(calculatorData), 'replace')

    document.getElementById('points-row')?.classList.add('has-points')

    return { points: expectedValue, lowerBound, upperBound }
  }, [calculatorData, setQuery])

  const prevalenceIsFilled =
    calculatorData.topLocation !== '' ||
    (parsePopulation(calculatorData.population) > 0 &&
      calculatorData.casesPastWeek > 0 &&
      calculatorData.casesIncreasingPercentage >= 0 &&
      calculatorData.positiveCasePercentage !== null &&
      calculatorData.positiveCasePercentage > 0)
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
        <Col md="12" lg="8" id="calculator-introduction">
          <p>
            We reviewed published research about COVID, and used it to make
            rough estimates about the risk level of various activities in
            microCOVIDs. 1&nbsp;microCOVID is a one-in-a-million chance of
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
          <p className="warning">
            <b>Important:</b> In this tool we state our best estimate based on
            available evidence, even when that evidence is not conclusive. We
            have read a lot of experts' research, but we are not ourselves
            experts in this topic. This work has not been scientifically
            peer-reviewed. There is still a lot of uncertainty about COVID. Do
            not rely on this tool for medical advice. Please continue to follow
            government guidance.
          </p>
          <button
            id="reset-form-button"
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset form
          </button>{' '}
          {points > 0 && (showSaveForm ? saveForm : saveButton)}
        </Col>
        <Col lg="4" md="12" className="d-none d-lg-block"></Col>
      </Row>
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
      <Row className="sticky" id="points-row">
        <Col lg={{ span: 8, offset: 4 }}>
          <PointsDisplay
            points={points}
            lowerBound={lowerBound}
            upperBound={upperBound}
            repeatedEvent={repeatedEvent}
          />
        </Col>
      </Row>
      <Row className="explanation" id="explanation-row">
        <Col lg={{ span: 8, offset: 4 }}>
          <ExplanationCard points={points} repeatedEvent={repeatedEvent} />
        </Col>
      </Row>
    </div>
  )
}

// Sets #pointsRow to position: fixed if it would not be on the screen.
const scrollListener = (): void => {
  const pointsRow = document.getElementById('points-row')
  const calculatorRow = document.getElementById('calculator-fields')
  if (!pointsRow || !calculatorRow) {
    return
  }

  const calculatorBounds = calculatorRow.getBoundingClientRect()
  const calculatorWidth = calculatorBounds.width
  const pointsRowHeight = pointsRow.getBoundingClientRect().height

  if (calculatorBounds.bottom + pointsRowHeight <= window.innerHeight) {
    // Bottom of calculator is on the screen
    pointsRow.classList.remove('scrolled-past')
    pointsRow.style.width = 'auto'
  } else {
    pointsRow.classList.add('scrolled-past')
    pointsRow.style.width = calculatorWidth + 'px'
  }
}
