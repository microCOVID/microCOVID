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

  let selected: string[] = []
  if (props.scenarioName !== undefined && props.scenarioName !== '') {
    const selectedOption = props.scenarioName + ' '
    prepopulatedOptions.push(selectedOption) // Create a fake option so the selected option still appears in the dropdown
    selected = [selectedOption]
  }

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
          emptyLabel={t('calculator.no_prebuilt_scenario_found')}
          multiple
          highlightOnlyResult={true}
          id="predefined-typeahead"
          inputProps={{ autoComplete: 'chrome-off' }}
          onChange={(e: string[]) => {
            if (e.length === 0) {
              setSavedData('')
            }
            setSavedData(e[e.length - 1])
          }}
          options={prepopulatedOptions}
          placeholder={t('calculator.select_scenario')}
          selected={selected}
        />
      </InputGroup>
    </Form.Group>
  )
}
