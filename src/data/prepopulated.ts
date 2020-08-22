import { CalculatorData } from './calculate'

export type PartialData = Omit<
  CalculatorData,
  'population' | 'casesPerDay' | 'positiveCasePercentage'
>

export const prepopulated: {
  [key: string]: PartialData
} = {
  'Lyft Ride with the windows down': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'outdoor',
    distance: 'sixFt',
    duration: 20,
    theirMask: 'masked',
    yourMask: 'masked',
  },
  '60m Grocery Store Trip': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 10,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'masked',
    yourMask: 'masked',
  },
}
