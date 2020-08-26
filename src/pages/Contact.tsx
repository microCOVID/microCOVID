import React from 'react'
import { Link } from 'react-router-dom'

export const Contact = (): React.ReactElement => {
  return (
    <div id="paperPage">
      <h1>Contact Us</h1>
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
        <a href="https://twitter.com/microcovid" target="_blank" rel="noreferrer">
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
        work on this project. Thank you in advance!
      </p>
      <p>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="8MC4NDX6RTR6Q" />
          <input type="hidden" name="item_name" value="microCOVID project" />
          <input type="hidden" name="currency_code" value="USD" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            src="https://www.paypal.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </p>
    </div>
  )
}
