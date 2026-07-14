import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './jaunumi-modern.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PageBanner from '../components/PageBanner'

const articles = [
  {
    image: '/rectangle89321-8giw-800w.png',
    category: 'Bez kategorijas',
    title: 'BREAKING NEWS',
  },
  {
    image: '/rectangle67863-5s1q-800w.png',
    category: 'Ar kategoriju',
    title: 'BREAKING NEWS 2',
  },
]

const categories = ['Bez kategorijas', 'Ar kategoriju', 'Trešā poga', 'Jaunumu kategorijas', 'Latvijas', 'Ugunsdrošības', 'Asociācija']

function Jaunumi() {
  useEffect(() => {
    document.title = 'Jaunumi | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <div className="news-page lua-page">
      <Helmet>
        <title>Jaunumi | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas jaunumi." />
      </Helmet>
      <SiteHeader />
      <main>
        <PageBanner title="Jaunumi" />
        <section className="news-page__layout lua-container">
          <div className="news-page__list">
            {articles.map((article) => (
              <a key={article.title} className="news-page__card" href="/jaunums">
                <img src={article.image} alt="Jaunuma attēls" />
                <div>
                  <span>{article.category}</span>
                  <h1>{article.title}</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <small>Autors + Datums 67.27.2727</small>
                </div>
              </a>
            ))}
          </div>
          <aside className="news-page__sidebar">
            <form onSubmit={(event) => event.preventDefault()}>
              <label className="news-page__sr-only" htmlFor="news-search">Meklēt jaunumus</label>
              <input id="news-search" name="search" placeholder="Meklēt" />
              <button type="submit" aria-label="Meklēt">⌕</button>
            </form>
            <section>
              <h2>JAUNUMU KATEGORIJAS</h2>
              <nav aria-label="Jaunumu kategorijas">{categories.map((category) => <a key={category} href="#kategorijas">{category}</a>)}</nav>
            </section>
            <section className="news-page__maintenance">
              <h2>VAI JŪSU APARĀTI IR APKOPTI?</h2>
              <img src="/image79327-gb2l-200h.png" alt="Ugunsdzēšamie aparāti" />
            </section>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Jaunumi
