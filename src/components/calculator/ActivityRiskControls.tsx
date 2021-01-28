import React, { useState } from 'react'
import { Popover, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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

  const [yourMask2, setYourMask2] = useState(
    'If you\'re eating or drinking, select "no mask"',
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

  const theseMaskOptions = [
    {
      name: 'No mask',
      value: 'No mask, poorly worn mask, or eating/drinking [Baseline risk]',
    },
    {
      name: 'Cotton (thin)',
      value:
        'Thin or loose (bandana, buff; or: loose fit, falls down) [baseline risk]',
    },
    {
      name: 'Cotton (thick)',
      value:
        'Thick and snug (multi-layer cotton mask with tight, secure fit) [2/3rd the risk]',
    },
    {
      name: 'Surgical',
      value: 'Loose-fitting disposable blue or green mask [1/2 the risk]',
    },
    {
      name: 'Filter Insert',
      value: 'Fabric mask with PM2.5 filter insert [1/2 the risk]',
    },
    { name: 'KN95', value: '[1/3 the risk]' },
    {
      name: 'Medical N95',
      value: 'Fits, but you are NOT sure it is sealed [1/6th the risk]',
    },
    {
      name: 'Medical N95 (sealed)',
      value: 'Air-tight seal. No valve, no earloops, no beard. [1/8 the risk]',
    },
    {
      name: 'P100 respirator',
      value:
        'NIOSH-certified reusable, with covered outflow valve. [1/20th the risk]',
    },
  ]
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
      <SelectControl
        id="yourMask"
        header={t('calculator.precautions.your_mask_header')}
        label={t('calculator.precautions.your_mask_question')}
        helpText={t('calculator.precautions.your_mask_note')}
        popover={maskPopover}
        data={data}
        setter={setter}
        source={YourMask}
      />
      <header style={{color: "black"}}>Outline buttons:</header>
      <ToggleButtonGroup
        type="radio"
        name="yourMaskButtonGroup"
        id="yourMaskButtonGroup"
      >
        {theseMaskOptions.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="outline-cyan"
            name="radio"
            value={radio.value}
            checked={yourMask2 === radio.value}
            onChange={(e) => setYourMask2(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div id="yourMaskHelpText" className="text-muted">
        {yourMask2}
      </div>

      <header style={{color: "black"}}>Solid buttons:</header>
      <ToggleButtonGroup
        type="radio"
        name="yourMaskButtonGroup"
        id="yourMaskButtonGroup"
      >
        {theseMaskOptions.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="cyan"
            name="radio"
            value={radio.value}
            checked={yourMask2 === radio.value}
            onChange={(e) => setYourMask2(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div id="yourMaskHelpText" className="text-muted">
        {yourMask2}
      </div>

{/*
      <header style={{color: "black"}}>Vertical buttons:</header>
      <ToggleButtonGroup
        type="radio"
        name="yourMaskButtonGroup"
        id="yourMaskButtonGroupVertical"
        vertical={true}
      >
        {theseMaskOptions.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="outline-cyan"
            name="radio"
            value={radio.value}
            checked={yourMask2 === radio.value}
            onChange={(e) => setYourMask2(e.currentTarget.value)}
          >
            {radio.name} - {radio.value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
*/}
      <SelectControl
        id="theirMask"
        header={t('calculator.precautions.their_mask_header')}
        label={t('calculator.precautions.their_mask_question')}
        helpText={t('calculator.precautions.their_mask_note')}
        popover={maskPopover}
        data={data}
        setter={setter}
        source={TheirMask}
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
