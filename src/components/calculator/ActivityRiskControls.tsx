import React from 'react'
import { Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { SelectControl } from './SelectControl'
import { CalculatorData, calculateActivityRisk } from 'data/calculate'
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
      <h3>Modifiers</h3>
      <SelectControl
        id="setting"
        header="Environment"
        label="Are you indoors or outdoors?"
        data={data}
        setter={setter}
        source={Setting}
        className="col-md-6"
      />
      {data.setting === 'outdoor' &&
      ['close', 'intimate'].includes(data.distance) ? (
        <div className="warning">
          Due to very close distances, we are not confident that being outdoors
          reduces the risk in a substantial way. Thus, we are not providing any
          bonus for being outdoors when intimate.
        </div>
      ) : null}
      <SelectControl
        id="yourMask"
        header="Your mask"
        label="What mask are YOU wearing?"
        helpText="if you’re eating or drinking, select “no mask”"
        popover={maskPopover}
        data={data}
        setter={setter}
        source={YourMask}
      />
      <SelectControl
        id="theirMask"
        header="Their mask"
        label="What mask are THEY wearing?"
        helpText="if you’re eating or drinking, select “no mask”"
        popover={maskPopover}
        data={data}
        setter={setter}
        source={TheirMask}
      />
      <SelectControl
        id="voice"
        header="Volume"
        label="How much is everyone talking?"
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
      For more details on masks, see{' '}
      <Link to="/paper/14-research-sources#masks" target="_blank">
        research sources
      </Link>
    </Popover.Content>
  </Popover>
)
