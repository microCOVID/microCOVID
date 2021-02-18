import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

import { VerticalControl } from 'components/calculator/controls/VerticalControl'
import { fixedPointPrecisionPercent } from 'components/calculator/util/FormatPrecision'
import { CalculatorData, calculateLocationPersonAverage } from 'data/calculate'
import { BaseFormValue, Interaction } from 'data/data'

export const InteractionTypeDisplay: React.FunctionComponent<{
  currentData: CalculatorData
  interactionType: string
  editInteractionType: boolean
  setEditInteractionType: (newEdit: boolean) => void
  showResetButton: boolean
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const [showInteractionTypeMath, setShowInteractionTypeMath] = useState(false)
  const getInteractionRiskMessage = (interactionType: string) => {
    if (interactionType === 'oneTime' || interactionType === 'work') {
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

  return (
    <>
      <span className="d-inline-block">
        {props.editInteractionType ||
        Interaction[props.interactionType] === undefined
          ? t('calculator.set_interaction_type_to_continue')
          : t(Interaction[props.interactionType].label)}{' '}
        {props.showResetButton && (
          <Button
            className="m-0 py-0 pl-0 pl-sm-2 d-inline-block border-0 align-baseline text-secondary"
            onClick={() => {
              props.setEditInteractionType(true)
            }}
            size="sm"
            variant="light"
          >
            x {t('calculator.change_interaction_type')}
            {/*
              <BsX className="align-top" />
              */}
          </Button>
        )}
        {props.interactionType !== undefined && !props.editInteractionType && (
          <Button
            onClick={() => setShowInteractionTypeMath(!showInteractionTypeMath)}
            aria-controls="interaction-type-math"
            aria-expanded={showInteractionTypeMath}
            variant="link"
            size="sm"
            className="pl-0 font-weight-bold d-block"
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
      </span>
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
