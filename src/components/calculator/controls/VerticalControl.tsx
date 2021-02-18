import React, { useEffect, useRef, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

import { recordCalculatorOptionSelected } from 'components/Analytics'
import { BaseFormValue } from 'data/data'

export const VerticalControl: React.FunctionComponent<{
  id: string
  setter: (value: string) => void
  source: { [key: string]: BaseFormValue }
  value: string | number
  editMode: boolean
  setEditMode: (newEditMode: boolean) => void
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
      props.setEditMode(false)
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
                props.setEditMode(false)
              }
            }}
            onKeyDown={(e) => {
              if (37 <= e.keyCode && e.keyCode <= 40) {
                setSuppressCollapse(true)
              } else if (e.keyCode === 9 || e.keyCode === 13) {
                setSuppressCollapse(false)
                props.setEditMode(false)
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
