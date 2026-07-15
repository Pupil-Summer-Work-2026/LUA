import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import './jaunumi-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const articles = [
  {
    image: '/rectangle89321-8giw-800w.png',
    category: 'Bez kategorijas',
    title: 'Title of article',
  },
  {
    image: '/rectangle67863-5s1q-800w.png',
    category: 'Ar kategoriju',
    title: 'Title of another article',
  },
]

const categories = ['Visi jaunumi', ...new Set(articles.map(({ category }) => category))]

function Jaunumi() {
  const [activeCategory, setActiveCategory] = useState('Visi jaunumi')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Jaunumi | Latvijas Ugunsdrošības asociācija'
  }, [])

  const filteredArticles = articles.filter(({ category, title }) => {
    const matchesCategory = activeCategory === 'Visi jaunumi' || category === activeCategory
    const matchesSearch = title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || category.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    return matchesCategory && matchesSearch
  })

  function handleSearch(event) {
    event.preventDefault()
    setSearchQuery(searchInput.trim())
  }

  function clearFilters() {
    setActiveCategory('Visi jaunumi')
    setSearchInput('')
    setSearchQuery('')
  }

  return (
    <SiteLayout className="news-page">
      <Helmet>
        <title>Jaunumi | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas jaunumi." />
      </Helmet>
      <main>
        <PageBanner title="Jaunumi" />
        <section className="news-page__layout lua-container">
          <div className="news-page__list">
            {filteredArticles.map((article) => (
              <Link key={article.title} className="news-page__card" to="/jaunums">
                <img src={article.image} alt="Jaunuma attēls" />
                <div>
                  <span>{article.category}</span>
                  <h1>{article.title}</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <small>Autors + Datums 67.27.2727</small>
                </div>
              </Link>
            ))}
            {filteredArticles.length === 0 && <div className="news-page__empty" role="status"><p>Neviens jaunums neatbilst izvēlētajiem filtriem.</p><button type="button" onClick={clearFilters}>Notīrīt filtrus</button></div>}
          </div>
          <aside className="news-page__sidebar">
            <form onSubmit={handleSearch}>
              <label className="news-page__sr-only" htmlFor="news-search">Meklēt jaunumus</label>
              <input id="news-search" name="search" placeholder="Meklēt" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
              <button type="submit" aria-label="Meklēt jaunumus"><Search size={18} aria-hidden="true" /></button>
            </form>
            <section>
              <h2>JAUNUMU KATEGORIJAS</h2>
              <nav aria-label="Jaunumu kategorijas">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}</nav>
            </section>
            <section className="news-page__maintenance">
              <h2>VAI JŪSU APARĀTI IR APKOPTI?</h2>
              <img src="/image79327-gb2l-200h.png" alt="Ugunsdzēšamie aparāti" />
            </section>
          </aside>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Jaunumi
