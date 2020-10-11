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
import { SelectControl } from 'components/calculator/SelectControl'
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

  const points = useMemo(() => {
    // Risk calculation
    const computedValue = calculate(calculatorData)

    if (computedValue) {
      recordCalculatorChanged(computedValue)
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

    if (computedValue === null) {
      document.getElementById('points-row')?.classList.remove('has-points')
      return -1
    }

    document.getElementById('points-row')?.classList.add('has-points')

    return computedValue
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
            We’ve constructed a calculator that lets you estimate the risk of
            getting COVID from a wide range of activities, using the{' '}
            <a href="/paper">best research available</a>. We hope this tool will
            help hone your intuition, lower your stress levels, and figure out
            good harm-reduction strategies. To read about some high level
            conclusions we’ve come to about what is and isn’t risky,{' '}
            <a href="/paper">click here</a>.
          </p>
          <FirstTimeUserIntroduction />
        </Col>
        <Col lg="4" md="12" className="d-none d-lg-block"></Col>
      </Row>
      <Row>
        <Col lg="7" md="12">
          <h2>Calculate the approximate COVID risk of any activity</h2>
        </Col>
        <Col lg="5" md="12" className="calculator-buttons">
          {points > 0 && (showSaveForm ? saveForm : saveButton)}{' '}
          <button
            id="reset-form-button"
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset form
          </button>
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

        <Col md="12" lg="8">
          <Card id="person-risk">
            {prevalenceIsFilled ? (
              <React.Fragment>
                <header id="activity-risk">
                  Step 2: Describe the activity
                </header>
                <div>
                  <SavedDataSelector
                    currentData={calculatorData}
                    setter={setCalculatorData}
                  />

                  <SelectControl
                    id="interaction"
                    label="Is this a single activity or an ongoing relationship?"
                    data={calculatorData}
                    setter={setCalculatorData}
                    source={Interaction}
                    hideRisk={true}
                  />
                </div>

                <Row>
                  <Col
                    md="12"
                    lg="6"
                    id="person-risk"
                    className="calculator-params"
                  >
                    <PersonRiskControls
                      data={calculatorData}
                      setter={setCalculatorData}
                      repeatedEvent={repeatedEvent}
                    />
                  </Col>
                  <Col
                    md="12"
                    lg="6"
                    id="modifiers"
                    className="calculator-params"
                  >
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
        <Col>
          <PointsDisplay points={points} repeatedEvent={repeatedEvent} />
        </Col>
      </Row>
      <Row className="explanation" id="explanation-row">
        <Col md="12">
          <ExplanationCard points={points} repeatedEvent={repeatedEvent} />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 8 }}>
          <p className="warning">
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
