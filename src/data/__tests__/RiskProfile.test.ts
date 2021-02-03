import {
  PersonRiskValue,
  RiskProfile,
  livingAloneMult,
  personRiskMultiplier,
} from 'data/data'

const NO_BONUSES = {
  isHousemate: false,
  symptomsChecked: 'no',
}

const CHECKED = {
  symptomsChecked: 'yes',
}

const CHECKED_THREE_DAYS = {
  symptomsChecked: 'yesThreeDays',
}

describe('personRiskMultiplier', () => {
  it('computes living alone', () => {
    expect(
      personRiskMultiplier({
        riskProfile: RiskProfile['livingAlone'],
        ...NO_BONUSES,
      }),
    ).toEqual(livingAloneMult)
  })

  it.each`
    profile
    ${'average'}
    ${'livingAlone'}
    ${'bars'}
  `(
    'should not apply housemate or reporting bonuses for $profileName',
    ({ profile }) => {
      const base = { riskProfile: RiskProfile[profile], ...NO_BONUSES }
      expect(personRiskMultiplier(base)).toEqual(
        personRiskMultiplier({ ...base, isHousemate: true }),
      )
    },
  )

  it('reduces self-inflicted risk by 1/2 for checked or checked 3 days', () => {
    const riskProfile: PersonRiskValue = {
      label: 'dontcare',
      personalMultiplier: 1,
      numHousemates: 0,
      numOtherTraceableContacts: 0,
      contactsMultiplier: 1,
    }
    expect(
      personRiskMultiplier({ riskProfile, isHousemate: false, ...CHECKED }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) * 0.5)
    expect(
      personRiskMultiplier({
        riskProfile,
        isHousemate: false,
        ...CHECKED_THREE_DAYS,
      }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) * 0.5)
  })

  it('reduces housemate to 1/4 risk for checked or checked 3 days', () => {
    const riskProfile: PersonRiskValue = {
      label: 'dontcare',
      personalMultiplier: 0,
      numHousemates: 2,
      numOtherTraceableContacts: 0,
      contactsMultiplier: 1,
    }
    expect(
      personRiskMultiplier({ riskProfile, isHousemate: false, ...CHECKED }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) * 0.25)
    expect(
      personRiskMultiplier({
        riskProfile,
        isHousemate: false,
        ...CHECKED_THREE_DAYS,
      }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) * 0.25)
  })

  it('reduces number of housemates by one if isHousemate', () => {
    const riskProfile: PersonRiskValue = {
      label: 'dontcare',
      personalMultiplier: 0,
      numHousemates: 2,
      numOtherTraceableContacts: 0,
      contactsMultiplier: 1,
    }

    // Had 2 housemates, but one is the user, so there is only one actual housemate.
    expect(
      personRiskMultiplier({ riskProfile, ...NO_BONUSES, isHousemate: true }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) * 0.5)
  })

  it('reduces contact risk to 1/4 if checked and 1/14 if checked 3 days', () => {
    const riskProfile: PersonRiskValue = {
      label: 'dontcare',
      personalMultiplier: 0,
      numHousemates: 0,
      numOtherTraceableContacts: 2,
      contactsMultiplier: 1,
    }
    expect(
      personRiskMultiplier({ riskProfile, isHousemate: false, ...CHECKED }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) * 0.25)
    expect(
      personRiskMultiplier({
        riskProfile,
        isHousemate: false,
        ...CHECKED_THREE_DAYS,
      }),
    ).toBeCloseTo(personRiskMultiplier({ riskProfile, ...NO_BONUSES }) / 14)
  })

  it('does not remove non-housemate contacts if housemate is selected.', () => {
    const riskProfile: PersonRiskValue = {
      label: 'dontcare',
      personalMultiplier: 0,
      numHousemates: 0,
      numOtherTraceableContacts: 2,
      contactsMultiplier: 1,
    }
    expect(
      personRiskMultiplier({ riskProfile, ...NO_BONUSES, isHousemate: true }),
    ).toEqual(personRiskMultiplier({ riskProfile, ...NO_BONUSES }))
  })
})
