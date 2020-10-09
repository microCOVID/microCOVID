import React from 'react'
import { Popover } from 'react-bootstrap'

import { SelectControl } from './SelectControl'
import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculatePersonRiskEach,
} from 'data/calculate'
import { Distance, RiskProfile } from 'data/data'

const personRiskPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About "Person Risk"</Popover.Title>
    <Popover.Content>
      <p>
        An "average risk person in your area" is based on the prevalence of
        COVID in your geographic area, as explained in the{' '}
        <a href="/paper/7-basic-method" target="_blank">
          Basic Method
        </a>{' '}
        from the white paper.
      </p>
      <p>
        We have modeled several additional Person Risk examples using the{' '}
        <a href="/paper/9-advanced-method" target="_blank">
          Advanced Method
        </a>{' '}
        from the white paper. Select the one that most closely matches the
        person or people you are planning to interact with. We suggest you
        "round up" if you are uncertain.
      </p>
    </Popover.Content>
  </Popover>
)

export const PersonRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const locationRisk = calculateLocationPersonAverage(data) || 0
  const personRiskEach = Math.round(
    calculatePersonRiskEach(data, locationRisk) || 0,
  )

  return (
    <React.Fragment>
      <strong>Nearby people</strong>
      <div className="form-group">
        <label htmlFor="personCount">
          <div>
            How many people get near you?
            <br />
            <em>(within 10ft or less)</em>
          </div>
        </label>
        <input
          className="form-control form-control-lg"
          type="number"
          value={data.personCount}
          onChange={(e) =>
            setter({
              ...data,
              personCount: Math.max(0, parseInt(e.target.value)),
            })
          }
        />
        <GroupSizeWarning people={data.personCount} />
      </div>
      <SelectControl
        id="riskProfile"
        label="What is their risk profile?"
        popover={personRiskPopover}
        data={data}
        setter={setter}
        source={RiskProfile}
        hideRisk={true}
      />
      {!repeatedEvent ? (
        <React.Fragment>
          <div className="form-group">
            <label htmlFor="duration">
              How long are each of these people typically near you, in minutes?
            </label>
            <input
              className="form-control form-control-lg"
              type="number"
              value={data.duration}
              onChange={(e) =>
                setter({
                  ...data,
                  duration: Math.max(0, parseInt(e.target.value)),
                })
              }
            />
          </div>
          <SelectControl
            id="distance"
            label="How close are they, on average?"
            data={data}
            setter={setter}
            source={Distance}
          />
        </React.Fragment>
      ) : null}
      <br />
      <p className="readout">
        The <i>first</i> part of the calculation is Person Risk: Each other
        person has a <b>{personRiskEach.toLocaleString()}</b>
        -in-a-million chance of currently having COVID.
      </p>
    </React.Fragment>
  )
}

function GroupSizeWarning(props: { people: number }): React.ReactElement {
  if (props.people >= 100) {
    return (
      <div className="warning">
        Warning: This is a VERY large group of people; getting them together is
        a high risk of a dangerous superspreading event.
      </div>
    )
  }
  if (props.people >= 25) {
    return (
      <div className="warning">
        Warning: This is a large group of people; getting them together puts
        everyone at risk.{' '}
      </div>
    )
  }
  return <div />
}
