import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'

import './jaunums.css'

import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { getPost } from '../services/blogApi'
import { useLanguage } from '../i18n/LanguageContext'

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'lv-LV', { dateStyle: 'long' }).format(new Date(value))
}

function Jaunums() {
  const { postId } = useParams()
  const { language, t } = useLanguage()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
    setPost(null)

    getPost(postId)
      .then((nextPost) => {
        setPost(nextPost)
        setStatus('ready')
          document.title = `${nextPost.title} | ${t('home.title')}`
      })
      .catch((error) => setStatus(error.status === 404 ? 'missing' : 'error'))
        }, [postId, t])

  const paragraphs = post ? post.content.split(/\n{2,}/).filter(Boolean) : []
  const title = post ? post.title : t('article.title')

  return (
    <SiteLayout className="article-page">
      <Helmet>
        <title>{title} | {t('home.title')}</title>
        <meta name="description" content={post ? post.content.slice(0, 160) : t('article.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('news.title')} />
        <section className="article-page__layout article-page__layout--single lua-container">
          <article className="article-page__article">
            <Link className="article-page__back" to="/jaunumi">← {t('article.back')}</Link>
            {status === 'loading' && <p role="status">{t('article.loading')}</p>}
            {status === 'error' && <p role="alert">{t('article.error')}</p>}
            {status === 'missing' && <p role="alert">{t('article.missing')}</p>}
            {status === 'ready' && <>
              <h1>{post.title}</h1>
              <p className="article-page__meta">{post.tags.map(({ name }) => name).join(', ') || t('news.uncategorized')} • {formatDate(post.created_at, language)}</p>
              {paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
              {post.images.length > 0 && <div className="article-page__gallery">
                {post.images.map((postImage) => <img key={postImage.id} src={postImage.image} alt={postImage.alt_text || post.title} />)}
              </div>}
            </>}
          </article>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Jaunums
