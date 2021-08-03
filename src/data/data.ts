import i18n from '../i18n'

import { formatPercent } from 'components/calculator/util/FormatPrecision'

export interface CheckBoxFormValue extends FormValue {
  description?: string
  sublabel?: string
}

export interface BaseFormValue {
  label: string
  label_short?: string
  multiplier?: number
}

export interface FormValue extends BaseFormValue {
  multiplier: number
  housemateMultiplier?: number // Different multiplier to apply if the contact is a housemate.
}

export interface PersonRiskValue extends BaseFormValue {
  label: string
  personalMultiplier: number
  numHousemates: number
  numOtherTraceableContacts: number // Not including housemates
  contactsMultiplier: number
}

const formValue = function (label: string, multiplier: number): FormValue {
  return { label, multiplier }
}

const segmentedFormValue = function (
  label: string,
  description: string,
  multiplier: number,
): CheckBoxFormValue {
  return { label, multiplier, description }
}

export const oneTimeMult = 0.14
export const housemateMult = 0.4
export const partnerMult = 0.6

export const Interaction: { [key: string]: FormValue } = {
  oneTime: {
    label: i18n.t('data.oneTime', {
      percentage: formatPercent(oneTimeMult, { decimalPointsToShow: 2 }),
    }),
    multiplier: oneTimeMult,
  },
  workplace: {
    label: i18n.t('data.workplace', {
      percentage: formatPercent(oneTimeMult),
    }),
    multiplier: oneTimeMult,
  },
  partner: {
    label: i18n.t('data.partner', {
      percentage: formatPercent(partnerMult),
    }),
    multiplier: partnerMult,
  },
  repeated: {
    label: i18n.t('data.repeated', {
      percentage: formatPercent(housemateMult),
    }),
    multiplier: housemateMult,
  },
}

export const Setting: { [key: string]: FormValue } = {
  indoor: { label: i18n.t('data.indoor'), multiplier: 1 },
  outdoor: { label: i18n.t('data.outdoor'), multiplier: 0.05 },
  filtered: { label: i18n.t('data.filtered'), multiplier: 0.25 },
  transit: { label: i18n.t('data.transit'), multiplier: 0.25 },
  plane: { label: i18n.t('data.plane'), multiplier: 1 / 6 },
  carWindowsDown: { label: i18n.t('data.car_windows_down'), multiplier: 0.25 },
  partiallyEnclosed: {
    label: i18n.t('data.partially_enclosed'),
    multiplier: 0.25,
  },
}

export const intimateDurationFloor = 20

export const Distance: { [key: string]: FormValue } = {
  intimate: formValue(i18n.t('data.intimate_distance'), 5),
  close: formValue(i18n.t('data.close_distance'), 2),
  normal: formValue(i18n.t('data.normal_distance'), 1),
  sixFt: formValue(i18n.t('data.sixft_distance'), 0.5),
  tenFt: formValue(i18n.t('data.tenft_distance'), 0.25),
}

const noneLabel = i18n.t('data.no_mask_short')
const thinLabel = i18n.t('data.thin_mask_short')
const basicLabel = i18n.t('data.basic_mask_short')
const surgicalLabel = i18n.t('data.surgical_mask_short')
const filteredLabel = i18n.t('data.filtered_mask_short')
const n95Label = i18n.t('data.n95_mask_short')
const n95SealedLabel = i18n.t('data.n95_sealed_mask_short')
const p100Label = i18n.t('data.p100_mask_short')

