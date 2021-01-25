import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useTranslation } from 'react-i18next'
import { BsSearch } from 'react-icons/bs'

import { CalculatorData } from 'data/calculate'
import { PartialData, prepopulated } from 'data/prepopulated'

export const SavedDataSelector: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
  scenarioName: string
  scenarioNameSetter: (newScenario: string) => void
  label?: string
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const prepopulatedOptions = Object.keys(prepopulated)

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
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Typeahead
          clearButton={true}
          highlightOnlyResult={true}
          id="predefined-typeahead"
          onChange={(e: string[]) => {
            if (e.length !== 1) {
              setSavedData('')
            }
            setSavedData(e[0])
          }}
          options={prepopulatedOptions}
          placeholder={t('calculator.select_scenario')}
          defaultSelected={
            props.scenarioName in prepopulated ? [props.scenarioName] : []
          }
        />
      </InputGroup>
    </Form.Group>
  )
}
