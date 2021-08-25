import num2fraction from 'num2fraction'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FormattedRiskMultiplier: React.FunctionComponent<{
  hideRisk?: boolean
  showDecimals?: boolean
  multiplier?: number
}> = (props) => {
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

  if (props.hideRisk || props.multiplier === undefined) {
    return null
  }
  return (
    <div className="risk-modifier-multiplier">
      {props.showDecimals
        ? t('calculator.risk_modifier_multiple_short', {
            multiplier: props.multiplier,
          })
        : formatRiskMultiplierInternal(props.multiplier)}
    </div>
  )
}
