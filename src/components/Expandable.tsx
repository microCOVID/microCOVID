import React, { useContext, useState } from 'react'
import {
  Accordion,
  AccordionContext,
  Card,
  useAccordionToggle,
} from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'
import 'components/styles/Expandable.scss'

interface AccordionToggleProps {
  eventKey: string
  header: string
  headerExpanded?: string
  onClick: () => void
}

function AccordionToggle(props: AccordionToggleProps): JSX.Element {
  const currentEventKey = useContext(AccordionContext)

  const decoratedOnClick = useAccordionToggle(props.eventKey, props.onClick)

  const isCurrentEventKey = currentEventKey === props.eventKey
  return (
    <span onClick={decoratedOnClick}>
      {isCurrentEventKey ? (
        <BsChevronDown className="expandable-icon" />
      ) : (
        <BsChevronRight className="expandable-icon" />
      )}
      {isCurrentEventKey && props.headerExpanded
        ? props.headerExpanded
        : props.header}
    </span>
  )
}

export const ControlledExpandable: React.FunctionComponent<{
  id: string
  header: string
  open: boolean
  setter: (value: boolean) => void
  headerExpanded?: string
  headerClassName?: string
  className?: string
}> = (props): React.ReactElement => {
  const eventKey = 'eventKey' // This is arbitrary since this is a single-item Accordion
  return (
    <Accordion activeKey={props.open ? eventKey : undefined}>
      <Card className={`expandable-section ${props.className || ''}`}>
        <Card.Header
          className={`expandable-header ${props.headerClassName || ''}`}
        >
          <AccordionToggle
            eventKey={eventKey}
            header={props.header}
            headerExpanded={props.headerExpanded}
            onClick={() => props.setter(!props.open)}
          />
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>{props.children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
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
