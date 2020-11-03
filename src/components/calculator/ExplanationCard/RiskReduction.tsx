import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import MaskDetails from './maskDetails'

export const RiskReduction: React.FunctionComponent<{
  repeatedEvent: boolean
}> = ({ repeatedEvent }) => {
  const [showMaskDetails, setShowMaskDetails] = useState(false)

  return (
    <div className="mt-2" id="additional-precautions">
      {repeatedEvent ? (
        <HousematesAdvice
          showMaskDetails={showMaskDetails}
          setShowMaskDetails={setShowMaskDetails}
        />
      ) : (
        <OnetimeAdvice
          showMaskDetails={showMaskDetails}
          setShowMaskDetails={setShowMaskDetails}
        />
      )}
    </div>
  )
}

export const HousematesAdvice: React.FunctionComponent<{
  showMaskDetails: boolean
  setShowMaskDetails: (val: boolean) => void
}> = (props) => {
  const { t } = useTranslation()
  return (
    <>
      <h4>{t('calculator.riskreduction.housemates_header')}:</h4>
      <ol className="mt-2">
        <Trans i18nKey="calculator.riskreduction.housemates_tips">
          Lorem ipsum
          <MaskDetails
            showMaskDetails={props.showMaskDetails}
            setShowMaskDetails={props.setShowMaskDetails}
          />
        </Trans>
      </ol>
    </>
  )
}

export const OnetimeAdvice: React.FunctionComponent<{
  showMaskDetails: boolean
  setShowMaskDetails: (val: boolean) => void
}> = (props) => {
  const { t } = useTranslation()
  return (
    <>
      <h4>{t('calculator.riskreduction.onetime_header')}:</h4>
      <em>{t('calculator.riskreduction.onetime_warning')}</em>
      <ol className="mt-2">
        <Trans i18nKey="calculator.riskreduction.onetime_tips">
          Lorem ipsum
          <MaskDetails
            showMaskDetails={props.showMaskDetails}
            setShowMaskDetails={props.setShowMaskDetails}
          />
        </Trans>
      </ol>
    </>
  )
}

export default RiskReduction
