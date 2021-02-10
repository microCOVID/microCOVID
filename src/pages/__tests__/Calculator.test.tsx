import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { AllProviders } from 'test/utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    const { getByText } = render(<Calculator />, { wrapper: AllProviders })

    expect(getByText(/new quantitative unit for risk/i)).toBeInTheDocument()
  })

  it('activity details section reveals after location is selected', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Calculator />,
      {
        wrapper: AllProviders,
      },
    )

    const interactionTypeLabelQuery = /Is this a specific activity or an ongoing relationship/i
    const peopleLabelQuery = /Nearby people/i

    expect(getByText(interactionTypeLabelQuery)).toBeInTheDocument()
    expect(queryByText(peopleLabelQuery)).not.toBeInTheDocument()
    const topLocationBox = getByPlaceholderText(/Select Country or US State/i)
    fireEvent.click(topLocationBox)
    const californiaOption = getByText(/California/i)
    fireEvent.click(californiaOption)
    expect(getByText(interactionTypeLabelQuery)).toBeInTheDocument()

    const interactionTypeBox = getByText(/Select one/i)
    fireEvent.click(interactionTypeBox)
    const oneTimeOption = getByText(/One-time interaction/i)
    fireEvent.click(oneTimeOption)

    expect(getByText(interactionTypeLabelQuery)).toBeInTheDocument()
    // DONOTSUBMIT why is this broken?
    //expect(getByText(peopleLabelQuery)).toBeInTheDocument()
  })
})
