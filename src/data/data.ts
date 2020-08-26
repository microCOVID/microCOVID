export interface FormValue {
  label: string
  multiplier: number
}

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
    /*
     * Exposed to ten (silent distanced masked) average people indoors,
     * me masked, one-time, for one hour per week.
     *  10 * (0.2 * 0.5 * 0.25) * 0.5 * 0.06 * 1 = 0.0075
     */
    multiplier: 0.0075,
  },

  livingWithPartner: {
    label: 'Lives with partner, both people only grocery shop',
    multiplier: (1 + 0.48) * 0.0075,
  },

  closedPod4: {
    label: 'In a closed pod of 4 people (who do not go to work or socialize)',
    multiplier: (1 + 4 * 0.3) * 0.0075,
  },

  closedPod10: {
    label: 'In a closed pod of 10 people (who do not go to work or socialize)',
    multiplier: (1 + 10 * 0.3) * 0.0075,
  },

  closedPod20: {
    label: 'In a closed pod of 20 people (who do not go to work or socialize)',
    multiplier: (1 + 20 * 0.3) * 0.0075,
  },

  contact1: {
    label:
      'Has 1 close contact (incl. roommates) who socializes but does not work. No other work or socializing.',
    multiplier: 0.3 * 0.5 + 0.0075, // Housemate + grocery exposure
  },

  contact4: {
    label:
      'Has 4 close contacts (incl. roommates) who socialize but do not work. No other work or socializing.',
    multiplier: 4 * 0.3 * 0.5 + 0.0075, // Housemate + grocery exposure
  },

  contact10: {
    label:
      'Has 10 close contacts (incl. roommates) who socialize but do not work. No other work or socializing.',
    multiplier: 10 * 0.3 * 0.5 + 0.0075, // Housemate + grocery exposure
  },

  contactWorks: {
    label:
      'Has 1 close contact (incl. roommates) who is an essential worker. No other work or socializing.',
    multiplier: 0.3 * 3 + 0.0075, // Housemate + grocery exposure
  },

  bars: {
    label: 'Goes to bars regularly',
    /*
     * Six hours of indoor exposure to a dozen people (2 near you, 10 six feet away)
     * who are not wearing masks and are talking loudly.
     */
    multiplier: 6 * 0.06 * (2 + 10 * 0.5) * 5,
  },
  hasCovid: {
    label: 'Has COVID',
    multiplier: -1,
  },
}

export const Interaction: { [key: string]: FormValue } = {
  oneTime: { label: 'One-time interaction', multiplier: 0.06 },
  repeated: {
    label: 'Household member',
    multiplier: 0.3,
  },
  partner: {
    label: 'Partner / spouse',
    multiplier: 0.48,
  },
}

export const Setting: { [key: string]: FormValue } = {
  indoor: { label: 'Indoor', multiplier: 1 },
  outdoor: { label: 'Outdoor', multiplier: 0.05 },
}
export const Distance: { [key: string]: FormValue } = {
  normal: {
    label: 'Normal socializing (~3 feet apart) most of the time',
    multiplier: 1,
  },
  sixFt: { label: '6+ feet apart most of the time', multiplier: 0.5 },
  tenFt: { label: '10+ feet apart most of the time', multiplier: 0.25 },
}
export const TheirMask: { [key: string]: FormValue } = {
  none: { label: 'No mask, or poorly-worn mask', multiplier: 1 },
  masked: {
    label: 'Masked (surgical, cotton, etc.,)',
    multiplier: 0.25,
  },
}
export const YourMask: { [key: string]: FormValue } = {
  none: {
    label: 'No mask, or mask without filter (bandana, cotton, etc.)',
    multiplier: 1,
  },
  masked: {
    label: 'High-quality mask (surgical, filter insert, etc)',
    multiplier: 0.5,
  },
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
