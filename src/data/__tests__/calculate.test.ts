import {
  CalculatorData,
  DAY_0,
  calculate,
  calculateLocationPersonAverage,
  defaultValues,
} from 'data/calculate'
import {
  BUDGET_ONE_PERCENT,
  RiskProfile,
  RiskProfileEnum,
  personRiskMultiplier,
} from 'data/data'
import { prepopulated } from 'data/prepopulated'

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// The reported prevalence in |baseTestData|
const BASE_RATE = 0.003

// The expected adjusted prevalence in |baseTestData|
const RATE = 0.006

const dateAfterDay0 = (daysAfterDay0: number) => {
  const date = new Date()
  date.setTime(DAY_0.getTime() + daysAfterDay0 * MILLISECONDS_PER_DAY)
  return date
}

// Prevailance is RATE (2x prevalance ratio)
const baseTestData = {
  riskBudget: BUDGET_ONE_PERCENT,
  subLocation: 'mock city',
  topLocation: 'mock state',
  population: '1,000,000',
  casesPastWeek: 2999, // will add 1 in pseudocount
  casesIncreasingPercentage: 0,
  positiveCasePercentage: 0,
  prevalanceDataDate: dateAfterDay0(25), // prevalance ratio = 25 * positivity_rate ** 0.5 + 2
  symptomFreeAndWillReportSymptoms: 0,
}

// Variables that should be ignored for repeated/partner interactions.
const repeatedDontCare = {
  setting: 'indoor',
  distance: 'sixFt',
  duration: 60,
  theirMask: 'none',
  yourMask: 'none',
  voice: 'normal',
}

// Wrapper for calculate that just returns expectedValue
const calcValue = (data: CalculatorData) => {
  const result = calculate(data)
  if (!result) {
    return null
  }
  return result.expectedValue
}

const testData: (partial: Partial<CalculatorData>) => CalculatorData = (
  partial,
) => {
  return {
    ...defaultValues,
    ...baseTestData,
    ...partial,
  }
}

describe('calculateLocationPersonAverage', () => {
  it.each`
    positiveCasePercentage | result
    ${0}                   | ${RATE}
    ${4}                   | ${BASE_RATE * (0.04 ** 0.5 * 25 + 2)}
    ${6}                   | ${BASE_RATE * (0.06 ** 0.5 * 25 + 2)}
    ${16}                  | ${BASE_RATE * (0.16 ** 0.5 * 25 + 2)}
    ${100}                 | ${BASE_RATE * (25 + 2)}
    ${null}                | ${BASE_RATE * (25 + 2)}
  `(
    'should compensate for underreporting, positiveCasePercentage = $positiveCasePercentage',
    ({ positiveCasePercentage, result }) => {
      expect(
        calculateLocationPersonAverage(testData({ positiveCasePercentage })),
      ).toBeCloseTo(result * 1e6)
    },
  )

  it.each`
    day    | result
    ${0}   | ${BASE_RATE * ((0.25 ** 0.5 * 1250) / 25 + 2)}
    ${25}  | ${BASE_RATE * ((0.25 ** 0.5 * 1250) / 50 + 2)}
    ${50}  | ${BASE_RATE * ((0.25 ** 0.5 * 1250) / 75 + 2)}
    ${300} | ${BASE_RATE * ((0.25 ** 0.5 * 1250) / 325 + 2)}
  `(
    'should reduce the effect of positiveCasePercentage as 1250 / (days + 25), days = $day',
    ({ day, result }) => {
      expect(
        calculateLocationPersonAverage(
          testData({
            positiveCasePercentage: 25,
            prevalanceDataDate: dateAfterDay0(day),
          }),
        ),
      ).toBeCloseTo(result * 1e6)
    },
  )

  it.each`
    casesIncreasingPercentage | result
    ${0}                      | ${RATE}
    ${-20}                    | ${RATE}
    ${10}                     | ${RATE * 1.1}
    ${50}                     | ${RATE * 1.5}
    ${100}                    | ${RATE * 2.0}
    ${200}                    | ${RATE * 2.0}
  `(
    'should compensate for time delay',
    ({ casesIncreasingPercentage, result }) => {
      expect(
        calculateLocationPersonAverage(testData({ casesIncreasingPercentage })),
      ).toBeCloseTo(result * 1e6)
    },
  )
})

