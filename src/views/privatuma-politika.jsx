import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './legal-pages.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { privacyContactEmail } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

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
  const { t } = useLanguage()
  const privacy = t('privacy')

  useEffect(() => {
    document.title = privacy.pageTitle
  }, [privacy.pageTitle])

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
            <p><a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a></p>
          </section>
          <p className="legal-page__updated">{privacy.updated}</p>
        </div>
      </main>
    </SiteLayout>
  )
}

export default PrivatumaPolitika