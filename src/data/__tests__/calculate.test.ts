import {
  CalculatorData,
  calculate,
  calculateLocationPersonAverage,
  defaultValues,
} from 'data/calculate'
import { RiskProfile } from 'data/data'
import { prepopulated } from 'data/prepopulated'

// Wrapper for calculate that just returns expectedValue
const calcValue = (data: CalculatorData) => {
  const result = calculate(data)
  if (!result) {
    return null
  }
  return result.expectedValue
}

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

    const response = calcValue(data)
    // average * 2 people * outdoor * 1 hr * their mask * your mask
    expect(response).toBe(((((0.006 * 2) / 20) * 0.06) / 4 / 1) * 1e6)
  })

  it.each`
    scenario                                                        | result
    ${'Outdoor masked hangout with 2 people'}                       | ${9}
    ${'Indoor unmasked hangout with 2 people'}                      | ${720}
    ${'Car ride with 1 person for 15 mins'}                         | ${90}
    ${'One-night stand with a random person'}                       | ${2880}
    ${'Live-in partner who has no indoor interactions besides you'} | ${21.6}
    ${'Grocery store for 60 minutes'}                               | ${45}
    ${'Plane ride'}                                                 | ${1080}
    ${'Eating in restaurant, outdoors'}                             | ${202.5}
    ${'Eating in restaurant, indoors'}                              | ${4050}
    ${'Going to bar'}                                               | ${27000}
    ${'Large outdoor party: masked with 250 people'}                | ${3375}
    ${'Small indoor party: unmasked with 25 people'}                | ${27000}
    ${'Outdoor, masked hangout with person who has COVID'}          | ${750}
    ${'Voting in-person'}                                           | ${1.5}
    ${'Indoor, unmasked hangout with person who has COVID'}         | ${60000}
  `('should return $result for $scenario', ({ scenario, result }) => {
    const data: CalculatorData = {
      ...exampleLocation,
      ...prepopulated[scenario],
    }

    expect(calcValue(data)).toBeCloseTo(result)
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

    expect(calcValue(data)).toBeCloseTo(
      expectedPrevalance * RiskProfile['livingAlone']['multiplier'] * 1e6,
    )
  })

  it('should handle large risks', () => {
    const data: CalculatorData = {
      ...exampleLocation,
      riskProfile: 'hasCovid',
      interaction: 'repeated',
      personCount: 1,

      setting: 'indoor',
      distance: 'sixFt',
      duration: 60,
      theirMask: 'basic',
      yourMask: 'filtered',
      voice: 'silent',
    }

    const oneTime = calculate(data)
    expect(oneTime?.expectedValue).toBeCloseTo(0.3e6)
    expect(oneTime?.lowerBound).toBeCloseTo(0.1e6)
    expect(oneTime?.upperBound).toBeCloseTo(0.9e6)

    const twoTimes = calculate({ ...data, personCount: 2 })
    expect(twoTimes?.expectedValue).toBeCloseTo(0.51e6)
    expect(twoTimes?.lowerBound).toBeCloseTo(0.19e6)
    expect(twoTimes?.upperBound).toBeCloseTo(0.99e6)
  })

  describe('Interaction: partner', () => {
    const partner: CalculatorData = {
      ...exampleLocation,
      ...prepopulated[
        'Live-in partner who has no indoor interactions besides you'
      ],
    }
    it('should not be affected by multipliers', () => {
      const bonuses: CalculatorData = {
        ...partner,
        setting: 'outdoor',
        distance: 'tenFt',
        duration: 1,
        theirMask: 'filtered',
        yourMask: 'filtered',
        voice: 'silent',
      }

      expect(calcValue(partner)).toEqual(calcValue(bonuses))
    })

    it('should apply 48% risk', () => {
      expect(calcValue(partner)).toEqual(
        expectedPrevalance * RiskProfile.livingAlone.multiplier * 0.48 * 1e6,
      )
    })
  })

  describe('Interaction: housemate', () => {
    const base = {
      ...exampleLocation,
      riskProfile: 'average',
      interaction: 'repeated',
      personCount: 1,
    }
    const housemate: CalculatorData = {
      ...base,
      setting: 'indoor',
      distance: 'normal',
      duration: 120,
      theirMask: 'none',
      yourMask: 'none',
      voice: 'normal',
    }
    it('should not be affected by multipliers', () => {
      const bonuses: CalculatorData = {
        ...base,
        setting: 'outdoor',
        distance: 'tenFt',
        duration: 1,
        theirMask: 'filtered',
        yourMask: 'filtered',
        voice: 'silent',
      }

      expect(calcValue(housemate)).toEqual(calcValue(bonuses))
    })

    it('should apply 30% risk', () => {
      // average * 0.3
      expect(calcValue(housemate)).toEqual(expectedPrevalance * 0.3 * 1e6)
    })
  })

  describe('Distance: intimate', () => {
    it('should not give a bonus for outdoors', () => {
      const indoorIntimate: CalculatorData = {
        ...exampleLocation,
        ...prepopulated['One-night stand with a random person'],
      }
      const outdoorIntimate: CalculatorData = {
        ...indoorIntimate,
        setting: 'outdoor',
      }

      expect(calcValue(outdoorIntimate)).toEqual(calcValue(indoorIntimate))
    })

    it('should be at least 12% (1 hr) transfer risk.', () => {
      const oneHourIntimate: CalculatorData = {
        ...exampleLocation,
        ...prepopulated['One-night stand with a random person'],
        duration: 60,
      }
      const oneMinuteIntimate: CalculatorData = {
        ...oneHourIntimate,
        duration: 1,
      }
      const twoHourIntimate: CalculatorData = {
        ...oneHourIntimate,
        duration: 120,
      }

      expect(calcValue(oneMinuteIntimate)).toEqual(calcValue(oneHourIntimate))
      expect(calcValue(twoHourIntimate)).toEqual(
        calcValue(oneHourIntimate)! * 2,
      )
    })
  })

  describe('Distance: close', () => {
    it.each`
      duration | setting      | result        | scenario
      ${120}   | ${'indoor'}  | ${1440}       | ${'should be 12% per hour'}
      ${1}     | ${'indoor'}  | ${1440 / 120} | ${'should not have a minimum risk'}
      ${240}   | ${'outdoor'} | ${2880}       | ${'should not give an outdoors bonus'}
    `(' $scenario', ({ duration, setting, result }) => {
      const data: CalculatorData = {
        ...exampleLocation,
        personCount: 1,
        interaction: 'oneTime',
        riskProfile: 'average',
        distance: 'close',
        theirMask: 'none',
        yourMask: 'none',
        voice: 'normal',
        setting,
        duration,
      }

      expect(calcValue(data)).toEqual(result)
    })
  })
})
