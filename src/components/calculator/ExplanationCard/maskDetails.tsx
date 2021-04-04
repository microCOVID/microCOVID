import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const MaskDetails: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <>
      <Link to="/blog/masks">
        {t('calculator.riskreduction.link_to_mask_blog')}
      </Link>
    </>
  )
}

export default MaskDetails
