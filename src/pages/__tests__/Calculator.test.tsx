import { render } from '@testing-library/react'
import React from 'react'
import { AllProviders } from 'test/utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    const { getByText } = render(<Calculator />, { wrapper: AllProviders })

    expect(getByText(/constructed a calculator that lets/i)).toBeInTheDocument()
  })
})
