import React from 'react'

// See spreadsheet changelog and past versions here: https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#
export const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1aCj6tkxC70sT9WBwLjBYFxbr_eLbAv8FPF-fjrBtdaU'
// Do not include '/edit' at the end of the URL, because we append different paths like /copy or /template/preview depending on the use case

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
