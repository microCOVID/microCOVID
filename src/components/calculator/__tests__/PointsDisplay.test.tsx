import { render } from '@testing-library/react'
import React from 'react'

import i18n from '../../../i18n'

import PointsDisplay from 'components/calculator/PointsDisplay'

const standardPointsDisplay = (
  <PointsDisplay
    points={10}
    repeatedEvent={false}
    riskBudget={10000}
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
