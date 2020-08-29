import {
  Distance,
  FormValue,
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
  positiveCasePercentage: number | null

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

// Convention: all of these functions return null if they determine
// that we have insufficient data filled in to do the calculation

export const calculateLocationReportedPrevalence = (
  data: CalculatorData,
): number | null => {
  const population = parsePopulation(data.population)
  if (population === 0) {
    return null
  }

  const lastWeek = data.casesPastWeek
  if (lastWeek === 0 && data.topLocation === '') {
    // If the data say zero cases, go with it; but if the user
    // entered zero cases, call it incomplete.
    return null
  }

  // Additive smoothing, only relevant for super low case numbers
  const prevalence = (lastWeek + 1) / population
  return prevalence
}

export const calculateLocationPersonAverage = (
  data: CalculatorData,
): number | null => {
  // Prevalence

  const prevalence = calculateLocationReportedPrevalence(data)
  if (prevalence === null) {
    return null
  }

  let underreportingFactor

  // Under-reporting factor
  if (data.positiveCasePercentage === null) {
    // No positive test rate data available => assume the worst
    underreportingFactor = 10
  } else if (data.positiveCasePercentage < 5) {
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
  let risk
  if (data.riskProfile === 'hasCovid') {
    // Special case COVID: they have a 100% chance of having it
    risk = ONE_MILLION
  } else if (data.riskProfile === '') {
    // If risk profile isn't selected, call it incomplete
    return null
  } else {
    risk = averagePersonRisk
    risk *= RiskProfile[data.riskProfile].multiplier
  }
  return risk
}

export const calculatePersonRisk = (
  data: CalculatorData,
  averagePersonRisk: number,
): number | null => {
  let risk = calculatePersonRiskEach(data, averagePersonRisk)
  if (risk === null || data.personCount === 0) {
    return null
  }
  risk *= data.personCount
  return risk
}

export const calculateActivityRisk = (data: CalculatorData): number | null => {
  if (data.interaction === '') {
    return null
  }

  const repeatedInteraction = ['repeated', 'partner'].includes(data.interaction)

  let multiplier = 1
  multiplier *= Interaction[data.interaction].multiplier

  if (!repeatedInteraction) {
    // If something isn't selected, use the "baseline" value (indoor, unmasked,
    // undistanced, regular conversation)
    const mulFor = (
      table: { [key: string]: FormValue },
      given: string,
    ): number => (given === '' ? 1 : table[given].multiplier)
    multiplier *= mulFor(Setting, data.setting)
    multiplier *= mulFor(Distance, data.distance)
    multiplier *= mulFor(TheirMask, data.theirMask)
    multiplier *= mulFor(YourMask, data.yourMask)
    multiplier *= mulFor(Voice, data.voice)

    if (data.duration === 0) {
      return null
    }
    multiplier *= data.duration / 60.0
  }
  if (multiplier > MAX_ACTIVITY_RISK) {
    multiplier = MAX_ACTIVITY_RISK
  }
  return multiplier
}

export const calculate = (data: CalculatorData): number | null => {
  let points

  const averagePersonRisk = calculateLocationPersonAverage(data)
  if (averagePersonRisk === null) {
    return null
  }

  // Person risk
  points = calculatePersonRisk(data, averagePersonRisk)
  if (points === null) {
    return null
  }

  // Activity risk
  const activityRisk = calculateActivityRisk(data)
  if (activityRisk === null) {
    return null
  }
  points *= activityRisk

  if (points > MAX_POINTS) {
    points = MAX_POINTS
  }

  return points
}
