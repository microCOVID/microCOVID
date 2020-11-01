import { fixedPointPrecision } from './FormatPrecision'

export const getWeekBudget = (budget: number): number => {
  return budget / 50 // Numbers look cleaner than 52.
}

export const budgetConsumption = (points: number, budget: number): string => {
  const weekBudget = getWeekBudget(budget)
  const weeksConsumed = points / weekBudget
  if (weeksConsumed >= 1.5) {
    return `
        ${fixedPointPrecision(weeksConsumed)}x  your weekly risk budget`
  }
  return `${fixedPointPrecision(
    (points / weekBudget) * 100,
  )}% of your weekly risk budget`
}
