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
          <img src="/LUA big shield landscape SVG.svg" alt="Latvijas Ugunsdrošības asociācija" />
          <p>Latvijas Ugunsdrošības asociācija - par vienotu ugunsdrošības pārstāvniecību jau kopš 2002. gada.</p>
        </div>
        <NavigationColumn items={primaryNavigation} />
        <address className="site-footer__column">
          <h2>Rekvizīti:</h2>
          <span>Latvijas Ugunsdrošības asociācija BIEDRĪBA</span>
          <span>Vijciema iela 1A, Rīga, LV-1006</span>
          <span>REĢ. NR: 40008066462</span>
          <span>BANKA: AS Swedbank</span>
          <span>SWIFT BIC:HABALV22</span>
          <span>KONTS: LV24HABA0551044104806</span>
        </address>
      </div>
      <div className="site-footer__copyright">© 2026 Latvijas Ugunsdrošības asociācija. Visas tiesības aizsargātas.</div>
    </footer>
  )
}

export default SiteFooter