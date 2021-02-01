import React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Symptoms = (): React.ReactElement => {
  return (
    <div className="paperPage">
      <h1 className="pageTitle">Symptoms Checklist</h1>

      <p>
        You can use this page as a reminder for which COVID symptoms to be
        mindful of.{' '}
        <em>
          (This page is designed for{' '}
          <Link to="/tracker">microCOVID Risk Tracker</Link> users to send to a
          contact they are interacting with.)
        </em>
      </p>
      <Alert variant="warning">
        <strong>Disclaimer:</strong> This page is for informational purposes
        only, not for a medical diagnosis.
      </Alert>

      <table>
        <tbody>
          <tr>
            <th>
              <strong>Symptoms: </strong>Do you have any of these symptoms? Are
              they{' '}
              <em>
                <u>new</u>
              </em>
              ,{' '}
              <em>
                <u>concerning</u>
              </em>
              , or{' '}
              <em>
                <u>not easily explainable</u>
              </em>
              ?
            </th>
          </tr>
          <tr>
            <td style={{ fontSize: '1.3em', lineHeight: '1.5em' }}>
              <ul>
                <li>🌡️ Temperature of 99.5 or above</li>
                <li>🥵 Subjective “feverish feeling”</li>
                <li>🥶 Chills</li>
                <li>💨 Cough (especially a dry cough)</li>
                <li>😮 Shortness of breath / difficulty breathing</li>
                <li>👅 New loss of taste or smell</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <em>Other less-common COVID symptoms:</em> 😓 fatigue, 💥 body
              aches, 🤯 headache, 😩 sore throat, 🤢 nausea or vomiting, 💩
              diarrhea
            </td>
          </tr>
        </tbody>
      </table>

      <h3>🌡️ If you do have symptoms now…</h3>
      <ul>
        <li>
          Let the person you’re seeing know beforehand. You are much more likely
          to have COVID if you currently have symptoms, and they will want to
          factor this increased risk into their risk budget.
        </li>
      </ul>
      <h3>
        📞 Are you willing to report any symptoms you develop over the next 10
        days?
      </h3>
      <ul>
        <li>
          Doing so will allow the person you’re seeing to quarantine earlier
          while they are likely less contagious, thereby reducing the spread of
          COVID.
        </li>
        <li>
          If you agree to report symptoms, let the person you’re seeing know so
          they can account for that in their budget.
        </li>
        <li>
          Please report symptoms within 24 hours of when they begin, so the
          person you interacted with can begin to quarantine.
        </li>
      </ul>
      <p>
        <strong>Other resources:</strong> You can do a more detailed{' '}
        <a
          href="https://landing.google.com/screener/covid19"
          target="_blank"
          rel="noreferrer"
        >
          self-assessment survey
        </a>{' '}
        here. You can read more about{' '}
        <a
          href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
          target="_blank"
          rel="noreferrer"
        >
          COVID symptoms
        </a>{' '}
        here.
      </p>
      <p>
        <em>Note:</em> Though 100.0 or 100.4 is typically used as a temperature
        to indicate a fever, we use 99.5 in order to be as conservative as
        possible. See{' '}
        <a
          href="https://www.washingtonpost.com/business/2020/05/15/fever-screening-coronavirus/"
          target="_blank"
          rel="noreferrer"
        >
          this reference
        </a>{' '}
        for one example.
      </p>
    </div>
  )
}
