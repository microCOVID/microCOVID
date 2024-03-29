import i18n from 'i18n'
import countries from 'i18n-iso-countries'
import React, { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { ManualPrevalenceDetails } from './prevalence/ManualPrevalenceDetails'
import { CalculatorData } from 'data/calculate'
import { Locations } from 'data/location'
import 'components/calculator/styles/PrevalenceControls.scss'
import { dataForLocation } from 'data/locationHelpers'

interface Option {
  label: string
  value: string
}

const isFilled = (val: string): boolean => {
  return val !== null && val !== undefined && val !== ''
}

const isTopLocation = (val: string): boolean => {
  return isFilled(val) && !!Locations[val]
}

export const PrevalenceControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => {
  const { t } = useTranslation()
  for (const iso_code of Object.keys(i18n.services.resourceStore.data)) {
    countries.registerLocale(
      require('i18n-iso-countries/langs/' + iso_code + '.json'), // eslint-disable-line @typescript-eslint/no-var-requires
    )
  }
  const locationGroups: { [key: string]: Array<string> } = {}
  for (const key in Locations) {
    const location = Locations[key]
    if (location.topLevelGroup !== null) {
      let members = locationGroups[location.topLevelGroup]
      if (members === undefined) {
        members = []
        locationGroups[location.topLevelGroup] = members
      }
      members.push(key)
    }
  }

  const setLocationData = (
    topLocation: string,
    subLocation: string,
    subSubLocation: string,
  ) => {
    setter({
      ...data,
      ...dataForLocation(subSubLocation || subLocation || topLocation),
      topLocation,
      subLocation,
      subSubLocation,
    })
  }

  // If a stored location exists, load latest data for that location.
  useEffect(() => {
    if (
      !data.useManualEntry &&
      (isFilled(data.subSubLocation || '') ||
        isFilled(data.subLocation) ||
        isTopLocation(data.topLocation))
    ) {
      setLocationData(
        data.topLocation,
        data.subLocation,
        data.subSubLocation || '',
      )
    }
    // Intentionally not depending on data so that this runs once on mount.
    // eslint-disable-next-line
  }, [])

  const topLocationOptions = Object.keys(locationGroups).flatMap(
    (groupName) => {
      return locationGroups[groupName].map((locKey) => {
        const country_label =
          Locations[locKey].iso3 &&
          countries.getName(Locations[locKey].iso3!, i18n.language, {
            select: 'official',
          })
            ? countries.getName(Locations[locKey].iso3!, i18n.language, {
                select: 'official',
              })
            : Locations[locKey].label
        if (Locations[locKey].iso3! === 'GEO') {
          // Georgia the country
          return {
            label:
              country_label +
              ' (' +
              t('calculator.select_location_label_clarifications.country') +
              ')',
            value: locKey,
          }
        } else if (locKey === 'US_13') {
          // Georgia the US state
          return {
            label:
              country_label +
              ' (' +
              t('calculator.select_location_label_clarifications.US_state') +
              ')',
            value: locKey,
          }
        }
        return { label: country_label, value: locKey }
      })
    },
  )

  const locationOptionCompareFn = (
    a: { label: string; value: string },
    b: { label: string; value: string },
  ) => a.label.localeCompare(b.label)

  // reorder the list according to the current locale, but keep
  // English as-is to make sure US states remain at the top
  if (i18n.language !== 'en-US') {
    topLocationOptions.sort(locationOptionCompareFn)
  }

  return (
    <React.Fragment>
      <header id="location">
        <Trans>calculator.characterize_community_infection_header</Trans>
      </header>
      <ManualPrevalenceDetails
        id="prevalence-details"
        data={data}
        setter={setter}
      />
    </React.Fragment>
  )
}
