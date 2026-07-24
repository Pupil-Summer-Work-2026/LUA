import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import SiteLayout from '../components/SiteLayout'
import { useLanguage } from '../i18n/LanguageContext'

import './lapa-nav-atrasta.css'

// Attēlo 404 kļūdas lapu, ja lietotājs atver neesošu vietnes adresi.
const LapaNavAtrasta = () => {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = `404 | ${t('home.title')}`
  }, [t])

  return (
    <SiteLayout className="lapa-nav-atrasta">
      <Helmet>
        <title>404 | {t('home.title')}</title>
      </Helmet>
      <h3>{t('notFound.heading')}</h3>
      <div className="lapa-nav-atrasta__attels">
        <img src="/Images/404.svg" alt={t('notFound.alt')} />
      </div>
      <div className="lapa-nav-atrasta__teksts">
        <h2>{t('notFound.message')}</h2>
      </div>
    </SiteLayout>
  )
}

export default LapaNavAtrasta
