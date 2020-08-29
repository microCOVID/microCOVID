import { CalculatorData, calculate } from 'data/calculate'
import { prepopulated } from 'data/prepopulated'

describe('calculate', () => {
  // Prevailance is .1% with 4x underreporting factor
  const exampleLocation = {
    label: 'mock city',
    population: '1,000,000',
    casesPastWeek: 1000,
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 1,
  }
  it('produces same results as by hand', () => {
    const scenario = 'Outdoor masked hangout with 2 people'
    const data: CalculatorData = {
      subLocation: 'sf',
      topLocation: 'California',
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    const response = calculate(data)
    // average * 2 people * outdoor * 1 hr * their mask * your mask
    expect(response).toBe(((((0.004 * 2) / 10) * 0.06) / 2 / 8) * 1e6)
  })

  it.each`
    scenario                                                | result
    ${'Outdoor masked hangout with 2 people'}               | ${3}
    ${'Indoor unmasked hangout with 2 people'}              | ${480}
    ${'Car ride with 1 person for 15 mins'}                 | ${60}
    ${'Physically intimate with person'}                    | ${1920}
    ${'Grocery store for 60 minutes'}                       | ${60}
    ${'Plane ride'}                                         | ${360}
    ${'Eating in restaurant, outdoors'}                     | ${135}
    ${'Eating in restaurant, indoors'}                      | ${2700}
    ${'Going to bar'}                                       | ${18000}
    ${'Large outdoor party: masked with 250 people'}        | ${1125}
    ${'Small indoor party: unmasked with 25 people'}        | ${18000}
    ${'Outdoor, masked hangout with person who has COVID'}  | ${375}
    ${'Indoor, unmasked hangout with person who has COVID'} | ${60000}
  `('should return $result for $scenario', ({ scenario, result }) => {
    const data: CalculatorData = {
      subLocation: 'mock city',
      topLocation: 'imaginary country',
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    expect(calculate(data)).toBeCloseTo(result)
  })
})
