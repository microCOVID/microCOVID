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
  casesPerDay: number
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
  casesPerDay: 0,
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
        data.casesPerDay &&
        data.population &&
        data.positiveCasePercentage &&
        data.personCount &&
        data.riskProfile &&
        data.setting &&
        data.interaction &&
        data.distance &&
        data.theirMask &&
        data.yourMask
      )
    ) {
      return null
    }

    // Prevalence
    const lastWeek = 7 * data.casesPerDay
    const population = parsePopulation(data.population)
    let underreportingFactor

    // Under-reporting factor
    if (data.positiveCasePercentage < 5) {
      underreportingFactor = 6
    } else if (data.positiveCasePercentage < 15) {
      underreportingFactor = 8
    } else {
      underreportingFactor = 10
    }

    // --------
    // Points for "random person from X location"
    const personRisk = (lastWeek * underreportingFactor) / population
    points = personRisk * ONE_MILLION

    // Person risk
    points *= data.personCount
    points *= RiskProfile[data.riskProfile].multiplier

    // Activity risk
    points *= Setting[data.setting].multiplier
    points *= Distance[data.distance].multiplier
    points *= TheirMask[data.theirMask].multiplier
    points *= YourMask[data.yourMask].multiplier

    // Duration + interaction type
    if (data.interaction === 'repeated') {
      points *= Interaction[data.interaction].multiplier
    } else {
      points *=
        Interaction[data.interaction].multiplier *
        Math.min((data.duration || 60) / 60.0, 4)
    }

    return points
  } catch {
    return null
  }
}
