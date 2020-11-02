import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from 'test-utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    customRender(<Calculator />)

    expect(
      screen.getByText(/constructed a calculator that lets/i),
    ).toBeInTheDocument()
  })
})
