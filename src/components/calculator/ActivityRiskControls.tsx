import React, { useState } from 'react'
import { Form, Popover, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { RadioControl } from './controls/RadioControl'
import { SelectControl } from './controls/SelectControl'
import { CalculatorData } from 'data/calculate'
import { Setting, TheirMask, Voice, YourMask, YourVaccine } from 'data/data'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const { t } = useTranslation()
  const [yourVaccineShots, setYourVaccineShots] = useState(0)
  const [yourVaccineType, setYourVaccineType] = useState('')
  const [
    yourVaccinePassedTimeWindow,
    setYourVaccinePassedTimeWindow,
  ] = useState(false)
  const yourVaccineEffectiveShots =
    yourVaccineShots +
    (yourVaccineShots === 0 || yourVaccinePassedTimeWindow ? 0 : -1)

  const getVaccineMultiplier = (vaxType: string, numShots: number) => {
    const whichVaccine = YourVaccine.find(
      (vaccine) => vaccine.value === vaxType,
    )
    if (whichVaccine === undefined) {
      return 1
    }
    if (numShots === 1 && whichVaccine.oneShotMultiplier !== undefined) {
      return whichVaccine.oneShotMultiplier
    } else if (numShots === 2 && whichVaccine.twoShotMultiplier !== undefined) {
      return whichVaccine.twoShotMultiplier
    }
    return 1
  }

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
      <Form.Group controlId="yourVaccine">
        Are you vaccinated?
        <ToggleButtonGroup
          type="radio"
          value={yourVaccineShots}
          onChange={(val: number) => {
            setYourVaccineShots(val)
            setYourVaccinePassedTimeWindow(false)
          }}
          name="yourVaccine"
        >
          <ToggleButton value={0}>No</ToggleButton>
          <ToggleButton value={1}>1 shot</ToggleButton>
          <ToggleButton value={2}>2 shots</ToggleButton>
        </ToggleButtonGroup>
      </Form.Group>
      {yourVaccineShots > 0 ? (
        <>
          <Form.Group>
            <Form.Check
              type="checkbox"
              checked={yourVaccinePassedTimeWindow}
              onChange={() =>
                setYourVaccinePassedTimeWindow(!yourVaccinePassedTimeWindow)
              }
              id="yourVaccinePassedTimeWindow"
              label={
                yourVaccineShots === 1
                  ? 'Last shot at least 7 days ago'
                  : 'Last shot at least 14 days ago'
              }
            />
          </Form.Group>
          <RadioControl
            id="yourVaccineType"
            setter={(value: string) => setYourVaccineType(value)}
            source={YourVaccine}
            value={yourVaccineType}
            label="Which vaccine did you get?"
          />
        </>
      ) : null}
      <p>Effective shots: {yourVaccineEffectiveShots}</p>
      <p>
        Vaccine:{' '}
        {getVaccineMultiplier(yourVaccineType, yourVaccineEffectiveShots)}
      </p>
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
