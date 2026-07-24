import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import './jaunumi.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { getPosts, getTags } from '../services/blogApi'
import { useLanguage } from '../i18n/LanguageContext'

const allCategory = '__all__'

// Formatē jaunuma datumu atbilstoši izvēlētajai vietnes valodai.
function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'lv-LV', { dateStyle: 'long' }).format(new Date(value))
}

// Saīsina jaunuma tekstu līdz kartītei paredzētam priekšskatījumam.
function getSummary(content) {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  return normalizedContent.length > 220 ? `${normalizedContent.slice(0, 220)}...` : normalizedContent
}

// Attēlo jaunumu sarakstu ar meklēšanu un kategoriju filtrēšanu.
function Jaunumi() {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState(allCategory)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState('loading')

  // Ielādē jaunumu un kategoriju datus, kā arī nosaka ielādes rezultāta stāvokli.
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
    document.title = t('news.pageTitle')
    loadNews()
  }, [t])

  const categories = [allCategory, ...tags.map(({ name }) => name)]
  const filteredArticles = posts.filter(({ tags: postTags, title, content }) => {
    const tagNames = postTags.map(({ name }) => name)
    const matchesCategory = activeCategory === allCategory || tagNames.includes(activeCategory)
    const normalizedQuery = searchQuery.toLocaleLowerCase()
    const matchesSearch = title.toLocaleLowerCase().includes(normalizedQuery) || content.toLocaleLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesSearch
  })

  // Pielieto lietotāja ievadīto meklēšanas frāzi jaunumu sarakstam.
  function handleSearch(event) {
    event.preventDefault()
    setSearchQuery(searchInput.trim())
  }

  // Atjauno sākotnējo kategoriju un meklēšanas filtrus.
  function clearFilters() {
    setActiveCategory(allCategory)
    setSearchInput('')
    setSearchQuery('')
  }

  return (
    <SiteLayout className="news-page">
      <Helmet>
        <title>{t('news.pageTitle')}</title>
        <meta name="description" content={t('news.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('news.title')} />
        <section className="news-page__layout lua-container"> <div className="news-page__list">
          {status === 'loading' && <div className="news-page__empty" role="status"><p>{t('news.loading')}</p></div>}
          {status === 'error' && <div className="news-page__empty" role="alert"><p>{t('news.error')}</p><button type="button" onClick={loadNews}>{t('news.retry')}</button></div>}
            {status === 'ready' && filteredArticles.map((article) => {
              const coverImage = article.images[0]
              const tagNames = article.tags.map(({ name }) => name).join(', ') || t('news.uncategorized')

              return (
              <Link key={article.id} className="news-page__card" to={`/jaunums/${article.id}`}>
                {coverImage ? <img src={coverImage.image} alt={coverImage.alt_text || article.title} /> : <div className="news-page__card-image-placeholder" aria-hidden="true" />}
                <div className="news-page__card-content">
                  <span>{tagNames}</span>
                  <h1>{article.title}</h1>
                  <p>{getSummary(article.content)}</p>
                  <small>{formatDate(article.created_at, language)}</small>
                </div>
              </Link>
              )
            })}
            {status === 'ready' && filteredArticles.length === 0 && <div className="news-page__empty" role="status"><p>{t('news.noResults')}</p><button type="button" onClick={clearFilters}>{t('news.clear')}</button></div>}
          </div>
          <aside className="news-page__sidebar">
            <form onSubmit={handleSearch}>
              <label className="news-page__sr-only" htmlFor="news-search">{t('news.searchNews')}</label>
              <input id="news-search" name="search" placeholder={t('news.search')} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
              <button type="submit" aria-label={t('news.searchNews')}><Search size={18} aria-hidden="true" /></button>
            </form>
            <section>
              <h2>{t('news.categories')}</h2>
              <nav aria-label={t('news.categories')}>{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category === allCategory ? t('news.all') : category}</button>)}</nav>
            </section>
          </aside>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Jaunumi
