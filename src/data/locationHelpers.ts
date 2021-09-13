import { Locations, PrevalenceDataDate } from 'data/location'

interface PrevalanceData {
  population: number
  casesPastWeek: number
  casesIncreasingPercentage: number
  positiveCasePercentage: number | null
  prevalanceDataDate: Date
  percentFullyVaccinated: number | null
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
      percentFullyVaccinated: locationData.completeVaccinations
        ? Math.round(
            (locationData.completeVaccinations / locationData.population) * 100,
          )
        : null,
      unvaccinatedPrevalenceRatio: locationData.unvaccinatedPrevalenceRatio,
      averageFullyVaccinatedMultiplier:
        locationData.averageFullyVaccinatedMultiplier,
    }
  }

  return {
    population: 0,
    casesPastWeek: 0,
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 0,
    prevalanceDataDate: new Date(),
    percentFullyVaccinated: null,
    unvaccinatedPrevalenceRatio: null,
    averageFullyVaccinatedMultiplier: null,
  }
}
