import {
  CalculatorData,
  DAY_0,
  calculate,
  calculateLocationPersonAverage,
  defaultValues,
} from 'data/calculate'
import {
  B117_CONTAGIOUSNESS_ADJUSTMENT,
  BUDGET_ONE_PERCENT,
  RiskProfile,
  RiskProfileEnum,
  housemateMult,
  personRiskMultiplier,
} from 'data/data'
import { prepopulated } from 'data/prepopulated'

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// The reported prevalence in |baseTestData|
const REPORTED_PREVALENCE = 0.003

// The expected adjusted prevalence in |baseTestData|
const PREVALENCE = 0.006

const dateAfterDay0 = (daysAfterDay0: number) => {
  const date = new Date()
  date.setTime(DAY_0.getTime() + daysAfterDay0 * MILLISECONDS_PER_DAY)
  return date
}

// Prevailance is PREVALENCE (2x prevalance ratio)
const baseTestData = {
  riskBudget: BUDGET_ONE_PERCENT,
  useManualEntry: 0,
  subLocation: 'mock city',
  topLocation: 'mock state',
  population: '1,000,000',
  casesPastWeek: 2999, // will add 1 in pseudocount
  casesIncreasingPercentage: 0,
  positiveCasePercentage: 0,
  // prevalance ratio = 1000 / (10 + i) * positivity_rate ** 0.5 + 2 = 25 * positivity_rate ** 0.5 + 2
  prevalanceDataDate: dateAfterDay0(30),
  unvaccinatedPrevalenceRatio: 2,
  averageFullyVaccinatedMultiplier: 0.1,
  symptomsChecked: 'no',
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
    ${0}                   | ${PREVALENCE}
    ${4}                   | ${REPORTED_PREVALENCE * (0.04 ** 0.5 * 25 + 2)}
    ${6}                   | ${REPORTED_PREVALENCE * (0.06 ** 0.5 * 25 + 2)}
    ${16}                  | ${REPORTED_PREVALENCE * (0.16 ** 0.5 * 25 + 2)}
    ${100}                 | ${REPORTED_PREVALENCE * (25 + 2)}
    ${null}                | ${REPORTED_PREVALENCE * (25 + 2)}
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
    ${0}   | ${REPORTED_PREVALENCE * ((0.25 ** 0.5 * 1000) / 10 + 2)}
    ${25}  | ${REPORTED_PREVALENCE * ((0.25 ** 0.5 * 1000) / 35 + 2)}
    ${50}  | ${REPORTED_PREVALENCE * ((0.25 ** 0.5 * 1000) / 60 + 2)}
    ${300} | ${REPORTED_PREVALENCE * ((0.25 ** 0.5 * 1000) / 310 + 2)}
  `(
    'should reduce the effect of positiveCasePercentage as 1000 / (days + 10), days = $day',
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
    ${0}                      | ${PREVALENCE}
    ${-20}                    | ${PREVALENCE}
    ${10}                     | ${PREVALENCE * 1.1}
    ${50}                     | ${PREVALENCE * 1.5}
    ${100}                    | ${PREVALENCE * 2.0}
    ${200}                    | ${PREVALENCE * 2.0}
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
    const scenario = 'outdoorMasked2'
    const data: CalculatorData = testData(prepopulated[scenario])

    const response = calcValue(data)
    // average * 2 people * outdoor * 1 hr * their mask * your mask
    expect(response).toBeCloseTo(
      ((PREVALENCE * 2) / 20) *
        0.06 *
        B117_CONTAGIOUSNESS_ADJUSTMENT *
        (1 / 3) *
        (2 / 3) *
        1e6,
    )
  })

  it.each`
    scenario                             | result
    ${'outdoorMasked2'}                  | ${8 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'indoorUnmasked2'}                 | ${720 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'1person_15minCarRide'}            | ${90 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'oneNightStand'}                   | ${2880}
    ${'liveInPartner_noContacts'}        | ${29 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'60minShopping'}                   | ${40 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'60minShoppingFew'}                | ${24 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'60minShoppingCrowded'}            | ${80 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'planeRide'}                       | ${328 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'planeRideMiddleSeatEmpty'}        | ${160 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'restaurantOutdoors'}              | ${202.5 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'restaurantIndoors'}               | ${4050 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'bar'}                             | ${27000 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'largeOutdoorParty'}               | ${960 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'smallIndoorParty25'}              | ${27000 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'outdoorMaskedWithCovidPositive'}  | ${666.6 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'indoorUnmaskedWithCovidPositive'} | ${60000 * B117_CONTAGIOUSNESS_ADJUSTMENT}
    ${'votingInPerson'}                  | ${2.6 * B117_CONTAGIOUSNESS_ADJUSTMENT}
  `('should return $result for $scenario', ({ scenario, result }) => {
    const data: CalculatorData = testData(prepopulated[scenario])

    expect(calcValue(data)).toBeCloseTo(result, 0)
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
      yourMask: 'surgical',
      voice: 'silent',
    })

    expect(calcValue(data)).toBeCloseTo(
      PREVALENCE *
        1e6 *
        personRiskMultiplier({
          riskProfile: RiskProfile['livingAlone'],
          isHousemate: false,
          symptomsChecked: 'no',
        }),
    )
  })

  it('should handle large risks', () => {
    const data = testData({
      riskProfile: 'hasCovid',
      interaction: 'repeated',
      personCount: 1,
      ...repeatedDontCare,
    })

    const oneTime = calculate(data)
    expect(oneTime?.expectedValue).toBeCloseTo(0.3e6)
    expect(oneTime?.lowerBound).toBeCloseTo(0.1e6)
    expect(oneTime?.upperBound).toBeCloseTo(0.9e6)

    const twoTimes = calculate({ ...data, personCount: 2 })
    // Should apply 1 - (1-p)^2 rather than multiplying by 2
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

      const expected = points * housemateMult
      expect(calcValue(data)).toBeCloseTo(expected)
      expect(
        calcValue({
          ...data,
          positiveCasePercentage: baseTestData.positiveCasePercentage * 10,
        }),
      ).toBeCloseTo(expected)
    },
  )

  describe('Interaction: workplace', () => {
    const workplace = testData({
      ...baseTestData,
      ...repeatedDontCare,
      riskProfile: 'average',
      interaction: 'workplace',
      personCount: 1,
    })

    it('should behave the same as a one time interaction', () => {
      const oneTime: CalculatorData = {
        ...workplace,
        interaction: 'oneTime',
      }
      expect(calcValue(workplace)).toEqual(calcValue(oneTime))
    })
  })

  describe('Interaction: partner', () => {
    const partner = testData(prepopulated['liveInPartner_noContacts'])
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
        PREVALENCE *
          0.48 *
          1e6 *
          personRiskMultiplier({
            riskProfile: RiskProfile['livingAlone'],
            isHousemate: false,
            symptomsChecked: 'no',
          }),
      )
    })
  })

  describe('Interaction: housemate', () => {
    const base = testData({
      riskProfile: 'average',
      interaction: 'repeated',
      personCount: 1,
    })
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
      expect(calcValue(housemate)).toBeCloseTo(PREVALENCE * 0.3 * 1e6)
    })

    it('should remove the risk from the user for risk profiles including housemates', () => {
      const housemateData = testData({
        riskProfile: 'closedPod4',
        interaction: 'repeated',
      })
      const equivalentOneTime = testData({
        riskProfile: 'closdedPod4',
        interaction: 'oneTime',
        duration: 60 * 5,
      })
      expect(calcValue(housemateData)).toBeCloseTo(
        (calcValue(equivalentOneTime)! * (1 + 0.45 * 2)) / (1 + 0.45 / 3),
      )
    })
  })

  describe('Distance: intimate', () => {
    const indoorIntimate: CalculatorData = testData(
      prepopulated['oneNightStand'],
    )
    it('should not give a bonus for outdoors', () => {
      const outdoorIntimate: CalculatorData = {
        ...indoorIntimate,
        setting: 'outdoor',
      }
      expect(calcValue(outdoorIntimate)).toEqual(calcValue(indoorIntimate))
    })

    it('should not give a bonus for masks', () => {
      const unmaskedIntimate = testData({
        ...prepopulated['oneNightStand'],
        yourMask: 'none',
        theirMask: 'none',
      })
      const maskedIntimate: CalculatorData = {
        ...unmaskedIntimate,
        yourMask: 'n95',
        theirMask: 'filtered',
      }

      expect(calcValue(unmaskedIntimate)).toEqual(calcValue(maskedIntimate))
    })
    it('should be at least 12% (20 min) transfer risk.', () => {
      const twentyMinuteIntimate: CalculatorData = {
        ...indoorIntimate,
        duration: 20,
      }
      const oneMinuteIntimate: CalculatorData = {
        ...twentyMinuteIntimate,
        duration: 1,
      }
      const thirtyMinuteIntimate: CalculatorData = {
        ...twentyMinuteIntimate,
        duration: 30,
      }

      expect(calcValue(oneMinuteIntimate)).toEqual(
        calcValue(twentyMinuteIntimate),
      )
      expect(calcValue(thirtyMinuteIntimate)).toBeCloseTo(
        calcValue(twentyMinuteIntimate)! * 1.5,
      )
    })
    it('should not exceed live-in-partner risk,', () => {
      const tenHourIntimate: CalculatorData = {
        ...indoorIntimate,
        duration: 600,
      }
      const partnerIntimate: CalculatorData = {
        ...indoorIntimate,
        interaction: 'partner',
      }
      expect(calcValue(tenHourIntimate)).toBeCloseTo(
        calcValue(partnerIntimate)!,
      )
    })
    it('should not apply talking multiplier', () => {
      const kissingTalking = testData({
        ...prepopulated['oneNightStand'],
        voice: 'normal',
      })
      const kissingSilent: CalculatorData = {
        ...kissingTalking,
        voice: 'silent',
      }
      const kissingLoudTalking: CalculatorData = {
        ...kissingTalking,
        voice: 'loud',
      }
      expect(calcValue(kissingTalking)).toEqual(calcValue(kissingSilent))
      expect(calcValue(kissingTalking)).toEqual(calcValue(kissingLoudTalking))
    })
  })

  describe('Distance: close', () => {
    it.each`
      duration | setting      | result        | scenario
      ${120}   | ${'indoor'}  | ${1440}       | ${'should be 18% per hour'}
      ${1}     | ${'indoor'}  | ${1440 / 120} | ${'should not have a minimum risk'}
      ${120}   | ${'outdoor'} | ${1440}       | ${'should not give an outdoors bonus'}
    `(' $scenario', ({ duration, setting, result }) => {
      const data: CalculatorData = testData({
        personCount: 1,
        interaction: 'oneTime',
        riskProfile: 'average',
        distance: 'close',
        theirMask: 'none',
        yourMask: 'none',
        voice: 'normal',
        setting,
        duration,
      })

      expect(calcValue(data)).toEqual(result * B117_CONTAGIOUSNESS_ADJUSTMENT)
    })
  })

  describe('yourVaccine', () => {
    const noVaccineScenario = testData(prepopulated['1person_15minCarRide'])
    const noVaccineValue = calcValue(noVaccineScenario)

    it.each`
      type             | doses | multiplier
      ${'pfizer'}      | ${0}  | ${1}
      ${'pfizer'}      | ${1}  | ${0.56}
      ${'pfizer'}      | ${2}  | ${0.1}
      ${'moderna'}     | ${0}  | ${1}
      ${'moderna'}     | ${1}  | ${0.56}
      ${'moderna'}     | ${2}  | ${0.1}
      ${'astraZeneca'} | ${0}  | ${1}
      ${'astraZeneca'} | ${1}  | ${0.56}
      ${'astraZeneca'} | ${2}  | ${0.4}
      ${'johnson'}     | ${0}  | ${1}
      ${'johnson'}     | ${1}  | ${0.33}
    `(
      '$doses doses of $type should give a multiplier of $multiplier',
      ({ type, doses, multiplier }) => {
        const data: CalculatorData = {
          ...noVaccineScenario,
          yourVaccineDoses: doses,
          yourVaccineType: type,
        }
        expect(calcValue(data)! / noVaccineValue!).toBeCloseTo(multiplier)
      },
    )

    it('Should apply vaccine reduction after activity max', () => {
      const noVaccineLongScenario = { ...noVaccineScenario, duration: 100000 }
      const vaccineLongScenario = {
        ...noVaccineLongScenario,
        yourVaccineDoses: 2,
        yourVaccineType: 'pfizer',
      }
      expect(calcValue(vaccineLongScenario)).toBeCloseTo(
        calcValue(noVaccineLongScenario)! * 0.1,
      )
    })

    it('Should apply vaccine multiplier to housemates activities', () => {
      const noVaccineHousemate: CalculatorData = {
        ...noVaccineScenario,
        interaction: 'repeated',
      }
      const vaccineHousemate = {
        ...noVaccineHousemate,
        yourVaccineDoses: 2,
        yourVaccineType: 'pfizer',
      }
      expect(calcValue(vaccineHousemate)).toBeCloseTo(
        calcValue(noVaccineHousemate)! * 0.1,
      )
    })

    it('Should apply vaccine multiplier to partner activities', () => {
      const noVaccinePartner = testData(
        prepopulated['liveInPartner_noContacts'],
      )
      const vaccinePartner = {
        ...noVaccinePartner,
        yourVaccineDoses: 2,
        yourVaccineType: 'pfizer',
      }
      expect(calcValue(vaccinePartner)).toBeCloseTo(
        calcValue(noVaccinePartner)! * 0.1,
      )
    })
  })

  describe('theirVaccine', () => {
    const noVaccineScenario = testData(prepopulated['1person_15minCarRide'])
    const defaultValue = calcValue(noVaccineScenario)!

    it('Should use "undefined" by default', () => {
      expect(noVaccineScenario.theirVaccine).toEqual('undefined')
    })

    it('Should increase risk for unvaccinated people', () => {
      expect(
        calcValue({ ...noVaccineScenario, theirVaccine: 'unvaccinated' }),
      ).toEqual(defaultValue * 2)
    })

    it('Should decrease risk for vaccinated people', () => {
      expect(
        calcValue({ ...noVaccineScenario, theirVaccine: 'vaccinated' }),
      ).toEqual(defaultValue * 2 * 0.1)
    })
  })
})
