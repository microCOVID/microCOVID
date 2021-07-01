import { Locations, PrevalenceDataDate } from 'data/location'

interface PrevalanceData {
  population: string
  casesPastWeek: number
  casesIncreasingPercentage: number
  positiveCasePercentage: number | null
  prevalanceDataDate: Date
  completeVaccinations: number | null
  unvaccinatedPrevalenceRatio: number | null
  averageFullyVaccinatedMultiplier: number | null
}

export function dataForLocation(location: string): PrevalanceData {
  const locationData = Locations[location]

  if (locationData) {
    return {
      population: locationData.population,
      casesPastWeek: locationData.casesPastWeek,
      casesIncreasingPercentage:
        Math.round(locationData.casesIncreasingPercentage * 10) / 10,
      positiveCasePercentage:
        locationData.positiveCasePercentage === null
          ? null
          : Math.round(locationData.positiveCasePercentage * 10) / 10,
      prevalanceDataDate: new Date(PrevalenceDataDate),
      completeVaccinations: locationData.completeVaccinations,
      unvaccinatedPrevalenceRatio: locationData.unvaccinatedPrevalenceRatio,
      averageFullyVaccinatedMultiplier:
        locationData.averageFullyVaccinatedMultiplier,
    }
  }

  return {
    population: '',
    casesPastWeek: 0,
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 0,
    prevalanceDataDate: new Date(),
    completeVaccinations: null,
    unvaccinatedPrevalenceRatio: null,
    averageFullyVaccinatedMultiplier: null,
  }
}
