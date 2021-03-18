import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import activityModeling from './img/activity-modeling.png'
import podOverviewIntro from './img/budget-overview.png'
import { DropdownNav } from 'components/DropdownNav'
import { MarkdownContents } from 'components/markdown/PaperPage'
import { mailchimpLink, spreadsheetUrl } from 'components/RiskTrackerUtil'
import { TableOfContents } from 'components/TableOfContents'
import { pages } from 'posts/tracker/index'

export const RiskTrackerDocumentation = (): React.ReactElement => {
  const { id } = useParams()
  const { t } = useTranslation()
  return (
    <MarkdownContents
      posts={pages}
      id={id}
      tableOfContentsPageTitle={t('menu.risk_tracker.start_here')}
      sectionTitle={t('menu.risk_tracker.header')}
    />
  )
}

export const SubscribeForm: React.FunctionComponent = () => {
  return (
    <>
      <h2>Subscribe for updates</h2>
      <p>
        We will send email updates when we make feature upgrades and bug fixes
        to the Risk Tracker.
      </p>
      <p>{mailchimpLink()}</p>
    </>
  )
}

export const RiskTrackerTOC = (): React.ReactElement => {
  return (
    <TableOfContents posts={pages} title="Risk Tracker" baseNavPath="/tracker">
      <hr />
      <div>
        <h2>What is the Risk Tracker for?</h2>
        <p>
          The microCOVID Risk Tracker is a spreadsheet that lets you estimate
          the risk of getting COVID from an activity or relationship in your
          daily life, using the{' '}
          <Link to="/paper/14-research-sources">best research available</Link>.
        </p>
        <img
          src={podOverviewIntro}
          alt="Pod overview"
          style={{ width: '800px', maxWidth: '100%' }}
        />
        <p>
          The Risk Tracker can help you model the risk of activities and people
          you are seeing more precisely than is possible with the{' '}
          <Link to="/calculator">website calculator</Link>. You can track log
          your activities over time to keep your activities within a risk budget
          that you define to be safe.
        </p>
        <p>
          <strong>
            The Risk Tracker might be a good fit if you are interested in:
          </strong>
          <ol>
            <li>
              <strong>Maintaining a personal risk budget:</strong> You want to
              log your activity over time to make sure you’re staying within
              your intended budget.
            </li>
            <li>
              <strong>Modeling the risk of seeing other people:</strong> You
              want to know how risky it is to interact with a specific other
              person. (Whereas the Calculator only has pre-built risk profiles.)
            </li>
            <li>
              <strong>
                Modeling someone outside of your pod who has been vaccinated:
              </strong>{' '}
              This Risk Tracker allows you to model the risk of seeing someone
              else who has been vaccinated. We do not anticipate adding this
              functionality to the Calculator.
            </li>
            <li>
              <strong>Household/pod risk budgeting:</strong> You live with
              others or have other people you are seeing on a regular basis and
              want to keep everyone's risk within a certain budget. (The{' '}
              <Link to="/tracker/household-pod">households and pods page</Link>{' '}
              introduces this approach in detail.)
            </li>
          </ol>
        </p>
      </div>
      <div>
        <h2>Get started with the Risk Tracker</h2>
        <p>
          Use the buttons below to copy the Risk Tracker. You can then read the{' '}
          <a href="/tracker/quickstart">Quickstart Guide</a>.
        </p>
        <p>
          <Button href={spreadsheetUrl} variant="primary" target="_blank">
            View the Risk Tracker <BsBoxArrowUpRight />
          </Button>{' '}
          <Button
            href={spreadsheetUrl + '/copy'}
            variant="secondary"
            target="_blank"
          >
            Make a copy of the Risk Tracker <BsBoxArrowUpRight />
          </Button>
        </p>
        <img
          src={activityModeling}
          alt="Activity modeling spreadsheet screenshot"
          style={{ width: '800px', maxWidth: '100%' }}
        />
      </div>
      <SubscribeForm />

      <Alert variant="info">
        <strong>Looking for feedback:</strong> We are looking for folks who are
        willing to offer feedback on this new version of the spreadsheet. If you
        are using the Risk Tracker with your household/pod to track your
        collective COVID risk and are intereted in giving us feedback on your
        experience, please email Jeremy at{' '}
        <a
          href="mailto:tracker@microcovid.org"
          target="_blank"
          rel="noreferrer"
        >
          tracker@microcovid.org
        </a>
        .
      </Alert>
      <div>
        <h2>Have a question? Need support? Have feedback?</h2>
        <p>We welcome questions, feedback, and feature requests.</p>
        <p>
          If you’re familiar with GitHub, please{' '}
          <a href="https://github.com/microcovid/microcovid/issues/new">
            open an issue there
          </a>
          .
        </p>
        <p>
          If you’re not familiar with GitHub, you can email questions to our
          team at{' '}
          <a href="mailto:tracker@microcovid.org">tracker@microcovid.org</a>.
        </p>
      </div>
      <div>
        <h2>Risk Tracker changelog</h2>
        <p>
          Each time we update the Risk Tracker, we create an entry in the
          changelog (below) with instructions for how you can migrate your copy
          of the spreadsheet to have the latest upgrades and bug fixes.
        </p>
        <p>
          <strong>Current version:</strong> 2.2
          <br />
          <strong>Released on:</strong> 2021-03-16
          <br />
          🕑{' '}
          <a href="https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8">
            View the Risk Tracker Changelog
          </a>
        </p>
      </div>
      <h2>Risk Tracker documentation</h2>
    </TableOfContents>
  )
}

export const RiskTrackerNavDropdown = (): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <DropdownNav
      title={t('menu.risk_tracker.header')}
      baseNavPath="/tracker"
      posts={pages}
      enableAll={false}
      tableOfContentsPageTitle={t('menu.risk_tracker.start_here')}
    />
  )
}
