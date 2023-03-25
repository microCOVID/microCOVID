import fs from 'fs'

import { CalculatorData, calculate, sanitizeData } from '../calculate'

export const scenarios: {
  [key: string]: Partial<CalculatorData>
} = {
  underconstrained_3_person: {
    riskProfile: 'undefined',
    interaction: 'oneTime',
    personCount: 3,
    symptomsChecked: 'undefined',

    setting: 'undefined',
    distance: 'undefined',
    duration: 60,
    theirMask: 'undefined',
    yourMask: 'undefined',
    voice: 'undefined',
    scenarioName: 'underconstrained_3_person',
  },

  outdoorMasked2: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,
    symptomsChecked: 'no',

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'normal',
    scenarioName: 'outdoorMasked2',
  },

  indoorUnmasked2: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: 'indoorUnmasked2',
  },

  '1person_15minCarRide': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 1,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'normal',
    duration: 15,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: '1person_15minCarRide',
  },

  oneNightStand: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 1,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'intimate',
    duration: 600,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: 'oneNightStand',
  },

  liveInPartner_noContacts: {
    riskProfile: 'livingAlone',
    interaction: 'partner',
    personCount: 1,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'intimate',
    duration: 600,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: 'liveInPartner_noContacts',
  },

  '60minShopping': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 5,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
    scenarioName: '60minShopping',
  },

  '60minShoppingFew': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 3,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
    scenarioName: '60minShoppingFew',
  },

  '60minShoppingCrowded': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 10,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
    scenarioName: '60minShoppingCrowded',
  },

  planeRide: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 41,
    symptomsChecked: 'no',

    setting: 'plane',
    distance: 'sixFt',
    duration: 360,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
    scenarioName: 'planeRide',
  },

  planeRideMiddleSeatEmpty: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 20,
    symptomsChecked: 'no',

    setting: 'plane',
    distance: 'sixFt',
    duration: 360,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
    scenarioName: 'planeRideMiddleSeatEmpty',
  },

  restaurantOutdoors: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,
    symptomsChecked: 'no',

    setting: 'outdoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: 'restaurantOutdoors',
  },

  restaurantIndoors: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: 'restaurantIndoors',
  },

  bar: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'sixFt',
    duration: 120,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'loud',
    scenarioName: 'bar',
  },

  largeOutdoorParty: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 80,
    symptomsChecked: 'no',

    setting: 'outdoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'normal',
    scenarioName: 'largeOutdoorParty',
  },

  smallIndoorParty25: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 25,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    theirVaccine: 'undefined',
    scenarioName: 'smallIndoorParty25',
  },

  outdoorMaskedWithCovidPositive: {
    riskProfile: 'hasCovid',
    interaction: 'oneTime',
    personCount: 1,
    symptomsChecked: 'no',

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'normal',
    scenarioName: 'outdoorMaskedWithCovidPositive',
  },

  indoorUnmaskedWithCovidPositive: {
    riskProfile: 'hasCovid',
    interaction: 'oneTime',
    personCount: 1,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
    scenarioName: 'indoorUnmaskedWithCovidPositive',
  },

  votingInPerson: {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,
    symptomsChecked: 'no',

    setting: 'indoor',
    distance: 'sixFt',
    duration: 10,
    theirMask: 'basic',
    yourMask: 'basic',
    voice: 'silent',
    scenarioName: 'votingInPerson',
  },
}

export const locations: {
  [key: string]: Partial<CalculatorData>
} = {
  cook_county_2022_12_21: {
    useManualEntry: 0,
    topLocation: 'US_17',
    subLocation: 'US_17031',
    subSubLocation: '',
    population: '5,150,233',
    casesPastWeek: 9438,
    casesIncreasingPercentage: 12.5,
    positiveCasePercentage: 7.2,
    percentFullyVaccinated: 75,
    unvaccinatedPrevalenceRatio: 1,
    averageFullyVaccinatedMultiplier: 1,
  },
}

export const vaccinations: {
  [key: string]: Partial<CalculatorData>
} = {
  your_3_pfizer_their_vax: {
    yourVaccineType: 'pfizer',
    yourVaccineDoses: 3,
    theirVaccine: 'vaccinated',
  },
  unvaccinated: {
    yourVaccineType: '',
    yourVaccineDoses: 0,
    theirVaccine: 'unvaccinated',
  },
  your_3_pfizer_theirs_unknown: {
    yourVaccineType: 'pfizer',
    yourVaccineDoses: 3,
    theirVaccine: 'undefined',
  },
}

describe('dump scenarios to disk for further analysis', () => {
  it('dump scenarios to disk for further analysis', () => {
    const results = []
    for (const scenario in scenarios) {
      for (const vaccination in vaccinations) {
        for (const loc in locations) {
          const data = {
            ...scenarios[scenario],
            ...vaccinations[vaccination],
            ...locations[loc],
          }
          const sanitized = sanitizeData(data, false)
          const result = calculate(sanitized)
          const row = {
            scenario: scenario,
            vaccination: vaccination,
            loc: loc,
            data: data,
            sanitized: sanitized,
            result: result,
          }
          results.push(row)
        }
      }
    }
    let fd

    try {
      fd = fs.openSync('computed_scenarios.json', 'w')
      fs.appendFileSync(fd, JSON.stringify(results, null, 2), 'utf-8')
    } finally {
      if (fd !== undefined) {
        fs.closeSync(fd)
      }
    }
  })
})
