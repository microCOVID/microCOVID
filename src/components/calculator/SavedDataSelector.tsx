import i18n from 'i18n'
import React, { useState } from 'react'
import { Alert, Button, Form, InputGroup, Media } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useTranslation } from 'react-i18next'
import { Trans } from 'react-i18next'
import { BsArrowCounterclockwise, BsSearch } from 'react-icons/bs'
import {
  BsBriefcaseFill,
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsHeartFill,
  BsQuestion,
} from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { recordCalculatorOptionSelected } from 'components/Analytics'
import { ControlLabel } from 'components/calculator/controls/ControlLabel'
import { InteractionTypeDisplay } from 'components/calculator/selectors/InteractionTypeSelector'
import { CalculatorData } from 'data/calculate'
import { PartialData, prepopulated } from 'data/prepopulated'

const SavedDataLink: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
  scenarioName: string
  scenarioNameSetter: (newScenario: string) => void
  setEditInteractionType: (newEdit: boolean) => void
  setEditScenario: (newShow: boolean) => void
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const setSavedData = (key: string): void => {
    let foundData: PartialData | CalculatorData | null = null
    foundData = prepopulated[key]

    if (foundData) {
      props.setter({
        ...props.currentData,
        ...foundData,
      })
    }
    props.scenarioNameSetter(key)
    props.setEditInteractionType(key === '' || key === t('scenario.custom'))
    if (key !== undefined && key !== '') {
      recordCalculatorOptionSelected('scenario', key)
    }
  }

  return (
    <Button
      className="p-0 m-0 border-0 align-baseline scenario-shortcut"
      onClick={() => {
        setSavedData(props.scenarioName)
        props.scenarioNameSetter(props.scenarioName)
        props.setEditScenario(false)
      }}
      size="lg"
      variant="link"
    >
      {props.children}
    </Button>
  )
}

// show [Build your own scenario] if no preset found
const SavedScenarioContinue: React.FunctionComponent<{
  variant: string
  scenarioName: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <div className="mt-2">
      {t('calculator.no_prebuilt_scenario_found', {
        scenarioName: props.scenarioName,
      })}
      <Button
        className="mt-1 d-block"
        variant="primary"
        onClick={props.onClick}
      >
        {t('calculator.saved_scenario_continue_custom')}
      </Button>
    </div>
  )
}

const InteractionTypeIcon: React.FunctionComponent<{
  interaction: string
}> = (props): React.ReactElement => {
  const iconFromInteractionType = (interaction: string) => {
    const iconProps = { size: 24 }
    if (props.interaction === 'oneTime') {
      return <BsFillPersonFill {...iconProps} />
    } else if (interaction === 'workplace') {
      return <BsBriefcaseFill {...iconProps} />
    } else if (interaction === 'repeated') {
      return <BsFillHouseDoorFill {...iconProps} />
    } else if (interaction === 'partner') {
      // The heart is naturally positioned a little too high. Move it down
      // slightly.
      return (
        <BsHeartFill
          {...iconProps}
          style={{ position: 'relative', top: '2px' }}
        />
      )
    }
    return <BsQuestion {...iconProps} />
  }
  return (
    <div className="rounded-circle p-2 mr-2 bg-primary text-white">
      {iconFromInteractionType(props.interaction)}
    </div>
  )
}

const SavedScenarioCard: React.FunctionComponent<{
  currentData: CalculatorData
  variant: string
  showingResults: boolean
  setEditScenario: (show: boolean) => void
  scenarioName: string
  scenarioNameSetter: (newScenario: string) => void
  onStartOver: (event: React.MouseEvent<HTMLButtonElement>) => void
  startOverButton?: JSX.Element
  editInteractionType: boolean
  setEditInteractionType: (newEdit: boolean) => void
  interactionType: string
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const heading =
    props.scenarioName !== '' ? props.scenarioName : t('scenario.custom')

  const isPresetScenario =
    props.scenarioName !== undefined &&
    props.scenarioName !== '' &&
    props.scenarioName !== t('scenario.custom')
  const showResetButton = !props.editInteractionType && !isPresetScenario

  const startOverButton = (
    <Button
      className="m-0 p-0 pl-0 pl-sm-1 float-right float-sm-right border-0 align-baseline"
      onClick={props.onStartOver}
      variant="link"
    >
      <BsArrowCounterclockwise className="align-middle" />
      {t('calculator.select_scenario_start_over')}
    </Button>
  )

  return (
    <>
      <div className="saved-data-text">
        {props.showingResults
          ? t('calculator.scenario_show_results')
          : t('calculator.scenario_guide_through')}
      </div>
      <Alert variant={props.variant} className="bg-white">
        <Media>
          <InteractionTypeIcon interaction={props.interactionType} />
          <Media.Body>
            <Alert.Heading className="scenario-name mb-0">
              {startOverButton}
              {heading}
            </Alert.Heading>
            <InteractionTypeDisplay
              currentData={props.currentData}
              interactionType={props.interactionType}
              editInteractionType={props.editInteractionType}
              setEditInteractionType={props.setEditInteractionType}
              showResetButton={showResetButton}
            />
          </Media.Body>
        </Media>
        {!props.editInteractionType && (
          <>
            <hr />
            <div className="text-secondary">
              <Trans i18nKey="calculator.saved_scenario_loaded_message">
                Lorem ipsum dolor <strong>sit amet</strong>
                (backed by{' '}
                <Link
                  to="/paper/14-research-sources"
                  target="_blank"
                  className="stealthy-link"
                >
                  research
                </Link>
                !)
              </Trans>
            </div>
          </>
        )}
        {props.children}
      </Alert>
    </>
  )
}

