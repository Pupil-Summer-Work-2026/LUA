import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import './jaunumi-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { getPosts, getTags } from '../services/blogApi'

const defaultCategory = 'Visi jaunumi'

function formatDate(value) {
  return new Intl.DateTimeFormat('lv-LV', { dateStyle: 'long' }).format(new Date(value))
}

function getSummary(content) {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  return normalizedContent.length > 220 ? `${normalizedContent.slice(0, 220)}...` : normalizedContent
}

function Jaunumi() {
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState('loading')

  function loadNews() {
    setStatus('loading')

    Promise.all([getPosts(), getTags()])
      .then(([nextPosts, nextTags]) => {
        setPosts(nextPosts)
        setTags(nextTags)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    document.title = 'Jaunumi | Latvijas Ugunsdrošības asociācija'
    loadNews()
  }, [])

  const categories = [defaultCategory, ...tags.map(({ name }) => name)]
  const filteredArticles = posts.filter(({ tags: postTags, title }) => {
    const tagNames = postTags.map(({ name }) => name)
    const matchesCategory = activeCategory === defaultCategory || tagNames.includes(activeCategory)
    const normalizedQuery = searchQuery.toLocaleLowerCase()
    const matchesSearch = title.toLocaleLowerCase().includes(normalizedQuery) || tagNames.some((name) => name.toLocaleLowerCase().includes(normalizedQuery))
    return matchesCategory && matchesSearch
  })

  function handleSearch(event) {
    event.preventDefault()
    setSearchQuery(searchInput.trim())
  }

  function clearFilters() {
    setActiveCategory(defaultCategory)
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
        <section className="news-page__layout lua-container"> <div className="news-page__list">
            {status === 'loading' && <div className="news-page__empty" role="status"><p>Ielādē jaunumus...</p></div>}
            {status === 'error' && <div className="news-page__empty" role="alert"><p>Jaunumus pašlaik nevar ielādēt.</p><button type="button" onClick={loadNews}>Mēģināt vēlreiz</button></div>}
            {status === 'ready' && filteredArticles.map((article) => {
              const coverImage = article.images[0]
              const tagNames = article.tags.map(({ name }) => name).join(', ') || 'Bez kategorijas'

              return (
              <Link key={article.id} className="news-page__card" to={`/jaunums/${article.id}`}>
                {coverImage ? <img src={coverImage.image} alt={coverImage.alt_text || article.title} /> : <div className="news-page__card-image-placeholder" aria-hidden="true" />}
                <div className="news-page__card-content">
                  <span>{tagNames}</span>
                  <h1>{article.title}</h1>
                  <p>{getSummary(article.content)}</p>
                  <small>{formatDate(article.created_at)}</small>
                </div>
              </Link>
              )
            })}
            {status === 'ready' && filteredArticles.length === 0 && <div className="news-page__empty" role="status"><p>Neviens jaunums neatbilst izvēlētajiem filtriem.</p><button type="button" onClick={clearFilters}>Notīrīt filtrus</button></div>}
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
              <img src="/Images/5extinguishers.png" alt="Daudzi ugunsdzēšamie aparāti rindās" />
            </section>
          </aside>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Jaunumi
