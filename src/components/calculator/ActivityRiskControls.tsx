import React from 'react'

import { SelectControl } from './SelectControl'
import { CalculatorData } from 'data/calculate'
import { Distance, Setting, TheirMask, YourMask } from 'data/data'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => (
  <React.Fragment>
    <SelectControl
      id="setting"
      label="Setting"
      data={data}
      setter={setter}
      source={Setting}
    />

    <SelectControl
      id="distance"
      label="Distance"
      data={data}
      setter={setter}
      source={Distance}
    />

    <div className="form-group">
      <label htmlFor="duration">Duration (in minutes)</label>
      <input
        className="form-control form-control-lg"
        type="number"
        value={data.duration}
        onChange={(e) =>
          setter({
            ...data,
            duration: parseInt(e.target.value),
          })
        }
      />
    </div>

    <SelectControl
      id="theirMask"
      label="Their Mask"
      data={data}
      setter={setter}
      source={TheirMask}
    />

    <SelectControl
      id="yourMask"
      label="Your Mask"
      data={data}
      setter={setter}
      source={YourMask}
    />
  </React.Fragment>
)
