import { QueryParamConfigMap } from 'serialize-query-params'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'

import { CalculatorData, defaultValues } from './calculate'

export type QueryData = Partial<CalculatorData>

const queryConfig: QueryParamConfigMap = {
  topLocation: StringParam,
  subLocation: StringParam,

  riskProfile: StringParam,
  interaction: StringParam,
  personCount: NumberParam,

  setting: StringParam,
  distance: StringParam,
  duration: NumberParam,
  theirMask: StringParam,
  yourMask: StringParam,
  voice: StringParam,
}

export const filterParams = (data: CalculatorData): QueryData => {
  const filterData = { ...data }
  let key: keyof CalculatorData
  for (key in filterData) {
    if (!(key in queryConfig) || data[key] === defaultValues[key]) {
      delete filterData[key]
    }
  }
  return filterData
}

export const QueryParams = (): ReturnType<typeof useQueryParams> => {
  return useQueryParams(queryConfig)
}
