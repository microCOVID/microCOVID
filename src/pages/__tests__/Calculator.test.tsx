import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { AllProviders } from 'test/utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    const { getByText } = render(<Calculator />, { wrapper: AllProviders })

    expect(getByText(/constructed a calculator that lets/i)).toBeInTheDocument()
  })

  it('activity details section reveals after location is selected', () => {
    const { getByText, queryByText, getByRole } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    const interactionTypeLabelQuery = /Is this a single activity or an ongoing relationship/i
    expect(queryByText(interactionTypeLabelQuery)).not.toBeInTheDocument()
    const topLocationBox = getByRole('combobox', { name: /Select location/i })
    const californiaOption = getByText(/California/i) as HTMLOptionElement
    fireEvent.change(topLocationBox, {
      target: { value: californiaOption.value },
    })
    expect(californiaOption.selected).toBeTruthy()
    expect(getByText(interactionTypeLabelQuery)).toBeInTheDocument()
  })
})
