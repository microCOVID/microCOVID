import React from 'react'

import { SelectControl } from './SelectControl'
import { CalculatorData } from 'data/calculate'
import { Interaction, RiskProfile } from 'data/data'

export const PersonRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => (
  <React.Fragment>
    <div className="form-group">
      <label htmlFor="personCount">Number of people</label>
      <input
        className="form-control form-control-lg"
        type="number"
        value={data.personCount}
        onChange={(e) =>
          setter({
            ...data,
            personCount: parseInt(e.target.value),
          })
        }
      />
    </div>

    <SelectControl
      id="riskProfile"
      label="Person(s) Risk Profile"
      data={data}
      setter={setter}
      source={RiskProfile}
    />

    <SelectControl
      id="interaction"
      label="Frequency of Interaction"
      data={data}
      setter={setter}
      source={Interaction}
    />
  </React.Fragment>
)
