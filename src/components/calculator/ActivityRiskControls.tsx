import React from 'react'
import { Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { SelectControl } from './SelectControl'
import {
  CalculatorData,
  MAX_ACTIVITY_RISK,
  calculateActivityRisk,
} from 'data/calculate'
import { Setting, TheirMask, Voice, YourMask } from 'data/data'
import { fixedPointPrecisionPercent } from 'data/FormatPrecision'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const activityRisk = calculateActivityRisk(data)

  if (repeatedEvent) {
    return (
      <React.Fragment>
        <span className="readout">
          The <i>second</i> part of the calculation is Activity Risk: assuming 1
          such person has COVID, then you would have a{' '}
          <b>{fixedPointPrecisionPercent(activityRisk)}</b> chance of getting
          COVID.
        </span>
        <div className="empty">
          When estimating your risk of infection from a household member or
          partner/spouse we assume these interactions are indoors, unmasked, and
          undistanced.
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <SelectControl
        id="setting"
        label="Are you indoors or outdoors?"
        data={data}
        setter={setter}
        source={Setting}
      />
      <SelectControl
        id="yourMask"
        label="What mask are YOU wearing? (if you’re eating or drinking, say “no mask”)"
        popover={maskPopover}
        data={data}
        setter={setter}
        source={YourMask}
      />
      <SelectControl
        id="theirMask"
        label="What mask are THEY wearing? (if you’re eating or drinking, say “no mask”)"
        popover={maskPopover}
        data={data}
        setter={setter}
        source={TheirMask}
      />
      <SelectControl
        id="voice"
        label="How much is everyone talking?"
        data={data}
        setter={setter}
        source={Voice}
      />

      <span className="readout">
        <p>
          The <i>second</i> part of the calculation is Activity Risk: assuming 1
          person at this activity has COVID, then you would have a{' '}
          <b>{fixedPointPrecisionPercent(activityRisk)}</b> chance of getting
          COVID.
          <b>
            {activityRisk && activityRisk >= MAX_ACTIVITY_RISK
              ? ' (NOTE: We have capped this number at the maximum Activity Risk.)'
              : ''}
          </b>
        </p>
        <p>
          Finally, we multiply Person Risk and Activity Risk to get the total
          result.
        </p>
      </span>
    </React.Fragment>
  )
}

const maskPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Masks</Popover.Title>
    <Popover.Content>
      For more details on masks, see{' '}
      <Link to="/paper/14-research-sources#masks" target="_blank">
        research sources
      </Link>
    </Popover.Content>
  </Popover>
)
