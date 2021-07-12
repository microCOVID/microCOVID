import React, { useEffect, useRef, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

import { recordCalculatorOptionSelected } from 'components/Analytics'
import { BaseFormValue } from 'data/data'

// Collapsing vertical control. Basically, a replacement for vertically
// arranged radio buttons that collapses when the user makes a choice. This
// differs from a regular dropdown in that
//
// 1) the choices do not float. They push content further down the page and
//    do not hide anything.
// 2) unlike native dropdowns, all options are visible at once.
export const VerticalControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: BaseFormValue }
  value: string | number
  labelFactory?: (value: string) => string
}> = (props) => {
  const [suppressCollapse, setSuppressCollapse] = useState(false)
  const interactionTypeLabelRefs = useRef<{ [key: string]: HTMLLabelElement }>(
    {},
  )
  useEffect(() => {
    // On mount, if there is a selected value already, focus it.
    if (
      props.value !== undefined &&
      props.value in interactionTypeLabelRefs.current
    ) {
      interactionTypeLabelRefs.current[props.value].focus()
    }

    // If user exits selection via link that activates a preset scenario,
    // get out of edit mode.
    return () => {
      setSuppressCollapse(false)
    }
    // TODO(jy2wong) this line should use react-hooks/exhaustive-deps
    // but there is an error?
    // error  Definition for rule 'react-hooks/exhaustive-deps' was not found  react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [])

  return (
    <ToggleButtonGroup
      name={props.id}
      type="radio"
      defaultValue={props.value}
      className="w-100 btn-group-vertical list-group collapsing-vertical-control"
    >
      {Object.keys(props.source).map((value, index) => {
        return (
          <ToggleButton
            key={index}
            ref={(element) => {
              if (interactionTypeLabelRefs.current) {
                interactionTypeLabelRefs.current[value] = element
              }
            }}
            value={value}
            variant="light"
            className="list-group-item text-left"
            onChange={() => {
              if (!suppressCollapse) {
                recordCalculatorOptionSelected(props.id, value)
                props.setter(value)
              }
            }}
            onClick={() => {
              if (suppressCollapse) {
                setSuppressCollapse(false)
              } else {
                if (props.value !== value) {
                  recordCalculatorOptionSelected(props.id, value)
                  props.setter(value)
                }
              }
            }}
            onKeyDown={(e) => {
              // Arrow keys. User hasn't committed to an option yet.
              if (37 <= e.keyCode && e.keyCode <= 40) {
                setSuppressCollapse(true)
              } else if (e.keyCode === 9 || e.keyCode === 13) {
                setSuppressCollapse(false)
                recordCalculatorOptionSelected(props.id, value)
                props.setter(value)
              }
            }}
          >
            {props.labelFactory
              ? props.labelFactory(value)
              : props.source[value].label}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}
