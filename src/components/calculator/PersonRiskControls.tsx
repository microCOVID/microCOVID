import React from 'react'
import { Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import { SelectControl } from './SelectControl'
import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculatePersonRiskEach,
} from 'data/calculate'
import { RiskProfile } from 'data/data'

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
}> = ({ data, setter }): React.ReactElement => {
  const locationRisk = calculateLocationPersonAverage(data) || 0
  const personRiskEach = Math.round(
    calculatePersonRiskEach(data, locationRisk) || 0,
  )

  const { t } = useTranslation()

  return (
    <React.Fragment>
      <header id="person-risk">
        <Trans>calculator.risk_step_label</Trans>
      </header>
      <div className="form-group">
        <label htmlFor="personCount">
          <Trans>calculator.number_of_people_near_you</Trans>
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
        label={t('calculator.person_risk_profile')}
        popover={personRiskPopover}
        data={data}
        setter={setter}
        source={RiskProfile}
        hideRisk={true}
      />
      <br />
      <p className="readout">
        <Trans values={{ calc_results: personRiskEach.toLocaleString() }}>
          calculator.risk_calculation_results
        </Trans>
      </p>
    </React.Fragment>
  )
}

function GroupSizeWarning(props: { people: number }): React.ReactElement {
  if (props.people >= 100) {
    return (
      <div className="warning">
        <Trans>calculator.verylarge_warning</Trans>
      </div>
    )
  }
  if (props.people >= 25) {
    return (
      <div className="warning">
        <Trans>calculator.large_warning</Trans>
      </div>
    )
  }
  return <div />
}