const noneDesc = i18n.t('data.no_mask')
const thinDesc = i18n.t('data.thin_mask')
const basicDesc = i18n.t('data.basic_mask')
const surgicalDesc = i18n.t('data.surgical_mask')
const filteredDesc = i18n.t('data.filtered_mask')
const n95Desc = i18n.t('data.n95_mask')
const n95SealedDesc = i18n.t('data.n95_sealed_mask')
const p100DescTheirs = i18n.t('data.p100_mask_theirs')
const p100DescYours = i18n.t('data.p100_mask_yours')
export const TheirMask: { [key: string]: CheckBoxFormValue } = {
  none: segmentedFormValue(noneLabel, noneDesc, 1.0),
  thin: segmentedFormValue(thinLabel, thinDesc, 1 / 2),
  basic: segmentedFormValue(basicLabel, basicDesc, 1 / 3),
  surgical: segmentedFormValue(surgicalLabel, surgicalDesc, 1 / 4),
  filtered: segmentedFormValue(filteredLabel, filteredDesc, 1 / 4),
  n95: segmentedFormValue(n95Label, n95Desc, 1 / 6),
  n95Sealed: segmentedFormValue(n95SealedLabel, n95SealedDesc, 1 / 16),
  p100: segmentedFormValue(p100Label, p100DescTheirs, 1 / 3),
}
export const YourMask: { [key: string]: CheckBoxFormValue } = {
  none: segmentedFormValue(noneLabel, noneDesc, 1.0),
  thin: segmentedFormValue(thinLabel, thinDesc, 1.0),
  basic: segmentedFormValue(basicLabel, basicDesc, 2 / 3),
  surgical: segmentedFormValue(surgicalLabel, surgicalDesc, 1 / 2),
  filtered: segmentedFormValue(filteredLabel, filteredDesc, 1 / 2),
  n95: segmentedFormValue(n95Label, n95Desc, 1 / 3),
  n95Sealed: segmentedFormValue(n95SealedLabel, n95SealedDesc, 1 / 8),
  p100: segmentedFormValue(p100Label, p100DescYours, 1 / 20),
}
export const Voice: { [key: string]: FormValue } = {
  silent: {
    label: i18n.t('data.silent_voice'),
    label_short: i18n.t('data.silent_voice_short'),
    multiplier: 0.2,
  },
  normal: {
    label: i18n.t('data.normal_voice'),
    label_short: i18n.t('data.normal_voice_short'),
    multiplier: 1,
  },
  loud: {
    label: i18n.t('data.loud_voice'),
    label_short: i18n.t('data.loud_voice_short'),
    multiplier: 5,
  },
}

export const BUDGET_TEN_PERCENT = 100000
export const BUDGET_THREE_PERCENT = 30000
export const BUDGET_ONE_PERCENT = 10000
export const BUDGET_ONE_TENTH_PERCENT = 1000

export const budgetOptions: { [key: string]: CheckBoxFormValue } = {}

budgetOptions[BUDGET_ONE_TENTH_PERCENT.toString()] = {
  label: i18n.t('calculator.risk_tolerance_point1_percent_label'),
  sublabel: i18n.t('calculator.risk_tolerance_point1_percent_explanation'),
  multiplier: 0.1,
}

budgetOptions[BUDGET_ONE_PERCENT.toString()] = {
  label: i18n.t('calculator.risk_tolerance_1_percent_label'),
  sublabel: i18n.t('calculator.risk_tolerance_1_percent_explanation'),
  multiplier: 1,
}

budgetOptions[BUDGET_THREE_PERCENT.toString()] = {
  label: i18n.t('calculator.risk_tolerance_3_percent_label'),
  sublabel: i18n.t('calculator.risk_tolerance_3_percent_explanation'),
  multiplier: 3,
}

budgetOptions[BUDGET_TEN_PERCENT.toString()] = {
  label: i18n.t('calculator.risk_tolerance_10_percent_label'),
  sublabel: i18n.t('calculator.risk_tolerance_10_percent_explanation'),
  multiplier: 10,
}

// TODO(beshaya): Move RiskProfile to it's own file.
/*
 * Exposed to ten (silent distanced masked) average people indoors,
 * while wearing a surgical mask, one-time, for one hour per week.
 */
