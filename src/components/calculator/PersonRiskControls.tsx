import React from 'react'
import { Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import { SelectControl } from './SelectControl'
import { CalculatorData } from 'data/calculate'
import { Distance, RiskProfile, intimateDurationFloor } from 'data/data'

const personRiskPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About "Person Risk"</Popover.Title>
    <Popover.Content>
      <p>
        An "average risk person in your area" is based on the prevalence of
        COVID in your geographic area, as explained in the{' '}
        <a href="/paper/7-basic-method" target="_blank">
          Basic Method
        </a>{' '}
        from the white paper.
      </p>
      <p>
        We have modeled several additional Person Risk examples using the{' '}
        <a href="/paper/9-advanced-method" target="_blank">
          Advanced Method
        </a>{' '}
        from the white paper. Select the one that most closely matches the
        person or people you are planning to interact with. We suggest you
        "round up" if you are uncertain.
      </p>
    </Popover.Content>
  </Popover>
)

export const PersonRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <h3 className="h2 accent">
        <span>
          <Trans>calculator.nearby_people_label</Trans>
        </span>
      </h3>
      {data.interaction === 'partner' ? null : (
        <div className="form-group">
          <label htmlFor="personCount">
            <div>
              <strong>
                <Trans>calculator.people_count</Trans>:
              </strong>{' '}
              {repeatedEvent ? (
                <Trans>calculator.number_of_people_near_you_partner</Trans>
              ) : (
                <Trans>calculator.number_of_people_near_you_onetime</Trans>
              )}
            </div>
          </label>
          <input
            className="form-control form-control-lg col-md-3"
            type="number"
            value={data.personCount}
            onChange={(e) =>
              setter({
                ...data,
                personCount: Math.max(0, parseInt(e.target.value)),
              })
            }
          />
          <GroupSizeWarning people={data.personCount} />
        </div>
      )}

      {!repeatedEvent ? (
        <React.Fragment>
          <SelectControl
            id="distance"
            label={t('calculator.distance_question')}
            header={t('calculator.distance_header')}
            data={data}
            setter={setter}
            source={Distance}
          />
          <div className="form-group">
            <label htmlFor="duration">
              <strong>
                <Trans>calculator.duration_header</Trans>:
              </strong>
              <Trans>calculator.duration_question</Trans>
            </label>
            <input
              className="form-control form-control-lg col-md-3"
              type="number"
              value={data.duration}
              onChange={(e) =>
                setter({
                  ...data,
                  duration: Math.max(0, parseInt(e.target.value)),
                })
              }
            />
          </div>
          {data.distance === 'intimate' &&
          data.duration < intimateDurationFloor ? (
            <div className="warning">
              <Trans>calculator.intimate_risk_warning</Trans>
            </div>
          ) : null}
        </React.Fragment>
      ) : null}
      <SelectControl
        id="riskProfile"
        label={t('calculator.person_risk_profile_question')}
        header={t('calculator.person_risk_profile_header')}
        helpText={!repeatedEvent ? '' : t('calculator.household_members_note')}
        popover={personRiskPopover}
        data={data}
        setter={setter}
        source={RiskProfile}
        hideRisk={true}
      />
      <br />
    </React.Fragment>
  )
}

function GroupSizeWarning(props: { people: number }): React.ReactElement {
  if (props.people >= 100) {
    return (
      <div className="warning">
        <Trans>calculator.verylarge_warning</Trans>
      </div>
    )
  }
  if (props.people >= 25) {
    return (
      <div className="warning">
        <Trans>calculator.large_warning</Trans>
      </div>
    )
  }
  return <div />
}
