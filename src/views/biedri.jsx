import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './biedri-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { memberLogos } from '../data/members'

function Biedri() {
  useEffect(() => {
    document.title = 'Biedri | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="members-page">
      <Helmet>
        <title>Biedri | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas biedru uzņēmumi." />
      </Helmet>
      <main>
        <PageBanner title="Biedri" />
        <section className="members-page__content lua-container">
          <h1>BIEDRU UZŅĒMUMI</h1>
          <div className="members-page__grid">
            {memberLogos.map((logo, index) => (
              <article key={`${logo}-${index}`} className="members-page__logo">
                <img src={logo} alt={`LUA biedra uzņēmuma logo ${index + 1}`} />
              </article>
            ))}
          </div>
        </section>
        <section className="members-page__join">
          <div>
            <h2>KĻŪSTIET PAR LUA BIEDRU</h2>
            <p>Pievienojies vairāk nekā 120 uzņēmumiem, kas veido drošāku Latviju.</p>
          </div>
          <Link to="/ktparbiedru">Rakstiet mums <span>→</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Biedri
