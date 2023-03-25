import i18n from 'i18n'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { PrevalenceResult } from './PrevalenceResult'
import { formatPercent } from 'components/calculator/util/FormatPrecision'
import { ControlledExpandable } from 'components/Expandable'
import { CalculatorData } from 'data/calculate'

const PrevalenceFieldStatic: React.FunctionComponent<{
  id: string
  label: string
  value: string
}> = ({ id, label, value }): React.ReactElement => {
  return (
    <div id={id}>
      {label}: {value}
    </div>
  )
}

export const LocationPrevalenceDetails: React.FunctionComponent<{
  id: string
  header: string
  open: boolean
  setter: (value: boolean) => void
  data: CalculatorData
  locationSet: boolean
  hide: boolean
}> = (props) => {
  const { t } = useTranslation()
  return (
    <ControlledExpandable
      id={props.id}
      header={props.header}
      headerClassName={`expandable-header-light ${props.hide ? 'd-none' : ''}`}
      open={props.open}
      setter={props.setter}
    >
      <PrevalenceResult data={props.data} />

      <PrevalenceFieldStatic
        id="reported-cases"
        label={t('calculator.prevalence.last_week_cases')}
        value={Number(props.data.casesPastWeek || 0).toLocaleString(
          i18n.language,
        )}
      />
      <PrevalenceFieldStatic
        id="population"
        label={t('calculator.prevalence.population')}
        value={props.data.population}
      />
      {props.locationSet && props.data.casesIncreasingPercentage === 0 ? (
        <div>{t('calculator.prevalence.cases_stable_or_decreasing')}</div>
      ) : (
        <PrevalenceFieldStatic
          id="percent-increase"
          label={t('calculator.prevalence.percent_increase_in_cases')}
          value={formatPercent(props.data.casesIncreasingPercentage / 100)}
        />
      )}
      <PrevalenceFieldStatic
        id="positive-test-rate"
        label={t('calculator.prevalence.positive_case_percentage')}
        value={
          props.data.positiveCasePercentage === null
            ? 'no data available'
            : Number(props.data.positiveCasePercentage / 100).toLocaleString(
                i18n.language,
                {
                  maximumFractionDigits: 1,
                  style: 'percent',
                },
              )
        }
      />
      <PrevalenceFieldStatic
        id="vaccinated-rate"
        label={t('calculator.prevalence.completed_vaccinations')}
        value={
          props.data.percentFullyVaccinated === null
            ? 'no data available'
            : formatPercent(props.data.percentFullyVaccinated / 100)
        }
      />
      {!props.locationSet ? null : (
        <>
          <div>
            <em>
              <Trans>calculator.prevalence.data_last_updated</Trans>:{' '}
              {props.data.prevalanceDataDate.toLocaleDateString()}
            </em>
          </div>
          <div>
            <div className="mt-3">
              <Trans i18nKey="calculator.prevalence_info_source_information">
                Prevalence data consolidated from {}
                <a
                  href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data"
                  target="_blank"
                  rel="noreferrer"
                >
                  Johns Hopkins CSSE
                </a>{' '}
                (reported cases), {}
                <a
                  href="https://apidocs.covidactnow.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Covid Act Now
                </a>{' '}
                (US positive test rates), and {}
                <a
                  href="https://ourworldindata.org/coronavirus-testing#testing-for-covid-19-background-the-our-world-in-data-covid-19-testing-dataset"
                  target="_blank"
                  rel="noreferrer"
                >
                  Our World in Data
                </a>{' '}
                (international positive test rates). Additional data from:
              </Trans>
              <ul>
                <li>
                  <Trans i18nKey="calculator.prevalence_info_supplementary_sources.romania">
                    <a
                      href="https://covid19.geo-spatial.org/despre"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Coronavirus COVID-19 România
                    </a>{' '}
                    (Romania reported cases)
                  </Trans>
                </li>
                <li>
                  <Trans i18nKey="calculator.prevalence_info_supplementary_sources.canada1">
                    <a
                      href="https://opencovid.ca/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      COVID-19 Canada Open Data Working Group
                    </a>{' '}
                    (Canada province and region data, {}
                    <a
                      href="https://creativecommons.org/licenses/by/4.0/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      CC BY 4.0
                    </a>
                    )
                  </Trans>
                </li>
                <li>
                  <Trans i18nKey="calculator.prevalence_info_supplementary_sources.canada2">
                    <a
                      href="https://covid19tracker.ca/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      COVID-19 Tracker Canada
                    </a>{' '}
                    (Canada vaccination data, {}
                    <a
                      href="https://creativecommons.org/licenses/by/4.0/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      CC BY 4.0
                    </a>
                    )
                  </Trans>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </ControlledExpandable>
  )
}

export default LocationPrevalenceDetails
