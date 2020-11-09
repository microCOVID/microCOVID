import i18n from '../i18n'

import { fixedPointPrecisionPercent } from 'components/calculator/util/FormatPrecision'

export interface CheckBoxFormValue extends FormValue {
  value: string
  sublabel?: string
}

export interface FormValue {
  label: string
  multiplier: number
  housemateMultiplier?: number // Different multiplier to apply if the contact is a housemate.
}

const formValue = function (label: string, multiplier: number): FormValue {
  return { label, multiplier }
}

export const TOP_LOCATION_MANUAL_ENTRY = 'MANUAL_DATA'

const oneTimeMult = 0.06
const housemateMult = 0.3
const partnerMult = 0.48
export const Interaction: { [key: string]: FormValue } = {
  oneTime: {
    label: i18n.t('data.oneTime', {
      percentage: fixedPointPrecisionPercent(oneTimeMult),
    }),
    multiplier: oneTimeMult,
  },
  repeated: {
    label: i18n.t('data.repeated', {
      percentage: fixedPointPrecisionPercent(housemateMult),
    }),
    multiplier: housemateMult,
  },
  partner: {
    label: i18n.t('data.partner', {
      percentage: fixedPointPrecisionPercent(partnerMult),
    }),
    multiplier: partnerMult,
  },
}

export const Setting: { [key: string]: FormValue } = {
  indoor: { label: i18n.t('data.indoor'), multiplier: 1 },
  outdoor: { label: i18n.t('data.outdoor'), multiplier: 0.05 },
  filtered: { label: i18n.t('data.filtered'), multiplier: 0.25 },
  transit: { label: i18n.t('data.transit'), multiplier: 0.25 },
  carWindowsDown: { label: i18n.t('data.car_windows_down'), multiplier: 0.25 },
  partiallyEnclosed: {
    label: i18n.t('data.partially_enclosed'),
    multiplier: 0.25,
  },
}

export const intimateDurationFloor = 60

export const Distance: { [key: string]: FormValue } = {
  intimate: formValue(i18n.t('data.intimate_distance'), 2),
  close: formValue(i18n.t('data.close_distance'), 2),
  normal: formValue(i18n.t('data.normal_distance'), 1),
  sixFt: formValue(i18n.t('data.sixft_distance'), 0.5),
  tenFt: formValue(i18n.t('data.tenft_distance'), 0.25),
}

const noneLabel = i18n.t('data.no_mask')
const basicLabel = i18n.t('data.basic_mask')
const filteredLabel = i18n.t('data.filtered_mask')
const n95Label = i18n.t('data.n95_mask')
export const TheirMask: { [key: string]: FormValue } = {
  none: formValue(noneLabel, 1.0),
  basic: formValue(basicLabel, 0.25),
  filtered: formValue(filteredLabel, 0.25),
  n95: formValue(n95Label, 0.1),
}
export const YourMask: { [key: string]: FormValue } = {
  none: formValue(noneLabel, 1.0),
  basic: formValue(basicLabel, 1.0),
  filtered: formValue(filteredLabel, 0.5),
  n95: formValue(n95Label, 0.1),
}
export const Voice: { [key: string]: FormValue } = {
  silent: {
    label: i18n.t('data.silent_voice'),
    multiplier: 0.2,
  },
  normal: { label: i18n.t('data.normal_voice'), multiplier: 1 },
  loud: {
    label: i18n.t('data.loud_voice'),
    multiplier: 5,
  },
}

export const BUDGET_ONE_PERCENT = 10000
export const BUDGET_ONE_TENTH_PERCENT = 1000

export const budgetOptions = [
  {
    label: i18n.t('calculator.risk_tolerance_1_percent_label'),
    sublabel: i18n.t('calculator.risk_tolerance_1_percent_explanation'),
    multiplier: 1,
    value: BUDGET_ONE_PERCENT.toString(),
  },
  {
    label: i18n.t('calculator.risk_tolerance_point1_percent_label'),
    sublabel: i18n.t('calculator.risk_tolerance_point1_percent_explanation'),
    multiplier: 0.1,
    value: BUDGET_ONE_TENTH_PERCENT.toString(),
  },
]

