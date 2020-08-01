import React, { useMemo, useState } from 'react'

import './styles/App.scss'
import {
  Prevalence,
  RiskProfile,
  Interaction,
  Setting,
  Distance,
  TheirMask,
  YourMask,
  FormValue,
} from './data'

const Card: React.FunctionComponent<{ title: string }> = (props) => (
  <div className='card mb-3'>
    <div className='card-header'>{props.title}</div>
    <div className='card-body'>{props.children}</div>
  </div>
)

const SelectControl: React.FunctionComponent<{
  id: string
  setter: (value: any) => void
  value: string
  data: { [key: string]: FormValue }
  label?: string
}> = (props) => (
  <div className='form-group'>
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    <select
      id={props.id}
      className='form-control form-control-lg'
      onChange={(e) => props.setter(e.target.value)}
      value={props.value}
    >
      {Object.keys(props.data).map((value, index) => (
        <option key={index} value={value}>
          {props.data[value].label}
        </option>
      ))}
      <optgroup label=''></optgroup>
    </select>
  </div>
)

export const App = () => {
  // Location risk state
  const [prevalence, setPrevalence] = useState<string>('sf')

  // Person risk state
  const [riskProfile, setRiskProfile] = useState<string>('average')
  const [interaction, setInteraction] = useState<string>('oneTime')
  const [personCount, setPersonCount] = useState<number>(1)

  // Activity risk state
  const [setting, setSetting] = useState<string>('outdoor')
  const [distance, setDistance] = useState<string>('normal')
  const [duration, setDuration] = useState<number>(60)
  const [theirMask, setTheirMask] = useState<string>('masked')
  const [yourMask, setYourMask] = useState<string>('masked')

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
    <div className='App'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h1 className='mt-4'>microCOVID Calculator</h1>

            <p>
              It can be pretty annoying to calculate microCOVIDs for every
              activity you’re considering. With that in mind, we developed a
              calculator tool to help you estimate and multiply the person risk,
              activity risk, and any discounts, to get an estimated number of
              microCOVIDs from a given activity.
            </p>

            <Card title='Location/Prevalence'>
              <p>
                Prevalence options are rough estimates for a given place and
                time.
              </p>
              <SelectControl
                id='prevalence'
                setter={setPrevalence}
                value={prevalence}
                data={Prevalence}
              />
            </Card>

            <Card title='Person Risk'>
              <div className='form-group'>
                <label htmlFor='personCount'>Number of people</label>
                <input
                  className='form-control form-control-lg'
                  type='number'
                  value={personCount}
                  onChange={(e) => setPersonCount(parseInt(e.target.value))}
                />
              </div>

              <SelectControl
                id='riskProfile'
                label='Person(s) Risk Profile'
                setter={setRiskProfile}
                value={riskProfile}
                data={RiskProfile}
              />

              <SelectControl
                id='interactionType'
                label='Frequency of Interaction'
                setter={setInteraction}
                value={interaction}
                data={Interaction}
              />
            </Card>

            <Card title='Activity Risk'>
              <SelectControl
                id='setting'
                label='Setting'
                setter={setSetting}
                value={setting}
                data={Setting}
              />

              <SelectControl
                id='distance'
                label='Distance'
                setter={setDistance}
                value={distance}
                data={Distance}
              />

              <div className='form-group'>
                <label htmlFor='duration'>Duration (in minutes)</label>
                <input
                  className='form-control form-control-lg'
                  type='number'
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </div>

              <SelectControl
                id='theirMask'
                label='Their Mask'
                setter={setTheirMask}
                value={theirMask}
                data={TheirMask}
              />

              <SelectControl
                id='yourMask'
                label='Your Mask'
                setter={setYourMask}
                value={yourMask}
                data={YourMask}
              />
            </Card>

            <Card title='Result'>
              <h1>
                {points} points
                {interaction === 'repeated' && '/week'}
              </h1>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
