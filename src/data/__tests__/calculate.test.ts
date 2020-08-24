import { CalculatorData, calculate } from 'data/calculate'
import { prepopulated } from 'data/prepopulated'

describe('calculate', () => {
  it('returns the correct value', () => {
    const exampleLocation = {
      label: 'San Francisco (July 2020)',
      population: '7,500,000',
      casesPastWeek: 7000,
      casesIncreasingPercentage: 0,
      positiveCasePercentage: 3,
    }
    const scenario = 'Outdoor masked hangout with 2 people'
    const data: CalculatorData = {
      location: 'sf',
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    const response = calculate(data)
    expect(response).toBe(1)
  })
})