/*
 * Exposed to ten (silent distanced masked) average people indoors,
 * while wearing a surgical mask, one-time, for one hour per week.
 */
const livingAloneMult =
  10 *
  Voice.silent.multiplier *
  Distance.sixFt.multiplier *
  TheirMask.basic.multiplier *
  YourMask.filtered.multiplier *
  Interaction.oneTime.multiplier *
  Setting.indoor.multiplier

export const RiskProfile: { [key: string]: FormValue } = {
  average: {
    label: i18n.t('data.person.average'),
    multiplier: 1,
  },

  frontline: {
    label: i18n.t('data.person.frontline'),
    multiplier: 3,
  },

  nonFrontline: {
    label: i18n.t('data.person.nonFrontline'),
    multiplier: 0.5,
  },

  livingAlone: {
    label: i18n.t('data.person.livingAlone'),
    multiplier: livingAloneMult,
  },

  livingWithPartner: {
    label: i18n.t('data.person.livingWithPartner'),
    multiplier: (1 + 0.48) * livingAloneMult,
    housemateMultiplier: livingAloneMult,
  },

  closedPod4: {
    label: i18n.t('data.person.closedPod4'),
    multiplier: (1 + 4 * housemateMult) * livingAloneMult,
    housemateMultiplier: (1 + 3 * housemateMult) * livingAloneMult,
  },

  closedPod10: {
    label: i18n.t('data.person.closedPod10'),
    multiplier: (1 + 10 * housemateMult) * livingAloneMult,
    housemateMultiplier: (1 + 9 * housemateMult) * livingAloneMult,
  },

  closedPod20: {
    label: i18n.t('data.person.closedPod20'),
    multiplier: (1 + 20 * housemateMult) * livingAloneMult,
    housemateMultiplier: (1 + 19 * housemateMult) * livingAloneMult,
  },

  contact1: {
    label: i18n.t('data.person.contact1'),
    multiplier: housemateMult * 0.5 + livingAloneMult, // Housemate + grocery exposure
  },

  contact4: {
    label: i18n.t('data.person.contact4'),
    multiplier: 4 * housemateMult * 0.5 + livingAloneMult, // Housemate + grocery exposure
  },

  contact10: {
    label: i18n.t('data.person.contact10'),
    multiplier: 10 * housemateMult * 0.5 + livingAloneMult, // Housemate + grocery exposure
  },

  contactWorks: {
    label: i18n.t('data.person.contactWorks'),
    multiplier: housemateMult * 3 + livingAloneMult, // Housemate + grocery exposure
  },

  bars: {
    label: i18n.t('data.person.bars'),
    /*
     * Six hours of indoor exposure to a dozen people (2 near you, 10 six feet away)
     * who are not wearing masks and are talking loudly.
     */
    multiplier:
      6 *
      Interaction.oneTime.multiplier *
      (2 + 10 * Distance.sixFt.multiplier * Voice.loud.multiplier),
  },
}

// Special keys for RiskProfile that need to be checked elsewhere.
export const RiskProfileEnum = {
  ONE_PERCENT: 'onePercent',
  DECI_PERCENT: 'deciPercent',
  HAS_COVID: 'hasCovid',
}

RiskProfile[RiskProfileEnum.ONE_PERCENT] = {
  label: i18n.t('data.person.microcovid_budget_one_percent'),
  multiplier: NaN,
}

RiskProfile[RiskProfileEnum.DECI_PERCENT] = {
  label: i18n.t('data.person.microcovid_budget_deci_percent'),
  multiplier: NaN,
}

RiskProfile[RiskProfileEnum.HAS_COVID] = {
  label: i18n.t('data.person.hasCovid'),
  multiplier: -1,
}
