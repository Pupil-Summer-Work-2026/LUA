import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './registry-page.css'
import './registry-page-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const RegistryPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Pieteikums biedrībai | Latvijas Ugunsdrošības asociācija'
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setIsSubmitted(true)
  }

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
          <form className="registry-page__form" onSubmit={handleSubmit} onChange={() => setIsSubmitted(false)}>
            <label htmlFor="name">Vārds, Uzvārds</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">E-pasts</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="company">Uzņēmums</label>
            <input type="text" id="company" name="company" required />
            <button type="submit">Iesniegt pieteikumu</button>
            {isSubmitted && <p className="registry-page__form-status" role="status">Paldies! Jūsu pieteikums ir nosūtīts.</p>}
          </form>
        </section>
      </main>
    </SiteLayout>
  )
}

export default RegistryPage