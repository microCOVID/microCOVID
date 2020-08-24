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
}

export const defaultValues: CalculatorData = {
  location: '',
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
}

const ONE_MILLION = 1e6 // One 'full' COVID

export const parsePopulation = (input: string): number =>
  Number(input.replace(/[^0-9.e]/g, ''))

export const calculateLocationPersonAverage = (
  data: CalculatorData,
): number | null => {
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
  const delayFactor = 1 + Math.max(0, data.casesIncreasingPercentage / 100)

  // --------
  // Points for "random person from X location"
  const personRisk =
    (lastWeek * underreportingFactor * delayFactor) / population

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
      multiplier *= Math.min((data.duration || 60) / 60.0, 5)
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

    return points
  } catch {
    // Something went wrong; fail gracefully
    return null
  }
}
