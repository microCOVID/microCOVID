export interface Location {
  label: string
  population: string
  casesPastWeek: number
  casesWeekBefore: number
  positiveCasePercentage: number
}

export const ExampleLocations: { [key: string]: Location } = {
  sf: {
    label: 'San Francisco (July 2020)',
    population: '7,500,000',
    casesPastWeek: 7000,
    casesWeekBefore: 7000,
    positiveCasePercentage: 3,
  },
  sydney: {
    label: 'Sydney (July 2020)',
    population: '5,230,000',
    casesPastWeek: 70,
    casesWeekBefore: 70,
    positiveCasePercentage: 1,
  },
}

export const PrevalenceDataDate: string = 'August 22, 2020';

