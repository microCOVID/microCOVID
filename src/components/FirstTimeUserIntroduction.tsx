import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
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
        {open ? <BsChevronDown /> : <BsChevronRight />} What is a microCOVID?
      </span>
      <Collapse in={open}>
        <div id="first-time-user-introduction" className="">
          The calculator introduces a new concept, the microCOVID. One
          microCOVID is a one-in-a-million chance of getting COVID. An activity
          that’s 20,000 microCOVIDs is very unsafe, as you have a 2% risk of
          getting COVID <em>every time you do it</em>. An activity that’s 20
          microCOVIDs is relatively safe, as you could do it every week for a
          year and still have only about a 0.1% chance of getting COVID. We
          decided an annual risk budget of a 1% chance of catching COVID per
          year was reasonable for most healthy people who are not in contact
          with vulnerable groups. To learn how we arrived at that number,{' '}
          <a href="/paper/2-riskiness">click here</a>. If you want to follow
          this 1%-risk-per-year budget, you’ll want your weekly budget of
          activities to sum to less than about 200 microCOVIDs each week. We’ve
          created a handy <a href="/spreadsheet">spreadsheet</a> that lets you
          keep track of your activities over time.
        </div>
      </Collapse>
    </>
  )
}

export default FirstTimeUserIntroduction
