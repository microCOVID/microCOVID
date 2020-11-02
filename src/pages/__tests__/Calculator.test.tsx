import { render, screen } from '@testing-library/react'
import React, { ComponentType } from 'react'
import { AllProviders } from 'test-utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    render(<Calculator />, {
      wrapper: AllProviders,
    })

    expect(
      screen.getByText(/constructed a calculator that lets/i),
    ).toBeInTheDocument()
  })
})
