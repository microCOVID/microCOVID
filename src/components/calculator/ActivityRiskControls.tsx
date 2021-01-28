import React from 'react'
import { Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SegmentedControl } from './controls/SegmentedControl'
import { SelectControl } from './controls/SelectControl'
import { CalculatorData } from 'data/calculate'
import { Setting, TheirMask, Voice, YourMask } from 'data/data'
import 'components/calculator/styles/ActivityRiskControls.scss'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const { t } = useTranslation()

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
      <SelectControl
        id="setting"
        header={t('calculator.precautions.environment_header')}
        label={t('calculator.precautions.environment_question')}
        data={data}
        setter={setter}
        source={Setting}
      />
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
      <SegmentedControl
        id="yourMask"
        header={t('calculator.precautions.your_mask_header')}
        label={t('calculator.precautions.your_mask_question')}
        helpText={t('calculator.precautions.your_mask_note')}
        popover={maskPopover}
        data={data}
        setter={setter}
        source={YourMask}
        variant="outline-cyan"
        className="segmented-scrollable"
      />
      <SegmentedControl
        id="theirMask"
        header={t('calculator.precautions.their_mask_header')}
        label={t('calculator.precautions.their_mask_question')}
        helpText={t('calculator.precautions.their_mask_note')}
        popover={maskPopover}
        data={data}
        setter={setter}
        source={TheirMask}
        variant="outline-secondary"
        className="segmented-scrollable"
      />
      <SelectControl
        id="voice"
        header={t('calculator.precautions.volume_header')}
        label={t('calculator.precautions.volume_question')}
        data={data}
        setter={setter}
        source={Voice}
      />
    </React.Fragment>
  )
}

const maskPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Masks</Popover.Title>
    <Popover.Content>
      These values only apply if the masks are worn properly. Choose a mask one
      or more categories lower if there are fit issues due to size, facial hair
      or other problems. For more details on masks, see{' '}
      <Link to="/paper/14-research-sources#masks" target="_blank">
        research sources
      </Link>
    </Popover.Content>
  </Popover>
)
