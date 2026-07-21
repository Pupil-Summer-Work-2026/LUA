import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './registrs.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import TurnstileWidget from '../components/TurnstileWidget'
import { useLanguage } from '../i18n/LanguageContext'
import { submitForm } from '../services/blogApi'
import { getFormErrorMessage } from '../services/formErrorMessage'

const Registrs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('registrs.pageTitle')
  }, [t])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitError('')

    if (!turnstileToken || isSubmitting) return

    setIsSubmitting(true)

    try {
      const data = await submitForm('/registrs/', formData)

      if (data.success !== true) throw new Error(data.message || 'Registry form submission failed.')

      console.info('Registrs form submitted successfully', { correlationId: data.correlationId })

      setIsSubmitted(true)
      form.reset()
      setTurnstileToken('')
      setTurnstileResetKey((key) => key + 1)
    } catch (error) {
      console.error('Registrs form submission failed', error)
      setSubmitError(getFormErrorMessage(error, t))
      setIsSubmitted(false)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <SiteLayout className="registry-page">
      <Helmet>
        <title>{t('registrs.pageTitle')}</title>
        <meta name="description" content={t('registrs.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('registrs.title')} />
        <section className="registry-page__content lua-container">
          <div>
            <h1 dangerouslySetInnerHTML={{ __html: t('registrs.heading') }} />
            <p>{t('registrs.intro')}</p>
          </div>
          <form className="registry-page__form" onSubmit={handleSubmit} onChange={() => setIsSubmitted(false)}>
            <label htmlFor="name">{t('registrs.name')}</label>
            <input type="text" id="name" name="fullName" required />
            <label htmlFor="email">{t('registrs.email')}</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="company">{t('registrs.company')}</label>
            <input type="text" id="company" name="companyName" required />
            <TurnstileWidget onTokenChange={setTurnstileToken} resetKey={turnstileResetKey} />
            <button type="submit" disabled={!turnstileToken || isSubmitting} aria-busy={isSubmitting}>{t('registrs.send')}</button>
            {isSubmitted && <p className="registry-page__form-status" role="status">{t('registrs.sent')}</p>}
            {submitError && <p className="registry-page__form-error" role="alert">{submitError}</p>}
          </form>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Registrs