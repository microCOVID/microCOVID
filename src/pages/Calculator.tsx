import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useQueryParams } from 'use-query-params'

import {
  recordCalculatorChanged,
  recordSavedCustom,
} from 'components/Analytics'
import { ActivityRiskControls } from 'components/calculator/ActivityRiskControls'
import ExplanationCard from 'components/calculator/ExplanationCard/ExplanationCard'
import { PersonRiskControls } from 'components/calculator/PersonRiskControls'
import PointsDisplay from 'components/calculator/PointsDisplay'
import { PrevalenceControls } from 'components/calculator/PrevalenceControls'
import { SavedDataSelector } from 'components/calculator/SavedDataSelector'
import { GenericSelectControl } from 'components/calculator/SelectControl'
import { Card } from 'components/Card'
import { FirstTimeUserIntroduction } from 'components/FirstTimeUserIntroduction'
import {
  CalculatorData,
  calculate,
  defaultValues,
  migrateDataToCurrent,
  parsePopulation,
} from 'data/calculate'
import { Interaction } from 'data/data'
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

  const [riskBudget, setRiskBudget] = useState(10000)

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
    <div className="input-group save-form float-right col-lg-6 col-md-8">
      <input
        className="form-control"
        type="text"
        placeholder="Name of your custom scenario"
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
    <button
      type="button"
      className="btn btn-secondary float-right"
      onClick={() => setShowSaveForm(true)}
    >
      Save as custom scenario
    </button>
  )

  return (
    <div id="calculator">
      <Row>
        <Col md="12" lg="8" id="calculator-introduction">
          <p>
            We’ve constructed a calculator that lets you estimate the risk of
            getting COVID from a wide range of activities, using the{' '}
            <a href="/paper">best research available</a>. We hope this tool will
            help hone your intuition, lower your stress levels, and figure out
            good harm-reduction strategies.
          </p>
          <FirstTimeUserIntroduction />
        </Col>
        <Col lg="4" md="12" className="d-none d-lg-block"></Col>
      </Row>
      <Row>
        <Col>
          <h2>Calculate the approximate COVID risk of any activity</h2>
        </Col>
      </Row>
      <Row>
        <Col className="calculator-buttons">
          <SavedDataSelector
            currentData={calculatorData}
            setter={setCalculatorData}
          />
        </Col>
      </Row>
      <Row id="calculator-fields">
        <Col md="12" lg="4">
          <Card id="location">
            <PrevalenceControls
              data={calculatorData}
              setter={setCalculatorData}
            />
          </Card>
        </Col>

        <Col md="12" lg="8" id="activity-section">
          <Card id="person-risk">
            {prevalenceIsFilled ? (
              <React.Fragment>
                <header id="activity-risk">
                  Step 2: Describe the activity
                </header>
                <div>
                  <GenericSelectControl
                    id="interaction"
                    label="Is this a single activity or an ongoing relationship?"
                    // This setter defaults to a personCount of 1 if the interaction type is "partner"
                    setter={(value) =>
                      setCalculatorData({
                        ...calculatorData,
                        interaction: value,
                        personCount:
                          value === 'partner' ? 1 : calculatorData.personCount,
                      })
                    }
                    value={calculatorData.interaction}
                    source={Interaction}
                    hideRisk={true}
                  />
                </div>

                <Row>
                  <Col xs="12" id="person-risk" className="calculator-params">
                    <PersonRiskControls
                      data={calculatorData}
                      setter={setCalculatorData}
                      repeatedEvent={repeatedEvent}
                    />
                  </Col>
                  <Col xs="12" id="modifiers" className="calculator-params">
                    <ActivityRiskControls
                      data={calculatorData}
                      setter={setCalculatorData}
                      repeatedEvent={repeatedEvent}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="form-buttons">
                    <button
                      id="reset-form-button"
                      type="button"
                      className="btn btn-secondary float-right"
                      onClick={resetForm}
                    >
                      Reset form
                    </button>
                    {points > 0 && (showSaveForm ? saveForm : saveButton)}
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <div className="empty">First, enter your location</div>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="sticky" id="points-row">
        <Col md="12" lg={{ span: 8, offset: 4 }}>
          <PointsDisplay
            points={points}
            repeatedEvent={repeatedEvent}
            riskBudget={riskBudget}
            riskBudgetSetter={setRiskBudget}
            lowerBound={lowerBound}
            upperBound={upperBound}
          />
        </Col>
      </Row>
      <Row className="explanation" id="explanation-row">
        <Col md="12" lg={{ span: 8, offset: 4 }}>
          <ExplanationCard
            points={points}
            repeatedEvent={repeatedEvent}
            riskBudget={riskBudget}
            riskBudgetSetter={setRiskBudget}
            data={calculatorData}
            lowerBound={lowerBound}
            upperBound={upperBound}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 8, offset: 4 }}>
          <p className="warning" style={{ margin: '0' }}>
            <b>Important:</b> In this tool we state our best estimate based on
            available evidence, even when that evidence is not conclusive. We
            have read a lot of experts' research, but we are not ourselves
            experts in this topic. This work has not been scientifically
            peer-reviewed. There is still a lot of uncertainty about COVID. Do
            not rely on this tool for medical advice. Please continue to follow
            government guidance.
          </p>
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
