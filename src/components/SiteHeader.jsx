import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './site.css'
import { headerNavigation } from '../data/navigation'
import { useLanguage } from '../i18n/LanguageContext'

function SiteHeader() {
  const history = useHistory()
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navigateTo = (path) => {
    setIsMenuOpen(false)
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    history.push(path)
  }

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', closeMenu)
    return () => window.removeEventListener('keydown', closeMenu)
  }, [])

  return (
    <header className="site-header">
      <button className="site-header__logo" type="button" aria-label={t('header.home')} onClick={() => navigateTo('/')}>
        <img src="/LUA big shield landscape static.svg" alt="Latvijas Ugunsdrošības asociācija" />
      </button>
      <button
        className="site-header__menu-button"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav id="site-navigation" className={`site-header__nav${isMenuOpen ? ' site-header__nav--open' : ''}`} aria-label={t('header.navigation')}>
        {headerNavigation.map(({ labelKey, path }) => (
          <button key={path} className={pathname === path ? 'is-active' : ''} type="button" aria-current={pathname === path ? 'page' : undefined} onClick={() => navigateTo(path)}>{t(labelKey)}</button>
        ))}
        <button className={`site-header__cta${pathname === '/klut-par-biedru' ? ' is-active' : ''}`} type="button" aria-current={pathname === '/klut-par-biedru' ? 'page' : undefined} onClick={() => navigateTo('/klut-par-biedru')}>{t('navigation.join')}</button>
        <label className="site-header__language">
          <span className="site-header__language-label">{t('header.language')}</span>
          <select value={language} aria-label={t('header.language')} onChange={(event) => setLanguage(event.target.value)}>
            <option value="lv">LV</option>
            <option value="en">EN</option>
          </select>
        </label>
      </nav>
    </header>
  )
}

export default SiteHeader