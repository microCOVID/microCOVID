import React from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

import { EnvironmentSelector } from './selectors/EnvironmentSelector'
import { TheirMaskSelector, YourMaskSelector } from './selectors/MaskSelector'
import { VoiceVolumeSelector } from './selectors/VoiceVolumeSelector'
import { CalculatorData } from 'data/calculate'

import 'components/calculator/styles/ActivityRiskControls.scss'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const header = (
    <h3 className="h2 accent">
      <span>
        <Trans>calculator.precautions.label</Trans>
      </span>
    </h3>
  )

  if (repeatedEvent) {
    return (
      <React.Fragment>
        {header}
        <div className="readout mb-4">
          <Trans>calculator.risk_note_about_household_members</Trans>
        </div>
      </React.Fragment>
    )
  }

  if (data.distance === 'intimate') {
    return <div />
  }

  return (
    <React.Fragment>
      {header}
      <EnvironmentSelector data={data} setter={setter} />
      {data.distance === 'close' && (
        <div className="warning">
          <Trans>calculator.precautions.no_intimate_bonus_outdoors</Trans>
        </div>
      )}
      {data.setting === 'filtered' && data.distance !== 'close' && (
        <div className="warning">
          <Trans i18nKey="calculator.precautions.filtered_ensure_airflow">
            Ensure airflow, see
            <Link to="/paper/14-research-sources#ventilation">here</Link>
          </Trans>
        </div>
      )}
      <YourMaskSelector data={data} setter={setter} />
      <TheirMaskSelector data={data} setter={setter} />
      <VoiceVolumeSelector data={data} setter={setter} />
    </React.Fragment>
  )
}
