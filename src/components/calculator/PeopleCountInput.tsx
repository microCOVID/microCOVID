import React from 'react'
import { Button, InputGroup, Popover } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { BsDash, BsPlus } from 'react-icons/bs'

import ControlLabel from './controls/ControlLabel'
import { CalculatorData } from 'data/calculate'

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

export function PeopleCountInput(props: {
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="form-group">
      <ControlLabel
        id="personCount"
        label={
          props.repeatedEvent
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
            if (isNaN(props.data.personCount)) {
              props.setter({
                ...props.data,
                personCount: 0,
              })
            }
            if (props.data.personCount >= 1) {
              props.setter({
                ...props.data,
                personCount: props.data.personCount - 1,
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
          value={props.data.personCount}
          onChange={(e) =>
            props.setter({
              ...props.data,
              personCount: Math.max(0, parseInt(e.target.value)),
            })
          }
        />
        <Button
          as={InputGroup.Append}
          className="input-group-text"
          onClick={() => {
            if (isNaN(props.data.personCount)) {
              props.setter({
                ...props.data,
                personCount: 0,
              })
            }
            props.setter({
              ...props.data,
              personCount: props.data.personCount + 1,
            })
          }}
        >
          <BsPlus className="align-middle" />
        </Button>
      </InputGroup>
      <GroupSizeWarning people={props.data.personCount} />
    </div>
  )
}
