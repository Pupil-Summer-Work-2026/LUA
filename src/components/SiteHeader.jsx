import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './site.css'
import { headerNavigation } from '../data/navigation'

function SiteHeader() {
  const history = useHistory()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigateTo = (path) => {
    setIsMenuOpen(false)
    history.push(path)
  }

  return (
    <header className="site-header">
      <button className="site-header__logo" aria-label="Uz sākumlapu" onClick={() => navigateTo('/')}>
        <img src="/image21612-9tc7-200h.png" alt="Latvijas Ugunsdrošības asociācija" />
      </button>
      <button
        className="site-header__menu-button"
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        Izvēlne
      </button>
      <nav id="site-navigation" className={`site-header__nav${isMenuOpen ? ' site-header__nav--open' : ''}`} aria-label="Galvenā navigācija">
        {headerNavigation.map(({ label, path }) => (
          <button key={path} onClick={() => navigateTo(path)}>{label}</button>
        ))}
        <button className="site-header__cta" onClick={() => navigateTo('/ktparbiedru')}>Kļūt par biedru</button>
      </nav>
    </header>
  )
}

export default SiteHeader