import { pickBy, isEmpty } from 'lodash'

import { QueryParamConfigMap } from 'serialize-query-params'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'

import { CalculatorData, QueryData, defaultValues } from './calculate'

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

// This method chooses between existing calulator data (either defaults or from a 
// saved model) or the ones specified through query parameters.
export const useParams = (queryData: QueryData, calcData: CalculatorData): CalculatorData => {
  const queryDataFiltered = pickBy(queryData, v => v !== undefined)
  if (isEmpty(queryDataFiltered)) {
    return calcData
  } else {
    return { ...defaultValues, ...queryData }
  }
}

export const QueryParams = (): ReturnType<typeof useQueryParams> => {
  return useQueryParams(queryConfig)
}
