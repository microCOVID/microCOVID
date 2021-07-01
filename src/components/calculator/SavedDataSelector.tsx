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

import { ControlLabel } from 'components/calculator/controls/ControlLabel'
import { InteractionTypeDisplay } from 'components/calculator/selectors/InteractionTypeSelector'
import { CalculatorData } from 'data/calculate'
import { prepopulated } from 'data/prepopulated'

interface PresetScenario {
  scenarioName: string
}

// Link that activates a preset.
const SavedDataLink: React.FunctionComponent<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}> = (props): React.ReactElement => {
  return (
    <Button
      className="p-0 m-0 border-0 align-baseline scenario-shortcut"
      onClick={props.onClick}
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
    switch (interaction) {
      case 'oneTime':
        return <BsFillPersonFill {...iconProps} />
      case 'workplace':
        return <BsBriefcaseFill {...iconProps} />
      case 'repeated':
        return <BsFillHouseDoorFill {...iconProps} />
      case 'partner':
        // The heart is naturally positioned a little too high. Move it down
        // slightly.
        return (
          <BsHeartFill
            {...iconProps}
            style={{ position: 'relative', top: '2px' }}
          />
        )
      default:
        return <BsQuestion {...iconProps} />
    }
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
  scenarioName: string
  onStartOver: (event: React.MouseEvent<HTMLButtonElement>) => void
  setInteractionType: (newInteraction: string) => void
  interactionType: string
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const heading =
    props.scenarioName !== ''
      ? t('scenario.' + props.scenarioName)
      : t('scenario.custom')

  const isPresetScenario =
    props.scenarioName !== undefined &&
    props.scenarioName !== '' &&
    props.scenarioName !== 'custom'
  const editInteractionType =
    props.interactionType === undefined || props.interactionType === ''
  const showResetButton = !editInteractionType && !isPresetScenario

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
              setInteractionType={props.setInteractionType}
              showResetButton={showResetButton}
            />
          </Media.Body>
        </Media>
        {!editInteractionType && (
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
  setSavedData: (newScenario: string) => void
  label?: string
  showingResults: boolean
  interactionType: string
  setInteractionType: (newInteraction: string) => void
}> = (props): React.ReactElement => {
  const { t } = useTranslation()
  const prepopulatedOptions = Object.keys(prepopulated).map(
    (preset): PresetScenario => {
      return { scenarioName: preset }
    },
  )
  const [inputText, setInputText] = useState('')
  const [autoFocus, setAutoFocus] = useState(false)
  const scenarioName = props.currentData.scenarioName || ''
  const editScenario = scenarioName === ''

  const showMatchesAndCustomScenario = (
    option: PresetScenario,
    props: { text: string; selected: PresetScenario[] },
  ): boolean => {
    const propsText = props.text || ''

    // User is considering switching scenarios. Show all options.
    if (props.selected.length > 0) {
      return true
    }
    if (option.scenarioName === 'custom') {
      return true
    }

    // Remove diacritics, ignore case
    const normalizeString = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    return (
      normalizeString(option.scenarioName).indexOf(
        normalizeString(propsText),
      ) !== -1
    )
  }

  const savedDataRef = React.createRef<Typeahead<PresetScenario>>()
  if (!editScenario) {
    return (
      <>
        <SavedScenarioCard
          currentData={props.currentData}
          variant="secondary"
          scenarioName={scenarioName}
          showingResults={props.showingResults}
          interactionType={props.interactionType}
          setInteractionType={props.setInteractionType}
          onStartOver={() => {
            props.setSavedData('')
            setAutoFocus(true)
          }}
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
              onClick={() => {
                props.setSavedData('custom')
              }}
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
          labelKey={(option: PresetScenario): string => {
            return t('scenario.' + option.scenarioName)
          }}
          onBlur={() => {
            if (savedDataRef.current) {
              savedDataRef.current.hideMenu()
            }
          }}
          onChange={(e: PresetScenario[]) => {
            if (e.length === 0) {
              props.setSavedData('')
            } else {
              props.setSavedData(e[e.length - 1].scenarioName)
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
        />
      </InputGroup>
      {inputText.length > 0 && (
        <SavedScenarioContinue
          variant="muted"
          scenarioName={scenarioName}
          onClick={() => {
            props.setSavedData('custom')
            setInputText('')
          }}
        />
      )}
    </Form.Group>
  )
}
