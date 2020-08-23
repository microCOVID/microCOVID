import React, { useMemo, useState } from 'react'

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
      return 0
    }

    // Round points < 10
    return computedValue > 10
      ? Math.round(computedValue)
      : computedValue.toFixed(2)
  }, [calculatorData])

  const showPersonRisk =
    parsePopulation(calculatorData.population) > 0 &&
    calculatorData.casesPastWeek > 0 &&
    calculatorData.casesWeekBefore > 0 &&
    calculatorData.positiveCasePercentage > 0
  const showActivityRisk =
    calculatorData.personCount > 0 &&
    calculatorData.riskProfile !== '' &&
    calculatorData.interaction !== ''
  const showPoints =
    showPersonRisk &&
    showActivityRisk &&
    calculatorData.setting !== '' &&
    calculatorData.distance !== '' &&
    calculatorData.duration > 0 &&
    calculatorData.theirMask !== '' &&
    calculatorData.yourMask !== ''

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
    <p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowSaveForm(true)}
      >
        Save parameters
      </button>
    </p>
  )
  const saveControl = (
    <Card title="Result">
      <h1>
        {showPoints ? points : '-'} µCOV
        {calculatorData.interaction === 'repeated' && '/week'}
      </h1>
      {showPoints && (showSaveForm ? saveForm : saveButton)}
    </Card>
  )

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <p>
            We created a calculator to assess “cost” in microCOVIDs of various
            activities. We hope you’ll use it to build your intuition about the
            comparative risk of different activities and as a harm-reduction
            tool to make safer choices.
          </p>
          <p>
            Play around with the calculator! Change the variables and see how
            they affect the total.
          </p>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="calc-col-header filled">
            First, select a location to use in your calculations, or fill in
            your own values based on data available in your area....
          </div>

          <Card id="location" title="Step 1: Location/Prevalence">
            <PrevalanceControls
              data={calculatorData}
              setter={setCalculatorData}
            />
          </Card>
        </div>

        <div className="col-md-12 col-lg-4">
          <div className="calc-col-header filled">
            <p>
              ...then select a scenario from the list below (or make your own).
            </p>
            <SavedDataSelector
              currentData={calculatorData}
              setter={setCalculatorData}
            />
          </div>

          <Card id="person-risk" title="Step 2: Person Risk">
            {showPersonRisk ? (
              <PersonRiskControls
                data={calculatorData}
                setter={setCalculatorData}
              />
            ) : (
              <span className="empty">
                First, fill out prevalance information.
              </span>
            )}
          </Card>
        </div>

        <div className="col-md-12 col-lg-4">
          <div className="calc-col-header filled">
            Customize the calculator to fit your specific scenario, and save
            your results to come back to later.
          </div>

          <Card id="activity-risk" title="Step 3: Activity Risk">
            {showActivityRisk ? (
              <ActivityRiskControls
                data={calculatorData}
                setter={setCalculatorData}
              />
            ) : (
              <span className="empty">
                Then, fill out details about person risk.
              </span>
            )}
          </Card>
        </div>

        <div className="col-lg-4 col-md-12">
          {saveControl}

          <div className="mb-4">
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Reset form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
