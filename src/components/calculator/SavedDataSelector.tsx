import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useTranslation } from 'react-i18next'
import { Trans } from 'react-i18next'
import { BsSearch } from 'react-icons/bs'

import { ControlLabel } from 'components/calculator/controls/ControlLabel'
import { CalculatorData } from 'data/calculate'
import { PartialData, prepopulated } from 'data/prepopulated'

const SavedDataLink: React.FunctionComponent<{
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
      className="p-0 m-0 border-0 scenario-shortcut"
      onClick={() => {
        setSavedData(props.scenarioName)
        props.scenarioNameSetter(props.scenarioName)
      }}
      size="lg"
      variant="link"
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
    <Form.Group id="predefined-typeahead-group">
      <ControlLabel
        id="predefined-typeahead"
        label={
          <Trans i18nKey="calculator.select_scenario">
            Look for a premade scenario or{' '}
            <SavedDataLink
              currentData={props.currentData}
              setter={props.setter}
              scenarioName={t('scenario.custom')}
              scenarioNameSetter={props.scenarioNameSetter}
            >
              build your own
            </SavedDataLink>
          </Trans>
        }
      />
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
              setSavedData(t('scenario.custom'))
            }
            setSavedData(e[e.length - 1])
          }}
          options={prepopulatedOptions}
          selected={selected}
        />
      </InputGroup>
    </Form.Group>
  )
}
