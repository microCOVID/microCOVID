import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import PointsDisplay from '../PointsDisplay'

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
    render(standardPointsDisplay)

    expect(screen.getByText(/of your weekly risk budget/i)).toHaveTextContent(
      '5%',
    )
  })
})
