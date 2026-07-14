import React from 'react'
import { useHistory } from 'react-router-dom'

import './site.css'
import { headerNavigation } from '../data/navigation'

function SiteHeader() {
  const history = useHistory()

  return (
    <header className="site-header">
      <button className="site-header__logo" aria-label="Uz sākumlapu" onClick={() => history.push('/')}>
        <img src="/image21612-9tc7-200h.png" alt="Latvijas Ugunsdrošības asociācija" />
      </button>
      <nav className="site-header__nav" aria-label="Galvenā navigācija">
        {headerNavigation.map(({ label, path }) => (
          <button key={path} onClick={() => history.push(path)}>{label}</button>
        ))}
        <button className="site-header__cta" onClick={() => history.push('/ktparbiedru')}>Kļūt par biedru</button>
      </nav>
    </header>
  )
}

export default SiteHeader