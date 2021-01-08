import num2fraction from 'num2fraction'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ControlLabel from './ControlLabel'
import IosOptgroup from 'components/IosOptgroup'
import { CalculatorData } from 'data/calculate'
import { BaseFormValue } from 'data/data'

export const GenericSelectControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: BaseFormValue }
  value: string | number | Date
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  hideRisk?: boolean
  className?: string
  labelFactory?: (value: string) => string
}> = (props) => {
  const { t } = useTranslation()
  function formatRiskMultiplierInternal(multiplier: number): string {
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
  const formatRiskMultiplier = (hideRisk?: boolean, multiplier?: number) => {
    if (hideRisk || multiplier === undefined) {
      return ''
    }
    return ` [${formatRiskMultiplierInternal(multiplier)}]`
  }

  return (
    <div className="form-group">
      <ControlLabel
        id={props.id}
        label={props.label}
        header={props.header}
        popover={props.popover}
      />
      <select
        id={props.id}
        className={'form-control form-control-lg ' + props.className}
        onChange={(e) => props.setter(e.target.value)}
        value={
          typeof props.value === 'object'
            ? props.value.toDateString()
            : props.value
        }
      >
        <option value="">{t('buttons.select_default_action')}</option>
        {Object.keys(props.source).map((value, index) => (
          <option key={index} value={value}>
            {props.labelFactory
              ? props.labelFactory(value)
              : props.source[value].label +
                formatRiskMultiplier(
                  props.hideRisk,
                  props.source[value].multiplier,
                )}
          </option>
        ))}
        <IosOptgroup />
      </select>
      {props.helpText && (
        <Form.Text id={props.id + 'HelpText'} muted>
          {props.helpText}
        </Form.Text>
      )}
    </div>
  )
}

export const SelectControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: BaseFormValue }
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  hideRisk?: boolean
  className?: string
  labelFactory?: (value: string) => string
}> = (props) => (
  <GenericSelectControl
    id={props.id}
    setter={(value) => props.setter({ ...props.data, [props.id]: value })}
    source={props.source}
    value={props.data[props.id] || ''}
    label={props.label}
    helpText={props.helpText}
    header={props.header}
    popover={props.popover}
    hideRisk={props.hideRisk}
    className={props.className}
    labelFactory={props.labelFactory}
  />
)

export default SelectControl
