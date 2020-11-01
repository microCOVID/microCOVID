import React from 'react'

import { Expandable } from 'components/Expandable'

export function FirstTimeUserIntroduction(): React.ReactElement {
  return (
    <>
      <Expandable
        id="first-time-user-introduction"
        header="What is a microCOVID?"
      >
        <p>
          The calculator introduces a new concept, the microCOVID. One
          microCOVID is a one-in-a-million chance of getting COVID.
        </p>
        <p>
          An activity that’s 20,000 microCOVIDs is very unsafe, as you have a 2%
          risk of getting COVID <em>every time you do it</em>. An activity
          that’s 20 microCOVIDs is relatively safe, as you could do it every
          week for a year and still have only about a 0.1% chance of getting
          COVID.
        </p>
      </Expandable>

      <Expandable
        id="budget-intro"
        header="How can I manage my risk using a risk budget?"
      >
        <p>
          We decided an annual risk budget of a 1% chance of catching COVID per
          year was reasonable for most healthy people who are not in contact
          with vulnerable groups. To learn how we arrived at that number,{' '}
          <a href="/paper/2-riskiness">click here</a>. If you want to follow
          this 1%-risk-per-year budget, you’ll want your weekly budget of
          activities to sum to less than about 200 microCOVIDs each week. We’ve
          created a handy <a href="/spreadsheet">spreadsheet</a> that lets you
          keep track of your activities over time.
        </p>
      </Expandable>
    </>
  )
}

export default FirstTimeUserIntroduction
