import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

export function FirstTimeUserIntroduction(): React.ReactElement {
  const [open, setOpen] = useState(false)
  return (
    <>
      <span
        className="first-time-user-header expandable-header"
        onClick={() => setOpen(!open)}
        aria-controls="first-time-user-introduction"
        aria-expanded={open}
      >
        {open ? <BsChevronDown /> : <BsChevronRight />}{' '}
        <Trans>calculator.firsttime.header</Trans>
      </span>
      <Collapse in={open}>
        <div id="first-time-user-introduction" className="">
          <Trans i18nKey="calculator.firsttime.explanation">
            Lorem ipsum <a href="/paper/2-riskiness">riskyness link</a>
            dolor sic <a href="/spreadsheet">spreadsheet link</a>
          </Trans>
        </div>
      </Collapse>
    </>
  )
}

export default FirstTimeUserIntroduction
