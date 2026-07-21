import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './klut-par-biedru.css'
import CountUpNumber from '../components/CountUpNumber'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import TurnstileWidget from '../components/TurnstileWidget'
import { useLanguage } from '../i18n/LanguageContext'
import { submitForm } from '../services/blogApi'
import { getFormErrorMessage } from '../services/formErrorMessage'
import { useFormCooldown } from '../hooks/useFormCooldown'

function getAssociationYears() {
  const startDate = new Date(2002, 3, 4)
  const today = new Date()
  const hasAnniversaryPassed = today.getMonth() > startDate.getMonth() || (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate())

  return today.getFullYear() - startDate.getFullYear() - (hasAnniversaryPassed ? 0 : 1)
}

function KlutParBiedru() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [hasAcceptedDuties, setHasAcceptedDuties] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const associationYears = getAssociationYears()
  const { t } = useLanguage()
  const { isOnCooldown, remainingSeconds, startCooldown } = useFormCooldown()

  useEffect(() => {
    document.title = t('join.pageTitle')
  }, [t])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitError('')

    if (!turnstileToken || isSubmitting) return

    setIsSubmitting(true)

    try {
      const data = await submitForm('/ktparbiedru/', formData)

      if (data.success !== true) {
        throw new Error(data.message || 'Membership form submission failed.')
      }

      console.info('Membership form submitted', { correlationId: data.correlationId })
      setIsSubmitted(true)
      setSubmitError('')
      setHasAcceptedDuties(false)
      form.reset()
      setTurnstileToken('')
      setTurnstileResetKey((key) => key + 1)
    } catch (error) {
      console.error('Membership form submission failed', error)
      if (error.status === 429) startCooldown(error.retryAfter)
      setSubmitError(getFormErrorMessage(error, t))
      setIsSubmitted(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SiteLayout className="join-page">
      <Helmet>
        <title>{t('join.pageTitle')}</title>
        <meta name="description" content={t('join.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('join.title')} />
        <section className="join-page__intro">
          <div className="join-page__copy">
            <h1>{t('join.heading')}</h1>
            <p>{t('join.intro')}</p>
            <p>{t('join.eligibility')}</p>
          </div>
          <div className="join-page__years" aria-label={t('join.years', { years: associationYears })}>
            <img src="/Images/biznesa gadi.svg" alt="" />
            <CountUpNumber value={associationYears} aria-hidden="true" />
          </div>
        </section>
        <section className="join-page__application" aria-labelledby="application-heading">
          <div className="join-page__application-heading">
            <h2 id="application-heading">{t('join.application')}</h2>
          </div>
          <form
            className="join-page__form"
            onSubmit={handleSubmit}
            onChange={() => setIsSubmitted(false)}
          >
            <label>
              {t('join.company')}
              <input name="companyName" type="text" autoComplete="organization" required />
            </label>
            <label>
              {t('join.position')}
              <input name="position" type="text" autoComplete="organization-title" required />
            </label>
            <label>
              {t('join.name')}
              <input name="fullName" type="text" autoComplete="name" required />
            </label>
            <label>
              {t('join.email')}
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              {t('join.phone')}
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
            <label className="join-page__form-description">
              {t('join.description')}
              <textarea name="companyDescription" rows="5" required />
            </label>
            <div className="join-page__form-action">
              <div className="join-page__commitment">
                <h3>{t('join.dutiesHeading')}</h3>
                <ul>
                  {t('join.duties').map((duty) => <li key={duty}>{duty}</li>)}
                </ul>
                <label>
                  <input
                    name="dutiesAccepted"
                    type="checkbox"
                    checked={hasAcceptedDuties}
                    onChange={(event) => setHasAcceptedDuties(event.target.checked)}
                    required
                  />
                  <span>{t('join.dutiesAccepted')}</span>
                </label>
              </div>
              <TurnstileWidget onTokenChange={setTurnstileToken} resetKey={turnstileResetKey} />
              <button type="submit" disabled={!hasAcceptedDuties || !turnstileToken || isSubmitting || isOnCooldown} aria-busy={isSubmitting}>{t('join.send')}</button>
              {isSubmitted && <p role="status">{t('join.sent')}</p>}
              {submitError && <p className="join-page__form-error" role="alert">{submitError}</p>}
              {isOnCooldown && <p className="join-page__form-error">{t('formErrors.retryAfterCountdown', { seconds: remainingSeconds })}</p>}
            </div>
          </form>
        </section>
        <section className="join-page__notice">
          <strong>i</strong>
          <p>{t('join.notice')}</p>
        </section>
      </main>
    </SiteLayout>
  )
}

export default KlutParBiedru