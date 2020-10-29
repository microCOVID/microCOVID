import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

export const Expandable: React.FunctionComponent<{
  id: string
  header: string
  headerExpanded?: string
  className?: string
}> = (props): React.ReactElement => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`expandable-section ${props.className}`}>
      <span
        className="expandable-header"
        onClick={() => setOpen(!open)}
        aria-controls={props.id}
        aria-expanded={open}
      >
        {open ? (
          <>
            <BsChevronDown /> {props.headerExpanded || props.header}
          </>
        ) : (
          <>
            <BsChevronRight /> {props.header}
          </>
        )}
      </span>
      <Collapse in={open}>
        <div id={props.id}>{props.children}</div>
      </Collapse>
    </div>
  )
}

export default Expandable
