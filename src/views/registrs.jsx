import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './registrs.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { useLanguage } from '../i18n/LanguageContext'

const Registrs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('registrs.pageTitle')
  }, [t])

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setIsSubmitted(true)
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
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">{t('registrs.email')}</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="company">{t('registrs.company')}</label>
            <input type="text" id="company" name="company" required />
            <button type="submit">{t('registrs.send')}</button>
            {isSubmitted && <p className="registry-page__form-status" role="status">{t('registrs.sent')}</p>}
          </form>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Registrs