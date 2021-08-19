import React, { useState } from 'react'
import {
  Form,
  OverlayTrigger,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from 'react-bootstrap'

import { FormattedRiskMultiplier } from '../util/FormattedRiskMultiplier'

import ControlLabel from './ControlLabel'
import { recordCalculatorOptionSelected } from 'components/Analytics'
import { CalculatorData } from 'data/calculate'
import { CheckBoxFormValue } from 'data/data'

export interface SegmentedProps<SourceValue> {
  id: string
  header?: string
  label?: string
  variant?: string
  hideRisk?: boolean
  showDecimals?: boolean
  verticalOnMobile?: boolean
  setter: (value: string) => void
  source: { [key: string]: SourceValue }
  value: string
  iconFactory?: (value: string) => JSX.Element
  multiplierFromSource: (value: SourceValue, key: string) => number
  labelFromSource: (value: SourceValue, key: string) => string
  children?: React.ReactNode
}

// Mobile-friendly segmented button selector (generic version).
// TODO(jy2wong) the old SegmentedControl still has functionality that this one
// doesn't; port it over.
export function SegmentedControlNoDescriptions<SourceValue>(
  props: SegmentedProps<SourceValue>,
): React.ReactElement {
  return (
    <Form.Group controlId={props.id}>
      <ControlLabel id={props.id} header={props.header} label={props.label} />
      <div
        className={
          'segmented' +
          (props.verticalOnMobile
            ? ' segmented-scrollable mobile-vertical'
            : '')
        }
      >
        <ToggleButtonGroup
          id={props.id}
          name={props.id}
          type="radio"
          defaultValue={props.value}
          className={
            props.verticalOnMobile ? 'segmented-wrap' : 'pl-0 pr-0 col-md-6'
          }
        >
          {Object.keys(props.source).map((value, index) => {
            return (
              <ToggleButton
                key={index}
                value={value}
                className="segmented-button"
                variant={props.variant ? props.variant : 'outline-secondary'}
                onChange={() => {
                  recordCalculatorOptionSelected(props.id, value)
                  props.setter(value)
                }}
              >
                {props.iconFactory && props.iconFactory(value)}
                <div className="risk-modifier-label">
                  {props.labelFromSource(
                    props.source[value.toString()],
                    value.toString(),
                  )}
                </div>
                <FormattedRiskMultiplier
                  hideRisk={props.hideRisk}
                  showDecimals={props.showDecimals}
                  multiplier={props.multiplierFromSource(
                    props.source[value.toString()],
                    value.toString(),
                  )}
                />
              </ToggleButton>
            )
          })}
        </ToggleButtonGroup>
      </div>
      {props.children}
    </Form.Group>
  )
}

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

  const hoverDescIfPresentOtherwiseActiveDesc =
    hoverDesc !== ''
      ? hoverDesc
      : props.useActiveDesc && activeValue !== ''
      ? props.source[activeValue].description || ''
      : props.label || ''

  return (
    <Form.Group controlId={props.id}>
      <ControlLabel
        id={props.id}
        label={props.label || hoverDescIfPresentOtherwiseActiveDesc}
        header={props.header}
        popover={props.popover}
      />
      <div className="segmented segmented-scrollable mobile-vertical">
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
                    'risk-modifier-label' +
                    (formValue.multiplier ? ' two-lines' : '')
                  }
                >
                  {props.labelFactory
                    ? props.labelFactory(key)
                    : formValue.label}
                </span>
                <FormattedRiskMultiplier
                  hideRisk={!!props.labelFactory || props.hideRisk}
                  multiplier={formValue.multiplier}
                />
                <span className="segmented-value">{formValue.description}</span>
              </ToggleButton>
            </OverlayTrigger>
          ))}
        </ToggleButtonGroup>
        {props.children}
      </div>
    </Form.Group>
  )
}
