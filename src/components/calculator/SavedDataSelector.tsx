import { map, size } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CalculatorData } from 'data/calculate'
import { savedItems } from 'data/localStorage'
import { PartialData, prepopulated } from 'data/prepopulated'

export const SavedDataSelector: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const hasSavedItems = size(savedItems()) > 0

  let userSavedData: JSX.Element | null = null
  let prepopulatedOptions = (
    <React.Fragment>
      {map(prepopulated, (_value, key) => (
        <option key={key} value={`system:${key}`}>
          {key}
        </option>
      ))}
    </React.Fragment>
  )

  if (hasSavedItems) {
    prepopulatedOptions = (
      <optgroup label={t('calculator.example_calculations')}>
        {prepopulatedOptions}
      </optgroup>
    )
    userSavedData = (
      <optgroup label={t('calculator.your_saved_items')}>
        {map(savedItems(), (_value, key) => (
          <option key={key} value={`user:${key}`}>
            {key}
          </option>
        ))}
      </optgroup>
    )
  }

  const setSavedData = (key: string): void => {
    const splitAt = key.indexOf(':')
    const type = key.substr(0, splitAt)
    const value = key.substr(splitAt + 1)

    let foundData: PartialData | CalculatorData | null = null
    switch (type) {
      case 'system':
        foundData = prepopulated[value]
        break
      case 'user':
        foundData = savedItems()[value]
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
    <select
      className="form-control"
      onChange={(e) => setSavedData(e.target.value)}
    >
      <optgroup label=""></optgroup>
      <option value="">{t('calculator.select_scenario')}</option>
      {userSavedData}
      {prepopulatedOptions}
    </select>
  )
}
