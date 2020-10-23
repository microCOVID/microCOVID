import { fixedPointPrecisionPercent } from 'components/calculator/util/FormatPrecision'

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
    label: `One-time interaction [${fixedPointPrecisionPercent(
      oneTimeMult,
    )} chance of transmission per hour]`,
    multiplier: oneTimeMult,
  },
  repeated: {
    label: `Household member [${fixedPointPrecisionPercent(
      housemateMult,
    )} chance of transmission per week]`,
    multiplier: housemateMult,
  },
  partner: {
    label: `Partner / spouse [${fixedPointPrecisionPercent(
      partnerMult,
    )} chance of transmission per week]`,
    multiplier: partnerMult,
  },
}

export const Setting: { [key: string]: FormValue } = {
  indoor: { label: 'Indoor', multiplier: 1 },
  outdoor: { label: 'Outdoor', multiplier: 0.05 },
}

export const intimateDurationFloor = 60

export const Distance: { [key: string]: FormValue } = {
  intimate: formValue('Kissing', 2),
  close: formValue('Close (<1ft / 0.3m apart)', 2),
  normal: formValue('Normal socializing (~3ft / ~1m apart)', 1),
  sixFt: formValue('>6ft / 2m apart', 0.5),
  tenFt: formValue('>10ft / 3m apart', 0.25),
}

const noneLabel = 'No mask or poorly-worn mask'
const basicLabel = 'Cotton mask, bandana, or buff'
const filteredLabel = 'Surgical mask or mask with PM2.5 filter insert'
export const TheirMask: { [key: string]: FormValue } = {
  none: formValue(noneLabel, 1.0),
  basic: formValue(basicLabel, 0.25),
  filtered: formValue(filteredLabel, 0.25),
}
export const YourMask: { [key: string]: FormValue } = {
  none: formValue(noneLabel, 1.0),
  basic: formValue(basicLabel, 1.0),
  filtered: formValue(filteredLabel, 0.5),
}
export const Voice: { [key: string]: FormValue } = {
  silent: {
    label: 'Not talking (such as quietly riding the train)',
    multiplier: 0.2,
  },
  normal: { label: 'Normal conversation', multiplier: 1 },
  loud: {
    label: 'Loud talking (shouting, talking over music, singing)',
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
    label: 'An average person in your area',
    multiplier: 1,
  },

  frontline: {
    label: 'An essential or front-line worker in your area',
    multiplier: 3,
  },

  nonFrontline: {
    label: 'Someone in your area who is NOT an essential or front-line worker',
    multiplier: 0.5,
  },

  livingAlone: {
    label: 'Lives alone and only grocery shops',
    multiplier: livingAloneMult,
  },

  livingWithPartner: {
    label: 'Lives with partner, both people only grocery shop',
    multiplier: (1 + 0.48) * livingAloneMult,
  },

  closedPod4: {
    label: 'In a closed pod of 4 people (who do not go to work or socialize)',
    multiplier: (1 + 4 * housemateMult) * livingAloneMult,
  },

  closedPod10: {
    label: 'In a closed pod of 10 people (who do not go to work or socialize)',
    multiplier: (1 + 10 * housemateMult) * livingAloneMult,
  },

  closedPod20: {
    label: 'In a closed pod of 20 people (who do not go to work or socialize)',
    multiplier: (1 + 20 * housemateMult) * livingAloneMult,
  },

  contact1: {
    label:
      'Has 1 close contact (incl. roommates) who socializes but does not work. No other work or socializing.',
    multiplier: housemateMult * 0.5 + livingAloneMult, // Housemate + grocery exposure
  },

  contact4: {
    label:
      'Has 4 close contacts (incl. roommates) who socialize but do not work. No other work or socializing.',
    multiplier: 4 * housemateMult * 0.5 + livingAloneMult, // Housemate + grocery exposure
  },

  contact10: {
    label:
      'Has 10 close contacts (incl. roommates) who socialize but do not work. No other work or socializing.',
    multiplier: 10 * housemateMult * 0.5 + livingAloneMult, // Housemate + grocery exposure
  },

  contactWorks: {
    label:
      'Has 1 close contact (incl. roommates) who is an essential worker. No other work or socializing.',
    multiplier: housemateMult * 3 + livingAloneMult, // Housemate + grocery exposure
  },

  bars: {
    label: 'Goes to bars regularly',
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
    label: 'Has COVID',
    multiplier: -1,
  },
}
