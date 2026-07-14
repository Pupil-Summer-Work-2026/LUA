import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import './registry-page.css'
import './registry-page-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const RegistryPage = () => {
  useEffect(() => {
    document.title = 'Pieteikums biedrībai | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="registry-page">
      <Helmet>
        <title>Pieteikums biedrībai | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Pieteikums Latvijas Ugunsdrošības asociācijas biedrībai." />
      </Helmet>
      <main>
        <PageBanner title="Kļūt par biedru" />
        <section className="registry-page__content lua-container">
          <div>
            <span className="lua-eyebrow">PIETEIKUMS</span>
            <h1>KĻŪSTIET PAR<br /><em>LUA BIEDRU</em></h1>
            <p>Aizpildiet pieteikumu, lai saņemtu informāciju par pievienošanos Latvijas Ugunsdrošības asociācijai.</p>
          </div>
          <form className="registry-page__form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="name">Vārds, Uzvārds</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">E-pasts</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="company">Uzņēmums</label>
            <input type="text" id="company" name="company" required />
            <button type="submit">Iesniegt pieteikumu</button>
          </form>
        </section>
      </main>
    </SiteLayout>
  )
}

export default RegistryPage