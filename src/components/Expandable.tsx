import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

export const ControlledExpandable: React.FunctionComponent<{
  id: string
  header: string
  open: boolean
  setter: (value: boolean) => void
  headerExpanded?: string
  headerClassName?: string
  className?: string
}> = (props): React.ReactElement => {
  return (
    <div className={`expandable-section ${props.className || ''}`}>
      <span
        className={`expandable-header ${props.headerClassName || ''}`}
        onClick={() => props.setter(!props.open)}
        aria-controls={props.id}
        aria-expanded={props.open}
      >
        {props.open ? (
          <>
            <BsChevronDown /> {props.headerExpanded || props.header}
          </>
        ) : (
          <>
            <BsChevronRight /> {props.header}
          </>
        )}
      </span>
      <Collapse in={props.open}>
        <div id={props.id}>{props.children}</div>
      </Collapse>
    </div>
  )
}

export const Expandable: React.FunctionComponent<{
  id: string
  header: string
  open?: boolean
  headerExpanded?: string
  headerClassName?: string
  className?: string
}> = (props): React.ReactElement => {
  const [open, setOpen] = useState(props.open || false)

  return (
    <ControlledExpandable
      id={props.id}
      header={props.header}
      setter={setOpen}
      open={open}
      headerExpanded={props.headerExpanded}
      headerClassName={props.headerClassName}
      className={props.className}
    >
      {props.children}
    </ControlledExpandable>
  )
}

export default Expandable
