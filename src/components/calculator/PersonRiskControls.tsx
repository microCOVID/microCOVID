import React from 'react'
import { Form, Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

import ControlLabel from './ControlLabel'
import { SelectControl } from './SelectControl'
import { CalculatorData } from 'data/calculate'
import { Distance, RiskProfile, intimateDurationFloor } from 'data/data'

const personCountPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About "Number of People"</Popover.Title>
    <Popover.Content>
      <p>
        You only need to include the number of people within 15 feet. For a
        dense crowd, you can use the following maximums:
        <ul>
          <li>
            <strong>1 ft spacing</strong> (mosh pit): 700
          </li>
          <li>
            <strong>3 ft spacing</strong> (crowded party/bar): 80
          </li>
          <li>
            <strong>6 ft spacing</strong> (properly distanced dining, outdoor
            gatherings): 20
          </li>
        </ul>
      </p>
      <p>
        If some people are circulating, you don't need to inflate this number to
        account for that. For example, if you are at a backyard party where you
        are usually talking to 5 people, but the specific people change as you
        mingle, that is still just 5 nearby people on average.
      </p>
    </Popover.Content>
  </Popover>
)

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
          <ControlLabel
            id="personCount"
            label={
              repeatedEvent
                ? t('calculator.number_of_people_near_you_partner')
                : t('calculator.number_of_people_near_you_onetime')
            }
            header={t('calculator.people_count')}
            popover={personCountPopover}
          />
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
          <Form.Text id={'personCount HelpText'} muted>
            Within 15 feet
          </Form.Text>
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
            setter={(value: CalculatorData) => {
              const yourMask =
                value.distance === 'intimate' ? 'none' : value.yourMask
              const theirMask =
                value.distance === 'intimate' ? 'none' : value.theirMask
              setter({ ...value, yourMask, theirMask })
            }}
            source={Distance}
          />
          <div className="form-group">
            <label htmlFor="duration">
              <strong>
                <Trans>calculator.duration_header</Trans>:
              </strong>{' '}
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
  if (props.people >= 25) {
    return (
      <div className="warning">
        <Trans>calculator.large_group_warning</Trans>
      </div>
    )
  }
  return <div />
}
