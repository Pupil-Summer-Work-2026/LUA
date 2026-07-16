import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import SiteLayout from '../components/SiteLayout'

import './not-found.css'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="not-found-container1">
      <Helmet>
        <title>404 | Latvijas Ugunsdrošības asociācija</title>
      </Helmet>
      <h3>UPS! LAPA NETIKA ATRASTA</h3>
      <div className="not-found-container2">
        <img src="/Images/404.svg" alt="404 Lapa nav atrasta" className="not-found-image" />
      </div>
      <div className="not-found-container3">
        <h2 className="not-found-text3">
          PIEDODIET, BET PIEPRASĪTĀ LAPA NETIKA ATRASTA
        </h2>
      </div>
    </SiteLayout>
  )
}

export default NotFound
