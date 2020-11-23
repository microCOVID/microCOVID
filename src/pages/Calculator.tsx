import copy from 'copy-to-clipboard'
import { stringify } from 'query-string'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsLink45Deg } from 'react-icons/bs'
import { encodeQueryParams, useQueryParams } from 'use-query-params'
import 'pages/styles/Calculator.scss'

import { recordCalculatorChanged } from 'components/Analytics'
import { AutoAlert } from 'components/AutoAlert'
import { ActivityRiskControls } from 'components/calculator/ActivityRiskControls'
import ExplanationCard from 'components/calculator/ExplanationCard/ExplanationCard'
import { FirstTimeUserIntroduction } from 'components/calculator/FirstTimeUserIntroduction'
import { PersonRiskControls } from 'components/calculator/PersonRiskControls'
import PointsDisplay from 'components/calculator/PointsDisplay'
import { PrevalenceControls } from 'components/calculator/PrevalenceControls'
import { SavedDataSelector } from 'components/calculator/SavedDataSelector'
import { GenericSelectControl } from 'components/calculator/SelectControl'
import { Card } from 'components/Card'
import {
  CalculatorData,
  calculate,
  defaultValues,
  migrateDataToCurrent,
  parsePopulation,
} from 'data/calculate'
import { Interaction } from 'data/data'
import {
  filterParams,
  queryConfig,
  useQueryDataIfPresent,
} from 'data/queryParams'

const localStorage = window.localStorage
const FORM_STATE_KEY = 'formData'

export const Calculator = (): React.ReactElement => {
  const [query, setQuery] = useQueryParams(queryConfig)
  const [scenarioName, setScenarioName] = useState('')

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

  const [alerts, setAlerts] = useState<string[]>([])
  const [calculatorData, setCalculatorData] = useState<CalculatorData>(
    useQueryDataIfPresent(query, migratedPreviousData),
  )

  const addAlert = (alert: string) => setAlerts([...alerts, alert])

  const removeQueryParams = () => {
    window.history.replaceState(null, '', window.location.href.split('?')[0])
  }

  const resetForm = () => {
    window.scrollTo(0, 0)
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(defaultValues))
    setCalculatorData(defaultValues)
    setScenarioName('')
    removeQueryParams()
  }

  const getShareURL = (calculatorData: CalculatorData) => {
    const encodedQuery = encodeQueryParams(
      queryConfig,
      filterParams(calculatorData),
    )
    const location = window.location

    let link = `${location.protocol}//${location.host}${location.pathname}`
    link += `${link}?${stringify(encodedQuery)}`
    return link
  }

  const copyShareURL = (calculatorData: CalculatorData) => {
    copy(getShareURL(calculatorData))
    addAlert('Link copied to clipboard!')
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

  const shareButton = (
    <button
      type="button"
      className="btn btn-info float-right"
      onClick={() => copyShareURL(calculatorData)}
    >
      <BsLink45Deg /> <Trans>button.copy_link</Trans>
    </button>
  )

  const { t } = useTranslation()

  return (
    <div id="calculator">
      <Row>
        <Col md="12" lg="8" id="calculator-introduction">
          <p>
            <Trans i18nKey="calculator.intro.whats_this">
              Lorem ipsum <a href="/paper">whitepaper</a> dolor sic amet...
            </Trans>
          </p>
          <FirstTimeUserIntroduction />
        </Col>
        <Col lg="4" md="12" className="d-none d-lg-block"></Col>
      </Row>
      <Row>
        <Col>
          <h2>
            <Trans>calculator.intro.call_to_action</Trans>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="calculator-buttons">
          <SavedDataSelector
            currentData={calculatorData}
            setter={setCalculatorData}
            scenarioName={scenarioName}
            scenarioNameSetter={setScenarioName}
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
                  <Trans>calculator.risk_step_label</Trans>
                </header>
                {!scenarioName ? null : (
                  <Alert variant="info">
                    You selected this scenario: <strong>{scenarioName}</strong>.
                    Do the points below look like the activity you have in mind?
                    If not, adjust it until it looks right.
                  </Alert>
                )}
                <div>
                  <GenericSelectControl
                    id="interaction"
                    label={t('calculator.type_of_interaction')}
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
                    {alerts.map((alert, idx) => (
                      <AutoAlert
                        key={idx}
                        variant="info"
                        message={alert}
                        timeout={3000}
                      />
                    ))}
                    <button
                      id="reset-form-button"
                      type="button"
                      className="btn btn-secondary float-right"
                      onClick={resetForm}
                    >
                      <Trans>button.reset_form</Trans>
                    </button>
                    {shareButton}
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <div className="empty">
                <Trans>calculator.risk_group_empty_warning</Trans>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="sticky" id="points-row">
        <Col md="12" lg={{ span: 8, offset: 4 }}>
          <PointsDisplay
            points={points}
            repeatedEvent={repeatedEvent}
            riskBudget={calculatorData.riskBudget}
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
            data={calculatorData}
            setter={setCalculatorData}
            lowerBound={lowerBound}
            upperBound={upperBound}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 8, offset: 4 }}>
          <p className="warning" style={{ margin: '0' }}>
            <b>
              <Trans>calculator.warning.important</Trans>:{' '}
            </b>
            <Trans>calculator.warning.body</Trans>
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
