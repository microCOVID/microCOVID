import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { AllProviders } from 'test/utils'

import { Calculator } from 'pages/Calculator'

describe('calculator page', () => {
  it('renders at all', () => {
    const { getByText } = render(<Calculator />, { wrapper: AllProviders })

    expect(getByText(/new quantitative unit for risk/i)).toBeInTheDocument()
  })

  it('Step two reveals after location is selected', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Calculator />,
      {
        wrapper: AllProviders,
      },
    )

    const stepTwoQuery = /Describe the scenario/i
    expect(queryByText(stepTwoQuery)).not.toBeInTheDocument()
    const topLocationBox = getByPlaceholderText(/Select Country or US State/i)
    fireEvent.click(topLocationBox)
    const californiaOption = getByText(/California/i)
    fireEvent.click(californiaOption)
    expect(getByText(stepTwoQuery)).toBeInTheDocument()
  })

  it('Shows nearby people section only after selecting a scenario type', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Calculator />,
      {
        wrapper: AllProviders,
      },
    )

    const topLocationBox = getByPlaceholderText(/Select Country or US State/i)
    fireEvent.click(topLocationBox)
    const californiaOption = getByText(/California/i)
    fireEvent.click(californiaOption)

    const buildYourOwn = /build your own/i
    const gatheringOption = /A gathering/i
    const nearbyPeople = /How many people/i

    expect(queryByText(gatheringOption)).not.toBeInTheDocument()
    expect(queryByText(nearbyPeople)).not.toBeInTheDocument()
    fireEvent.click(getByText(buildYourOwn))

    // Need to pick out a scenario type before continuing
    expect(queryByText(buildYourOwn)).not.toBeInTheDocument()
    expect(getByText(gatheringOption)).toBeInTheDocument()
    expect(queryByText(nearbyPeople)).not.toBeInTheDocument()

    // Start over does a full reset
    const startOver = getByText(/Restart/i)
    fireEvent.click(startOver)
    expect(queryByText(gatheringOption)).not.toBeInTheDocument()
    expect(queryByText(nearbyPeople)).not.toBeInTheDocument()
    fireEvent.click(getByText(buildYourOwn))

    // Selecting a scenario type reveals nearby people section
    const gathering = getByText(/A gathering/i)
    fireEvent.click(gathering)
    expect(queryByText(nearbyPeople)).toBeInTheDocument()

    const changeScenarioType = /x Clear/i
    fireEvent.click(getByText(changeScenarioType))
    expect(queryByText(nearbyPeople)).not.toBeInTheDocument()
    expect(queryByText(changeScenarioType)).not.toBeInTheDocument()

    const workOption = /Going to work/i
    fireEvent.click(getByText(workOption))
    expect(queryByText(nearbyPeople)).toBeInTheDocument()
    expect(queryByText(changeScenarioType)).toBeInTheDocument()
  })

  it('Applies preset scenarios', () => {
    const {
      queryAllByRole,
      getByText,
      queryByText,
      getByPlaceholderText,
    } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    const topLocationBox = getByPlaceholderText(/Select Country or US State/i)
    fireEvent.click(topLocationBox)
    const californiaOption = getByText(/California/i)
    fireEvent.click(californiaOption)

    const typeaheads = queryAllByRole('combobox')
    const presetScenarioTypeahead = typeaheads[2]
    fireEvent.click(presetScenarioTypeahead)

    // Basic functionality check
    const outdoorHangout = /Outdoor masked hangout with 2 other people/i
    const changeScenarioType = /x Clear/i
    const nearbyPeople = /How many people/i
    fireEvent.click(getByText(outdoorHangout))
    // Cannot change interaction type from a preset.
    expect(queryByText(changeScenarioType)).not.toBeInTheDocument()
    expect(getByText(nearbyPeople)).toBeInTheDocument()
    expect(getByText(outdoorHangout)).toBeInTheDocument()

    const startOver = getByText(/Restart/i)
    fireEvent.click(startOver)

    const indoorHangout = /Indoor unmasked hangout with 2 other people/i
    fireEvent.click(getByText(indoorHangout))
    // Cannot change interaction type from a preset.
    expect(queryByText(changeScenarioType)).not.toBeInTheDocument()
    expect(getByText(nearbyPeople)).toBeInTheDocument()
    expect(getByText(indoorHangout)).toBeInTheDocument()
  })
})
