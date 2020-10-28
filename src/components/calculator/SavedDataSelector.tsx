import { map } from 'lodash'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { CalculatorData } from 'data/calculate'
import { PartialData, prepopulated } from 'data/prepopulated'

export const SavedDataSelector: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
  label?: string
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const prepopulatedOptions = (
    <React.Fragment>
      {map(prepopulated, (_value, key) => (
        <option key={key} value={`system:${key}`}>
          {key}
        </option>
      ))}
    </React.Fragment>
  )

  const setSavedData = (key: string): void => {
    const splitAt = key.indexOf(':')
    const type = key.substr(0, splitAt)
    const value = key.substr(splitAt + 1)

    let foundData: PartialData | CalculatorData | null = null
    switch (type) {
      case 'system':
        foundData = prepopulated[value]
        break
      default:
        break
    }

    if (foundData) {
      props.setter({
        ...props.currentData,
        ...foundData,
      })
    }
  }

  return (
    <Form.Group>
      <Form.Control
        as="select"
        size="lg"
        onChange={(e) => setSavedData(e.target.value)}
        id="saved-data"
      >
        <optgroup label=""></optgroup>
        <option value="">{t('calculator.select_scenario')}</option>
        {prepopulatedOptions}
      </Form.Control>
    </Form.Group>
  )
}
