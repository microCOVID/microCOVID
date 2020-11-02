import { render } from '@testing-library/react'
import React from 'react'

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

    expect(getByText('Low Risk')).toBeInTheDocument()
    expect(getByLabelText('Thermometer Section Risk Level Low')).toHaveClass(
      'current-level',
    )
    expect(getByText(/of your weekly risk budget/i)).toHaveTextContent('5%')
    expect(getByText(/microCOVIDs each time/i)).toHaveTextContent('~10')
  })
})
