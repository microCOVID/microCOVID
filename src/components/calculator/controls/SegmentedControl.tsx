import num2fraction from 'num2fraction'
import React, { useState } from 'react'
import {
  OverlayTrigger,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ControlLabel from './ControlLabel'
import { recordCalculatorOptionSelected } from 'components/Analytics'
import { CalculatorData } from 'data/calculate'
import { CheckBoxFormValue } from 'data/data'

export const SegmentedControl: React.FunctionComponent<{
  id: keyof CalculatorData
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: CheckBoxFormValue }
  label?: string
  header?: string
  popover?: JSX.Element
  hideRisk?: boolean
  className?: string
  labelFactory?: (value: string) => string
  useHoverDesc?: boolean // If true, label will be overridden by the hovered option's description.
  useActiveDesc?: boolean // If true, label will be overridden by the selected option's description.

  variant?: string
  showTooltip?: boolean // If true, the hovered option will have the description shown above.
}> = (props) => {
  const dataValue = props.id in props.data ? props.data[props.id] : ''
  const activeValue = typeof dataValue === 'string' ? dataValue : ''
  const [hoverDesc, setHoverDesc] = useState<string>('')
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

  const hoverDescIfPresentOtherwiseActiveDesc =
    hoverDesc !== ''
      ? hoverDesc
      : props.useActiveDesc && activeValue !== ''
      ? props.source[activeValue].description || ''
      : props.label || ''

  return (
    <div className="form-group">
      <ControlLabel
        id={props.id}
        label={props.label || hoverDescIfPresentOtherwiseActiveDesc}
        header={props.header}
        popover={props.popover}
      />
      <div className="segmented-scrollable mobile-vertical">
        <ToggleButtonGroup
          type="radio"
          name={props.id}
          id={props.id}
          className={'segmented-wrap ' + props.className}
          value={activeValue}
        >
          {Object.entries(props.source).map(([key, formValue], index) => (
            <OverlayTrigger
              placement="top"
              key={key}
              trigger={props.showTooltip ? ['hover', 'focus'] : []}
              overlay={
                <Tooltip
                  id={props.id + '-tooltip-' + key}
                  className="segmented-tooltip"
                >
                  {formValue.description}
                </Tooltip>
              }
            >
              <ToggleButton
                key={index}
                type="radio"
                variant={props.variant}
                name={props.id}
                value={key}
                className="segmented-button"
                checked={props.data[props.id] === key}
                onChange={(e) => {
                  recordCalculatorOptionSelected(
                    props.id,
                    e.currentTarget.value,
                  )
                  props.setter({
                    ...props.data,
                    [props.id]: e.currentTarget.value,
                  })
                }}
                onMouseEnter={() =>
                  props.useHoverDesc &&
                  formValue.description &&
                  setHoverDesc(formValue.description)
                }
                onMouseLeave={() => props.useHoverDesc && setHoverDesc('')}
              >
                <span
                  className={
                    'segmented-label' + formValue.multiplier ? ' two-lines' : ''
                  }
                >
                  {props.labelFactory
                    ? props.labelFactory(key)
                    : formValue.label}
                </span>
                {formValue.multiplier ? (
                  <div className="segmented-multiplier">
                    {props.labelFactory
                      ? ''
                      : formatRiskMultiplier(
                          props.hideRisk,
                          formValue.multiplier,
                        )}
                  </div>
                ) : null}
                <span className="segmented-value">{formValue.description}</span>
              </ToggleButton>
            </OverlayTrigger>
          ))}
        </ToggleButtonGroup>
        {props.children}
      </div>
    </div>
  )
}
