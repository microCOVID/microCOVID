import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { SegmentedControl } from '../controls/SegmentedControl'

import { CalculatorData } from 'data/calculate'
import { TheirVaccine } from 'data/data'

export function TheirVaccineSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  const { t } = useTranslation()

  if (props.data.unvaccinatedPrevalenceRatio) {
    return (
      <SegmentedControl
        id="theirVaccine"
        header={t('calculator.their_vaccine_header')}
        label={t('calculator.their_vaccine_question')}
        data={props.data}
        setter={props.setter}
        source={TheirVaccine}
        className="segmented-scrollable"
        variant="outline-cyan"
        hideRisk={true}
        showTooltip={true}
        useHoverDesc={false}
      />
    )
  }
  return (
    <div className="warning">
      <Trans>calculator.no_vaccine_prevalence</Trans>
    </div>
  )
}
