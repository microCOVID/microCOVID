import { fixedPointPrecision } from './FormatPrecision'

export const getWeekBudget = (budget: number): number => {
  return budget / 50 // Numbers look cleaner than 52.
}

export const budgetConsumption = (
  points: number,
  budget: number,
  multiple_suffix: string,
  percentage_suffix: string,
): string => {
  const weekBudget = getWeekBudget(budget)
  const weeksConsumed = points / weekBudget

  if (weeksConsumed >= 1.5)
    return fixedPointPrecision(weeksConsumed) + multiple_suffix

  return fixedPointPrecision((points / weekBudget) * 100) + percentage_suffix
}
