import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './privatuma-politika.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import FormPrivacyNotice from '../components/FormPrivacyNotice'
import TurnstileWidget from '../components/TurnstileWidget'
import { useLanguage } from '../i18n/LanguageContext'
import { submitForm } from '../services/blogApi'
import { getFormErrorMessage } from '../services/formErrorMessage'
import { useFormCooldown } from '../hooks/useFormCooldown'

function PrivacySection({ section }) {
  return (
    <section className="legal-page__section">
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
    </section>
  )
}

function PrivatumaPolitika() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const { t } = useLanguage()
  const privacy = t('privacy')
  const { isOnCooldown, remainingSeconds, startCooldown } = useFormCooldown()

  useEffect(() => {
    document.title = privacy.pageTitle
  }, [privacy.pageTitle])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitError('')

    if (!turnstileToken || isSubmitting) return

    setIsSubmitting(true)

    try {
      const data = await submitForm('/kontakti/', formData)
      const backendSuccess = data.success === true

      if (!backendSuccess) throw new Error(data.message || 'Privacy contact form submission failed.')

      console.info('Privacy contact form submitted', { correlationId: data.correlationId })
      setIsSubmitted(true)
      form.reset()
      setTurnstileToken('')
      setTurnstileResetKey((key) => key + 1)
    } catch (error) {
      console.error('Privacy contact form submission failed', error)
      if (error.status === 429) startCooldown(error.retryAfter)
      setSubmitError(getFormErrorMessage(error, t))
      setIsSubmitted(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SiteLayout className="legal-page">
      <Helmet>
        <title>{privacy.pageTitle}</title>
        <meta name="description" content={privacy.meta} />
      </Helmet>
      <main>
        <PageBanner title={privacy.title} />
        <div className="legal-page__content lua-container">
          <p className="legal-page__intro">{privacy.intro}</p>
          <p className="legal-page__summary">{privacy.summary}</p>
          {privacy.sections.map((section) => <PrivacySection key={section.title} section={section} />)}
          <section className="legal-page__section">
            <h2>{privacy.contact.title}</h2>
            <p>{privacy.contact.body}</p>
            <form className="legal-page__form" onSubmit={handleSubmit} onChange={() => setIsSubmitted(false)}>
              <label htmlFor="privacy-contact-email">{t('contacts.email')}</label>
              <input id="privacy-contact-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder={t('contacts.emailPlaceholder')} required />
              <label htmlFor="privacy-contact-message">{t('contacts.message')}</label>
              <textarea id="privacy-contact-message" name="message" maxLength={5000} placeholder={t('contacts.messagePlaceholder')} rows="5" required />
              <TurnstileWidget onTokenChange={setTurnstileToken} resetKey={turnstileResetKey} />
              <button type="submit" disabled={!turnstileToken || isSubmitting || isOnCooldown} aria-busy={isSubmitting}>{t('contacts.send')}</button>
              {isSubmitted && <p className="legal-page__form-status" role="status">{t('contacts.sent')}</p>}
              {submitError && <p className="legal-page__form-error" role="alert">{submitError}</p>}
              {isOnCooldown && <p className="legal-page__form-error">{t('formErrors.retryAfterCountdown', { seconds: remainingSeconds })}</p>}
              <FormPrivacyNotice purpose="contact" />
            </form>
          </section>
          <p className="legal-page__updated">{privacy.updated}</p>
        </div>
      </main>
    </SiteLayout>
  )
}

export default PrivatumaPolitika