describe('calculate', () => {
  it('produces same results as by hand', () => {
    const scenario = 'Outdoor masked hangout with 2 people'
    const data: CalculatorData = testData(prepopulated[scenario])

    const response = calcValue(data)
    // average * 2 people * outdoor * 1 hr * their mask * your mask
    expect(response).toBe(((((RATE * 2) / 20) * 0.06) / 4 / 1) * 1e6)
  })

  it.each`
    scenario                                                        | result
    ${'Outdoor masked hangout with 2 people'}                       | ${9}
    ${'Indoor unmasked hangout with 2 people'}                      | ${720}
    ${'Car ride with 1 person for 15 mins'}                         | ${90}
    ${'One-night stand with a random person'}                       | ${2880}
    ${'Live-in partner who has no indoor interactions besides you'} | ${21.6}
    ${'Grocery store for 60 minutes'}                               | ${45}
    ${'Plane ride'}                                                 | ${360}
    ${'Eating in restaurant, outdoors'}                             | ${202.5}
    ${'Eating in restaurant, indoors'}                              | ${4050}
    ${'Going to bar'}                                               | ${27000}
    ${'Large outdoor party: masked with 3 feet between people'}     | ${1080}
    ${'Small indoor party: unmasked with 25 people'}                | ${27000}
    ${'Outdoor, masked hangout with person who has COVID'}          | ${750}
    ${'Voting in-person'}                                           | ${1.5}
    ${'Indoor, unmasked hangout with person who has COVID'}         | ${60000}
  `('should return $result for $scenario', ({ scenario, result }) => {
    const data: CalculatorData = testData(prepopulated[scenario])

    expect(calcValue(data)).toBeCloseTo(result)
  })

  it('should produce a self-consistent living alone risk profile', () => {
    const data = testData({
      ...baseTestData,
      riskProfile: 'average',
      interaction: 'oneTime',
      personCount: 10,

      setting: 'indoor',
      distance: 'sixFt',
      duration: 60,
      theirMask: 'basic',
      yourMask: 'filtered',
      voice: 'silent',
    })

    expect(calcValue(data)).toBeCloseTo(
      RATE *
        1e6 *
        personRiskMultiplier({
          riskProfile: RiskProfile['livingAlone'],
          isHousemate: false,
          allSymptomFree: false,
          willReport: false,
        }),
    )
  })

  it('should handle large risks', () => {
    const data = testData({
      riskProfile: 'hasCovid',
      interaction: 'repeated',
      personCount: 1,

      setting: 'indoor',
      distance: 'sixFt',
      duration: 60,
      theirMask: 'basic',
      yourMask: 'filtered',
      voice: 'silent',
    })

    const oneTime = calculate(data)
    expect(oneTime?.expectedValue).toBeCloseTo(0.3e6)
    expect(oneTime?.lowerBound).toBeCloseTo(0.1e6)
    expect(oneTime?.upperBound).toBeCloseTo(0.9e6)

    const twoTimes = calculate({ ...data, personCount: 2 })
    expect(twoTimes?.expectedValue).toBeCloseTo(0.51e6)
    expect(twoTimes?.lowerBound).toBeCloseTo(0.19e6)
    expect(twoTimes?.upperBound).toBeCloseTo(0.99e6)
  })

  it.each`
    profile                         | points
    ${RiskProfileEnum.DECI_PERCENT} | ${1e6 / 1000 / 50}
    ${RiskProfileEnum.ONE_PERCENT}  | ${1e6 / 100 / 50}
    ${RiskProfileEnum.HAS_COVID}    | ${1e6}
  `(
    'should treat $profile as independent of prevalance',
    ({ profile, points }) => {
      const data = testData({
        ...baseTestData,
        ...repeatedDontCare,
        riskProfile: profile,
        interaction: 'repeated',
        personCount: 1,
      })

      const expected = points * 0.3
      expect(calcValue(data)).toBeCloseTo(expected)
      expect(
        calcValue({
          ...data,
          positiveCasePercentage: baseTestData.positiveCasePercentage * 10,
        }),
      ).toBeCloseTo(expected)
    },
  )

  describe('Interaction: partner', () => {
    const partner = testData(
      prepopulated[
        'Live-in partner who has no indoor interactions besides you'
      ],
    )
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
      expect(calcValue(partner)).toBeCloseTo(
        RATE *
          0.48 *
          1e6 *
          personRiskMultiplier({
            riskProfile: RiskProfile['livingAlone'],
            isHousemate: false,
            allSymptomFree: false,
            willReport: false,
          }),
      )
    })
  })

  describe('Interaction: housemate', () => {
    const base = {
      ...baseTestData,
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

      expect(calcValue(housemate)).toBeCloseTo(calcValue(bonuses)!)
    })

    it('should apply 30% risk', () => {
      // average * 0.3
      expect(calcValue(housemate)).toEqual(RATE * 0.3 * 1e6)
    })
  })

  describe('Distance: intimate', () => {
    it('should not give a bonus for outdoors', () => {
      const indoorIntimate: CalculatorData = {
        ...baseTestData,
        ...prepopulated['One-night stand with a random person'],
      }
      const outdoorIntimate: CalculatorData = {
        ...indoorIntimate,
        setting: 'outdoor',
      }

      expect(calcValue(outdoorIntimate)).toEqual(calcValue(indoorIntimate))
    })

    it('should not give a bonus for masks', () => {
      const unmaskedIntimate: CalculatorData = {
        ...baseTestData,
        ...prepopulated['One-night stand with a random person'],
        yourMask: 'none',
        theirMask: 'none',
      }
      const maskedIntimate: CalculatorData = {
        ...unmaskedIntimate,
        yourMask: 'n95',
        theirMask: 'filtered',
      }

      expect(calcValue(unmaskedIntimate)).toEqual(calcValue(maskedIntimate))
    })
    it('should be at least 12% (1 hr) transfer risk.', () => {
      const oneHourIntimate: CalculatorData = {
        ...baseTestData,
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
        ...baseTestData,
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
