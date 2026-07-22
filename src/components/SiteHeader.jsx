import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './site.css'
import { headerNavigation } from '../data/navigation'
import { useLanguage } from '../i18n/LanguageContext'

function LatviaFlag() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
      <path fill="#9e3039" d="M0 0h30v20H0z" />
      <path fill="#fff" d="M0 8h30v4H0z" />
    </svg>
  )
}

function UnitedKingdomFlag() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
      <path fill="#012169" d="M0 0h30v20H0z" />
      <path fill="#fff" d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
      <path fill="none" d="M0 0l30 20M30 0L0 20" stroke="#c8102e" strokeWidth="2" />
      <path fill="#fff" d="M12 0h6v20h-6zM0 7h30v6H0z" />
      <path fill="#c8102e" d="M13 0h4v20h-4zM0 8h30v4H0z" />
    </svg>
  )
}

const languageOptions = {
  lv: { code: 'LV', name: 'Latviešu', Flag: LatviaFlag },
  en: { code: 'EN', name: 'English', Flag: UnitedKingdomFlag },
}

function SiteHeader() {
  const history = useHistory()
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)
  const { language, setLanguage, t } = useLanguage()
  const selectedLanguage = languageOptions[language] || languageOptions.lv

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
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsLanguageMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeMenu)
    return () => window.removeEventListener('keydown', closeMenu)
  }, [])

  useEffect(() => {
    const closeLanguageMenu = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) setIsLanguageMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeLanguageMenu)
    return () => document.removeEventListener('pointerdown', closeLanguageMenu)
  }, [])

  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    setIsLanguageMenuOpen(false)
  }

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
        <div className="site-header__language" ref={languageMenuRef}>
          <button className="site-header__language-trigger" type="button" aria-haspopup="menu" aria-expanded={isLanguageMenuOpen} aria-label={t('header.language')} onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}>
            <selectedLanguage.Flag />
            <span>{selectedLanguage.code}</span>
          </button>
          {isLanguageMenuOpen && (
            <div className="site-header__language-menu" role="menu" aria-label={t('header.language')}>
              {Object.entries(languageOptions).map(([value, { code, name, Flag }]) => (
                <button key={value} type="button" role="menuitemradio" aria-checked={language === value} aria-label={`${name} (${code})`} onClick={() => selectLanguage(value)}>
                  <Flag />
                  <span>{code}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader