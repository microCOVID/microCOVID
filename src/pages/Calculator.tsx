import React, { useMemo, useState } from 'react'

import { ActivityRiskControls } from 'components/calculator/ActivityRiskControls'
import { PersonRiskControls } from 'components/calculator/PersonRiskControls'
import { PrevalanceControls } from 'components/calculator/PrevalenceControls'
import { SavedDataSelector } from 'components/calculator/SavedDataSelector'
import { Card } from 'components/Card'
import { CalculatorData, calculate, defaultValues } from 'data/calculate'
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

    // Something went wrong
    if (computedValue === null) {
      setCalculatorData(defaultValues)
      return 0
    }

    // Store data for refresh
    localStorage.setItem(
      FORM_STATE_KEY,
      JSON.stringify({
        ...calculatorData,
        persistedAt: Date.now(),
      }),
    )

    // Round points < 10
    return computedValue > 10
      ? Math.round(computedValue)
      : computedValue.toFixed(2)
  }, [calculatorData])

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
        {points} points
        {calculatorData.interaction === 'repeated' && '/week'}
      </h1>

      {showSaveForm ? saveForm : saveButton}
    </Card>
  )

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <h1 className="mt-4">microCOVID Calculator</h1>

          <p>
            It can be pretty annoying to calculate microCOVIDs for every
            activity you’re considering. With that in mind, we developed a
            calculator tool to help you estimate and multiply the person risk,
            activity risk, and any discounts, to get an estimated number of
            microCOVIDs from a given activity.
          </p>

          {/* Form controls */}
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
              <div className="col-4">
                <SavedDataSelector
                  currentData={calculatorData}
                  setter={setCalculatorData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block col-lg-4">{saveControl}</div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <Card title="Location/Prevalence">
            <p>
              Prevalence options are rough estimates for a given place and time.
            </p>

            <PrevalanceControls
              data={calculatorData}
              setter={setCalculatorData}
            />
          </Card>
        </div>

        <div className="col-md-12 col-lg-4">
          <Card title="Person Risk">
            <PersonRiskControls
              data={calculatorData}
              setter={setCalculatorData}
            />
          </Card>
        </div>

        <div className="col-md-12 col-lg-4">
          <Card title="Activity Risk">
            <ActivityRiskControls
              data={calculatorData}
              setter={setCalculatorData}
            />
          </Card>
        </div>

        <div className="d-lg-none col-md-12 col-lg-4">{saveControl}</div>
      </div>
    </div>
  )
}
