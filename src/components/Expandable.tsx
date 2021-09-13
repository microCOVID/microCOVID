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
  headerId: string
  headerClassName?: string
  headerExpanded?: string
  bodyId: string
  onClick: () => void
}

function AccordionToggle(props: AccordionToggleProps): JSX.Element {
  const currentEventKey = useContext(AccordionContext)

  const decoratedOnClick = useAccordionToggle(props.eventKey, props.onClick)

  const isCurrentEventKey = currentEventKey === props.eventKey
  return (
    <button
      id={props.headerId}
      className={`${props.headerClassName || ''} card-header expandable-header`}
      onClick={decoratedOnClick}
      aria-expanded={isCurrentEventKey ? 'true' : 'false'}
      aria-controls={props.bodyId}
    >
      {isCurrentEventKey ? (
        <BsChevronDown className="expandable-icon" />
      ) : (
        <BsChevronRight className="expandable-icon" />
      )}
      {isCurrentEventKey && props.headerExpanded
        ? props.headerExpanded
        : props.header}
    </button>
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
  const headerId = `${props.id}-header`
  const bodyId = `${props.id}-body`
  return (
    <Accordion activeKey={props.open ? eventKey : undefined}>
      <Card className={`expandable-section ${props.className || ''}`}>
        <AccordionToggle
          eventKey={eventKey}
          header={props.header}
          headerId={headerId}
          headerClassName={props.headerClassName}
          headerExpanded={props.headerExpanded}
          bodyId={bodyId}
          onClick={() => props.setter(!props.open)}
        />
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body id={bodyId} role="region" aria-labelledby={headerId}>
            {props.children}
          </Card.Body>
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
