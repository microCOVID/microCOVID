export interface Location {
  label: string
  population: string
  casesPerDay: number
  positiveCasePercentage: number
}

export const ExampleLocations: { [key: string]: Location } = {
  sf: {
    label: 'San Francisco (July 2020)',
    population: '7,500,000',
    casesPerDay: 1000,
    positiveCasePercentage: 3,
  },
  sydney: {
    label: 'Sydney (July 2020)',
    population: '5,230,000',
    casesPerDay: 10,
    positiveCasePercentage: 1,
  },
}
