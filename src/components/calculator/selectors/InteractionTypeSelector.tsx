import React, { useState } from 'react'
import { Button, Collapse, Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

import { VerticalControl } from 'components/calculator/controls/VerticalControl'
import { formatPercent } from 'components/calculator/util/FormatPrecision'
import { CalculatorData, calculateLocationPersonAverage } from 'data/calculate'
import { BaseFormValue, Interaction } from 'data/data'
import 'components/calculator/styles/InteractionTypeSelector.scss'

export const InteractionTypeDisplay: React.FunctionComponent<{
  currentData: CalculatorData
  interactionType: string
  setInteractionType: (newData: string) => void
  showResetButton: boolean
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const [showInteractionTypeMath, setShowInteractionTypeMath] = useState(false)
  const getInteractionRiskMessage = (interactionType: string) => {
    switch (interactionType) {
      case 'oneTime':
      case 'workplace':
        return 'calculator.one_time_interaction_risk_message'
      case 'repeated':
        return 'calculator.repeated_interaction_risk_message'
      case 'partner':
        return 'calculator.partner_interaction_risk_message'
      default:
        console.warn(
          'No interaction risk message for interaction type ',
          interactionType,
        )
    }
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
      <Dropdown.Menu id="custom-interaction-menu" className="w-100">
        {Object.entries(Interaction).map(([key, interaction], index) => {
          return (
            <Dropdown.Item
              key={index}
              className="text-wrap"
              onSelect={() => {
                props.setInteractionType(key)
              }}
            >
              {interaction.label}
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
      {props.interactionType !== undefined && props.interactionType !== '' && (
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
      {props.interactionType !== undefined && props.interactionType !== '' && (
        <Collapse in={showInteractionTypeMath}>
          <ul>
            <li>
              <Trans
                i18nKey={getInteractionRiskMessage(props.interactionType)}
                values={{
                  percentage: formatPercent(
                    Interaction[props.interactionType].multiplier,
                  ),
                }}
              >
                [<strong>9% per hour</strong> baseline chance of transmission
                for each infected person nearby]
              </Trans>
            </li>
            <li>
              <Trans
                i18nKey="calculator.location_risk_message"
                values={{
                  prevalence: formatPercent(
                    (calculateLocationPersonAverage(props.currentData) || 0) /
                      1e6,
                    { decimalPointsToShow: 2 },
                  ),
                }}
              >
                [<strong>~0.03%</strong> of people here are currently
                infectious.]
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
}> = (props) => {
  return (
    <>
      <div className="form-group">
        <VerticalControl
          id={props.id}
          setter={props.setter}
          source={props.source}
          value={props.value}
          labelFactory={props.labelFactory}
        />
      </div>
    </>
  )
}
