import React from 'react'

import { CalculatorData } from 'data/calculate'
import { ExampleLocations, PrevalenceDataDate } from 'data/location'

export const PrevalanceControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => {
  return (
    <React.Fragment>
      <div className="form-group">
        <select
          className="form-control form-control-lg"
          value={data.location}
          onChange={(e) => {
            const selectedValue = e.target.value
            const exampleData = ExampleLocations[selectedValue]

            if (exampleData) {
              setter({
                ...data,
                location: selectedValue,
                population: exampleData.population,
                casesPastWeek: exampleData.casesPastWeek,
                casesWeekBefore: exampleData.casesWeekBefore,
                positiveCasePercentage: exampleData.positiveCasePercentage,
              })
            }

            if (selectedValue === 'custom' || selectedValue === '') {
              setter({
                ...data,
                location: selectedValue,
                population: '',
                casesPastWeek: 0,
                casesWeekBefore: 0,
                positiveCasePercentage: 0,
              })
            }
          }}
        >
          <option value="">Select location...</option>
          <optgroup label="Examples from post">
          {Object.keys(ExampleLocations).map((value, index) => (
            <option key={index} value={value}>
              {ExampleLocations[value].label}
            </option>
          ))}
          </optgroup>
          <optgroup label={"US states as of " + PrevalenceDataDate}>
          </optgroup>
          <option value="custom">Custom location</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Population</label>
        <input
          className="form-control form-control-lg"
          type="text"
          value={data.population}
          onChange={(e) => setter({ ...data, population: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Cases in past week</label>
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
        <label htmlFor="duration">Cases in week before last</label>
        <input
          className="form-control form-control-lg"
          type="number"
          value={data.casesWeekBefore}
          onChange={(e) =>
            setter({ ...data, casesWeekBefore: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Positive case percentage</label>
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
    </React.Fragment>
  )
}
