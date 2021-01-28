import num2fraction from 'num2fraction'
import React, { useState } from 'react'
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ControlLabel from './ControlLabel'
import { CalculatorData } from 'data/calculate'
import { CheckBoxFormValue } from 'data/data'

export const SegmentedControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: CheckBoxFormValue }
  label?: string
  header?: string
  helpText?: string
  popover?: JSX.Element
  hideRisk?: boolean
  className?: string
  labelFactory?: (value: string) => string
  variant?: string
  showActiveDesc?: boolean
}> = (props) => {
  const [activeDesc, setActiveDesc] = useState(
    props.helpText ? props.helpText : '',
  )
  const activeValue = props.data[props.id] || ''
  const { t } = useTranslation()
  // identical to SelectControl's.
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
  // identical to SelectControl's.
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
      <ToggleButtonGroup
        type="radio"
        name={props.id}
        id={props.id}
        className={props.className}
        value={activeValue}
      >
        {Object.keys(props.source).map((value, index) => (
          <ToggleButton
            key={index}
            type="radio"
            variant={props.variant}
            name={props.id}
            value={value}
            checked={props.data[props.id] === value}
            onChange={(e) => {
              setActiveDesc(
                props.source[value].value +
                  formatRiskMultiplier(
                    props.hideRisk,
                    props.source[value].multiplier,
                  ),
              )
              props.setter({ ...props.data, [props.id]: e.currentTarget.value })
            }}
          >
            {props.labelFactory
              ? props.labelFactory(value)
              : props.source[value].label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Form.Text id={props.id + 'HelpText'} muted>
        {activeDesc}
      </Form.Text>
    </div>
  )
}