export const livingAloneMult =
  10 *
  Voice.silent.multiplier *
  Distance.sixFt.multiplier *
  TheirMask.basic.multiplier *
  YourMask.surgical.multiplier *
  Interaction.oneTime.multiplier *
  Setting.indoor.multiplier

const HEALTHCARE_MULT = 2.0
const SYMPTOM_FREE_LAST_SEEN_TODAY_MULT = 0.5
const SYMPTOM_FREE_LAST_SEEN_MORE_THAN_THREE_DAYS_AGO = 1 / 7

export const personRiskMultiplier: (arg: {
  riskProfile: PersonRiskValue
  isHousemate: boolean
  symptomsChecked: string
}) => number = ({ riskProfile, isHousemate, symptomsChecked }) => {
  const symptomFreeMult =
    symptomsChecked !== 'no' ? SYMPTOM_FREE_LAST_SEEN_TODAY_MULT : 1
  const housemateSymptomFreeMult = symptomFreeMult
  const contactSymptomFreeMult =
    symptomsChecked === 'yesThreeDays'
      ? SYMPTOM_FREE_LAST_SEEN_MORE_THAN_THREE_DAYS_AGO
      : symptomFreeMult

  // Remove the person doing the calculation from the number of contacts if applicable.
  const housematesNotIncludingUser = Math.max(
    0,
    riskProfile.numHousemates - (isHousemate ? 1 : 0),
  )
  const housematesRisk =
    housemateSymptomFreeMult *
    housematesNotIncludingUser *
    riskProfile.contactsMultiplier
  const otherContactsRisk =
    contactSymptomFreeMult *
    riskProfile.numOtherTraceableContacts *
    riskProfile.contactsMultiplier

  const riskFromAllContacts =
    (housematesRisk + otherContactsRisk) * housemateMult

  return (
    (riskProfile.personalMultiplier + riskFromAllContacts) * symptomFreeMult
  )
}

// Shorthand for filling in RiskProfiles with no contacts
const noContacts = {
  numHousemates: 0,
  numOtherTraceableContacts: 0,
  contactsMultiplier: 0,
}

export const RiskProfile: { [key: string]: PersonRiskValue } = {
  average: {
    label: i18n.t('data.person.average'),
    personalMultiplier: 1.0,
    ...noContacts,
  },
  livingAlone: {
    label: i18n.t('data.person.livingAlone'),
    personalMultiplier: livingAloneMult,
    ...noContacts,
  },

  livingWithPartner: {
    label: i18n.t('data.person.livingWithPartner'),
    personalMultiplier: livingAloneMult,
    numHousemates: 1,
    numOtherTraceableContacts: 0,
    contactsMultiplier: livingAloneMult,
  },

  closedPod4: {
    label: i18n.t('data.person.closedPod4'),
    personalMultiplier: livingAloneMult,
    numHousemates: 3,
    numOtherTraceableContacts: 0,
    contactsMultiplier: livingAloneMult,
  },

  closedPod10: {
    label: i18n.t('data.person.closedPod10'),
    personalMultiplier: livingAloneMult,
    numHousemates: 9,
    numOtherTraceableContacts: 0,
    contactsMultiplier: livingAloneMult,
  },

  closedPod20: {
    label: i18n.t('data.person.closedPod20'),
    personalMultiplier: livingAloneMult,
    numHousemates: 19,
    numOtherTraceableContacts: 0,
    contactsMultiplier: livingAloneMult,
  },

  contact1: {
    label: i18n.t('data.person.contact1'),
    personalMultiplier: livingAloneMult,
    numHousemates: 0,
    numOtherTraceableContacts: 1,
    contactsMultiplier: 1,
  },

  contact4: {
    label: i18n.t('data.person.contact4'),
    personalMultiplier: livingAloneMult,
    numHousemates: 0,
    numOtherTraceableContacts: 3,
    contactsMultiplier: 1,
  },

  contact10: {
    label: i18n.t('data.person.contact10'),
    personalMultiplier: livingAloneMult,
    numHousemates: 0,
    numOtherTraceableContacts: 9,
    contactsMultiplier: 1,
  },

  contactWorks: {
    label: i18n.t('data.person.contactWorks'),
    personalMultiplier: livingAloneMult,
    numHousemates: 0,
    numOtherTraceableContacts: 1,
    contactsMultiplier: HEALTHCARE_MULT,
  },

  bars: {
    label: i18n.t('data.person.bars'),
    /*
     * Six hours of indoor exposure to a dozen people (2 near you, 10 six feet away)
     * who are not wearing masks and are talking loudly.
     */
    personalMultiplier:
      6 *
      Interaction.oneTime.multiplier *
      (2 + 10 * Distance.sixFt.multiplier * Voice.loud.multiplier),
    ...noContacts,
  },
}

