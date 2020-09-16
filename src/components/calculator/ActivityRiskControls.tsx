import React from 'react'
import { Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SelectControl } from './SelectControl'
import {
  CalculatorData,
  MAX_ACTIVITY_RISK,
  calculateActivityRisk,
} from 'data/calculate'
import {
  Distance,
  Interaction,
  Setting,
  TheirMask,
  Voice,
  YourMask,
  intimateDurationFloor,
} from 'data/data'
import { fixedPointPrecisionPercent } from 'data/FormatPrecision'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const header = (
    <header id="activity-risk">
      <Trans>calculator.activity_risk_header</Trans>
    </header>
  )

  const activityRisk = calculateActivityRisk(data)
  const { t } = useTranslation()

  if (repeatedEvent) {
    return (
      <React.Fragment>
        {header}
        <SelectControl
          id="interaction"
          label={t('calculator.type_of_interaction')}
          data={data}
          setter={setter}
          source={Interaction}
          hideRisk={true}
        />
        <span className="readout">
          <Trans
            values={{
              risk_percentage: fixedPointPrecisionPercent(activityRisk),
            }}
          >
            calculator.your_risk_readout
          </Trans>
        </span>
        <div className="empty">
          <Trans>calculator.risk_note_about_household_members</Trans>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {header}
      <SelectControl
        id="interaction"
        label={t('calculator.type_of_interaction')}
        data={data}
        setter={setter}
        source={Interaction}
        hideRisk={true}
      />
      <SelectControl
        id="distance"
        label={t('calculator.distance')}
        data={data}
        setter={setter}
        source={Distance}
      />
      <SelectControl
        id="setting"
        label={t('calculator.ventilation')}
        data={data}
        setter={setter}
        source={Setting}
      />
      {data.setting === 'outdoor' &&
      ['close', 'intimate'].includes(data.distance) ? (
        <div className="warning">
          Due to very close distances, we are not confident that being outdoors
          reduces the risk in a substantial way. Thus, we are not providing any
          bonus for being outdoors when intimate.
        </div>
      ) : null}
      <div className="form-group">
        <label htmlFor="duration">
          <Trans>calculator.duration</Trans>
        </label>
        <input
          className="form-control form-control-lg"
          type="number"
          value={data.duration}
          onChange={(e) =>
            setter({
              ...data,
              duration: Math.max(0, parseInt(e.target.value)),
            })
          }
        />
      </div>
      <SelectControl
        id="theirMask"
        label={t('calculator.their_mask')}
        popover={maskPopover}
        data={data}
        setter={setter}
        source={TheirMask}
      />
      <SelectControl
        id="yourMask"
        label={t('calculator.your_mask')}
        popover={maskPopover}
        data={data}
        setter={setter}
        source={YourMask}
      />
      <SelectControl
        id="voice"
        label={t('calculator.volume')}
        data={data}
        setter={setter}
        source={Voice}
      />

      <span className="readout">
        <p>
          <Trans
            values={{
              risk_percentage: fixedPointPrecisionPercent(activityRisk),
            }}
          >
            calculator.your_risk_readout
          </Trans>
          <b>
            {activityRisk && activityRisk >= MAX_ACTIVITY_RISK
              ? ' ' + t('calculator.activity_risk_capped_note')
              : ''}
            {data.distance === 'intimate' &&
            data.duration < intimateDurationFloor
              ? ' (NOTE: We have applied a minimum Activity Risk for fluid transfer.)'
              : ''}
          </b>
        </p>
        <p>
          <Trans>calculator.risk_multiply_step</Trans>
        </p>
      </span>
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
