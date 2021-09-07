import { render } from '@testing-library/react'
import React from 'react'

import i18n from '../../../i18n'

import PointsDisplay from 'components/calculator/PointsDisplay'

const standardPointsDisplay = (
  <PointsDisplay
    data={{
      riskBudget: 10000,
      useManualEntry: 0,
      topLocation: '',
      subLocation: '',
      subSubLocation: null,
      population: '',
      casesPastWeek: 0,
      casesIncreasingPercentage: 0,
      positiveCasePercentage: null,
      prevalanceDataDate: new Date(),
      percentFullyVaccinated: null,
      unvaccinatedPrevalenceRatio: null,
      averageFullyVaccinatedMultiplier: null,
      riskProfile: 'average',
      interaction: '',
      personCount: 0,
      symptomsChecked: '',
      setting: '',
      distance: '',
      duration: 0,
      theirMask: '',
      yourMask: '',
      voice: '',
      yourVaccineType: '',
      yourVaccineDoses: 0,
      theirVaccine: '',
    }}
    points={10}
    repeatedEvent={false}
    upperBound={300}
    lowerBound={30}
  />
)

describe('points display', () => {
  it('renders standard results', () => {
    const { getByText, getByLabelText } = render(standardPointsDisplay)

    expect(
      getByText(
        i18n.t('calculator.category_low') +
          ' ' +
          i18n.t('calculator.category_postfix'),
      ),
    ).toBeInTheDocument()
    expect(getByLabelText('Thermometer Section Risk Level low')).toHaveClass(
      'current-level',
    )
    expect(
      getByText(
        new RegExp(i18n.t('calculator.explanationcard.percentage_suffix'), 'i'),
      ),
    ).toHaveTextContent('5%')
    expect(
      getByText(
        new RegExp(
          i18n.t('calculator.pointsdisplay.microCOVIDs') +
            ' ' +
            i18n.t('each time'),
          'i',
        ),
      ),
    ).toHaveTextContent('~10')
  })
})
