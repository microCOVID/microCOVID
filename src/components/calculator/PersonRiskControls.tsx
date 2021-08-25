import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Popover, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsDash, BsPlus } from 'react-icons/bs'

import ControlLabel from './controls/ControlLabel'
import { SegmentedControl } from './controls/SegmentedControl'
import { SelectControl } from './controls/SelectControl'
import { fixedPointPrecision } from './util/FormatPrecision'
import { CalculatorData, calculatePersonRiskEach } from 'data/calculate'
import {
  Distance,
  RiskProfile,
  TheirVaccine,
  intimateDurationFloor,
} from 'data/data'

import 'components/calculator/styles/PersonRiskControls.scss'

const personCountPopover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">About "Number of People"</Popover.Title>
    <Popover.Content>
      <p>
        You only need to include the number of people within 15 feet (5 meters).
        For a dense crowd, you can use the following maximums:
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

interface DurationInputProps {
  value: number
  onChange: (duration: number) => void
}

const DurationInput: React.FunctionComponent<DurationInputProps> = (
  props: DurationInputProps,
): JSX.Element => {
  const { t } = useTranslation()
  const [hours, setHours] = useState(Math.floor(props.value / 60))
  const [minutes, setMinutes] = useState(props.value % 60)
  const calculateDuration = (hours: number, minutes: number) => {
    const h = Number.isNaN(hours) ? 0 : hours
    const m = Number.isNaN(minutes) ? 0 : minutes
    return h * 60 + m
  }
  return (
    <Row>
      <Form.Group controlId="duration-hours" as={Col} className="col-md-2 mb-0">
        <Form.Label className="field-label mb-0">
          {t('calculator.duration_hours')}
        </Form.Label>
        <Form.Control
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={hours}
          onChange={(e) => {
            const newHours = Math.max(0, parseInt(e.target.value))
            setHours(newHours)
            props.onChange(calculateDuration(newHours, minutes))
          }}
          size="lg"
        />
      </Form.Group>
      <Form.Group
        controlId="duration-minutes"
        as={Col}
        className="col-md-2 mb-0"
      >
        <Form.Label className="field-label mb-0">
          {t('calculator.duration_minutes')}
        </Form.Label>
        <Form.Control
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={minutes}
          onChange={(e) => {
            const newMinutes = Math.max(0, parseInt(e.target.value))
            setMinutes(newMinutes)
            props.onChange(calculateDuration(hours, newMinutes))
          }}
          size="lg"
        />
      </Form.Group>
    </Row>
  )
}

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
          <InputGroup>
            <Button
              as={InputGroup.Prepend}
              className="input-group-text"
              onClick={() => {
                if (isNaN(data.personCount)) {
                  setter({
                    ...data,
                    personCount: 0,
                  })
                }
                if (data.personCount >= 1) {
                  setter({
                    ...data,
                    personCount: data.personCount - 1,
                  })
                }
              }}
            >
              <BsDash className="align-middle" />
            </Button>
            <input
              className="form-control form-control-lg col-md-2"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={data.personCount}
              onChange={(e) =>
                setter({
                  ...data,
                  personCount: Math.max(0, parseInt(e.target.value)),
                })
              }
            />
            <Button
              as={InputGroup.Append}
              className="input-group-text"
              onClick={() => {
                if (isNaN(data.personCount)) {
                  setter({
                    ...data,
                    personCount: 0,
                  })
                }
                setter({
                  ...data,
                  personCount: data.personCount + 1,
                })
              }}
            >
              <BsPlus className="align-middle" />
            </Button>
          </InputGroup>
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
            <DurationInput
              value={data.duration}
              onChange={(duration) =>
                setter({
                  ...data,
                  duration,
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
        labelFactory={(riskProfileKey: string) => {
          const riskProfile = RiskProfile[riskProfileKey]
          const personRisk = calculatePersonRiskEach({
            ...data,
            riskProfile: riskProfileKey,
          })
          return (
            riskProfile.label +
            (personRisk === null
              ? ''
              : ` [${fixedPointPrecision(personRisk)} microCOVIDs]`)
          )
        }}
      />
      {TheirVaccineIfAvailable(data, setter)}
      <br />
    </React.Fragment>
  )
}

function TheirVaccineIfAvailable(
  data: CalculatorData,
  setter: (newData: CalculatorData) => void,
) {
  const { t } = useTranslation()
  if (data.riskProfile === 'average') {
    if (data.unvaccinatedPrevalenceRatio) {
      return (
        <SegmentedControl
          id="theirVaccine"
          header={t('calculator.their_vaccine_header')}
          label={t('calculator.their_vaccine_question')}
          data={data}
          setter={setter}
          source={TheirVaccine}
          className="segmented-scrollable"
          variant="outline-cyan"
          showTooltip={true}
          useHoverDesc={false}
        />
      )
    }
    return (
      <div className="warning">
        <Trans>calculator.no_vaccine_prevalence</Trans>
      </div>
    )
  }
  // Not a supported risk profile.
  return null
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
