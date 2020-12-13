import i18n from '../i18n'

import { CalculatorData } from './calculate'

export type PartialData = Omit<
  CalculatorData,
  | 'riskBudget'
  | 'topLocation'
  | 'subLocation'
  | 'population'
  | 'casesPastWeek'
  | 'casesIncreasingPercentage'
  | 'positiveCasePercentage'
  | 'prevalanceDataDate'
>

export const prepopulated: {
  [key: string]: PartialData
} = {
  [i18n.t('scenario.outdoorMasked2')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'normal',
  },

  [i18n.t('scenario.indoorUnmasked2')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.1person_15minCarRide')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'indoor',
    distance: 'normal',
    duration: 15,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.oneNightStand')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'indoor',
    distance: 'intimate',
    duration: 600,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.liveInPartner_noContacts')]: {
    riskProfile: 'livingAlone',
    interaction: 'partner',
    personCount: 1,

    setting: 'indoor',
    distance: 'intimate',
    duration: 600,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.60minShopping')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 5,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
  },

  [i18n.t('scenario.planeRide')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 20,

    setting: 'plane',
    distance: 'normal',
    duration: 360,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
  },

  [i18n.t('scenario.restaurantOutdoors')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'outdoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.restaurantIndoors')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.bar')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 120,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'loud',
  },

  [i18n.t('scenario.largeOutdoorParty')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 80,

    setting: 'outdoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'normal',
  },

  [i18n.t('scenario.smallIndoorParty25')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 25,

    setting: 'indoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  [i18n.t('scenario.outdoorMaskedWithCovidPositive')]: {
    riskProfile: 'hasCovid',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'normal',
  },

  [i18n.t('scenario.votingInPerson')]: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 10,
    theirMask: 'basic',
    yourMask: 'filtered',
    voice: 'silent',
  },

  [i18n.t('scenario.indoorUnmaskedWithCovidPositive')]: {
    riskProfile: 'hasCovid',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },
}
