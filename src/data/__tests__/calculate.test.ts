import { CalculatorData, calculate } from 'data/calculate'
import { prepopulated } from 'data/prepopulated'

describe('calculate', () => {
  // Prevailance is .1% with 4x underreproting factor
  const exampleLocation = {
    label: 'mock city',
    population: '1,000,000',
    casesPastWeek: 1000,
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 1,
  }
  it('', () => {
    const scenario = 'Outdoor masked hangout with 2 people'
    const data: CalculatorData = {
      location: 'sf',
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    const response = calculate(data)
    // average * 2 people * outdoor * 1 hr * their mask * your mask
    expect(response).toBe(((((0.004 * 2) / 10) * 0.06) / 2 / 8) * 1e6)
  })
})
