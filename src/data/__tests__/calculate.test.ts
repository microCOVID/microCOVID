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
  RiskProfilesUnaffectedByVaccines,
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
  percentFullyVaccinated: 40,
  averageFullyVaccinatedMultiplier: 0.8,
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
      ((PREVALENCE * 2) / 20) * 0.14 * (1 / 3) * (2 / 3) * 1e6,
    )
  })

  it.each`
    scenario                             | result
    ${'outdoorMasked2'}                  | ${19}
    ${'indoorUnmasked2'}                 | ${1680}
    ${'1person_15minCarRide'}            | ${210}
    ${'oneNightStand'}                   | ${3600}
    ${'liveInPartner_noContacts'}        | ${42}
    ${'60minShopping'}                   | ${93}
    ${'60minShoppingFew'}                | ${56}
    ${'60minShoppingCrowded'}            | ${187}
    ${'planeRide'}                       | ${765}
    ${'planeRideMiddleSeatEmpty'}        | ${373}
    ${'restaurantOutdoors'}              | ${472.5}
    ${'restaurantIndoors'}               | ${9450}
    ${'bar'}                             | ${54000}
    ${'largeOutdoorParty'}               | ${2240}
    ${'smallIndoorParty25'}              | ${63000}
    ${'outdoorMaskedWithCovidPositive'}  | ${1555.6}
    ${'indoorUnmaskedWithCovidPositive'} | ${140000}
    ${'votingInPerson'}                  | ${6}
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
    expect(oneTime?.expectedValue).toBeCloseTo(0.4e6)
    expect(oneTime?.lowerBound).toBeCloseTo(133333, 0)
    // TODO(beshaya): Write a test that doesn't saturated upper bounds.
    expect(oneTime?.upperBound).toBeCloseTo(1e6)

    const twoTimes = calculate({ ...data, personCount: 2 })
    // Should apply 1 - (1-p)^2 rather than multiplying by 2
    expect(twoTimes?.expectedValue).toBeCloseTo(0.64e6)
    expect(twoTimes?.lowerBound).toBeCloseTo(248888.8, 0)
    expect(twoTimes?.upperBound).toBeCloseTo(1e6)
  })

  it.each`
    profile                                          | points
    ${RiskProfilesUnaffectedByVaccines.DECI_PERCENT} | ${1e6 / 1000 / 50}
    ${RiskProfilesUnaffectedByVaccines.ONE_PERCENT}  | ${1e6 / 100 / 50}
    ${RiskProfilesUnaffectedByVaccines.HAS_COVID}    | ${1e6}
  `(
    'should treat $profile as independent of prevalence',
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
    const unvaccinatedPartner = { ...partner, theirVaccine: 'unvaccinated' }
    const vaccinatedPartner = { ...partner, theirVaccine: 'vaccinated' }
    it('should not be affected by these multipliers', () => {
      const bonuses: CalculatorData = {
        ...unvaccinatedPartner,
        setting: 'outdoor',
        distance: 'tenFt',
        duration: 1,
        theirMask: 'filtered',
        yourMask: 'filtered',
        voice: 'silent',
      }

      expect(calcValue(unvaccinatedPartner)).toEqual(calcValue(bonuses))
    })

    it('should apply 60% risk for an unvaccinated partner', () => {
      expect(calcValue(unvaccinatedPartner)).toBeCloseTo(
        PREVALENCE *
          0.6 *
          1e6 *
          personRiskMultiplier({
            riskProfile: RiskProfile['livingAlone'],
            isHousemate: false,
            symptomsChecked: 'no',
          }),
      )
    })
    it('should apply 30% risk for a partner with unknown vax status', () => {
      expect(calcValue(partner)).toBeCloseTo(
        0.5 * (calcValue(unvaccinatedPartner) || -1),
      )
    })
    it('should apply 6% risk for a vaccinated partner', () => {
      expect(calcValue(vaccinatedPartner)).toBeCloseTo(
        0.8 * (calcValue(unvaccinatedPartner) || -1),
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

    it('should apply 40% risk', () => {
      // average * 0.4
      expect(calcValue(housemate)).toBeCloseTo(PREVALENCE * 0.4 * 1e6)
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
      ${120}   | ${'indoor'}  | ${3360}       | ${'should be 18% per hour'}
      ${1}     | ${'indoor'}  | ${3360 / 120} | ${'should not have a minimum risk'}
      ${120}   | ${'outdoor'} | ${3360}       | ${'should not give an outdoors bonus'}
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

      expect(calcValue(data)).toBeCloseTo(result)
    })
  })

  describe('yourVaccine', () => {
    const noVaccineScenario = testData(prepopulated['1person_15minCarRide'])
    const noVaccineValue = calcValue(noVaccineScenario)

    it.each`
      type             | doses | multiplier
      ${'pfizer'}      | ${0}  | ${1}
      ${'pfizer'}      | ${1}  | ${1}
      ${'pfizer'}      | ${2}  | ${0.8}
      ${'pfizer'}      | ${3}  | ${0.25}
      ${'moderna'}     | ${0}  | ${1}
      ${'moderna'}     | ${1}  | ${1}
      ${'moderna'}     | ${2}  | ${0.8}
      ${'moderna'}     | ${3}  | ${0.25}
      ${'astraZeneca'} | ${0}  | ${1}
      ${'astraZeneca'} | ${1}  | ${1}
      ${'astraZeneca'} | ${2}  | ${1}
      ${'astraZeneca'} | ${3}  | ${0.3}
      ${'johnson'}     | ${0}  | ${1}
      ${'johnson'}     | ${1}  | ${0.95}
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
        calcValue(noVaccineLongScenario)! * 0.8,
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
        calcValue(noVaccineHousemate)! * 0.8,
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
        calcValue(noVaccinePartner)! * 0.8,
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
      ).toEqual(defaultValue * 2 * 0.8)
    })
  })

  describe('percentFullyVaccinated', () => {
    const defaultScenario = {
      ...testData(prepopulated['1person_15minCarRide']),
      averageFullyVaccinatedMultiplier: 0.4,
      percentFullyVaccinated: 40,
      unvaccinatedPrevalenceRatio: null,
    }
    const defaultUnvaccinatedPrevalenceRatio = 1 / (0.4 * 0.4 + 0.6)

    it.each`
      theirVaccine
      ${'vaccinated'}
      ${'unvaccinated'}
    `(
      'Should decrease risk for lower vaccination rate when interacting with $theirVaccine people',
      ({ theirVaccine }) => {
        const defaultValue = calcValue({ ...defaultScenario, theirVaccine })!
        const value = calcValue({
          ...defaultScenario,
          theirVaccine,
          percentFullyVaccinated: defaultScenario.percentFullyVaccinated! / 2,
        })
        const expectedUnvaccinatedPrevalenceRatio = 1 / (0.4 * 0.2 + 0.8)
        expect(value).toBeCloseTo(
          defaultValue *
            (expectedUnvaccinatedPrevalenceRatio /
              defaultUnvaccinatedPrevalenceRatio),
        )
      },
    )

    it.each`
      theirVaccine
      ${'vaccinated'}
      ${'unvaccinated'}
    `(
      'Should increase risk for higher vaccination rate when interacting with $theirVaccine people',
      ({ theirVaccine }) => {
        const defaultValue = calcValue({ ...defaultScenario, theirVaccine })!
        const value = calcValue({
          ...defaultScenario,
          theirVaccine,
          percentFullyVaccinated: defaultScenario.percentFullyVaccinated! * 2,
        })
        const expectedUnvaccinatedPrevalenceRatio = 1 / (0.4 * 0.8 + 0.2)
        expect(value).toBeCloseTo(
          defaultValue *
            (expectedUnvaccinatedPrevalenceRatio /
              defaultUnvaccinatedPrevalenceRatio),
        )
      },
    )

    it('Should not change risk if theirVaccine is undefined', () => {
      const defaultValue = calcValue({
        ...defaultScenario,
        theirVaccine: 'undefined',
      })!
      const value = calcValue({
        ...defaultScenario,
        theirVaccine: 'undefined',
        percentFullyVaccinated: defaultScenario.percentFullyVaccinated! * 2,
      })
      expect(value).toEqual(defaultValue)
    })

    it('Should not change risk if unvaccinatedPrevalenceRatio is available', () => {
      const defaultValue = calcValue({
        ...defaultScenario,
        theirVaccine: 'vaccinated',
        unvaccinatedPrevalenceRatio: 0.2,
      })!
      const value = calcValue({
        ...defaultScenario,
        theirVaccine: 'vaccinated',
        unvaccinatedPrevalenceRatio: 0.2,
        percentFullyVaccinated: defaultScenario.percentFullyVaccinated! * 2,
      })
      expect(value).toEqual(defaultValue)
    })
  })
})
