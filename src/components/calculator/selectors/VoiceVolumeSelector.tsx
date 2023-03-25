import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  BsVolumeDownFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
  BsX,
} from 'react-icons/bs'

import { SegmentedControlNoDescriptions } from '../controls/SegmentedControl'

import { CalculatorData } from 'data/calculate'
import { Voice } from 'data/data'

export function VoiceVolumeSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <SegmentedControlNoDescriptions
      id="voice"
      header={t('calculator.precautions.volume_header')}
      setter={(value: string) => {
        props.setter({ ...props.data, voice: value.toString() })
      }}
      source={Voice}
      value={props.data.voice}
      iconFactory={(value: string) => {
        const iconProps = { size: 24 }
        switch (value) {
          case 'silent':
            return <BsVolumeMuteFill {...iconProps} />
          case 'normal':
            return <BsVolumeDownFill {...iconProps} />
          case 'loud':
            return <BsVolumeUpFill {...iconProps} />
        }
        return <BsX {...iconProps} />
      }}
      multiplierFromSource={(value) => value.multiplier}
      labelFromSource={(value) => (value.label_short ? value.label_short : '')}
    />
  )
}
