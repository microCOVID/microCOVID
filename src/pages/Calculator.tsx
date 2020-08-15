import React, { useMemo, useState } from 'react'

import { Card } from 'components/Card'
import { SelectControl } from 'components/SelectControl'
import {
  Distance,
  Interaction,
  Prevalence,
  RiskProfile,
  Setting,
  TheirMask,
  YourMask,
} from 'data/data'

const localStorage = window.localStorage
const FORM_STATE_KEY = 'formData'
const SAVED_DATA_KEY = 'savedEntries'

export const Calculator = (): React.ReactElement => {
  const previousData = JSON.parse(localStorage.getItem(FORM_STATE_KEY) || '{}')

  // Location risk state
  const [prevalence, setPrevalence] = useState<string>(
    previousData.prevalence || 'sf',
  )

  // Person risk state
  const [riskProfile, setRiskProfile] = useState<string>(
    previousData.riskProfile || 'average',
  )
  const [interaction, setInteraction] = useState<string>(
    previousData.interaction || 'oneTime',
  )
  const [personCount, setPersonCount] = useState<number>(
    previousData.personCount || 1,
  )

  // Activity risk state
  const [setting, setSetting] = useState<string>(
    previousData.setting || 'outdoor',
  )
  const [distance, setDistance] = useState<string>(
    previousData.distance || 'normal',
  )
  const [duration, setDuration] = useState<number>(previousData.duration || 60)
  const [theirMask, setTheirMask] = useState<string>(
    previousData.theirMask || 'masked',
  )
  const [yourMask, setYourMask] = useState<string>(
    previousData.yourMask || 'masked',
  )

  const resetForm = () => {
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify({}))
    window.location.reload()
  }

  // Save and restore data
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [saveName, setSaveName] = useState('')

  const saved: Array<[string, { [key: string]: string | number }]> = JSON.parse(
    localStorage.getItem(SAVED_DATA_KEY) || '[]',
  )

  console.log(saved)

  const saveCalculation = () => {
    const newData = {
      persistedAt: Date.now(),
      prevalence,
      riskProfile,
      interaction,
      personCount,
      setting,
      distance,
      duration,
      theirMask,
      yourMask,
    }

    saved.push([saveName, newData])
    localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(saved))

    setSaveName('')
    setShowSaveForm(false)
  }

  const loadData = (index: number) => {
    const data = saved[index]
    if (data) {
      localStorage.setItem(FORM_STATE_KEY, JSON.stringify(data[1]))
      window.location.reload()
    }
  }

  // Risk calculation
  const points = useMemo(() => {
    let points = Prevalence[prevalence].multiplier

    // Person risk
    points *= personCount
    points *= RiskProfile[riskProfile].multiplier

    // Activity risk
    points *= Setting[setting].multiplier
    points *= Distance[distance].multiplier
    points *= TheirMask[theirMask].multiplier
    points *= YourMask[yourMask].multiplier

    // Duration + interaction type
    if (interaction === 'repeated') {
      points *= Interaction[interaction].multiplier
    } else {
      points *=
        Interaction[interaction].multiplier *
        Math.min((duration || 60) / 60.0, 4)
    }

    // Store data for refresh
    localStorage.setItem(
      FORM_STATE_KEY,
      JSON.stringify({
        persistedAt: Date.now(),
        prevalence,
        riskProfile,
        interaction,
        personCount,
        setting,
        distance,
        duration,
        theirMask,
        yourMask,
      }),
    )

    return points > 10 ? Math.round(points) : points.toFixed(2)
  }, [
    prevalence,
    riskProfile,
    interaction,
    personCount,
    setting,
    distance,
    duration,
    theirMask,
    yourMask,
  ])

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="mt-4">microCOVID Calculator</h1>

            <p>
              It can be pretty annoying to calculate microCOVIDs for every
              activity you’re considering. With that in mind, we developed a
              calculator tool to help you estimate and multiply the person risk,
              activity risk, and any discounts, to get an estimated number of
              microCOVIDs from a given activity.
            </p>

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
                <div className="col">
                  {saved.length > 0 && (
                    <select
                      className="form-control"
                      onChange={(e) => loadData(parseInt(e.target.value))}
                    >
                      <option>Load a saved result</option>
                      {saved.map((v, i) => (
                        <option key={i} value={i}>
                          {v[0]}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            <Card title="Location/Prevalence">
              <p>
                Prevalence options are rough estimates for a given place and
                time.
              </p>
              <SelectControl
                id="prevalence"
                setter={setPrevalence}
                value={prevalence}
                data={Prevalence}
              />
            </Card>

            <Card title="Person Risk">
              <div className="form-group">
                <label htmlFor="personCount">Number of people</label>
                <input
                  className="form-control form-control-lg"
                  type="number"
                  value={personCount}
                  onChange={(e) => setPersonCount(parseInt(e.target.value))}
                />
              </div>

              <SelectControl
                id="riskProfile"
                label="Person(s) Risk Profile"
                setter={setRiskProfile}
                value={riskProfile}
                data={RiskProfile}
              />

              <SelectControl
                id="interactionType"
                label="Frequency of Interaction"
                setter={setInteraction}
                value={interaction}
                data={Interaction}
              />
            </Card>

            <Card title="Activity Risk">
              <SelectControl
                id="setting"
                label="Setting"
                setter={setSetting}
                value={setting}
                data={Setting}
              />

              <SelectControl
                id="distance"
                label="Distance"
                setter={setDistance}
                value={distance}
                data={Distance}
              />

              <div className="form-group">
                <label htmlFor="duration">Duration (in minutes)</label>
                <input
                  className="form-control form-control-lg"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </div>

              <SelectControl
                id="theirMask"
                label="Their Mask"
                setter={setTheirMask}
                value={theirMask}
                data={TheirMask}
              />

              <SelectControl
                id="yourMask"
                label="Your Mask"
                setter={setYourMask}
                value={yourMask}
                data={YourMask}
              />
            </Card>

            <Card title="Result">
              <h1>
                {points} points
                {interaction === 'repeated' && '/week'}
              </h1>

              {!showSaveForm && (
                <p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowSaveForm(true)}
                  >
                    Save parameters
                  </button>
                </p>
              )}

              {showSaveForm && (
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter metric name"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={saveCalculation}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
