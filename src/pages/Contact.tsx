import React from 'react'
import { Link } from 'react-router-dom'

import Donation from 'components/Donation'

export const Contact = (): React.ReactElement => {
  return (
    <div className="paperPage">
      <h1>Contact Us</h1>
      <h3>Sign up for updates</h3>
      <p>
        If you would like to receive updates when we make substantial changes to
        our model, or if you are interested in learning more about how we use
        this tool as part of an agreement/protocol for our group house, please{' '}
        <a href="http://eepurl.com/hb6y4T" target="_blank" rel="noreferrer">
          sign up here
        </a>{' '}
        for our mailing list.
      </p>
      <h3>Suggestions</h3>
      <p>
        If there is something you think should be <b>changed or improved</b>,
        you can submit an{' '}
        <a
          href="https://github.com/microcovid/microcovid/issues"
          target="_blank"
          rel="noreferrer"
        >
          issue
        </a>{' '}
        on github, tweet at{' '}
        <a
          href="https://twitter.com/microcovid"
          target="_blank"
          rel="noreferrer"
        >
          @microcovid
        </a>
        , or email us at{' '}
        <a href="mailto: info@microcovid.org">info@microcovid.org</a>. We can't
        promise we'll get to your suggestion promptly, but we do appreciate
        hearing about it.
      </p>
      <p>
        That said: if you're up for it, and your suggestion is a small change
        (like a typo, or a clarification) then we would be delighted if want to
        take a stab at making the change directly yourself!
        <ul>
          <li>
            This project is hosted on{' '}
            <a
              href="https://github.com/microcovid/microcovid"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
          </li>
          <li>
            You don't need to know how to code. Similar to a wiki, you can edit
            the text{' '}
            <a
              href="https://docs.github.com/en/github/managing-files-in-a-repository/editing-files-in-another-users-repository"
              target="_blank"
              rel="noreferrer"
            >
              directly on github
            </a>{' '}
            in your browser; this will propose a change which we will review
            before it becomes final.
          </li>
        </ul>
        <p>
          We're an all-volunteer team, and we don't yet know how much time and
          energy we will have to incorporate larger changes. If you want to fork
          our project and implement larger changes yourself, be our guest!
        </p>
      </p>
      <h3>Questions</h3>
      <p>
        If you have a question or something is confusing, and it's not in the
        relevant section of the <Link to="/paper">white paper</Link> or the{' '}
        <Link to="/paper/13-q-and-a">Q&A</Link> section, then drop us a line at{' '}
        <a href="mailto: info@microcovid.org" target="_blank" rel="noreferrer">
          info@microcovid.org
        </a>{' '}
        and we would be glad to help you out! We love helping more people use
        our system.
      </p>
      <h3>Gratitude</h3>
      <p>
        If you're excited about this system (we sure are!) and it has made your
        life better, it would bring us immense joy to hear from you!
      </p>
      <p>
        We also welcome donations and tips, if you feel so moved. No pressure,
        truly. We're all volunteers and we don't currently have any funding to
        work on this project. Thank you in advance! (If you don't want to use
        PayPal, you can also send to Venmo user <code>@Catherine-Olsson</code>.)
      </p>
      <Donation />
    </div>
  )
}
