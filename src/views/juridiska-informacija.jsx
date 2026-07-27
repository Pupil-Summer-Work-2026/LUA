import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './legal-pages.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { privacyContactEmail } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

function JuridiskaInformacija() {
  const { t } = useLanguage()
  const legal = t('legal')

  useEffect(() => {
    document.title = legal.pageTitle
  }, [legal.pageTitle])

  return (
    <SiteLayout className="legal-page">
      <Helmet>
        <title>{legal.pageTitle}</title>
        <meta name="description" content={legal.meta} />
      </Helmet>
      <main>
        <PageBanner title={legal.title} />
        <div className="legal-page__content lua-container">
          <p className="legal-page__intro">{legal.intro}</p>
          {legal.sections.map((section) => (
            <section className="legal-page__section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <section className="legal-page__section">
            <h2>{legal.privacy.title}</h2>
            <p>{legal.privacy.body}</p>
            <p><Link to="/privatuma-politika">{legal.privacy.link}</Link></p>
            <p><a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a></p>
          </section>
        </div>
      </main>
    </SiteLayout>
  )
}

export default JuridiskaInformacija