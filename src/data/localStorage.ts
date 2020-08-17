import { CalculatorData } from 'data/calculate'

const SAVED_DATA_KEY = 'savedEntries'

const _getSavedCalculations = (): [string, CalculatorData][] =>
  JSON.parse(localStorage.getItem(SAVED_DATA_KEY) || '[]')

export const savedItems = (): string[] =>
  _getSavedCalculations().map((item) => item[0])

export const saveCalculation = (
  saveName: string,
  data: CalculatorData,
): void => {
  const newData = {
    ...data,
    persistedAt: Date.now(),
  }

  const saved = _getSavedCalculations()
  saved.push([saveName, newData])
  localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(saved))
}

export const loadData = (index: number): CalculatorData | null => {
  const data = _getSavedCalculations()[index]
  if (data) {
    return data[1]
  }
  return null
}
