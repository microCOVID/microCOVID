import {
  Distance,
  Interaction,
  RiskProfile,
  Setting,
  TheirMask,
  Voice,
  YourMask,
} from 'data/data'

export interface CalculatorData {
  // Persistence
  persistedAt?: number

  // Prevalence
  topLocation: string
  subLocation: string
  population: string
  casesPastWeek: number
  casesIncreasingPercentage: number
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
  voice: string
}

export const defaultValues: CalculatorData = {
  topLocation: '',
  subLocation: '',
  population: '',
  casesPastWeek: 0,
  casesIncreasingPercentage: 0,
  positiveCasePercentage: 0,

  riskProfile: '',
  interaction: '',
  personCount: 0,

  setting: '',
  distance: '',
  duration: 0,
  theirMask: '',
  yourMask: '',
  voice: '',
}

const ONE_MILLION = 1e6 // One 'full' COVID

export const MAX_ACTIVITY_RISK = 0.48
export const MAX_POINTS = 100000

// --------
// our sheet at https://www.getguesstimate.com/models/16798
// suggests that given known unknowns we could be about 3x off
// in either direction
export const ERROR_FACTOR = 3

export const parsePopulation = (input: string): number =>
  Number(input.replace(/[^0-9.e]/g, ''))

export const calculateLocationReportedPrevalence = (
  data: CalculatorData,
): number | null => {
  const population = parsePopulation(data.population)
  const lastWeek = data.casesPastWeek
  const prevalence = lastWeek / population

  return prevalence
}

export const calculateLocationPersonAverage = (
  data: CalculatorData,
): number | null => {
  // Prevalence

  const prevalence = calculateLocationReportedPrevalence(data)
  if (!prevalence) {
    return null
  }

  let underreportingFactor

  // Under-reporting factor
  if (data.positiveCasePercentage < 5) {
    underreportingFactor = 6
  } else if (data.positiveCasePercentage < 15) {
    underreportingFactor = 8
  } else {
    underreportingFactor = 10
  }

  const delayFactor = 1 + Math.max(0, data.casesIncreasingPercentage / 100)

  // --------
  // Points for "random person from X location"
  const personRisk = prevalence * underreportingFactor * delayFactor

  return personRisk * ONE_MILLION
}

export const calculatePersonRiskEach = (
  data: CalculatorData,
  averagePersonRisk: number,
): number | null => {
  try {
    let risk
    if (data.riskProfile === 'hasCovid') {
      // Special case COVID: they have a 100% chance of having it
      risk = ONE_MILLION
    } else {
      risk = averagePersonRisk
      risk *= RiskProfile[data.riskProfile].multiplier
    }

    return risk
  } catch {
    return null
  }
}

export const calculatePersonRisk = (
  data: CalculatorData,
  averagePersonRisk: number,
): number | null => {
  try {
    let risk = calculatePersonRiskEach(data, averagePersonRisk)
    if (!risk) {
      return null
    }

    risk *= data.personCount

    return risk
  } catch {
    return null
  }
}

export const calculateActivityRisk = (data: CalculatorData): number | null => {
  try {
    const repeatedInteraction = ['repeated', 'partner'].includes(
      data.interaction,
    )

    let multiplier = 1
    multiplier *= Interaction[data.interaction].multiplier

    if (!repeatedInteraction) {
      multiplier *= Setting[data.setting].multiplier
      multiplier *= Distance[data.distance].multiplier
      multiplier *= TheirMask[data.theirMask].multiplier
      multiplier *= YourMask[data.yourMask].multiplier
      multiplier *= Voice[data.voice].multiplier
      multiplier *= (data.duration || 60) / 60.0
    }
    if (multiplier > MAX_ACTIVITY_RISK) {
      multiplier = MAX_ACTIVITY_RISK
    }
    return multiplier
  } catch {
    return null
  }
}

export const calculate = (data: CalculatorData): number | null => {
  try {
    let points

    const repeatedInteraction = ['repeated', 'partner'].includes(
      data.interaction,
    )

    const averagePersonRisk = calculateLocationPersonAverage(data)
    if (!averagePersonRisk) {
      return null
    }

    // Person risk
    points = calculatePersonRisk(data, averagePersonRisk)
    if (!points) {
      return null
    }

    // Interaction type
    if (repeatedInteraction) {
      points *= Interaction[data.interaction].multiplier
    } else {
      const activityRisk = calculateActivityRisk(data)
      if (activityRisk != null) {
        points *= activityRisk
      }
    }

    if (points > MAX_POINTS) {
      points = MAX_POINTS
    }

    return points
  } catch {
    // Something went wrong; fail gracefully
    return null
  }
}
