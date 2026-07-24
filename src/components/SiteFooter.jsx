import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'

import './site.css'
import { footerNavigationColumns } from '../data/navigation'
import { useLanguage } from '../i18n/LanguageContext'

const [primaryNavigation] = footerNavigationColumns
const FACEBOOK_URL = 'https://www.facebook.com/p/Latvijas-Ugunsdro%C5%A1%C4%ABbas-asoci%C4%81cija-100057329804981/'

// Attēlo vienu kājenes navigācijas kolonnu ar saitēm un Facebook ikonu.
function NavigationColumn({ items }) {
  const history = useHistory()
  const { pathname } = useLocation()
  const { t } = useLanguage()

  // Pārvieto lietotāju uz izvēlēto lapu vai ritina uz sākumu, ja tā jau ir atvērta.
  const navigateTo = (path) => {
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    history.push(path)
  }

  return (
    <div className="site-footer__column">
      <h2>{t('footer.navigation')}</h2>
      {items.map(({ labelKey, path }) => <button key={path} type="button" aria-current={pathname === path ? 'page' : undefined} onClick={() => navigateTo(path)}>{t(labelKey)}</button>)}
      <a className="site-footer__facebook" href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook">
        <FaFacebookF aria-hidden="true" />
      </a>
    </div>
  )
}

// Attēlo vietnes kājeni ar navigāciju, kontaktinformāciju un autortiesību tekstu.
function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <img src="/LUA big shield landscape static.svg" alt="Latvijas Ugunsdrošības asociācija" />
          <p>{t('footer.description')}</p>
        </div>
        <NavigationColumn items={primaryNavigation} />
        <address className="site-footer__column">
          <h2>{t('footer.details')}</h2>
          <span>Latvijas Ugunsdrošības asociācija BIEDRĪBA</span>
          <span>Vijciema iela 1A, Rīga, LV-1006</span>
          <span>{t('footer.regNr')}</span>
          <span>{t('footer.bank')}</span>
          <span>{t('footer.swift')}</span>
          <span>{t('footer.account')}</span>
        </address>
      </div>
      <div className="site-footer__copyright">{t('footer.copyright')}</div>
    </footer>
  )
}

export default SiteFooter