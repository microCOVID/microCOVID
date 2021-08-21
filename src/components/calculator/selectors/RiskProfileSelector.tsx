import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ControlLabel from '../controls/ControlLabel'

import { recordCalculatorOptionSelected } from 'components/Analytics'
import { CalculatorData, calculatePersonRiskEach } from 'data/calculate'
import {
  RiskProfile,
  RiskProfileCurrent,
  RiskProfileDeprecated,
  RiskProfilesUnaffectedByVaccines,
} from 'data/data'

export const RiskProfileSelector: React.FunctionComponent<{
  id: string
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent?: boolean
  value: keyof typeof RiskProfile
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  // This is the right spot for this. Since data.population will be set and
  // unset after initial page load, it doesn't make sense to handle this in
  // sanitizeData() (which responds to query params and local storage contents).
  const currentRiskProfileIsDeprecated =
    typeof props.value === 'string' &&
    Object.keys(RiskProfileDeprecated).includes(props.value)
  const personRiskForDeprecatedProfile = currentRiskProfileIsDeprecated
    ? Math.round(calculatePersonRiskEach(props.data) || 0)
    : null

  const customMicroCovidBudgetInput = (
    <Form.Group controlId="customMicrocovidBudget">
      <InputGroup>
        <Form.Control
          type="number"
          list="customMicrocovidBudgets"
          disabled={
            props.value !== RiskProfilesUnaffectedByVaccines.CUSTOM &&
            !currentRiskProfileIsDeprecated
          }
          className="col-5"
          value={
            personRiskForDeprecatedProfile || props.data.customPersonRisk || 0
          }
          onChange={(e) => {
            if (!e.target.value) {
              props.setter({
                ...props.data,
                riskProfile: RiskProfilesUnaffectedByVaccines.CUSTOM,
                customPersonRisk: 0,
              })
            }
            props.setter({
              ...props.data,
              riskProfile: RiskProfilesUnaffectedByVaccines.CUSTOM,
              customPersonRisk: Number(e.target.value),
            })
          }}
        ></Form.Control>
        <InputGroup.Append>
          <InputGroup.Text>{t('per week')}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <Form.Label>
        <Form.Text>{t('microCOVIDs')}</Form.Text>
      </Form.Label>
    </Form.Group>
  )
  return (
    <Form.Group controlId={props.id}>
      <ControlLabel
        id={props.id}
        header={t('calculator.behavior_header')}
        label={t('calculator.behavior_question')}
      />
      {Object.entries(RiskProfileCurrent).map(([key, riskValue], index) => (
        <Form.Check key={index} id={props.id + index}>
          <Form.Check.Label className="pb-1">
            <Form.Check.Input
              type="radio"
              name={props.id}
              value={key}
              onChange={() => {
                recordCalculatorOptionSelected(props.id, key)
                if (
                  currentRiskProfileIsDeprecated &&
                  key !== RiskProfilesUnaffectedByVaccines.CUSTOM
                ) {
                  // Switching from deprecated profile to some other profile.
                  // Save the existing person risk so that it appears again if
                  // the user goes back to "Following a risk budget".
                  props.setter({
                    ...props.data,
                    riskProfile: key || '',
                    customPersonRisk: personRiskForDeprecatedProfile || 0,
                  })
                } else {
                  props.setter({
                    ...props.data,
                    riskProfile: key || '',
                  })
                }
              }}
              checked={
                key === props.value ||
                (key === RiskProfilesUnaffectedByVaccines.CUSTOM &&
                  currentRiskProfileIsDeprecated)
              }
            />
            {riskValue.label}
            {key === RiskProfilesUnaffectedByVaccines.CUSTOM &&
              (props.value === RiskProfilesUnaffectedByVaccines.CUSTOM ||
                currentRiskProfileIsDeprecated) &&
              customMicroCovidBudgetInput}
            {key === props.value && riskValue.description && (
              <Form.Text>{riskValue.description}</Form.Text>
            )}
          </Form.Check.Label>
        </Form.Check>
      ))}
      <datalist id="customMicrocovidBudgets">
        <option value={200} />
        <option value={20} />
      </datalist>
    </Form.Group>
  )
}
