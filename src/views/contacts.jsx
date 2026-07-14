import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './contacts-modern.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
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
  useEffect(() => {
    document.title = 'Kontakti | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <div className="contacts-page lua-page">
      <Helmet>
        <title>Kontakti | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas kontaktinformācija un nozares resursi." />
      </Helmet>
      <SiteHeader />
      <main>
        <PageBanner title="Kontakti" />
        <section className="contacts-page__intro lua-container">
          <div className="contacts-page__map" role="img" aria-label="Latvijas Ugunsdrošības asociācijas atrašanās vietas karte Rīgā">
            <span className="contacts-page__map-pin contacts-page__map-pin--one" />
            <span className="contacts-page__map-pin contacts-page__map-pin--two" />
            <span className="contacts-page__map-pin contacts-page__map-pin--three" />
            <span className="contacts-page__map-pin contacts-page__map-pin--four" />
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
            <form className="contacts-page__form" onSubmit={(event) => event.preventDefault()}>
              <span className="lua-eyebrow">MŪSU DARBS</span>
              <h2>LOREM <em>IPSUM</em></h2>
              <label htmlFor="contact-name">Vārds</label>
              <input id="contact-name" name="name" placeholder="Lorem ipsum dolor sit amet" />
              <label htmlFor="contact-email">E-pasts</label>
              <input id="contact-email" name="email" type="email" placeholder="Lorem ipsum dolor sit amet" />
              <label htmlFor="contact-message">Ziņa</label>
              <textarea id="contact-message" name="message" placeholder="Lorem ipsum dolor sit amet" rows="4" />
              <button type="submit">Sūtīt</button>
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
      <SiteFooter />
    </div>
  )
}

export default Contacts
