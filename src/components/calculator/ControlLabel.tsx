import React from 'react'
import { Badge, OverlayTrigger } from 'react-bootstrap'
import 'components/calculator/styles/ControlLabel.scss'

export const ControlLabel: React.FunctionComponent<{
  id: string
  label?: string
  header?: string
  popover?: JSX.Element
}> = (props) => (
  <>
    {(props.label || props.header) && (
      <div className="label-wrapper">
        <label htmlFor={props.id}>
          <div>
            {props.header && <strong>{props.header}:</strong>} {props.label}
          </div>
        </label>
        {props.popover && (
          <OverlayTrigger
            trigger="click"
            overlay={props.popover}
            rootClose={true}
          >
            <Badge variant="secondary">?</Badge>
          </OverlayTrigger>
        )}
      </div>
    )}
  </>
)

export default ControlLabel
