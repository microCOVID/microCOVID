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
        <Trans>about.basic_description</Trans>
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
            and a <Link to="/tracker">Risk Tracker spreadsheet</Link> to compute
            your COVID risk in more detail and to track your risk over time.
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

      <p className="warning">
        <Trans i18nKey="about.disclaimer">
          <h2>Disclaimer</h2>
          Lorem ipsum dolor sic amet...
        </Trans>
      </p>

      <h2>
        <Trans>about.contact_us_header</Trans>
      </h2>
      <p>
        <Trans i18nKey="about.feedback">
          feedback goes <Link to="/contact">here</Link>.
        </Trans>
      </p>
      <h3>
        <Trans>about.donations_header</Trans>
      </h3>
      <p>
        <Trans>about.donations_details</Trans>
      </p>
      <Donation />
    </div>
  )
}
