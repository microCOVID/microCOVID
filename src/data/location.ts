export interface Location {
  label: string
  population: string
  casesPerDay: number
  positiveCasePercentage: number
}

export const ExampleLocations: { [key: string]: Location } = {
  sf: {
    label: 'San Francisco (July 2020)',
    population: '7.75e6',
    casesPerDay: 1000,
    positiveCasePercentage: 3,
  },
  sydney: {
    label: 'Sydney (July 2020)',
    population: '5.23e6',
    casesPerDay: 10,
    positiveCasePercentage: 1,
  },
}
