import React, { useState } from 'react'
import { Alert, Button, Popover, Table } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SegmentedControl } from './controls/SegmentedControl'
import { SelectControl } from './controls/SelectControl'
import { CalculatorData } from 'data/calculate'
import {
  CheckBoxFormValue,
  Setting,
  TheirMask,
  Voice,
  YourMask,
} from 'data/data'
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
      <MaskSelector
        id="yourMask"
        header={t('calculator.precautions.your_mask_header')}
        data={data}
        setter={setter}
        source={YourMask}
        helpPrompt={t('calculator.precautions.mask_not_listed.your_prompt')}
        variant="outline-cyan"
      />
      <MaskSelector
        id="theirMask"
        header={t('calculator.precautions.their_mask_header')}
        data={data}
        setter={setter}
        source={TheirMask}
        helpPrompt={t('calculator.precautions.mask_not_listed.their_prompt')}
        variant="outline-secondary"
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

const MaskShowExtras: React.FunctionComponent<{
  id: string
  prompt: string
}> = (props) => {
  const { t } = useTranslation()
  const [showExtras, setShowExtras] = useState<boolean>(false)

  if (!showExtras) {
    return (
      <Button
        className="mask-not-listed-prompt"
        variant="link"
        onClick={() => setShowExtras(true)}
      >
        {props.prompt}
      </Button>
    )
  }
  return (
    <Alert
      className="b-0 mask-not-listed"
      dismissible
      onClose={() => setShowExtras(false)}
      show={showExtras}
      variant="secondary"
    >
      <Alert.Heading>{props.prompt}</Alert.Heading>
      <Table borderless id={props.id} striped variant="light">
        <thead>
          <tr>
            <th>{t('calculator.precautions.mask_not_listed.mask_type')}</th>
            <th>{t('calculator.precautions.mask_not_listed.instructions')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('calculator.precautions.mask_not_listed.n95_like')}</td>
            <td>
              {t('calculator.precautions.mask_not_listed.select_instead', {
                mask_type: '"' + t('data.n95_mask_short') + '"',
              })}
            </td>
          </tr>
          <tr>
            <td>{t('calculator.precautions.mask_not_listed.others')}</td>
            <td>
              {t('calculator.precautions.mask_not_listed.others_fallback', {
                mask_type: '"' + t('data.basic_mask_short') + '"',
              })}
            </td>
          </tr>
        </tbody>
      </Table>
    </Alert>
  )
}

const MaskSelector: React.FunctionComponent<{
  id: keyof CalculatorData
  header: string
  setter: (value: CalculatorData) => void
  data: CalculatorData
  source: { [key: string]: CheckBoxFormValue }
  helpPrompt: string
  variant: string
}> = (props): React.ReactElement => {
  const maskPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Masks</Popover.Title>
      <Popover.Content>
        These values only apply if the masks are worn properly. Choose a mask
        one or more categories lower if there are fit issues due to size, facial
        hair or other problems. For more details on masks, see{' '}
        <Link to="/paper/14-research-sources#masks" target="_blank">
          research sources
        </Link>
      </Popover.Content>
    </Popover>
  )

  return (
    <SegmentedControl
      id={props.id}
      header={props.header}
      popover={maskPopover}
      data={props.data}
      setter={props.setter}
      source={props.source}
      className="segmented-scrollable"
      variant={props.variant}
    >
      <MaskShowExtras id={props.id + 'NotListed'} prompt={props.helpPrompt} />
    </SegmentedControl>
  )
}
