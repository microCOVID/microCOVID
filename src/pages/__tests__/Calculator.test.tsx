import { screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from 'test-utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    render(<Calculator />)

    expect(
      screen.getByText(/constructed a calculator that lets/i),
    ).toBeInTheDocument()
  })
})
