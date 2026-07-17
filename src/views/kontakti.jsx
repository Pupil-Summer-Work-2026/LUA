import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './kontakti.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const resources = [
  ['Valsts ugunsdzēsības un glābšanas dienests', 'vugd.gov.lv'],
  ['Valsts institūciju mājas lapas', 'latvija.lv'],
  ['Normatīvo aktu krājums internetā', 'likumi.lv'],
  ['LR Uzņēmumu reģistrs', 'ur.gov.lv'],
  ['', 'lursoft.lv'],
  ['', 'abc.lv'],
  ['', 'serteks.lv'],
  ['', 'building.lv'],
]

function Kontakti() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Kontakti | Latvijas Ugunsdrošības asociācija'
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setIsSubmitted(true)
  }

  return (
    <SiteLayout className="contacts-page">
      <Helmet>
        <title>Kontakti | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas kontaktinformācija un nozares resursi." />
      </Helmet>
      <main>
        <PageBanner title="Kontakti" />
        <section className="contacts-page__intro lua-container">
          <div  role="img" aria-label="Latvijas Ugunsdrošības asociācijas atrašanās vietas karte Rīgā">
            <iframe className="contacts-page__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2174.099137750068!2d24.176381977149536!3d56.98136249670095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecef714d168ab%3A0x908079702e091212!2sVijciema%20iela%201A%2C%20Vidzemes%20priek%C5%A1pils%C4%93ta%2C%20R%C4%ABga%2C%20LV-1006!5e0!3m2!1slv!2slv!4v1784028263043!5m2!1slv!2slv" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div className="contacts-page__details">
            <h1>PAR ASOCIĀCIJU</h1>
            <div className="contacts-page__details-grid">
                <div className="contacts-page__billing">
                <p>Rekvizīti:</p>
                <span>Latvijas Ugunsdrošības asociācija BIEDRĪBA</span>
                <span>Vijciema iela 1A, Rīga, LV-1006</span>
                <span>REĢ. NR: 40008066462</span>
                <span>BANKA: AS Swedbank</span>
                <span>SWIFT BIC:HABALV22</span>
                <span>KONTS: LV24HABA0551044104806</span>
              </div>
              
            </div>
          </div>
        </section>
        <section className="contacts-page__help">
          <div className="contacts-page__help-inner lua-container">
            <form className="contacts-page__form" onSubmit={handleSubmit}>
              <h2>SAZINIETIES</h2>
              <label htmlFor="contact-name">Vārds, Uzvārds</label>
              <input id="contact-name" name="name" autoComplete="name" placeholder="Ievadiet savu vārdu un uzvārdu" required onChange={() => setIsSubmitted(false)} />
              <label htmlFor="contact-email">E-pasts</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Ievadiet savu e-pastu" required onChange={() => setIsSubmitted(false)} />
              <label htmlFor="contact-message">Ziņa</label>
              <textarea id="contact-message" name="message" placeholder="Ievadiet savu ziņu" rows="4" required onChange={() => setIsSubmitted(false)} />
              <button type="submit">Sūtīt</button>
              {isSubmitted && <p className="contacts-page__form-status" role="status">Paldies! Jūsu ziņa ir nosūtīta.</p>}
            </form>
            <div className="contacts-page__resources">
              <h2>NODERĪGAS SAITES</h2>
              <div className="contacts-page__resource-list">
                {resources.map(([label, link]) => (
                  <div className="contacts-page__resource-category" key={link}>
                    {label && <strong>{label}</strong>}
                    <ul>
                      <li><a href={`https://${link}`} target="_blank" rel="noreferrer">{link}</a></li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Kontakti
