import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Landmark, Award, Shield } from 'lucide-react'
import { Link, useHistory } from 'react-router-dom'

import './sakumlapa.css'
import CountUpNumber from '../components/CountUpNumber'
import SiteLayout from '../components/SiteLayout'
import { getMembers, getPosts } from '../services/blogApi'
import { useLanguage } from '../i18n/LanguageContext'

const services = [
  Landmark,
  Award,
  Shield,
]

const collaborationPartners = [
  ['/Biedri/DAKIB.png', 'DAKIB', 'https://www.dakib.lv/', true],
  ['/Biedri/iekslietu ministrija.png', 'Iekšlietu ministrija', 'https://www.iem.gov.lv/lv'],
  ['/Biedri/LDDK.svg', 'Latvijas Darba devēju konfederācija', 'https://lddk.lv/'],
  ['/Biedri/vugd.png', 'Valsts ugunsdzēsības un glābšanas dienests', 'https://www.vugd.gov.lv/lv', true],
]

// Saīsina jaunuma tekstu līdz īsam priekšskatījumam sākumlapas kartītē.
function getSummary(content) {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  return normalizedContent.length > 120 ? `${normalizedContent.slice(0, 120)}...` : normalizedContent
}

// Attēlo sākumlapu ar asociācijas informāciju, jaunumiem, biedriem un partneriem.
function Sakumlapa() {
  const history = useHistory()
  const { t } = useLanguage()
  const [posts, setPosts] = useState([])
  const [newsStatus, setNewsStatus] = useState('loading')
  const [members, setMembers] = useState([])
  const heroLines = t('home.heroHeading').split('\n')
  const aboutHeadingLines = t('home.aboutHeading').split('\n')
  const communityHeadingLines = t('home.communityHeading').split('\n')
  const serviceContent = t('home.services')

  useEffect(() => {
    const controller = new AbortController()

    document.title = t('home.title')
    getPosts({ signal: controller.signal })
      .then((nextPosts) => {
        setPosts(nextPosts)
        setNewsStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setNewsStatus('error')
      })

    getMembers({ signal: controller.signal })
      .then(setMembers)
      .catch((error) => {
        if (error.name !== 'AbortError') setMembers([])
      })

    return () => controller.abort()
  }, [t])

  const featuredArticles = posts.slice(0, 5)
  const statistics = [members.length, collaborationPartners.length]

  return (
    <SiteLayout className="lua-home">
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>
      <main>
        <section className="lua-hero">
          <div className="lua-hero__content">
            <h1>
              {heroLines[0]}<br />
              <em>{heroLines[1]}</em><br />
              {heroLines[2]}
            </h1>
            <p>{t('home.heroDescription')}</p>
            <button type="button" onClick={() => history.push('/klut-par-biedru')}>{t('home.apply')}</button>
          </div>
        </section>
        <section className="lua-statistics" aria-label={t('home.statistics')}>
          {statistics.map((value, index) => (
            <div key={value}>
              <CountUpNumber value={value} />
              <span>{t('home.statisticsLabels')[index]}</span>
            </div>
          ))}
        </section>
        <section className="lua-section lua-container lua-intro">
          <div className="lua-intro__copy">
            <span className="lua-eyebrow">{t('home.aboutEyebrow')}</span>
            <h2>
              {aboutHeadingLines[0]}<br />
              <em>{aboutHeadingLines[1]}</em><br />
              {aboutHeadingLines[2]}
            </h2>
            <p>{t('home.aboutText')}</p>
            <button className="lua-text-link" type="button" onClick={() => history.push('/par-mums')}>
              {t('home.learnMore')} <span>→</span>
            </button>
          </div>
          <div className="lua-intro__visual">
            <span className="lua-intro__backdrop" aria-hidden="true" />
            <img className="lua-intro__image" src="/Images/extintinguisher-army.jpg" alt={t('home.extinguisherAlt')} />
          </div>
        </section>
        <section className="lua-section lua-container lua-services">
          {services.map((Icon, index) => (
            <article key={serviceContent[index][0]}>
              <Icon className="lua-services__icon" aria-hidden="true" />
              <h3>{serviceContent[index][0]}</h3>
              <p>{serviceContent[index][1]}</p>
            </article>
          ))}
        </section>
        <section className="lua-section lua-container lua-news">
          <div className="lua-section__heading">
            <div>
              <span className="lua-eyebrow">{t('home.newsEyebrow')}</span>
              <h2>{t('home.newsHeading')}</h2>
            </div>
            <button className="lua-text-link" type="button" onClick={() => history.push('/jaunumi')}>
              {t('home.learnMore')} <span>→</span>
            </button>
          </div>
          <div className="lua-article-grid">
            {newsStatus === 'ready' && featuredArticles.map((article) => {
              const coverImage = article.images?.[0] ?? { image: '/Images/placeholder.jpg', alt_text: article.title }

              return (
                <Link key={article.id} to={`/jaunums/${article.id}`}>
                  {coverImage ? <img src={coverImage.image} alt={coverImage.alt_text || article.title} /> : <div className="lua-article-grid__image-placeholder" aria-hidden="true" />}
                  <div>
                    <h3>{article.title}</h3>
                    <p>{getSummary(article.content)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          {newsStatus === 'loading' && <p>{t('home.loadingNews')}</p>}
          {newsStatus === 'error' && <p>{t('home.newsError')}</p>}
          {newsStatus === 'ready' && featuredArticles.length === 0 && <p>{t('home.noNews')}</p>}
        </section>
        <section className="lua-community">
          <div className="lua-section lua-container">
            <span className="lua-eyebrow">{t('home.communityEyebrow')}</span>
            <h2>
              {communityHeadingLines[0]}<br />
              <em>{communityHeadingLines[1]}</em>
            </h2>
            <h3>{t('home.memberCompanies')}</h3>
            <div className="lua-logo-carousel" role="region" aria-label={t('home.memberLogos')}>
              <div className="lua-logo-carousel__track">
                {[0, 1].map((copyIndex) => (
                  <div className="lua-logo-carousel__group" aria-hidden={copyIndex === 1} key={copyIndex}>
                    {members.map((member) => {
                      const logoImage = member.logo ? <img src={member.logo} alt={copyIndex === 0 ? `${member.name} ${t('home.logoSuffix')}` : ''} /> : <span className="lua-logo-carousel__name-placeholder">{member.name}</span>
                      const key = `${copyIndex}-${member.id}`

                      return member.url ? (
                        <a className="lua-logo-carousel__item" href={member.url} key={key} rel="noreferrer" tabIndex={copyIndex === 1 ? -1 : undefined} target="_blank">
                          {logoImage}
                        </a>
                      ) : (
                        <div className="lua-logo-carousel__item" key={key}>
                          {logoImage}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
            <h3>{t('home.partners')}</h3>
            <div className="lua-logo-grid">
              {collaborationPartners.map(([logo, name, link, hasWhiteBackground]) => (
                <a className="lua-logo-grid__item" href={link} key={name} rel="noreferrer" target="_blank">
                  <img className={hasWhiteBackground ? 'logo--blend-background' : undefined} src={logo} alt={`${name} ${t('home.logoSuffix')}`} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="lua-join">
          <div>
            <h2>{t('home.joinHeading')}</h2>
            <p>{t('home.joinText')}</p>
          </div>
          <button type="button" onClick={() => history.push('/klut-par-biedru')}>{t('navigation.join')}</button>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Sakumlapa
