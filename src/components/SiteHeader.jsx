import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './site.css'
import { headerNavigation } from '../data/navigation'

function SiteHeader() {
  const history = useHistory()
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <button className="site-header__logo" type="button" aria-label="Uz sākumlapu" onClick={() => navigateTo('/')}>
        <img src="/image21612-9tc7-200h.png" alt="Latvijas Ugunsdrošības asociācija" />
      </button>
      <button
        className="site-header__menu-button"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Aizvērt izvēlni' : 'Atvērt izvēlni'}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        Izvēlne
      </button>
      <nav id="site-navigation" className={`site-header__nav${isMenuOpen ? ' site-header__nav--open' : ''}`} aria-label="Galvenā navigācija">
        {headerNavigation.map(({ label, path }) => (
          <button key={path} className={pathname === path ? 'is-active' : ''} type="button" aria-current={pathname === path ? 'page' : undefined} onClick={() => navigateTo(path)}>{label}</button>
        ))}
        <button className={`site-header__cta${pathname === '/ktparbiedru' ? ' is-active' : ''}`} type="button" aria-current={pathname === '/ktparbiedru' ? 'page' : undefined} onClick={() => navigateTo('/ktparbiedru')}>Kļūt par biedru</button>
      </nav>
    </header>
  )
}

export default SiteHeader