import React from 'react'
import { Alert } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsCheckBox } from 'react-icons/bs'

import { Expandable } from 'components/Expandable'

export function FirstTimeUserIntroduction(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <>
      <Expandable
        id="first-time-user-introduction"
        header={t('calculator.firsttime.microcovid_header')}
      >
        <Trans>calculator.firsttime.microcovid_explanation</Trans>
      </Expandable>
      <Expandable
        id="budget-intro"
        header={t('calculator.firsttime.budget_header')}
      >
        <p>
          <Trans i18nKey="calculator.firsttime.budget_explanation">
            Lorem ipsum <a href="/paper/2-riskiness">riskyness link</a>
            dolor sic <a href="/tracker">risk tracker link</a>
          </Trans>
        </p>
      </Expandable>
      <Alert variant="secondary">
        <BsCheckBox />{' '}
        <Trans i18nKey="calculator.alerts.survey_request">
          <strong>We would love your feedback:</strong> lipsum
          <a
            href="https://forms.gle/WzFWcmyXwQMNRqGa7"
            target="_blank"
            rel="noreferrer"
          >
            survey
          </a>{' '}
          lipsum
        </Trans>
      </Alert>
    </>
  )
}

export default FirstTimeUserIntroduction
