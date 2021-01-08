import React from 'react'
import { Alert } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsCheckBox } from 'react-icons/bs'
import { Link } from 'react-router-dom'

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
            dolor sic <a href="/spreadsheet">spreadsheet link</a>
          </Trans>
        </p>
      </Expandable>
      <Alert variant="secondary">
        <strong>
          <BsCheckBox /> We would love your feedback:
        </strong>{' '}
        We want your help to make the microCOVID calculator as helpful as
        possible!{' '}
        <Link to="https://forms.gle/WzFWcmyXwQMNRqGa7">
          Please fill out our user survey
        </Link>{' '}
        to help us prioritize new features.
      </Alert>
    </>
  )
}

export default FirstTimeUserIntroduction
