import React, { useState } from 'react'

import { CalculatorData, calculateLocationPersonAverage } from 'data/calculate'
import { Locations, PrevalenceDataDate } from 'data/location'

export const PrevalenceControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => {
  const locationGroups: { [key: string]: Array<string> } = {}
  for (const key in Locations) {
    const location = Locations[key]
    if (location.topLevelGroup !== null) {
      let members = locationGroups[location.topLevelGroup]
      if (members === undefined) {
        members = []
        locationGroups[location.topLevelGroup] = members
      }
      members.push(key)
    }
  }

  const [topLocation, setTopLocation] = useState('')
  const [subLocation, setSubLocation] = useState('')

  const setLocationData = (selectedValue: string) => {
    const locationData = Locations[selectedValue]

    if (locationData) {
      setter({
        ...data,
        location: selectedValue,
        population: locationData.population,
        casesPastWeek: locationData.casesPastWeek,
        casesIncreasingPercentage:
          Math.round(locationData.casesIncreasingPercentage * 10) / 10,
        positiveCasePercentage:
          Math.round(locationData.positiveCasePercentage * 10) / 10,
      })
    }

    if (selectedValue === '') {
      setter({
        ...data,
        location: selectedValue,
        population: '',
        casesPastWeek: 0,
        casesIncreasingPercentage: 0,
        positiveCasePercentage: 0,
      })
    }
  }

  const subPrompt = topLocation.startsWith('US_')
    ? 'Entire state, or select county...'
    : 'Entire country, or select region...'

  return (
    <React.Fragment>
      <header id="location">Step 1 - Choose a location</header>
      <div className="form-group">
        <select
          className="form-control form-control-lg"
          value={topLocation}
          onChange={(e) => {
            setTopLocation(e.target.value)
            setSubLocation('')
            setLocationData(e.target.value)
          }}
        >
          <option value="">Select location or enter data...</option>
          {Object.keys(locationGroups).map((groupName, groupInd) => (
            <optgroup key={groupInd} label={groupName}>
              {locationGroups[groupName].map((locKey, locInd) => (
                <option key={locInd} value={locKey}>
                  {Locations[locKey].label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {topLocation == '' ||
      Locations[topLocation].subdivisions.length == 0 ? null : (
        <div className="form-group">
          <select
            className="form-control form-control-lg"
            value={subLocation}
            onChange={(e) => {
              setSubLocation(e.target.value)
              if (e.target.value == '') {
                setLocationData(topLocation)
              } else {
                setLocationData(e.target.value)
              }
            }}
          >
            <option value="">{subPrompt}</option>
            {Locations[topLocation].subdivisions.map((key, index) => (
              <option key={index} value={key}>
                {Locations[key].label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="duration">Reported cases in past week</label>
        <input
          className="form-control form-control-lg"
          type="number"
          value={data.casesPastWeek}
          onChange={(e) =>
            setter({ ...data, casesPastWeek: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Per how many people?</label>
        <input
          className="form-control form-control-lg"
          type="text"
          value={data.population}
          onChange={(e) => setter({ ...data, population: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Week-over-week increase in cases</label>
        <div className="input-group mb-3">
          <input
            className="form-control form-control-lg"
            type="number"
            value={data.casesIncreasingPercentage}
            onChange={(e) =>
              setter({
                ...data,
                casesIncreasingPercentage: Number(e.target.value),
              })
            }
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              %
            </span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="duration">
          Percent of tests that come back positive
        </label>
        <div className="input-group mb-3">
          <input
            className="form-control form-control-lg"
            type="number"
            value={data.positiveCasePercentage}
            onChange={(e) =>
              setter({
                ...data,
                positiveCasePercentage: Number(e.target.value),
              })
            }
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              %
            </span>
          </div>
        </div>
      </div>
      <p>
        Local person risk: {}
        {Math.round(calculateLocationPersonAverage(data) || 0)} uCOV
      </p>
      <p>
        Prevalence data consolidated from {}
        <a href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data">
          Johns Hopkins CSSE
        </a>{' '}
        (reported cases), {}
        <a href="https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md">
          Covid Act Now
        </a>{' '}
        (US positive test rates), and {}
        <a href="https://ourworldindata.org/coronavirus-testing#testing-for-covid-19-background-the-our-world-in-data-covid-19-testing-dataset">
          Our World in Data
        </a>{' '}
        (international positive test rates).
      </p>
      <p>
        If test positivity data for a region is not available, it will be
        displayed as 20%.
      </p>
      <p>Last updated {PrevalenceDataDate}.</p>
    </React.Fragment>
  )
}
