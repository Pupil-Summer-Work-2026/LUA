import React from 'react'
import { Link } from 'react-router-dom'

import './form-privacy-notice.css'
import { useLanguage } from '../i18n/LanguageContext'

function FormPrivacyNotice({ purpose, className = '' }) {
  const { t } = useLanguage()

  return (
    <p className={`form-privacy-notice ${className}`.trim()}>
      {t(`formPrivacy.${purpose}`)}{' '}
      <Link to="/privatuma-politika">{t('formPrivacy.link')}</Link>
    </p>
  )
}

export default FormPrivacyNotice