import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './biedri.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { useLanguage } from '../i18n/LanguageContext'
import { getHonorableMembers, getMembers } from '../services/blogApi'

// Izvēlas kartītes teksta izmēra klasi atbilstoši biedra nosaukuma garumam.
function getMemberNameSizeClass(name) {
  if (name.length > 42) return 'members-page__card--name-extra-long'
  if (name.length > 28) return 'members-page__card--name-long'
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

// Attēlo asociācijas biedrus, goda biedrus un pieteikšanās aicinājumu.
function Biedri() {
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [honoraryMembers, setHonoraryMembers] = useState([])
  const [isHonoraryLoading, setIsHonoraryLoading] = useState(true)
  const [honoraryError, setHonoraryError] = useState(null)

  useEffect(() => {
    let isActive = true
    getMembers()
      .then((data) => {
        if (isActive) {
          setMembers(data)
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })
    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true
    getHonorableMembers()
      .then((data) => {
        if (isActive) {
          setHonoraryMembers(data)
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setHonoraryError(requestError)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsHonoraryLoading(false)
        }
      })
    return () => {
      isActive = false
    }
  }, [])
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('members.pageTitle')
  }, [t])

  return (
    <SiteLayout className="members-page">
      <Helmet>
        <title>{t('members.pageTitle')}</title>
        <meta name="description" content={t('members.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('members.title')} />
        <section className="members-page__content lua-container">
          <h1>{t('members.heading')}</h1>
          <div className="members-page__grid">
            {isLoading && <div className="members-page__status" role="status"><p>{t('members.loading')}</p></div>}
            {!isLoading && error && <div className="members-page__status" role="alert"><p>{t('members.error')}</p></div>}
            {!isLoading && !error && members.length === 0 && <div className="members-page__status" role="status"><p>{t('members.empty')}</p></div>}
            {!isLoading && !error && members.map((member) => {
              const displayedName = hyphenateLongWords(member.name)
              const card = (
                <article className={`members-page__card ${getMemberNameSizeClass(member.name)}`} tabIndex={member.url ? undefined : 0}>
                  {member.logo ? <img src={member.logo} alt={`${member.name} ${t('members.logoSuffix')}`} /> : <span className="members-page__name-placeholder">{displayedName}</span>}
                  <div className="members-page__card-details">
                    <h2>{displayedName}</h2>
                    {member.url && <span>{t('members.visit')} →</span>}
                  </div>
                </article>
              )

              return member.url ? (
                <a className="members-page__card-link" href={member.url} target="_blank" rel="noreferrer" key={member.id}>{card}</a>
              ) : <React.Fragment key={member.id}>{card}</React.Fragment>
            })}
          </div>
          <section className="members-page__honorary" aria-labelledby="honorary-members-heading">
            <h2 id="honorary-members-heading">{t('members.honoraryHeading')}</h2>
            <div className="members-page__honorary-grid">
              {isHonoraryLoading && <div className="members-page__status" role="status"><p>{t('members.honoraryLoading')}</p></div>}
              {!isHonoraryLoading && honoraryError && <div className="members-page__status" role="alert"><p>{t('members.honoraryError')}</p></div>}
              {!isHonoraryLoading && !honoraryError && honoraryMembers.length === 0 && <div className="members-page__status" role="status"><p>{t('members.honoraryEmpty')}</p></div>}
              {!isHonoraryLoading && !honoraryError && honoraryMembers.map((member) => (
                <article className="members-page__honorary-card" key={member.id}>
                  <h3>{member.name}</h3>
                </article>
              ))}
            </div>
          </section>
        </section>
        <section className="members-page__join">
          <div>
            <h2>{t('members.joinHeading')}</h2>
            <p>{t('members.joinText')}</p>
          </div>
          <Link to="/klut-par-biedru">{t('members.apply')} <span>→</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Biedri
