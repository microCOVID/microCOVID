import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { DropdownNav } from 'components/DropdownNav'
import { MarkdownContents } from 'components/markdown/PaperPage'
import { pages } from 'posts/spreadsheet/index'

const calculator = <Link to="/calculator">Calculator</Link>
export const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1DYIJgjG3H5rwt52NT2TX_m429snmIU-jGw1a8ZODwGQ'

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

export const SpreadsheetTOC = (): React.ReactElement => {
  return (
    <div className="paperPage">
      <h1>Spreadsheet</h1>
      <h2>What is the spreadsheet for?</h2>
      <p>
        The spreadsheet can help you model the risk of activities and people you
        are seeing more precisely than is possible with the {calculator}. It
        serves as a tool to help you use the{' '}
        <Link to="/paper/9-advanced-method">Advanced Method</Link>.
      </p>
      <p>
        <Button href={spreadsheetUrl} variant="primary">
          Open the microCOVID spreadsheet →
        </Button>
      </p>
      <p>
        <Button href={spreadsheetUrl + '/copy'} variant="secondary">
          Make a copy of the microCOVID spreadsheet →
        </Button>
      </p>
      <p>
        <strong>This spreadsheet might be a good fit for you if:</strong>
        <ol>
          <li>
            <strong>Activity logging:</strong> You want to log your activity
            over time to make sure you’re staying within your intended budget.
          </li>
          <li>
            <strong>Custom Person Risk modeling:</strong> You want to model more
            exactly the risk of a person you are seeing.
          </li>
          <li>
            <strong>Household/pod risk budgeting:</strong> You live with others
            or have other people you are seeing on a regular basis and want to
            keep track of your budget. (The{' '}
            <Link to="#">households and pods page</Link> introduces this
            approach in detail.)
          </li>
          <li>
            <strong>You want to have more space in your budget:</strong>{' '}
            Accurately modeling the people you’re interacting with often results
            in you using less points for each activity, which means you can do
            more things.
          </li>
        </ol>
      </p>
      <h2>Subscribe for updates</h2>
      <p>
        Subscribe for updates We will send email updates when we make feature
        upgrades and bug fixes to the spreadsheet. _INTERNAL NOTE: (Link to
        Mailchimp opt-in page)_
      </p>
      <h2>Spreadsheet changelog</h2>
      <p>
        Each time we update the spreadsheet, we create an entry in the changelog
        (below) with instructions for how you can migrate your copy of the
        spreadsheet to have the latest upgrades and bug fixes.
      </p>
      <p>**Current version:** 2</p>
      <p>**Released on:** 2020-12-28</p>
      <p>[INTERNAL NOTE: Update these on release]</p>
      <p>
        🕑 [View the Spreadsheet Changelog
        →](https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#)
      </p>
      <h2>Spreadsheet documentation</h2>
      <p>TO DO: fill in spreadsheet doc links</p>
    </div>
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
