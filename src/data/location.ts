// TODO(bshaya): Migrate from `type | null` to `?: type`
export interface Location {
  label: string
  iso3: string | null
  population: string
  casesPastWeek: number
  casesIncreasingPercentage: number
  positiveCasePercentage: number | null
  topLevelGroup: string | null
  subdivisions: string[]
  incompleteVaccinations: number | null
  completeVaccinations: number | null
  unvaccinatedPrevalenceRatio: number | null
  averageFullyVaccinatedMultiplier: number | null
  updatedAt?: string
}

// NOTE: anything between 'locations start' and 'locations end',
// or on the 'date' line, will be overwritten the next time someone
// runs update_prevalence.py.

import * as locationsFromJSON from './location.json'

export const Locations = locationsFromJSON
