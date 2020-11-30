import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

interface Dimensions {
  length: number
  width: number
  height: number
  unit: string
}

const DimensionControl: React.FunctionComponent<{
  label: string
  value: number
  setter: (val: number) => void
  unit?: string
}> = ({ label, value, setter, unit = 'ft' }) => {
  return (
    <>
      <label>
        <strong>
          {label} ({unit})
        </strong>
        :
        <input
          className="form-control form-control-lg col-md-6"
          type="number"
          value={value}
          onChange={(e) => setter(Math.max(0, parseFloat(e.target.value)))}
        />
      </label>
    </>
  )
}

const FEET_PER_METER = 3.28084
const CFM_PER_CMH = FEET_PER_METER ** 3 / 60

export const HepaCalculator: React.FunctionComponent = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    length: 12,
    width: 10,
    height: 8,
    unit: 'ft',
  })

  const toggleUnits = () => {
    let unit
    let multiplier
    if (dimensions.unit === 'ft') {
      unit = 'm'
      multiplier = 1 / FEET_PER_METER
    } else {
      unit = 'ft'
      multiplier = FEET_PER_METER
    }
    setDimensions({
      unit,
      // Round to one decimal place
      length: Math.round(dimensions.length * multiplier * 10) / 10,
      width: Math.round(dimensions.width * multiplier * 10) / 10,
      height: Math.round(dimensions.height * multiplier * 10) / 10,
    })
  }

  let cfm // cubic feet per minute
  let cmh // cubic feet per hour (yes, metric folks use a different time base)
  if (dimensions.unit === 'ft') {
    cfm = (5 * (dimensions.length * dimensions.width * dimensions.height)) / 60
    cmh = cfm / CFM_PER_CMH
  } else {
    cmh = 5 * (dimensions.length * dimensions.width * dimensions.height)
    cfm = cmh * CFM_PER_CMH
  }

  cfm = cfm.toFixed(0)
  cmh = cmh.toFixed(0)

  return (
    <div className="card">
      <header id="filter-calculator">HEPA Filter Calculator</header>
      <div className="subheading">
        Enter your room's dimensions to see the minimum flow rate needed to
        reduce the risk of indoor activities by 4x. Look on the product
        description page for "CADR" and ensure you are buying a purifier with at
        least this rate.
      </div>
      <Row>
        <Col>
          <DimensionControl
            label="Width"
            value={dimensions.width}
            unit={dimensions.unit}
            setter={(val: number) =>
              setDimensions({ ...dimensions, width: val })
            }
          />
        </Col>
        <Col>
          <DimensionControl
            label="Length"
            value={dimensions.length}
            unit={dimensions.unit}
            setter={(val: number) =>
              setDimensions({ ...dimensions, length: val })
            }
          />
        </Col>
        <Col>
          <DimensionControl
            label="Height"
            value={dimensions.height}
            unit={dimensions.unit}
            setter={(val: number) =>
              setDimensions({ ...dimensions, height: val })
            }
          />
        </Col>
        <Col>
          <strong>Minimum Flow Rate</strong>:
          <div className="hepa-result">
            {cfm} CFM
            <br />
            {cmh} m<sup>3</sup>/hr
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={toggleUnits}>
            {dimensions.unit === 'ft' ? 'Change to meters' : 'Change to feet'}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default HepaCalculator
