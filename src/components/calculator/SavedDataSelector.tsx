import { map } from 'lodash'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import IosOptgroup from 'components/IosOptgroup'
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
        <option value="">{t('calculator.select_scenario')}</option>
        {prepopulatedOptions}
        <IosOptgroup />
      </Form.Control>
    </Form.Group>
  )
}
