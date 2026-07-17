import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './registrs.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const Registrs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Reģistrs | Latvijas Ugunsdrošības asociācija'
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setIsSubmitted(true)
  }

  return (
    <SiteLayout className="registry-page">
      <Helmet>
        <title>Reģistrs | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Reģistrs Latvijas Ugunsdrošības asociācijas biedriem." />
      </Helmet>
      <main>
        <PageBanner title="Reģistrs" />
        <section className="registry-page__content lua-container">
          <div>
            <h1>REĢISTRĒJIET<br /><em>SAVU UZŅĒMUMU</em></h1>
            <p>Aizpildiet reģistra forumu, lai atbilstu jaunajām valsts prasībām.</p>
          </div>
          <form className="registry-page__form" onSubmit={handleSubmit} onChange={() => setIsSubmitted(false)}>
            <label htmlFor="name">Vārds, Uzvārds</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">E-pasts</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="company">Uzņēmums</label>
            <input type="text" id="company" name="company" required />
            <button type="submit">Iesniegt informāciju reģistrā</button>
            {isSubmitted && <p className="registry-page__form-status" role="status">Paldies! Jūsu iesniegtā informācija ir nosūtīta.</p>}
          </form>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Registrs