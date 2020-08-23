import { CalculatorData, calculate } from 'data/calculate'
import { ExampleLocations } from 'data/location'
import { prepopulated } from 'data/prepopulated'

describe('calculate', () => {
  it('returns the correct value', () => {
    const location = 'sf'
    const scenario = 'Outdoor masked hangout with 2 people'
    const data: CalculatorData = {
      location,
      ...ExampleLocations[location],
      ...prepopulated[scenario],
    }

    const response = calculate(data)
    expect(response).toBe(1)
  })
})
