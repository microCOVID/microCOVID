import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsPlusSquareFill } from 'react-icons/bs'

import { SegmentedControlNoDescriptions } from '../controls/SegmentedControl'

import { Vaccines } from 'data/data'

import './VaccineSelector.scss'

export interface VaccineStatus {
  vaccineType: string
  vaccineDoses: number
}

export const VaccineSelector: React.FunctionComponent<{
  id: string
  label: string
  header: string
  dosesLabel: string
  dosesHeader?: string
  current: VaccineStatus
  variant: string
  setter: (newStatus: VaccineStatus) => void
}> = (props) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<boolean>(
    props.current.vaccineType !== '',
  )

  if (!expanded) {
    return (
      <Form.Group controlId={props.id} className="vaccine-selector">
        <Button variant="link" size="lg" onClick={() => setExpanded(true)}>
          <BsPlusSquareFill />
          <span className="pl-2">
            {t('calculator.precautions.i_have_been_vaccinated')}
          </span>
        </Button>
      </Form.Group>
    )
  }

  const typeId = props.id + 'Type'
  const dosesId = props.id + 'Doses'

  const vaccineDoseList = props.current.vaccineType
    ? Vaccines[props.current.vaccineType].multiplierPerDose
    : []
  const vaccineDoseMap = Object.fromEntries(Object.entries(vaccineDoseList))
  return (
    <div className="vaccine-selector">
      <SegmentedControlNoDescriptions
        id={typeId}
        header={props.header}
        label={props.label}
        variant="outline-cyan"
        hideRisk={true}
        verticalOnMobile={true}
        setter={(value: string) => {
          if (value === '') {
            setExpanded(false)
          }
          props.setter({
            ...props.current,
            vaccineType: value,
          })
        }}
        source={{
          ...Vaccines,
          '': {
            label: t('calculator.precautions.no_vaccine'),
            multiplierPerDose: [],
          },
        }}
        value={props.current.vaccineType}
        multiplierFromSource={() => 0}
        labelFromSource={(value) => value.label}
      />
      {props.current.vaccineType === '' ? null : (
        <SegmentedControlNoDescriptions
          id={dosesId}
          header={props.dosesHeader}
          label={props.dosesLabel}
          variant="outline-cyan"
          showDecimals={true}
          setter={(value: string) => {
            props.setter({
              ...props.current,
              vaccineDoses: Number(value),
            })
          }}
          source={vaccineDoseMap}
          value={props.current.vaccineDoses.toString()}
          multiplierFromSource={(value) => value}
          labelFromSource={(value, key) => key}
        >
          <Form.Text muted>
            {t('calculator.precautions.doses_7_days_ago')}
          </Form.Text>
        </SegmentedControlNoDescriptions>
      )}
    </div>
  )
}
