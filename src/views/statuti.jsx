import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './statuti.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { useLanguage } from '../i18n/LanguageContext'
import statutes from './statuti-content'

function stripClauseNumber(text) {
  return text.replace(/^\d+(?:\.\d+){1,2}\.\s*/, '')
}

function getItemClauseNumber(sectionNumber, paragraphCount, itemIndex) {
  if (sectionNumber === 4) return itemIndex === 5 ? '4.7' : `4.6.${itemIndex + 1}`

  if (sectionNumber === 5) {
    return ['5.1.1', '5.1.2', '5.1.3', '5.2', '5.2.1', '5.2.2', '5.2.3', '5.3'][itemIndex]
  }

  if (sectionNumber === 10) return itemIndex > 3 ? `10.${itemIndex}` : `10.3.${itemIndex + 1}`

  return `${sectionNumber}.${paragraphCount}.${itemIndex + 1}`
}

function StatutesSection({ section, sectionNumber }) {
  return (
    <section className="statutes-page__section">
      <h2><span>{sectionNumber}.</span> {section.title}</h2>
      {section.paragraphs?.map((paragraph, paragraphIndex) => (
        <p className="statutes-page__clause" key={paragraph}>
          <span className="statutes-page__clause-number">{sectionNumber}.{paragraphIndex + 1}.</span>
          <span>{stripClauseNumber(paragraph)}</span>
        </p>
      ))}
      {section.items && (
        <ol className="statutes-page__subclauses">
          {section.items.map((item, itemIndex) => (
            <li key={item}>
              <span className="statutes-page__clause-number">{getItemClauseNumber(sectionNumber, section.paragraphs?.length || 0, itemIndex)}.</span>
              <span>{stripClauseNumber(item)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

function Statuti() {
  const { language } = useLanguage()
  const content = statutes[language] || statutes.lv

  useEffect(() => {
    document.title = content.pageTitle
  }, [content.pageTitle])

  return (
    <SiteLayout className="statutes-page">
      <Helmet>
        <title>{content.pageTitle}</title>
        <meta name="description" content={content.meta} />
      </Helmet>
      <main>
        <PageBanner title={content.title} />
        <article className="statutes-page__content lua-container">
          <header className="statutes-page__document-heading">
            <p>{content.documentType}</p>
            <h2>{content.association}</h2>
            <p>{content.registrationNumber}</p>
            <p>{content.documentName}</p>
          </header>
          {content.sections.map((section, index) => <StatutesSection key={section.title} section={section} sectionNumber={index + 1} />)}
          <footer className="statutes-page__approval">
            {content.approval.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </footer>
        </article>
      </main>
    </SiteLayout>
  )
}

export default Statuti