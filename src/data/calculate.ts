import {
  Distance,
  Interaction,
  RiskProfile,
  Setting,
  TheirMask,
  YourMask,
} from 'data/data'

export interface CalculatorData {
  // Persistence
  persistedAt?: number

  // Prevalence
  location: string
  population: string
  casesPastWeek: number
  casesWeekBefore: number
  positiveCasePercentage: number

  // Person risk
  riskProfile: string
  interaction: string
  personCount: number

  // Activity risk
  setting: string
  distance: string
  duration: number
  theirMask: string
  yourMask: string
}

export const defaultValues: CalculatorData = {
  location: '',
  population: '',
  casesPastWeek: 0,
  casesWeekBefore: 0,
  positiveCasePercentage: 0,

  riskProfile: '',
  interaction: '',
  personCount: 0,

  setting: '',
  distance: '',
  duration: 0,
  theirMask: '',
  yourMask: '',
}

const ONE_MILLION = 1e6 // One 'full' COVID

export const parsePopulation = (input: string): number =>
  Number(input.replace(/[^0-9.e]/g, ''))

export const calculate = (data: CalculatorData): number | null => {
  try {
    let points

    if (
      !(
        data.casesPastWeek &&
        data.casesWeekBefore &&
        data.population &&
        data.positiveCasePercentage &&
        data.personCount &&
        data.riskProfile &&
        data.interaction
      )
    ) {
      return null
    }

    const repeatedInteraction = ['repeated', 'partner'].includes(
      data.interaction,
    )
    if (
      !repeatedInteraction &&
      !(data.setting && data.distance && data.theirMask && data.yourMask)
    ) {
      return null
    }

    // Prevalence
    const population = parsePopulation(data.population)
    let underreportingFactor

    // Under-reporting factor
    if (data.positiveCasePercentage < 5) {
      underreportingFactor = 4
    } else if (data.positiveCasePercentage < 15) {
      underreportingFactor = 5
    } else {
      underreportingFactor = 7
    }

    const lastWeek = data.casesPastWeek
    const delayFactor = Math.max(1, lastWeek / data.casesWeekBefore)

    // --------
    // Points for "random person from X location"
    const personRisk =
      (lastWeek * underreportingFactor * delayFactor) / population

    // Person risk
    if (data.riskProfile === 'hasCovid') {
      // Special case COVID: they have a 100% chance of having it
      points = ONE_MILLION
    } else {
      points = personRisk * ONE_MILLION
      points *= RiskProfile[data.riskProfile].multiplier
    }
    points *= data.personCount

    // Interaction type
    if (repeatedInteraction) {
      points *= Interaction[data.interaction].multiplier
    } else {
      // Activity risk
      points *= Setting[data.setting].multiplier
      points *= Distance[data.distance].multiplier
      points *= TheirMask[data.theirMask].multiplier
      points *= YourMask[data.yourMask].multiplier

      points *=
        Interaction[data.interaction].multiplier *
        Math.min((data.duration || 60) / 60.0, 5)
    }

    return points
  } catch {
    // Something went wrong; fail gracefully
    return null
  }
}
