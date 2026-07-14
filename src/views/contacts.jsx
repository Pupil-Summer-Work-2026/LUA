import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './contacts-modern.css'
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

function ContactRow({ icon, children }) {
  return (
    <div className="contacts-page__contact-row">
      <img src={icon} alt="" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function Contacts() {
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
            <span className="lua-eyebrow">PAR ASOCIĀCIJU</span>
            <h1>LOREM IPSUM</h1>
            <div className="contacts-page__details-grid">
              <div>
                <ContactRow icon="/mappin9374-dsdj.svg">Lorem ipsum dolor sit amet</ContactRow>
                <ContactRow icon="/mail9374-dmin.svg">Lorem ipsum dolor sit amet</ContactRow>
                <ContactRow icon="/phone9374-151r.svg">Lorem ipsum dolor sit amet</ContactRow>
              </div>
              <div className="contacts-page__billing">
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contacts-page__help">
          <div className="contacts-page__help-inner lua-container">
            <form className="contacts-page__form" onSubmit={handleSubmit}>
              <span className="lua-eyebrow">MŪSU DARBS</span>
              <h2>LOREM <em>IPSUM</em></h2>
              <label htmlFor="contact-name">Vārds</label>
              <input id="contact-name" name="name" autoComplete="name" placeholder="Lorem ipsum dolor sit amet" required onChange={() => setIsSubmitted(false)} />
              <label htmlFor="contact-email">E-pasts</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Lorem ipsum dolor sit amet" required onChange={() => setIsSubmitted(false)} />
              <label htmlFor="contact-message">Ziņa</label>
              <textarea id="contact-message" name="message" placeholder="Lorem ipsum dolor sit amet" rows="4" required onChange={() => setIsSubmitted(false)} />
              <button type="submit">Sūtīt</button>
              {isSubmitted && <p className="contacts-page__form-status" role="status">Paldies! Jūsu ziņa ir nosūtīta.</p>}
            </form>
            <div className="contacts-page__resources">
              <span className="lua-eyebrow">MŪSU DARBS</span>
              <h2>LOREM <em>IPSUM</em></h2>
              <div className="contacts-page__resource-list">
                {resources.map(([label, link]) => (
                  <p key={link}>{label && <strong>{label} - </strong>}<a href={`https://${link}`} target="_blank" rel="noreferrer">{link}</a></p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Contacts
