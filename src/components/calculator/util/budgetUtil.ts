import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from './FormatPrecision'

export const getWeekBudget = (budget: number): number => {
  return budget / 50 // Numbers look cleaner than 52.
}

export const budgetConsumption = (
  points: number,
  budget: number,
  multiple_suffix: string,
  percentage_suffix: string,
): string => {
  const displayedPoints = Number(
    fixedPointPrecision(
      points,
      /*maxNumber=*/ undefined,
      /*decimalsNearMax=*/ undefined,
      /*thousandsSeparator=*/ '',
    ),
  )
  const weekBudget = getWeekBudget(budget)
  const weeksConsumed = displayedPoints / weekBudget

  if (weeksConsumed >= 1.5)
    return fixedPointPrecision(weeksConsumed) + multiple_suffix

  return fixedPointPrecisionPercent(weeksConsumed, percentage_suffix)
}
