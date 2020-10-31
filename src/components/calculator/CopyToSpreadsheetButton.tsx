import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import { AutoAlert } from 'components/AutoAlert'
import { CalculatorData } from 'data/calculate'
import { Locations, PrevalenceDataDate } from 'data/location'

export const generateLocationSpreadsheetRow = (
  data: CalculatorData,
): string => {
  const label = data.subLocation
    ? Locations[data.subLocation].label +
      ', ' +
      Locations[data.topLocation].label
    : Locations[data.topLocation].label

  const spreadsheetData = [
    label,
    PrevalenceDataDate,
    (data.casesPastWeek || 0).toString(),
    (data.casesIncreasingPercentage || 0) + '%',
    (data.positiveCasePercentage || 0) + '%',
    data.population || 0,
  ]
  return spreadsheetData.join('\t')
}

export const CopyToSpreadsheetButton: React.FunctionComponent<{
  data: CalculatorData
}> = ({ data }) => {
  const [alerts, setAlerts] = useState<string[]>([])

  const addAlert = (alert: string) => setAlerts([...alerts, alert])

  const copySpreadsheetLocationData = () => {
    copy(generateLocationSpreadsheetRow(data), { format: 'text/plain' })
    addAlert('Copied! Paste it into a row of the the "Locations" sheet.')
  }

  return (
    <>
      <Button
        variant="secondary"
        className="mt-3 mb-3"
        onClick={() => copySpreadsheetLocationData()}
      >
        Copy location data for the spreadsheet
      </Button>

      {alerts.map((alert, idx) => (
        <AutoAlert key={idx} variant="info" message={alert} timeout={20000} />
      ))}
    </>
  )
}

export default CopyToSpreadsheetButton
