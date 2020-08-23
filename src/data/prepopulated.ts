import { CalculatorData } from './calculate'

export type PartialData = Omit<
  CalculatorData,
  | 'location'
  | 'population'
  | 'casesPastWeek'
  | 'casesWeekBefore'
  | 'positiveCasePercentage'
>

export const prepopulated: {
  [key: string]: PartialData
} = {
  'Outdoor masked hangout with 2 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'masked',
    yourMask: 'masked',
  },

  'Indoor unmasked hangout with 2 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
  },

  'Car ride with 1 person for 15 mins': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'indoor',
    distance: 'normal',
    duration: 15,
    theirMask: 'none',
    yourMask: 'none',
  },

  'Physically intimate with person': {
    riskProfile: 'average',
    interaction: 'partner',
    personCount: 1,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
  },

  'Grocery store for 60 minutes': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 5,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'none',
    yourMask: 'masked',
  },

  'Plane ride': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 20,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 360,
    theirMask: 'masked',
    yourMask: 'masked',
  },

  'Eating in restaurant, outdoors': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'outdoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
  },

  'Eating in restaurant, indoors': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
  },


  'Going to bar': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 180,
    theirMask: 'none',
    yourMask: 'none',
  },

  'Large outdoor party: masked with 250 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 250,

    setting: 'outdoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'masked',
    yourMask: 'masked',
  },

  'Small indoor party: unmasked with 25 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 25,

    setting: 'indoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'none',
    yourMask: 'none',
  },

}
