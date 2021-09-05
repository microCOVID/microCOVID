import React from 'react'
import { Trans } from 'react-i18next'

import { DurationInput } from './DurationInput'
import { PeopleCountInput } from './PeopleCountInput'
import { DistanceSelector } from './selectors/DistanceSelector'
import { RiskProfileSelector } from './selectors/RiskProfileSelector'
import { TheirVaccineSelector } from './selectors/TheirVaccineSelector'
import { CalculatorData } from 'data/calculate'
import { RiskProfilesUnaffectedByVaccines } from 'data/data'

export const PersonRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const showTheirVaccineSelector =
    data.riskProfile !== '' &&
    !Object.values(RiskProfilesUnaffectedByVaccines).includes(data.riskProfile)
  return (
    <React.Fragment>
      <h3 className="h2 accent">
        <span>
          <Trans>calculator.nearby_people_label</Trans>
        </span>
      </h3>
      {data.interaction === 'partner' ? null : (
        <PeopleCountInput
          data={data}
          setter={setter}
          repeatedEvent={repeatedEvent}
        />
      )}

      {!repeatedEvent ? (
        <React.Fragment>
          <DistanceSelector data={data} setter={setter} />
          <DurationInput data={data} setter={setter} />
        </React.Fragment>
      ) : null}
      <RiskProfileSelector
        data={data}
        setter={setter}
        repeatedEvent={repeatedEvent}
      />
      {showTheirVaccineSelector && (
        <TheirVaccineSelector data={data} setter={setter} />
      )}
      <br />
    </React.Fragment>
  )
}
