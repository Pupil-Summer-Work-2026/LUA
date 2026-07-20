import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './biedri.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { useLanguage } from '../i18n/LanguageContext'
import { getMembers } from '../services/blogApi'

function Biedri() {
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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
              const card = (
                <article className="members-page__card" tabIndex={member.url ? undefined : 0}>
                  {member.logo ? <img src={member.logo} alt={`${member.name} ${t('members.logoSuffix')}`} /> : <span className="members-page__name-placeholder">{member.name}</span>}
                  <div className="members-page__card-details">
                    <h2>{member.name}</h2>
                    {member.url && <span>{t('members.visit')} →</span>}
                  </div>
                </article>
              )

              return member.url ? (
                <a className="members-page__card-link" href={member.url} target="_blank" rel="noreferrer" key={member.id}>{card}</a>
              ) : <React.Fragment key={member.id}>{card}</React.Fragment>
            })}
          </div>
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
