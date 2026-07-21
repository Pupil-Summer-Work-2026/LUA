import React from 'react'

import './loading-screen.css'
import { useLanguage } from '../i18n/LanguageContext'

function LoadingScreen() {
  const { t } = useLanguage()

  return (
    <div className="loading-screen" role="status" aria-label={t('loading.page')}>
      <object className="loading-screen__art" data="/LUA big shield landscape SVG.svg" type="image/svg+xml" aria-hidden="true" tabIndex="-1">
        <img src="/LUA big shield landscape SVG.svg" alt="" />
      </object>
    </div>
  )
}

export default LoadingScreen