import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './biedri-modern.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PageBanner from '../components/PageBanner'
import { memberLogos } from '../data/members'

function Biedri() {
  useEffect(() => {
    document.title = 'Biedri | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <div className="members-page lua-page">
      <Helmet>
        <title>Biedri | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas biedru uzņēmumi." />
      </Helmet>
      <SiteHeader />
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
          <a href="/ktparbiedru">Rakstiet mums <span>→</span></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Biedri
