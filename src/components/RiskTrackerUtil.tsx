import React from 'react'

export const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1-IEwUHHC-V8yzA4R6cShxlev63Ykm0uK61GUL_IynmA'

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
