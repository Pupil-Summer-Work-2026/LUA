import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './klut-par-biedru.css'
import CountUpNumber from '../components/CountUpNumber'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { useLanguage } from '../i18n/LanguageContext'

function getAssociationYears() {
  const startDate = new Date(2002, 3, 4)
  const today = new Date()
  const hasAnniversaryPassed = today.getMonth() > startDate.getMonth() || (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate())

  return today.getFullYear() - startDate.getFullYear() - (hasAnniversaryPassed ? 0 : 1)
}

function KlutParBiedru() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const associationYears = getAssociationYears()
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('join.pageTitle')
  }, [t])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitError('')

    try {
      const response = await fetch('/api/ktparbiedru/', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json().catch(() => null)

      const backendSuccess = response.ok && (data === null || data.success !== false)

      if (!backendSuccess) {
        const errorMessage = data?.message || `Request failed with status ${response.status}`
        throw new Error(errorMessage)
      }

      setIsSubmitted(true)
      setSubmitError('')
      form.reset()
    } catch (error) {
      console.error('Membership form submission failed', error)
      setSubmitError(t('join.error'))
      setIsSubmitted(false)
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
              <button type="submit">{t('join.send')}</button>
              {isSubmitted && <p role="status">{t('join.sent')}</p>}
              {submitError && <p role="alert">{submitError}</p>}
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