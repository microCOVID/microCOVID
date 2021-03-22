import React, { useState } from 'react'
import { Button, Collapse, Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

import { VerticalControl } from 'components/calculator/controls/VerticalControl'
import { fixedPointPrecisionPercent } from 'components/calculator/util/FormatPrecision'
import { CalculatorData, calculateLocationPersonAverage } from 'data/calculate'
import { BaseFormValue, Interaction } from 'data/data'
import 'components/calculator/styles/InteractionTypeSelector.scss'

export const InteractionTypeDisplay: React.FunctionComponent<{
  currentData: CalculatorData
  interactionType: string
  setInteractionType: (newData: string) => void
  editInteractionType: boolean
  setEditInteractionType: (newEdit: boolean) => void
  showResetButton: boolean
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const [showInteractionTypeMath, setShowInteractionTypeMath] = useState(false)
  const getInteractionRiskMessage = (interactionType: string) => {
    if (interactionType === 'oneTime' || interactionType === 'workplace') {
      return 'calculator.one_time_interaction_risk_message'
    } else if (interactionType === 'repeated') {
      return 'calculator.repeated_interaction_risk_message'
    } else if (interactionType === 'partner') {
      return 'calculator.partner_interaction_risk_message'
    }
    console.warn(
      'No interaction risk message for interaction type ',
      interactionType,
    )
    return 'calculator.one_time_interaction_risk_message'
  }

  const formattedInteractionTypeName = props.showResetButton ? (
    <Dropdown>
      <Dropdown.Toggle
        id="custom-interaction-type"
        variant="light"
        className="text-wrap"
      >
        {t(Interaction[props.interactionType].label)}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {Object.keys(Interaction).map((value, index) => {
          return (
            <Dropdown.Item
              key={index}
              className="text-wrap"
              onSelect={() => {
                props.setInteractionType(value)
              }}
            >
              {Interaction[value].label}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <span>
      {props.interactionType === undefined || props.interactionType === ''
        ? t('calculator.set_interaction_type_to_continue')
        : t(Interaction[props.interactionType].label)}
    </span>
  )

  return (
    <>
      <div className="d-inline-block d-md-inline">
        {formattedInteractionTypeName}
      </div>
      {props.interactionType !== undefined && !props.editInteractionType && (
        <Button
          onClick={() => setShowInteractionTypeMath(!showInteractionTypeMath)}
          aria-controls="interaction-type-math"
          aria-expanded={showInteractionTypeMath}
          variant="link"
          size="sm"
          className="pl-0 font-weight-bold d-block underline-for-focus"
        >
          {showInteractionTypeMath ? (
            <BsChevronDown className="align-baseline" />
          ) : (
            <BsChevronRight className="align-baseline" />
          )}
          {showInteractionTypeMath
            ? t('calculator.hide_math')
            : t('calculator.show_math')}
        </Button>
      )}
      {props.interactionType !== undefined && !props.editInteractionType && (
        <Collapse in={showInteractionTypeMath}>
          <ul>
            <li>
              <Trans
                i18nKey={getInteractionRiskMessage(props.interactionType)}
                values={{
                  percentage: fixedPointPrecisionPercent(
                    Interaction[props.interactionType].multiplier,
                  ),
                }}
              >
                Blah <strong>blah</strong>
              </Trans>
            </li>
            <li>
              <Trans
                i18nKey="calculator.location_risk_message"
                values={{
                  prevalence:
                    (
                      ((calculateLocationPersonAverage(props.currentData) ||
                        0) *
                        100) /
                      1e6
                    ).toFixed(2) + '%',
                }}
              >
                Blah <strong>blah</strong>
              </Trans>
            </li>
          </ul>
        </Collapse>
      )}
    </>
  )
}

export const InteractionTypeSelector: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: BaseFormValue }
  value: string
  label?: string
  className?: string
  labelFactory?: (value: string) => string
  editMode: boolean
  setEditMode: (newEditMode: boolean) => void
}> = (props) => {
  return (
    <>
      <div className="form-group">
        {props.editMode && (
          <VerticalControl
            id={props.id}
            editMode={props.editMode}
            setEditMode={props.setEditMode}
            setter={props.setter}
            source={props.source}
            value={props.value}
            labelFactory={props.labelFactory}
          />
        )}
      </div>
    </>
  )
}
