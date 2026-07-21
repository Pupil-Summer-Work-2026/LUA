import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './kontakti.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import TurnstileWidget from '../components/TurnstileWidget'
import { useLanguage } from '../i18n/LanguageContext'
import { submitForm } from '../services/blogApi'

const resourceLinks = ['vugd.gov.lv', 'latvija.lv', 'likumi.lv', 'ur.gov.lv', 'lursoft.lv', 'abc.lv', 'serteks.lv', 'building.lv']

function Kontakti() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('contacts.pageTitle')
  }, [t])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitError('')

    if (!turnstileToken) return

    try {
      const data = await submitForm('/kontakti/', formData)
      const backendSuccess = data.success === true

      if (!backendSuccess) throw new Error(data.message || 'Contact form submission failed.')

      console.info('Contact form submitted', { correlationId: data.correlationId })
      setIsSubmitted(true)
      form.reset()
      setTurnstileToken('')
      setTurnstileResetKey((key) => key + 1)
    } catch (error) {
      console.error('Contact form submission failed', error)
      setSubmitError(t('contacts.error'))
      setIsSubmitted(false)
    }
  }

  return (
    <SiteLayout className="contacts-page">
      <Helmet>
        <title>{t('contacts.pageTitle')}</title>
        <meta name="description" content={t('contacts.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('contacts.title')} />
        <section className="contacts-page__intro lua-container">
          <div role="img" aria-label={t('contacts.map')}>
            <iframe className="contacts-page__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2174.099137750068!2d24.176381977149536!3d56.98136249670095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecef714d168ab%3A0x908079702e091212!2sVijciema%20iela%201A%2C%20Vidzemes%20priek%C5%A1pils%C4%93ta%2C%20R%C4%ABga%2C%20LV-1006!5e0!3m2!1slv!2slv!4v1784028263043!5m2!1slv!2slv" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div className="contacts-page__details">
            <h1>{t('contacts.association')}</h1>
            <div className="contacts-page__details-grid">
                <div className="contacts-page__billing">
                <p>{t('contacts.details')}</p>
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
            <form className="contacts-page__form"
              onSubmit={handleSubmit}
              onChange={() => setIsSubmitted(false)} >
              <h2>{t('contacts.contact')}</h2>
              <label htmlFor="contact-name">{t('contacts.name')}</label>
              <input id="contact-name" name="name" autoComplete="name" placeholder={t('contacts.namePlaceholder')} required onChange={() => setIsSubmitted(false)} />
              <label htmlFor="contact-email">{t('contacts.email')}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={t('contacts.emailPlaceholder')} required onChange={() => setIsSubmitted(false)} />
              <label htmlFor="contact-message">{t('contacts.message')}</label>
              <textarea id="contact-message" name="message" placeholder={t('contacts.messagePlaceholder')} rows="4" required onChange={() => setIsSubmitted(false)} />
              <TurnstileWidget onTokenChange={setTurnstileToken} resetKey={turnstileResetKey} />
              <button type="submit" disabled={!turnstileToken}>{t('contacts.send')}</button>
              {isSubmitted && <p className="contacts-page__form-status" role="status">{t('contacts.sent')}</p>}
              {submitError && <p className="contacts-page__form-status" role="alert">{submitError}</p>}
            </form>
            <div className="contacts-page__resources">
              <h2>{t('contacts.resourcesHeading')}</h2>
              <div className="contacts-page__resource-list">
                {resourceLinks.map((link, index) => (
                  <div className="contacts-page__resource-category" key={link}>
                    {t('contacts.resources')[index] && <strong>{t('contacts.resources')[index]}</strong>}
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
