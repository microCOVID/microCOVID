import React from 'react'
import { Popover } from 'react-bootstrap'

import { SelectControl } from './SelectControl'
import { CalculatorData } from 'data/calculate'
import { Interaction, RiskProfile } from 'data/data'

const personRiskPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Person Risk Tooltip</Popover.Title>
    <Popover.Content>Some content goes here.</Popover.Content>
  </Popover>
)

export const PersonRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => (
  <React.Fragment>
    <header id="person-risk">Step 2 - Person Risk</header>
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
      popover={personRiskPopover}
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
