export interface FormValue {
  label: string
  multiplier: number
}

export const Prevalence: { [key: string]: FormValue } = {
  sf: { label: 'San Francisco (July 2020)', multiplier: 614 },
  sydney: { label: 'Sydney (July 2020)', multiplier: 13 },
}

export const RiskProfile: { [key: string]: FormValue } = {
  average: { label: 'An average person in your area', multiplier: 1 },
  livingAlone: {
    label: 'A person who lives alone, is isolating',
    multiplier: 0.1,
  },
  livingInClosedHouse: {
    label: 'A person who lives in a closed house (<6 people)',
    multiplier: 0.1 + 0.03 * 5,
  },
  highRisk: { label: 'A high risk person', multiplier: 2 }, // FIXME
}

export const Interaction: { [key: string]: FormValue } = {
  oneTime: { label: 'One-time contact', multiplier: 0.08 },
  repeated: {
    label: 'Repeated Contact (coworker, housemate, child, etc.)',
    multiplier: 0.3,
  },
}

export const Setting: { [key: string]: FormValue } = {
  indoor: { label: 'Indoor', multiplier: 1 },
  outdoor: { label: 'Outdoor', multiplier: 0.1 },
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
  none: { label: 'None (including bandanas & buffs)', multiplier: 1 },
  masked: {
    label: 'Masked (surgical, double layer cotton, etc)',
    multiplier: 0.2,
  },
}
export const YourMask: { [key: string]: FormValue } = {
  none: { label: 'None (including bandanas & buffs)', multiplier: 1 },
  masked: {
    label: 'Masked (surgical, double layer cotton, etc)',
    multiplier: 0.5,
  },
}
