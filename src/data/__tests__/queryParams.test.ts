import {
  CalculatorData,
  QueryData,
  defaultValues,
  migrateDataToCurrent,
} from 'data/calculate'
import { prepopulated } from 'data/prepopulated'
import { filterParams, useQueryDataIfPresent } from 'data/queryParams'

type CalculatorDataNoScenario = Omit<CalculatorData, 'scenarioName'>
type QueryDataNoScenario = Omit<QueryData, 'scenarioName'>

const getCalculatorDataVersion = (
  version: number,
  data: CalculatorData,
): CalculatorData | CalculatorDataNoScenario => {
  const newData: Partial<CalculatorData> = { ...data }
  switch (version) {
    case 1.0:
      delete newData.scenarioName
      return newData as CalculatorDataNoScenario
    case 1.1: // adds scenarioName
    default:
  }
  return data
}

const getQueryDataVersion = (
  version: number,
  data: QueryData,
): QueryData | QueryDataNoScenario => {
  const newData: Partial<CalculatorData> = { ...data }
  switch (version) {
    case 1.0:
      delete newData.scenarioName
      return newData as QueryDataNoScenario
    case 1.1: // adds scenarioName
    default:
  }
  return data
}

const filledDataCurrent = {
  ...defaultValues,
  ...prepopulated['outdoorMasked2'],
}

const defaultValuesNoScenario = getCalculatorDataVersion(1.0, defaultValues)
const filledDataNoScenario = getCalculatorDataVersion(1.0, filledDataCurrent)
const filledDataMigrated: CalculatorData = {
  ...filledDataNoScenario,
  scenarioName: 'custom',
}

describe('migrateDataToCurrent', () => {
  it('adds empty scenarioName when local storage is clear', () => {
    expect(
      migrateDataToCurrent(defaultValuesNoScenario as Record<string, unknown>),
    ).toEqual(defaultValues)
  })

  it('adds custom scenarioName when local storage has an old scenario', () => {
    expect(
      migrateDataToCurrent(filledDataNoScenario as Record<string, unknown>),
    ).toEqual(filledDataMigrated)
  })
})

describe('useQueryDataIfPresent', () => {
  const filledDataNoScenarioQuery = getQueryDataVersion(
    1.0,
    filterParams(filledDataCurrent),
  )

  const filledDataMigratedQuery = getQueryDataVersion(
    1.1,
    filterParams(filledDataMigrated),
  )
  const filledDataCurrentQuery = getQueryDataVersion(
    1.1,
    filterParams(filledDataCurrent),
  )

  it('handles filled query missing scenarioName', () => {
    expect(
      useQueryDataIfPresent(filledDataNoScenarioQuery, defaultValues),
    ).toEqual(filledDataMigrated)
  })

  it('handles filled query from migrated old local storage data', () => {
    expect(
      useQueryDataIfPresent(filledDataMigratedQuery, defaultValues),
    ).toEqual(filledDataMigrated)
  })

  it('handles filled query from recent local storage data with the scenarioName', () => {
    expect(
      useQueryDataIfPresent(filledDataCurrentQuery, defaultValues),
    ).toEqual(filledDataCurrent)
  })

  it('handles invalid scenarioName', () => {
    expect(
      useQueryDataIfPresent(
        { ...filledDataCurrentQuery, scenarioName: 'nonexistent' },
        defaultValues,
      ),
    ).toEqual(filledDataMigrated)
  })
})
