import React from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Donation } from 'components/Donation'

export const About = (): React.ReactElement => {
  return (
    <div className="paperPage">
      <h2>
        <Trans>about.intro_header</Trans>
      </h2>
      <p>
        <Trans i18nKey="about.basic_description">
          <p>
            This is a project to quantitatively estimate the COVID risk to you
            from your ordinary daily activities.
          </p>
          <p>
            We trawled the scientific literature for data about the likelihood
            of getting COVID from different situations, and combined the data
            into a model that people can use. We estimate COVID risk in units of
            microCOVIDs, where 1 microCOVID = a one-in-a-million chance of
            getting COVID.
          </p>
          <p>
            We want to help as many people as possible feel more empowered to
            make decisions around COVID risk by helping them understand how
            COVID is transmitted. We hope this tool will help hone your
            intuition, lower your stress levels, and figure out good
            harm-reduction strategies.
          </p>
        </Trans>
      </p>

      <h2>
        <Trans>about.where_to_start_header</Trans>
      </h2>
      <p>
        <Trans>about.data_inputs_lead</Trans>:
      </p>
      <ul>
        <li>
          <Trans i18nKey="about.data_inputs_calculator">
            a <Link to="/calculator">calculator</Link> that you can use to
            calculate your COVID risk
          </Trans>
        </li>
        <li>
          <Trans i18nKey="about.data_inputs_whitepaper">
            a <Link to="/paper">white paper</Link> that explains our estimation
            method
          </Trans>
        </li>
        <li>
          <Trans i18nKey="about.data_inputs_spreadsheet">
            and a <Link to="/tracker">Risk Tracker</Link> to compute your COVID
            risk in more detail and to track your risk over time.
          </Trans>
        </li>
      </ul>
      <p>
        <Trans i18nKey="about.data_inputs_recommendation">
          You should start with either the{' '}
          <Link to="/calculator">calculator</Link> or the{' '}
          <Link to="/paper">white paper</Link>.
        </Trans>
      </p>

      <h2>
        <Trans>about.donations_header</Trans>
      </h2>
      <p>
        <Trans>about.donations_details</Trans>
      </p>
      <Donation />
    </div>
  )
}
