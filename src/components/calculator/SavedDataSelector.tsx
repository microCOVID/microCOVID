import { map } from 'lodash'
import React from 'react'
import { Form } from 'react-bootstrap'

import { CalculatorData } from 'data/calculate'
import { PartialData, prepopulated } from 'data/prepopulated'

export const SavedDataSelector: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
  scenarioName: string
  scenarioNameSetter: (newScenario: string) => void
  label?: string
}> = (props): React.ReactElement => {
  const prepopulatedOptions = (
    <React.Fragment>
      {map(prepopulated, (_value, key) => (
        <option key={key} value={key} selected={props.scenarioName === key}>
          {key}
        </option>
      ))}
    </React.Fragment>
  )

  const setSavedData = (key: string): void => {

    let foundData: PartialData | CalculatorData | null = null
    foundData = prepopulated[key]

    if (foundData) {
      props.setter({
        ...props.currentData,
        ...foundData,
      })
    }
    props.scenarioNameSetter(key)
  }

  return (
    <Form.Group>
      <Form.Control
        as="select"
        size="lg"
        onChange={(e) => setSavedData(e.target.value)}
        id="saved-data"
      >
        <option value="" selected={props.scenarioName === ''}>
          Optional: Start with a predefined common activity...
        </option>
        {prepopulatedOptions}
      </Form.Control>
    </Form.Group>
  )
}
