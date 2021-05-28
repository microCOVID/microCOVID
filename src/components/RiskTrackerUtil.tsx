import React from 'react'

// See spreadsheet changelog and past versions here: https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#
export const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1ivoRA8fFGKwm-XoflKFKeWIpRQJVpTFP6W1KN45_tSs'
// Do not include '/edit' at the end of the URL, because we append different paths like /copy or /template/preview depending on the use case. Dot not include a slash at the end of the URL.
export const riskTrackerVersion = '2.2.4'
export const riskTrackerReleaseDate = '2021-05-12'
// Reminder: Make sure to bump the version number that gets imported into their copies of the spreadsheet. Located at: /public/tracker/latest_version_number.csv

export const mailchimpSubscribeUrl = 'http://eepurl.com/hb6y4T'
export const changelogUrl =
  'https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8'

export function mailchimpLink(
  text = 'Sign up to be notified about Risk Tracker updates',
): JSX.Element {
  return (
    <a href={mailchimpSubscribeUrl} target="_blank" rel="noreferrer">
      {text}
    </a>
  )
}
