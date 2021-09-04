import React from 'react'
import { Popover } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { SelectControl } from '../controls/SelectControl'
import { fixedPointPrecision } from '../util/FormatPrecision'

import { CalculatorData, calculatePersonRiskEach } from 'data/calculate'
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

export function RiskProfileSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <SelectControl
      id="riskProfile"
      label={t('calculator.person_risk_profile_question')}
      header={t('calculator.person_risk_profile_header')}
      helpText={
        !props.repeatedEvent ? '' : t('calculator.household_members_note')
      }
      popover={personRiskPopover}
      data={props.data}
      setter={props.setter}
      source={RiskProfile}
      hideRisk={true}
      labelFactory={(riskProfileKey: string) => {
        const riskProfile = RiskProfile[riskProfileKey]
        const personRisk = calculatePersonRiskEach({
          ...props.data,
          riskProfile: riskProfileKey,
        })
        return (
          riskProfile.label +
          (personRisk === null
            ? ''
            : ` [${fixedPointPrecision(personRisk)} microCOVIDs]`)
        )
      }}
    />
  )
}
