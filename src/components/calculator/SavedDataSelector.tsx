import i18n from 'i18n'
import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useTranslation } from 'react-i18next'
import { BsSearch } from 'react-icons/bs'

import { CalculatorData } from 'data/calculate'
import { PartialData, prepopulated } from 'data/prepopulated'

export const SavedDataLink: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
  scenarioName: string
  scenarioNameSetter: (newScenario: string) => void
}> = (props): React.ReactElement => {
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
    <Button
      variant="link"
      className="p-0 m-0 border-0"
      onClick={() => {
        setSavedData(props.scenarioName)
        props.scenarioNameSetter(props.scenarioName)
      }}
    >
      {props.children}
    </Button>
  )
}

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
    const selectedOption = props.scenarioName
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

  const filterByCallback = (
    option: string,
    props: { text: string; selected: string[] },
  ) => {
    const propsText: string = props.text || ''

    // User is considering switching scenarios. Show all options.
    if (props.selected.length > 0) {
      return true
    }
    if (option === i18n.t('scenario.custom')) {
      return true
    }
    return option.toLowerCase().indexOf(propsText.toLowerCase()) !== -1
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
          filterBy={filterByCallback}
          emptyLabel={t('calculator.no_prebuilt_scenario_found')}
          highlightOnlyResult={true}
          id="predefined-typeahead"
          inputProps={{
            autoComplete: 'chrome-off',
            shouldSelectHint: (shouldSelect: boolean, event) => {
              if (
                event.keyCode === 13 /* return */ ||
                event.keyCode === 9 /* tab */
              ) {
                return true
              }
              return shouldSelect
            },
          }}
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
