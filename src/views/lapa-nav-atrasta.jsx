import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import SiteLayout from '../components/SiteLayout'

import './lapa-nav-atrasta.css'

const LapaNavAtrasta = () => {
  useEffect(() => {
    document.title = '404 | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="lapa-nav-atrasta">
      <Helmet>
        <title>404 | Latvijas Ugunsdrošības asociācija</title>
      </Helmet>
      <h3>UPS! LAPA NETIKA ATRASTA</h3>
      <div className="lapa-nav-atrasta__attels">
        <img src="/Images/404.svg" alt="404 Lapa nav atrasta" />
      </div>
      <div className="lapa-nav-atrasta__teksts">
        <h2>
          PIEDODIET, BET PIEPRASĪTĀ LAPA NETIKA ATRASTA
        </h2>
      </div>
    </SiteLayout>
  )
}

export default LapaNavAtrasta
