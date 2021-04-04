import React from 'react'

// See spreadsheet changelog and past versions here: https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#
export const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1W3_RxaLrqILJae6Uw-I1D9opP5tKVA694OhdGusNwMs'
// Do not include '/edit' at the end of the URL, because we append different paths like /copy or /template/preview depending on the use case
export const riskTrackerVersion = '2.2.3'
export const riskTrackerReleaseDate = '2021-03-16'
// Reminder: Make sure to bump the version number that gets imported into their copies of the spreadsheet. Located at: /public/tracker/latest_version_number.csv

export const mailchimpSubscribeUrl = 'http://eepurl.com/hb6y4T'

export function mailchimpLink(
  text = 'Sign up to be notified about Risk Tracker updates',
): JSX.Element {
  return (
    <a href={mailchimpSubscribeUrl} target="_blank" rel="noreferrer">
      {text}
    </a>
  )
}
