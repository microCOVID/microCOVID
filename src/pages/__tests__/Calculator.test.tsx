import { within } from '@testing-library/dom'
import { fireEvent, render } from '@testing-library/react'
import i18n from 'i18n'
import React from 'react'
import { AllProviders } from 'test/utils'

import { Calculator } from 'pages/Calculator'

window.scrollTo = jest.fn()

describe('calculator page', () => {
  it('renders at all', () => {
    const { getByText } = render(<Calculator />, { wrapper: AllProviders })

    expect(getByText(/new quantitative unit for risk/i)).toBeInTheDocument()
  })

  it('Step two reveals after prevalence entered', () => {
    const { getByText, queryByText, getByTestId } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    const stepTwoQuery = /Describe the scenario/i
    expect(queryByText(stepTwoQuery)).not.toBeInTheDocument()

    // provide community metrics
    const reportedCases = getByTestId('reported-cases')
    reportedCases.focus()
    fireEvent.change(reportedCases, { target: { value: '100' } })
    const percentIncrease = getByTestId('percent-increase')
    percentIncrease.focus()
    fireEvent.change(percentIncrease, { target: { value: '5' } })
    const positiveTestRate = getByTestId('positive-test-rate')
    positiveTestRate.focus()
    fireEvent.change(positiveTestRate, { target: { value: '10' } })

    expect(getByText(stepTwoQuery)).toBeInTheDocument()
  })

  it('Shows nearby people section only after selecting a scenario type', () => {
    const { getByText, queryByText, getByTestId } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    // provide community metrics
    const reportedCases = getByTestId('reported-cases')
    reportedCases.focus()
    fireEvent.change(reportedCases, { target: { value: '100' } })
    const percentIncrease = getByTestId('percent-increase')
    percentIncrease.focus()
    fireEvent.change(percentIncrease, { target: { value: '5' } })
    const positiveTestRate = getByTestId('positive-test-rate')
    positiveTestRate.focus()
    fireEvent.change(positiveTestRate, { target: { value: '10' } })

    const buildYourOwn = /build a custom scenario/i
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

    fireEvent.click(getByText(/A gathering/i))

    const workOption = /Going to work/i
    fireEvent.click(getByText(workOption))
    expect(queryByText(nearbyPeople)).toBeInTheDocument()
  })

  it('Applies preset scenarios', () => {
    const { queryAllByRole, getByText, getByTestId } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    // provide community metrics
    const reportedCases = getByTestId('reported-cases')
    reportedCases.focus()
    fireEvent.change(reportedCases, { target: { value: '100' } })
    const percentIncrease = getByTestId('percent-increase')
    percentIncrease.focus()
    fireEvent.change(percentIncrease, { target: { value: '5' } })
    const positiveTestRate = getByTestId('positive-test-rate')
    positiveTestRate.focus()
    fireEvent.change(positiveTestRate, { target: { value: '10' } })

    const typeaheads = queryAllByRole('combobox')
    const presetScenarioTypeahead = typeaheads[0]
    fireEvent.click(presetScenarioTypeahead)

    // Basic functionality check
    const outdoorHangout = /Outdoor masked hangout with 2 other people/i
    const nearbyPeople = /How many people/i
    fireEvent.click(getByText(outdoorHangout))
    expect(getByText(nearbyPeople)).toBeInTheDocument()
    expect(getByText(outdoorHangout)).toBeInTheDocument()

    const startOver = getByText(/Restart/i)
    fireEvent.click(startOver)

    const indoorHangout = /Indoor unmasked hangout with 2 other people/i
    fireEvent.click(getByText(indoorHangout))
    expect(getByText(nearbyPeople)).toBeInTheDocument()
    expect(getByText(indoorHangout)).toBeInTheDocument()
  })

  it('Does not launch into a custom scenario after resetting', () => {
    const { getByText, queryByText, getByTestId } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    // provide community metrics
    const reportedCases = getByTestId('reported-cases')
    reportedCases.focus()
    fireEvent.change(reportedCases, { target: { value: '100' } })
    const percentIncrease = getByTestId('percent-increase')
    percentIncrease.focus()
    fireEvent.change(percentIncrease, { target: { value: '5' } })
    const positiveTestRate = getByTestId('positive-test-rate')
    positiveTestRate.focus()
    fireEvent.change(positiveTestRate, { target: { value: '10' } })

    const customScenarioStarted = /Choose an interaction type to continue/i
    expect(queryByText(customScenarioStarted)).not.toBeInTheDocument()

    /*
     * TODO(jyw) previous runs of this test suite leave something in local
     * storage...this stuff is already on the page whoops
    // select a preset to put something into local storage
    const typeaheads = queryAllByRole('combobox')
    const presetScenarioTypeahead = typeaheads[2]
    const outdoorHangout = /Outdoor masked hangout with 2 other people/i
    fireEvent.click(presetScenarioTypeahead)
    fireEvent.click(getByText(outdoorHangout))
    */

    const startOver = getByText(/Reset form/i)
    fireEvent.click(startOver)

    // set community metrics again
    reportedCases.focus()
    fireEvent.change(reportedCases, { target: { value: '100' } })
    percentIncrease.focus()
    fireEvent.change(percentIncrease, { target: { value: '5' } })
    positiveTestRate.focus()
    fireEvent.change(positiveTestRate, { target: { value: '10' } })

    // present user with a typeahead to choose a scenario; don't start a custom
    // scenario automatically
    expect(queryByText(customScenarioStarted)).not.toBeInTheDocument()
  })

  it('results in sane values', () => {
    const { queryAllByRole, getByText, getByTestId } = render(<Calculator />, {
      wrapper: AllProviders,
    })

    // provide community metrics
    const reportedCases = getByTestId('reported-cases')
    reportedCases.focus()
    fireEvent.change(reportedCases, { target: { value: '100' } })
    const percentIncrease = getByTestId('percent-increase')
    percentIncrease.focus()
    fireEvent.change(percentIncrease, { target: { value: '5' } })
    const positiveTestRate = getByTestId('positive-test-rate')
    positiveTestRate.focus()
    fireEvent.change(positiveTestRate, { target: { value: '10' } })

    const typeaheads = queryAllByRole('combobox')
    const presetScenarioTypeahead = typeaheads[0]
    fireEvent.click(presetScenarioTypeahead)

    const outdoorHangout = /Outdoor masked hangout with 2 other people/i
    const nearbyPeople = /How many people/i
    fireEvent.click(getByText(outdoorHangout))
    expect(getByText(nearbyPeople)).toBeInTheDocument()
    expect(getByText(outdoorHangout)).toBeInTheDocument()
    const pointsDisplay = getByTestId('points-container')
    const node = within(pointsDisplay).getByText(
      new RegExp(
        i18n.t('calculator.pointsdisplay.microCOVIDs') +
          ' ' +
          i18n.t('each time'),
        'i',
      ),
    )
    const microCOVIDs = parseFloat(node.textContent!.split(' ')[0].slice(1))
    expect(microCOVIDs).toBeGreaterThan(0)
    expect(microCOVIDs).toBeLessThan(1000)
  })
})
