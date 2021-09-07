import React from 'react'
import { useTranslation } from 'react-i18next'

import { SelectControl } from '../controls/SelectControl'

import { CalculatorData } from 'data/calculate'
import { Distance } from 'data/data'

export function DistanceSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <SelectControl
      id="distance"
      label={t('calculator.distance_question')}
      header={t('calculator.distance_header')}
      data={props.data}
      setter={(value: CalculatorData) => {
        const yourMask = value.distance === 'intimate' ? 'none' : value.yourMask
        const theirMask =
          value.distance === 'intimate' ? 'none' : value.theirMask
        props.setter({ ...value, yourMask, theirMask })
      }}
      source={Distance}
    />
  )
}
