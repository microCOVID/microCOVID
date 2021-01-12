import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import { DropdownNav } from 'components/DropdownNav'
import { MarkdownContents } from 'components/markdown/PaperPage'
import { mailchimpLink, spreadsheetUrl } from 'components/SpreadsheetUtil'
import { TableOfContents } from 'components/TableOfContents'
import { pages } from 'posts/spreadsheet/index'

const calculator = <Link to="/calculator">Calculator</Link>

export const Spreadsheet = (): React.ReactElement => {
  const { id } = useParams()
  const { t } = useTranslation()
  return (
    <MarkdownContents
      posts={pages}
      id={id}
      rootTitle={t('menu.spreadsheet.introduction')}
      sectionTitle="Spreadsheet"
    />
  )
}

export const SubscribeForm: React.FunctionComponent = () => {
  return (
    <>
      <h2>Subscribe for updates</h2>
      <p>
        We will send email updates when we make feature upgrades and bug fixes
        to the spreadsheet.
      </p>
      <p>{mailchimpLink()}</p>
    </>
  )
}

export const SpreadsheetTOC = (): React.ReactElement => {
  return (
    <TableOfContents
      posts={pages}
      title="Spreadsheet"
      baseNavPath="/spreadsheet"
    >
      <hr />
      <div>
        <h2>What is the spreadsheet for?</h2>
        <p>
          The spreadsheet can help you model the risk of activities and people
          you are seeing more precisely than is possible with the {calculator}.
          It serves as a tool to help you use the{' '}
          <Link to="/paper/9-advanced-method">Advanced Method</Link>.
        </p>
        <p>
          <strong>This spreadsheet might be a good fit for you if:</strong>
          <ol>
            <li>
              <strong>Activity logging:</strong> You want to log your activity
              over time to make sure you’re staying within your intended budget.
            </li>
            <li>
              <strong>Custom Person Risk modeling:</strong> You want to model
              more exactly the risk of a person you are seeing.
            </li>
            <li>
              <strong>Household/pod risk budgeting:</strong> You live with
              others or have other people you are seeing on a regular basis and
              want to keep track of your budget. (The{' '}
              <Link to="/spreadsheet/household-pod">
                households and pods page
              </Link>{' '}
              introduces this approach in detail.)
            </li>
            <li>
              <strong>You want to have more space in your budget:</strong>{' '}
              Accurately modeling the people you’re interacting with often
              results in you using less points for each activity, which means
              you can do more things.
            </li>
          </ol>
        </p>
      </div>
      <div>
        <h2>Get started with the spreadsheet</h2>
        <p>
          Use the buttons below to copy the spreadsheet. You can than read the{' '}
          <a href="/spreadsheet/quickstart">Quickstart Guide</a>.
        </p>
        <p>
          <Button href={spreadsheetUrl} variant="primary" target="_blank">
            Open the microCOVID spreadsheet <BsBoxArrowUpRight />
          </Button>{' '}
          <Button
            href={spreadsheetUrl + '/copy'}
            variant="secondary"
            target="_blank"
          >
            Make a copy of the microCOVID spreadsheet <BsBoxArrowUpRight />
          </Button>
        </p>
      </div>
      <SubscribeForm />

      <Alert variant="info">
        <strong>Looking for testers:</strong> We are looking for beta testers
        for this new version of the spreadsheet. If you are using the microCOVID
        spreadsheet with your household/pod to track your collective COVID risk
        and are intereted in giving us feedback on your experience, please email
        Jeremy at{' '}
        <a
          href="mailto:blanchard.jeremy@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          blanchard.jeremy@gmail.com
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
          If you’re not familiar with GitHub, you can email Jeremy Blanchard,
          our spreadsheet maintainer, at{' '}
          <a href="mailto:blanchard.jeremy@gmail.com">
            blanchard.jeremy@gmail.com
          </a>{' '}
          or email the team at{' '}
          <a href="mailto:info@microcovid.org">info@microcovid.org</a>
        </p>
      </div>
      <div>
        <h2>Spreadsheet changelog</h2>
        <p>
          Each time we update the spreadsheet, we create an entry in the
          changelog (below) with instructions for how you can migrate your copy
          of the spreadsheet to have the latest upgrades and bug fixes.
        </p>
        <p>
          <strong>Current version:</strong> 2.0
          <br />
          <strong>Released on:</strong> 2021-01-11
          <br />
          🕑{' '}
          <a href="https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#">
            View the Spreadsheet Changelog
          </a>
        </p>
      </div>
      <h2>Spreadsheet documentation</h2>
    </TableOfContents>
  )
}

export const SpreadsheetNavDropdown = (): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <DropdownNav
      title={t('menu.spreadsheet.header')}
      baseNavPath="/spreadsheet"
      posts={pages}
      enableAll={false}
      rootTitle={t('menu.spreadsheet.introduction')}
    />
  )
}
