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
  const dataValue = props.id in props.data ? props.data[props.id] : ''
  const activeValue = typeof dataValue === 'string' ? dataValue : ''
  const [activeDesc, setActiveDesc] = useState(
    activeValue && activeValue in props.source
      ? props.source[activeValue].value
      : props.helpText
      ? props.helpText
      : '',
  )
  const [hoverDesc, setHoverDesc] = useState(activeDesc)
  const { t } = useTranslation()
  // 0.25 -> "1/4x"
  function formatRiskMultiplierInternal(multiplier: number): string {
    if (multiplier === 1) {
      return t('calculator.baseline_risk_short')
    } else if (multiplier > 0 && multiplier < 1) {
      const frac = num2fraction(multiplier)
      return t('calculator.risk_modifier_multiple_short', { multiplier: frac })
    } else {
      return t('calculator.risk_modifier_multiple_short', {
        multiplier: multiplier,
      })
    }
  }
  const formatRiskMultiplier = (hideRisk?: boolean, multiplier?: number) => {
    if (hideRisk || multiplier === undefined) {
      return ''
    }
    return formatRiskMultiplierInternal(multiplier)
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
            onMouseEnter={() => setHoverDesc(props.source[value].value)}
            onMouseLeave={() => setHoverDesc('')}
            onChange={(e) => {
              setActiveDesc(props.source[value].value)
              props.setter({ ...props.data, [props.id]: e.currentTarget.value })
            }}
          >
            <span className="segmented-label">
              {props.labelFactory
                ? props.labelFactory(value)
                : props.source[value].label}
            </span>
            <span className="segmented-multiplier">
              {props.labelFactory
                ? ''
                : formatRiskMultiplier(
                    props.hideRisk,
                    props.source[value].multiplier,
                  )}
            </span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Form.Text id={props.id + 'HelpText'} muted>
        {hoverDesc || activeDesc}
      </Form.Text>
    </div>
  )
}
