import num2fraction from 'num2fraction'
import React from 'react'
import { Badge, OverlayTrigger } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { CalculatorData } from 'data/calculate'
import { FormValue } from 'data/data'

export const GenericSelectControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: FormValue }
  value: string | number
  label?: string
  popover?: JSX.Element
  hideRisk?: boolean
}> = (props) => {
  const { t } = useTranslation()
  function showRiskMultiplier(multiplier: number): string {
    if (multiplier === 1) {
      return t('calculator.baseline_risk')
    } else if (multiplier > 0 && multiplier < 1) {
      const frac = num2fraction(multiplier)
      const denom = frac.split('/')[1]
      // range handling in i18next is a hot buggy mess, this manual approach will have to do for the time being
      if (denom === '2')
        return t('calculator.risk_modifier_frac_2nd', { frac: frac })
      else if (denom === '3')
        return t('calculator.risk_modifier_frac_3rd', { frac: frac })
      else return t('calculator.risk_modifier_frac_plural', { frac: frac })
    } else {
      return t('calculator.risk_modifier_multiple', { multiplier: multiplier })
    }
  }
  return (
    <div className="form-group">
      {props.label && (
        <div className="label-wrapper">
          <label htmlFor={props.id}>{props.label}</label>
          {props.popover && (
            <OverlayTrigger
              trigger="click"
              overlay={props.popover}
              rootClose={true}
            >
              <Badge variant="secondary">?</Badge>
            </OverlayTrigger>
          )}
        </div>
      )}
      <select
        id={props.id}
        className="form-control form-control-lg"
        onChange={(e) => props.setter(e.target.value)}
        value={props.value}
      >
        <option value="">{t('buttons.select_default_action')}</option>
        {Object.keys(props.source).map((value, index) => (
          <option key={index} value={value}>
            {props.source[value].label}{' '}
            {props.hideRisk !== true &&
              `[${showRiskMultiplier(props.source[value].multiplier)}]`}
          </option>
        ))}
        <optgroup></optgroup>
      </select>
    </div>
  )
}

export const SelectControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: FormValue }
  label?: string
  popover?: JSX.Element
  hideRisk?: boolean
}> = (props) => (
  <GenericSelectControl
    id={props.id}
    setter={(value) => props.setter({ ...props.data, [props.id]: value })}
    source={props.source}
    value={props.data[props.id] || ''}
    label={props.label}
    popover={props.popover}
    hideRisk={props.hideRisk}
  />
)

export default SelectControl
