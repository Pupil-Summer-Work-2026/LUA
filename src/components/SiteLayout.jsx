import React from 'react'

import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

function SiteLayout({ children, className = '' }) {
  return (
    <div className="lua-page">
      <SiteHeader />
      <div className={className}>{children}</div>
      <SiteFooter />
    </div>
  )
}
export default SiteLayout