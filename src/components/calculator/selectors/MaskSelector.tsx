import React, { useState } from 'react'
import { Alert, Button, Popover, Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SegmentedControl } from '../controls/SegmentedControl'

import { CalculatorData } from 'data/calculate'
import { CheckBoxFormValue, TheirMask, YourMask } from 'data/data'

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

export const MaskSelector: React.FunctionComponent<{
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
      showTooltip={true}
      useActiveDesc={true}
    >
      <MaskShowExtras id={props.id + 'NotListed'} prompt={props.helpPrompt} />
    </SegmentedControl>
  )
}

export function YourMaskSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <MaskSelector
      id="yourMask"
      header={t('calculator.precautions.your_mask_header')}
      data={props.data}
      setter={props.setter}
      source={YourMask}
      helpPrompt={t('calculator.precautions.mask_not_listed.your_prompt')}
      variant="outline-cyan"
    />
  )
}

export function TheirMaskSelector(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <MaskSelector
      id="theirMask"
      header={t('calculator.precautions.their_mask_header')}
      data={props.data}
      setter={props.setter}
      source={TheirMask}
      helpPrompt={t('calculator.precautions.mask_not_listed.their_prompt')}
      variant="outline-secondary"
    />
  )
}
