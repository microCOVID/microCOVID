import { CalculatorData } from 'data/calculate'

const SAVED_DATA_KEY = 'savedEntries'

const _getSavedForms = (): { [key: string]: CalculatorData } => {
  const saved = JSON.parse(localStorage.getItem(SAVED_DATA_KEY) || '{}')

  // Fix for old data stored as array
  if (Array.isArray(saved)) {
    localStorage.setItem(SAVED_DATA_KEY, JSON.stringify({}))
    return {}
  }

  return saved
}

export const savedItems = (): { [key: string]: CalculatorData } => {
  return _getSavedForms()
}

export const saveCalculation = (
  saveName: string,
  data: CalculatorData,
): void => {
  const newData = {
    ...data,
    persistedAt: Date.now(),
  }

  const saved = _getSavedForms()
  saved[saveName] = newData
  localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(saved))
}
