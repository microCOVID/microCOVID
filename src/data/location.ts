import locationsFromJSON from './location.json'

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
  updatedAt: string
}

export const Locations: { [key: string]: Location } = locationsFromJSON
