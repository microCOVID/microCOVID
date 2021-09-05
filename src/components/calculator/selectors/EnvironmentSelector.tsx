import React from 'react'
import { useTranslation } from 'react-i18next'

import { SelectControl } from '../controls/SelectControl'

import { CalculatorData } from 'data/calculate'
import { Setting } from 'data/data'

export function EnvironmentSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <SelectControl
      id="setting"
      header={t('calculator.precautions.environment_header')}
      label={t('calculator.precautions.environment_question')}
      data={props.data}
      setter={props.setter}
      source={Setting}
    />
  )
}
