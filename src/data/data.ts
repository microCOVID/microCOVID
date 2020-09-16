import i18n from '../i18n'

import { fixedPointPrecisionPercent } from 'data/FormatPrecision'

export interface FormValue {
  label: string
  multiplier: number
}

const formValue = function (label: string, multiplier: number): FormValue {
  return { label, multiplier }
}

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
  },

  closedPod4: {
    label: i18n.t('data.person.closedPod4'),
    multiplier: (1 + 4 * housemateMult) * livingAloneMult,
  },

  closedPod10: {
    label: i18n.t('data.person.closedPod10'),
    multiplier: (1 + 10 * housemateMult) * livingAloneMult,
  },

  closedPod20: {
    label: i18n.t('data.person.closedPod20'),
    multiplier: (1 + 20 * housemateMult) * livingAloneMult,
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
  hasCovid: {
    label: i18n.t('data.person.hasCovid'),
    multiplier: -1,
  },
}
