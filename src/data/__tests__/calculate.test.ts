import {
  CalculatorData,
  calculate,
  calculateLocationPersonAverage,
  defaultValues,
} from 'data/calculate'
import { RiskProfile } from 'data/data'
import { prepopulated } from 'data/prepopulated'

describe('calculate', () => {
  // Prevailance is .1% with 6x underreporting factor
  const exampleLocation = {
    subLocation: 'mock city',
    topLocation: 'mock state',
    label: 'mock city',
    population: '1,000,000',
    casesPastWeek: 999, // will add 1 in pseudocount
    casesIncreasingPercentage: 0,
    positiveCasePercentage: 1,
  }
  const expectedPrevalance = 0.006

  it('compensates for underreporting', () => {
    const data: CalculatorData = {
      ...defaultValues,
      ...exampleLocation,
    }
    expect(calculateLocationPersonAverage(data)).toBeCloseTo(
      expectedPrevalance * 1e6,
    )
  })

  it('produces same results as by hand', () => {
    const scenario = 'Outdoor masked hangout with 2 people'
    const data: CalculatorData = {
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    const response = calculate(data)
    // average * 2 people * outdoor * 1 hr * their mask * your mask
    expect(response).toBe(((((0.006 * 2) / 20) * 0.06) / 4 / 1) * 1e6)
  })

  it.each`
    scenario                                                | result
    ${'Outdoor masked hangout with 2 people'}               | ${9}
    ${'Indoor unmasked hangout with 2 people'}              | ${720}
    ${'Car ride with 1 person for 15 mins'}                 | ${90}
    ${'Physically intimate with person'}                    | ${2880}
    ${'Grocery store for 60 minutes'}                       | ${45}
    ${'Plane ride'}                                         | ${1080}
    ${'Eating in restaurant, outdoors'}                     | ${202.5}
    ${'Eating in restaurant, indoors'}                      | ${4050}
    ${'Going to bar'}                                       | ${27000}
    ${'Large outdoor party: masked with 250 people'}        | ${3375}
    ${'Small indoor party: unmasked with 25 people'}        | ${27000}
    ${'Outdoor, masked hangout with person who has COVID'}  | ${750}
    ${'Indoor, unmasked hangout with person who has COVID'} | ${60000}
  `('should return $result for $scenario', ({ scenario, result }) => {
    const data: CalculatorData = {
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    expect(calculate(data)).toBeCloseTo(result)
  })

  it('should produce a self-consistent living alone risk profile', () => {
    const data: CalculatorData = {
      ...exampleLocation,
      riskProfile: 'average',
      interaction: 'oneTime',
      personCount: 10,

      setting: 'indoor',
      distance: 'sixFt',
      duration: 60,
      theirMask: 'basic',
      yourMask: 'filtered',
      voice: 'silent',
    }

    expect(calculate(data)).toBeCloseTo(
      expectedPrevalance * RiskProfile['livingAlone']['multiplier'] * 1e6,
    )
  })
})