export const SavedDataSelector: React.FunctionComponent<{
  currentData: CalculatorData
  setter: (newData: CalculatorData) => void
  scenarioName: string
  scenarioNameSetter: (newScenario: string) => void
  label?: string
  showingResults: boolean
  editScenario: boolean
  setEditScenario: (newEdit: boolean) => void
  editInteractionType: boolean
  setEditInteractionType: (newEdit: boolean) => void
  interactionType: string
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const prepopulatedOptions = Object.keys(prepopulated)
  const [inputText, setInputText] = useState('')
  const [autoFocus, setAutoFocus] = useState(false)

  let selected: string[] = []
  if (props.scenarioName !== undefined && props.scenarioName !== '') {
    const selectedOption = props.scenarioName
    selected = [selectedOption]
  }

  const setSavedData = (key: string): void => {
    let foundData: PartialData | CalculatorData | null = null
    foundData = prepopulated[key]

    if (foundData) {
      props.setter({
        ...props.currentData,
        ...foundData,
      })
    }
    props.scenarioNameSetter(key)
    props.setEditInteractionType(key === '' || key === t('scenario.custom'))
    if (key !== undefined && key !== '') {
      recordCalculatorOptionSelected('scenario', key)
    }
  }

  const showMatchesAndCustomScenario = (
    option: string,
    props: { text: string; selected: string[] },
  ) => {
    const propsText: string = props.text || ''

    // User is considering switching scenarios. Show all options.
    if (props.selected.length > 0) {
      return true
    }
    if (option === i18n.t('scenario.custom')) {
      return true
    }

    // Remove diacritics, ignore case
    const normalizeString = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    return normalizeString(option).indexOf(normalizeString(propsText)) !== -1
  }

  const savedDataRef = React.createRef<Typeahead<string>>()
  if (!props.editScenario) {
    return (
      <>
        <SavedScenarioCard
          currentData={props.currentData}
          variant="secondary"
          scenarioName={props.scenarioName}
          scenarioNameSetter={setSavedData}
          showingResults={props.showingResults}
          setEditScenario={props.setEditScenario}
          onStartOver={() => {
            setSavedData('')
            props.setEditScenario(true)
            setAutoFocus(true)
          }}
          editInteractionType={props.editInteractionType}
          setEditInteractionType={props.setEditInteractionType}
          interactionType={props.interactionType}
        />
      </>
    )
  }
  return (
    <Form.Group id="predefined-typeahead-group">
      <ControlLabel
        id="predefined-typeahead"
        label={
          <Trans i18nKey="calculator.select_scenario">
            Start with a premade scenario or{' '}
            <SavedDataLink
              currentData={props.currentData}
              setter={props.setter}
              scenarioName={t('scenario.custom')}
              scenarioNameSetter={setSavedData}
              setEditScenario={props.setEditScenario}
              setEditInteractionType={props.setEditInteractionType}
            >
              build your own
            </SavedDataLink>
          </Trans>
        }
      />
      <InputGroup>
        <Button
          as={InputGroup.Prepend}
          variant="muted"
          className="input-group-text"
          onClick={() => {
            savedDataRef.current && savedDataRef.current.focus()
          }}
        >
          <BsSearch className="align-middle" />
        </Button>
        <Typeahead
          autoFocus={autoFocus}
          clearButton={false}
          filterBy={showMatchesAndCustomScenario}
          highlightOnlyResult={true}
          id="predefined-typeahead"
          inputProps={{
            autoComplete: 'chrome-off',
            shouldSelectHint: (shouldSelect: boolean, event) => {
              // If a user starts typing a scenario and an autocomplete
              // hint appears in the input bar for the rest of the
              // scenario name, pressing the tab button selects the
              // autocomplete hint. shouldSelectHint is necessary to have
              // the same behaviour when hitting the enter key instead.
              if (event.keyCode === 13 /* return */) {
                return true
              }
              return shouldSelect
            },
          }}
          onBlur={() => {
            if (savedDataRef.current) {
              savedDataRef.current.hideMenu()
            }
          }}
          onChange={(e: string[]) => {
            if (e.length === 0) {
              setSavedData('')
              props.setEditScenario(true)
            } else {
              setSavedData(e[e.length - 1])
              props.setEditScenario(false)
              if (savedDataRef.current) {
                savedDataRef.current.blur()
              }
            }
          }}
          onFocus={() => {
            // If the user clicks anywhere in the box, highlight all the
            // text so that they can start searching for a new scenario
            // immediately.
            if (savedDataRef.current) {
              savedDataRef.current.getInput().select()
            }
          }}
          onInputChange={(text: string) => {
            setInputText(text)
          }}
          options={prepopulatedOptions}
          ref={savedDataRef}
          selected={selected}
        />
      </InputGroup>
      {selected.length === 0 && inputText.length > 0 && (
        <SavedScenarioContinue
          variant="muted"
          scenarioName={props.scenarioName}
          onClick={() => {
            setSavedData(t('scenario.custom'))
            props.setEditScenario(false)
            setInputText('')
          }}
        />
      )}
    </Form.Group>
  )
}
