import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from './FormatPrecision'

export type BudgetConsumptionInfo = {
  translateString: string
  value: { multiple?: string; percentage?: string }
}

export const getWeekBudget = (budget: number): number => {
  return budget / 50 // Numbers look cleaner than 52.
}

export const getBudgetConsumptionInfo = (
  points: number,
  budget: number,
): BudgetConsumptionInfo => {
  const displayedPoints = Number(
    fixedPointPrecision(
      points,
      /*maxNumber=*/ undefined,
      /*minNumber=*/ undefined,
      /*numberStyle=*/ undefined,
      /*useGrouping=*/ false,
    ),
  )
  const weekBudget = getWeekBudget(budget)
  const weeksConsumed = displayedPoints / weekBudget

  if (weeksConsumed >= 1.5)
    return {
      translateString: 'calculator.explanationcard.multiple_suffix',
      value: { multiple: fixedPointPrecision(weeksConsumed) },
    }

  return {
    translateString: 'calculator.explanationcard.percentage_suffix',
    value: { percentage: fixedPointPrecisionPercent(weeksConsumed) },
  }
}

export const BudgetConsumption: React.FunctionComponent<{
  points: number
  budget: number
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const budgetConsumptionDetails = getBudgetConsumptionInfo(
    props.points,
    props.budget,
  )
  return t(
    budgetConsumptionDetails.translateString,
    budgetConsumptionDetails.value,
  )
}
