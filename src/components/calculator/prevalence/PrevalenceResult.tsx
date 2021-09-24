import React from 'react'
import { Card } from 'react-bootstrap'
import { Trans } from 'react-i18next'

import { formatPercent } from 'components/calculator/util/FormatPrecision'
import {
  CalculatorData,
  calculateLocationPersonAverage,
  calculateLocationReportedPrevalence,
} from 'data/calculate'

export const PrevalenceResult = (props: {
  data: CalculatorData
}): React.ReactElement => {
  return (
    <Card className="prevalence-result">
      <Card.Body>
        <div>
          <Trans>calculator.prevalence.reported_prevalence</Trans>:{' '}
          {formatPercent(calculateLocationReportedPrevalence(props.data) || 0, {
            decimalPointsToShow: 2,
          })}
        </div>
        <div>
          <strong>
            <Trans>calculator.prevalence.adjusted_prevalence</Trans>:{' '}
            {formatPercent(
              (calculateLocationPersonAverage(props.data) || 0) / 1e6,
              { decimalPointsToShow: 2 },
            )}
          </strong>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PrevalenceResult
