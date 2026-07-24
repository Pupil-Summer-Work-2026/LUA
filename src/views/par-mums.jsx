import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { X } from 'lucide-react'

import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import CountUpNumber from '../components/CountUpNumber'
import { useLanguage } from '../i18n/LanguageContext'
import { getMembers } from '../services/blogApi'

import './par-mums.css'

const sectorLabels = ['/Lables/fire%20extinguisher.svg', '/Lables/fire%20axes.svg', '/Lables/fire%20helmet.svg', '/Lables/fire%20shield.svg', '/Lables/fire.svg', '/Lables/warning%20sign.svg', '/Lables/high%20voltage%20label.svg', '/Lables/alarm%20bell.svg', '/Lables/sprinkler.svg', '/Lables/water%20droplet.svg', '/Lables/alarm%20light.svg', '/Lables/red%20cross.svg']

// Aprēķina asociācijas pilnos darbības gadus līdz šodienai.
function getAssociationYears() {
  const startDate = new Date(2002, 3, 4)
  const today = new Date()
  const hasAnniversaryPassed = today.getMonth() > startDate.getMonth() || (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate())

  return today.getFullYear() - startDate.getFullYear() - (hasAnniversaryPassed ? 0 : 1)
}

// Izvēlas kartītes teksta izmēra klasi atbilstoši biedra nosaukuma garumam.
function getMemberNameSizeClass(name) {
  if (name.length > 42) return 'about-page__service-member-card--name-extra-long'
  if (name.length > 28) return 'about-page__service-member-card--name-long'
  return ''
}

// Sadala ļoti garus vārdus, lai tie nepārsniegtu biedra kartītes platumu.
function hyphenateLongWords(name) {
  return name.replace(/\p{L}{21,}/gu, (word) => {
    const letters = Array.from(word)
    const parts = []

    for (let index = 0; index < letters.length; index += 20) {
      parts.push(letters.slice(index, index + 20).join(''))
    }

    return parts.join('-\u200B')
  })
}

// Attēlo asociācijas aprakstu, pakalpojumus un ar pakalpojumiem saistītos biedrus.
function ParMums() {
  const associationYears = getAssociationYears()
  const [members, setMembers] = useState([])
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)
  const [membersLoadFailed, setMembersLoadFailed] = useState(false)
  const [activeServiceIndex, setActiveServiceIndex] = useState(null)
  const { t } = useLanguage()
  const serviceTitles = t('about.sectors')
  const activeService = activeServiceIndex === null ? null : {
    number: String(activeServiceIndex + 1).padStart(2, '0'),
    title: serviceTitles[activeServiceIndex],
  }
  const activeServiceMembers = activeService
    ? members.filter((member) => member.tags.some((tag) => tag.name === activeService.number))
    : []

  useEffect(() => {
    document.title = t('about.pageTitle')
  }, [t])

  useEffect(() => {
    let isActive = true

    getMembers()
      .then((data) => {
        if (isActive) setMembers(data)
      })
      .catch(() => {
        if (isActive) setMembersLoadFailed(true)
      })
      .finally(() => {
        if (isActive) setIsLoadingMembers(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (activeServiceIndex === null) return undefined

    // Aizver aktīvo pakalpojuma dialogu, kad lietotājs nospiež Escape taustiņu.
    function closeOnEscape(event) {
      if (event.key === 'Escape') setActiveServiceIndex(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activeServiceIndex])

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
            <img src={t('about.biznesaGadi')} alt="" />
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
            {serviceTitles.map((title, index) => (
              <button type="button" key={title} onClick={() => setActiveServiceIndex(index)} style={{ '--sector-label': `url("${sectorLabels[index]}")` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
              </button>
            ))}
          </div>
        </section>
        {activeService && (
          <div className="about-page__service-dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setActiveServiceIndex(null)}>
            <section className="about-page__service-dialog" role="dialog" aria-modal="true" aria-labelledby="service-dialog-heading">
              <header>
                <div>
                  <span>{activeService.number}</span>
                  <h2 id="service-dialog-heading">{activeService.title}</h2>
                </div>
                <button className="about-page__service-dialog-close" type="button" onClick={() => setActiveServiceIndex(null)} aria-label={t('serviceDialog.close')}>
                  <X size={20} aria-hidden="true" />
                </button>
              </header>
              {isLoadingMembers && <p className="about-page__service-dialog-status" role="status">{t('serviceDialog.loading')}</p>}
              {!isLoadingMembers && membersLoadFailed && <p className="about-page__service-dialog-status" role="alert">{t('serviceDialog.error')}</p>}
              {!isLoadingMembers && !membersLoadFailed && activeServiceMembers.length === 0 && <p className="about-page__service-dialog-status">{t('serviceDialog.empty')}</p>}
              {!isLoadingMembers && !membersLoadFailed && activeServiceMembers.length > 0 && (
                <ul>
                  {activeServiceMembers.map((member) => {
                    const displayedName = hyphenateLongWords(member.name)
                    const card = (
                      <article className={`about-page__service-member-card ${getMemberNameSizeClass(member.name)}`} tabIndex={member.url ? undefined : 0}>
                        {member.logo ? <img src={member.logo} alt={`${member.name} ${t('members.logoSuffix')}`} /> : <span className="about-page__service-member-placeholder">{displayedName}</span>}
                        <div className="about-page__service-member-details">
                          <h3>{displayedName}</h3>
                          {member.url && <span>{t('members.visit')} →</span>}
                        </div>
                      </article>
                    )

                    return (
                      <li key={member.id}>
                        {member.url ? <a href={member.url} target="_blank" rel="noreferrer">{card}</a> : card}
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </div>
        )}
      </main>
    </SiteLayout>
  )
}

export default ParMums
