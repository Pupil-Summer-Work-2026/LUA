import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'

import './jaunums-modern.css'

import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { getPost } from '../services/blogApi'

function formatDate(value) {
  return new Intl.DateTimeFormat('lv-LV', { dateStyle: 'long' }).format(new Date(value))
}

function Jaunums() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
    setPost(null)

    getPost(postId)
      .then((nextPost) => {
        setPost(nextPost)
        setStatus('ready')
        document.title = `${nextPost.title} | Latvijas Ugunsdrošības asociācija`
      })
      .catch((error) => setStatus(error.status === 404 ? 'missing' : 'error'))
  }, [postId])

  const paragraphs = post ? post.content.split(/\n{2,}/).filter(Boolean) : []
  const title = post ? post.title : 'Jaunums'

  return (
    <SiteLayout className="article-page">
      <Helmet>
        <title>{title} | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content={post ? post.content.slice(0, 160) : 'Latvijas Ugunsdrošības asociācijas jaunums.'} />
      </Helmet>
      <main>
        <PageBanner title="Jaunumi" />
        <section className="article-page__layout article-page__layout--single lua-container">
          <article className="article-page__article">
            <Link className="article-page__back" to="/jaunumi">← Atpakaļ</Link>
            {status === 'loading' && <p role="status">Ielādē jaunumu...</p>}
            {status === 'error' && <p role="alert">Jaunumu pašlaik nevar ielādēt.</p>}
            {status === 'missing' && <p role="alert">Šis jaunums vairs nav pieejams.</p>}
            {status === 'ready' && <>
              <h1>{post.title}</h1>
              <p className="article-page__meta">{post.tags.map(({ name }) => name).join(', ') || 'Bez kategorijas'} • {formatDate(post.created_at)}</p>
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
