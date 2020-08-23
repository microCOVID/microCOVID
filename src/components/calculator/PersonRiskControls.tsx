import React from 'react'
import { Popover } from 'react-bootstrap'

import { SelectControl } from './SelectControl'
import { CalculatorData } from 'data/calculate'
import { Interaction, RiskProfile } from 'data/data'

const personRiskPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About "Person Risk"</Popover.Title>
    <Popover.Content>
      <p>
        An "average risk person in your area" is based on the prevalence of
        COVID in your geographic area, as explained in the Basic Method from the
        white paper.
      </p>
      <p>
        We have modeled several additional Person Risk examples using the
        Advanced Method from the white paper. Select the one that most closely
        matches the person or people you are planning to interact with. We
        suggest you "round up" if you are uncertain.
      </p>
      <p>
        If you use the{' '}
        <a
          href="https://docs.google.com/spreadsheets/d/1DYIJgjG3H5rwt52NT2TX_m429snmIU-jGw1a8ZODwGQ/edit#gid=601829656"
          target="_blank"
          rel="noreferrer"
        >
          activity log spreadsheet
        </a>{' '}
        to calculate someone's Person Risk based on a list of their recent
        behaviors, then you can insert this number as a custom value.
      </p>
    </Popover.Content>
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
