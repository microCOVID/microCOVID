import React, { useState } from 'react'
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsPlusSquareFill } from 'react-icons/bs'

import ControlLabel from '../controls/ControlLabel'

import { recordCalculatorOptionSelected } from 'components/Analytics'
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

  return (
    <div className="vaccine-selector">
      <Form.Group controlId={typeId}>
        <div className="mobile-vertical">
          <ControlLabel id={typeId} header={props.header} label={props.label} />
          <ToggleButtonGroup
            type="radio"
            name={typeId}
            id={typeId}
            className={'segmented-wrap ' + props.variant}
            value={props.current.vaccineType}
          >
            {Object.keys(Vaccines).map((value: string, index) => (
              <ToggleButton
                key={index}
                type="radio"
                variant={props.variant}
                name={typeId}
                value={value}
                className="segmented-button"
                checked={props.current.vaccineType === value}
                onChange={(e) => {
                  recordCalculatorOptionSelected(typeId, e.currentTarget.value)
                  props.setter({
                    ...props.current,
                    vaccineType: e.currentTarget.value,
                  })
                }}
              >
                <span className="segmented-wrap segmented-label">
                  {Vaccines[value].label}
                </span>
              </ToggleButton>
            ))}
            <ToggleButton
              type="radio"
              value=""
              variant={props.variant}
              name="typeId"
              className="segmented-button"
              checked={false}
              onChange={() => {
                setExpanded(false)
                recordCalculatorOptionSelected(typeId, '')
                props.setter({
                  ...props.current,
                  vaccineType: '',
                })
              }}
            >
              <span className="segmented-wrap segmented-label">
                {t('calculator.precautions.no_vaccine')}
              </span>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Form.Group>

      {props.current.vaccineType === '' ? null : (
        <Form.Group controlId={dosesId}>
          <ControlLabel
            id={dosesId}
            header={props.dosesHeader}
            label={props.dosesLabel}
          />
          <ToggleButtonGroup
            name={dosesId}
            id={dosesId}
            className={'segmented-wrap ' + props.variant}
            value={props.current.vaccineDoses}
          >
            {Vaccines[props.current.vaccineType].multiplierPerDose.map(
              (value: number, index) => (
                <ToggleButton
                  key={index}
                  type="radio"
                  variant={props.variant}
                  name={dosesId}
                  value={index}
                  className="semented-button"
                  checked={props.current.vaccineDoses === index}
                  onChange={() => {
                    recordCalculatorOptionSelected(dosesId, index.toString())
                    props.setter({
                      ...props.current,
                      vaccineDoses: index,
                    })
                  }}
                >
                  <span className="segmented-label">{index}</span>
                  <span className="segmented-multiplier">{value}x</span>
                </ToggleButton>
              ),
            )}
          </ToggleButtonGroup>
          <Form.Text muted>
            {t('calculator.precautions.doses_7_days_ago')}
          </Form.Text>
        </Form.Group>
      )}
    </div>
  )
}
