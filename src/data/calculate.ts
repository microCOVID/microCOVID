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
  population: '7,500,000',
  casesPerDay: 1000,
  positiveCasePercentage: 3,

  riskProfile: 'average',
  interaction: 'oneTime',
  personCount: 1,

  setting: 'indoor',
  distance: 'sixFt',
  duration: 60,
  theirMask: 'masked',
  yourMask: 'masked',
}

const ONE_MILLION = 1e6 // One 'full' COVID

export const calculate = (data: CalculatorData): number => {
  let points

  // Prevalence
  const lastWeek = 7 * data.casesPerDay
  const population = Number(data.population.replace(/[^0-9.e]/g, ''))
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
}
