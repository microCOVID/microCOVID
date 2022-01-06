import React from 'react'

import {
  latestRiskTrackerReleaseDate,
  latestRiskTrackerSpreadsheetURL,
  latestRiskTrackerVersion,
  mailchimpSubscribe,
} from 'posts/tracker/changelog'

// See spreadsheet changelog and past versions here: https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#
export const spreadsheetUrl = latestRiskTrackerSpreadsheetURL

export const riskTrackerVersion = latestRiskTrackerVersion
export const riskTrackerReleaseDate =
  latestRiskTrackerReleaseDate.toLocaleDateString()
// Reminder: Make sure to bump the version number that gets imported into their copies of the spreadsheet. Located at: /public/tracker/latest_version_number.csv

export const mailchimpSubscribeUrl = mailchimpSubscribe
export const changelogUrl = '/tracker/changelog'

export function mailchimpLink(
  text = 'Sign up to be notified about Risk Tracker updates',
): JSX.Element {
  return (
    <a href={mailchimpSubscribeUrl} target="_blank" rel="noreferrer">
      {text}
    </a>
  )
}
