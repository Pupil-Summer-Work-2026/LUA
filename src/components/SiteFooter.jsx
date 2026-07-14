import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './site.css'
import { footerNavigationColumns } from '../data/navigation'

const [primaryNavigation] = footerNavigationColumns

function NavigationColumn({ items }) {
  const history = useHistory()
  const { pathname } = useLocation()

  const navigateTo = (path) => {
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    history.push(path)
  }

  return (
    <div className="site-footer__column">
      <h2>Navigācija</h2>
      {items.map(({ label, path }) => <button key={path} type="button" aria-current={pathname === path ? 'page' : undefined} onClick={() => navigateTo(path)}>{label}</button>)}
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <img src="/lualogofullwhite111571-bjn-200h.png" alt="Latvijas Ugunsdrošības asociācija" />
          <p>Latvijas Ugunsdrošības asociācija - profesionāls atbalsts, izglītība un pārstāvniecība kopš 1994. gada.</p>
        </div>
        <NavigationColumn items={primaryNavigation} />
        <address className="site-footer__column">
          <h2>Kontakti</h2>
          <span>Rīga, Latvija</span>
          <a href="mailto:info@lua.lv">info@lua.lv</a>
          <a href="tel:+37100000000">+371 00 000 000</a>
        </address>
      </div>
      <div className="site-footer__copyright">© 2026 Latvijas Ugunsdrošības asociācija. Visas tiesības aizsargātas.</div>
    </footer>
  )
}

export default SiteFooter