// This is an explicit list of risk profiles for which "their vaccine" modifiers
// do not apply.
export const RiskProfilesUnaffectedByVaccines: {
  [key: string]: keyof typeof RiskProfile
} = {
  ONE_PERCENT: 'onePercent',
  DECI_PERCENT: 'deciPercent',
  HAS_COVID: 'hasCovid',
}

RiskProfile[RiskProfilesUnaffectedByVaccines.ONE_PERCENT] = {
  label: i18n.t('data.person.microcovid_budget_one_percent'),
  personalMultiplier: NaN,
  numHousemates: NaN,
  numOtherTraceableContacts: NaN,
  contactsMultiplier: NaN,
}

RiskProfile[RiskProfilesUnaffectedByVaccines.DECI_PERCENT] = {
  label: i18n.t('data.person.microcovid_budget_deci_percent'),
  personalMultiplier: NaN,
  numHousemates: NaN,
  numOtherTraceableContacts: NaN,
  contactsMultiplier: NaN,
}

RiskProfile[RiskProfilesUnaffectedByVaccines.HAS_COVID] = {
  label: i18n.t('data.person.hasCovid'),
  personalMultiplier: NaN,
  numHousemates: NaN,
  numOtherTraceableContacts: NaN,
  contactsMultiplier: NaN,
}

export interface VaccineValue {
  label: string
  multiplierPerDose: number[] // muliplierPerDose[n] is the multiplier for having |n| doses of vaccine.
}

export const Vaccines: { [key: string]: VaccineValue } = {
  pfizer: {
    label: i18n.t('data.vaccine.pfizer'),
    multiplierPerDose: [1, 0.76, 0.17],
  },
  moderna: {
    label: i18n.t('data.vaccine.moderna'),
    multiplierPerDose: [1, 0.76, 0.17],
  },
  astraZeneca: {
    label: i18n.t('data.vaccine.astra_zeneca'),
    multiplierPerDose: [1, 0.76, 0.47],
  },
  johnson: {
    label: i18n.t('data.vaccine.johnson_johnson'),
    multiplierPerDose: [1, 0.36],
  },
  sputnik: {
    label: i18n.t('data.vaccine.sputnik'),
    multiplierPerDose: [1, 0.76, 0.17],
  },
  unknown: {
    label: i18n.t('data.vaccine.unknown'),
    multiplierPerDose: [1, 0.76, 0.47],
  },
}

export const TheirVaccine: { [key: string]: CheckBoxFormValue } = {
  vaccinated: {
    label: i18n.t('data.their_vaccine.yes'),
    description: i18n.t('data.their_vaccine.yes_description'),
    multiplier: 0,
  },
  unvaccinated: {
    label: i18n.t('data.their_vaccine.no'),
    description: i18n.t('data.their_vaccine.no_description'),
    multiplier: 0,
  },
  undefined: {
    label: i18n.t('data.their_vaccine.unknown'),
    description: i18n.t('data.their_vaccine.unknown_description'),
    multiplier: 0,
  },
}
