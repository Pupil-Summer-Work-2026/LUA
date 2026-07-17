import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import CountUpNumber from '../components/CountUpNumber'
import { useLanguage } from '../i18n/LanguageContext'

import './par-mums.css'

const sectorLabels = ['/Lables/fire%20extinguisher.svg', '/Lables/fire%20axes.svg', '/Lables/fire%20helmet.svg', '/Lables/fire%20shield.svg', '/Lables/fire.svg', '/Lables/warning%20sign.svg', '/Lables/high%20voltage%20label.svg', '/Lables/alarm%20bell.svg', '/Lables/sprinkler.svg', '/Lables/water%20droplet.svg', '/Lables/alarm%20light.svg', '/Lables/red%20cross.svg']

function getAssociationYears() {
  const startDate = new Date(2002, 3, 4)
  const today = new Date()
  const hasAnniversaryPassed = today.getMonth() > startDate.getMonth() || (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate())

  return today.getFullYear() - startDate.getFullYear() - (hasAnniversaryPassed ? 0 : 1)
}

function ParMums() {
  const associationYears = getAssociationYears()
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('about.pageTitle')
  }, [t])

  return (
    <SiteLayout className="about-page">
      <Helmet>
        <title>{t('about.pageTitle')}</title>
        <meta name="description" content={t('about.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('about.title')} />
        <section className="about-page__feature about-page__feature--intro lua-container">
          <div className="about-page__years" aria-label={t('about.years', { years: associationYears })}>
            <img src="/Images/biznesa gadi.svg" alt="" />
            <CountUpNumber value={associationYears} aria-hidden="true" />
          </div>
          <div>
            <span className="lua-eyebrow">{t('about.associationEyebrow')}</span>
            <h1>{t('about.heading').replace('LUA', '')}<em>LUA</em>?</h1>
            {t('about.intro').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <section className="about-page__mission">
          <div className="about-page__mission-inner lua-container">
            <div>
              <span className="lua-eyebrow">{t('about.activityEyebrow')}</span>
              <h2>{t('about.roleHeading').replace(/ UGUNSDROŠĪBĀ| FIRE SAFETY/, '')} <em>{t('about.roleHeading').match(/UGUNSDROŠĪBĀ|FIRE SAFETY/)}</em></h2>
              <p>{t('about.roleText')}</p>
              <br/>
              <ul>
                {t('about.workGroups').map((workGroup) => <li key={workGroup}>{workGroup}</li>)}
              </ul>
            </div>
            <img src="/Images/lit-match.jpg" alt={t('about.matchAlt')} />
          </div>
        </section>
        <section className="about-page__sectors lua-container">
          <span className="lua-eyebrow">{t('about.offerEyebrow')}</span>
          <h2>{t('about.offerHeading')}</h2>
          <div className="about-page__sector-grid">
            {t('about.sectors').map((title, index) => (
              <article key={title} style={{ '--sector-label': `url("${sectorLabels[index]}")` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

export default ParMums
