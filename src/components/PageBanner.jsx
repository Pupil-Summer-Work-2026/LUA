import React from 'react'

import './site.css'

function PageBanner({ title }) {
  return (
    <section className="page-banner">
      <h1>{title}</h1>
      <span aria-hidden="true" />
    </section>
  )
}

export default PageBanner