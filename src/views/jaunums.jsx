import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './jaunums-modern.css'

import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const paragraphs = [
  'Ir pagājuši vairāk kā 3 gadi, kopš Latvijā nepieciešamā ugunsdzēsības aparātu skaita aprēķina metodika tiek balstīta uz faktisko, testēto ugunsdzēsības aparāta dzēstspēju nevis vienkārši uz ugunsdzēsības aparāta svaru. Tas ir bijis būtisks progress, lai patērētājiem piedāvātu kvalitatīvākus produktus un nodrošinātu godīgu konkurenci starp kvalitatīviem ugunsdzēsības aparātiem attiecībā pret nekvalitatīvākiem produktiem. Kā arī šobrīd varam apliecināt, ka Latvijā salīdzinot ar mūsu kaimiņvalstīm ekspluatācijā esošie ugunsdzēsības aparāti ir būtiski labākā stāvoklī un kvalitatīvāki attiecībā pret mūsu kaimiņiem Lietuvā un Igaunijā.',
  'Latvijas ugunsdrošības asociācija turpina strādāt pie tā, lai uzlabotu ugunsdrošības stāvokli Latvijā, veicinot arī kvalitatīvu produktu un pakalpojumu piedāvājumu Latvijā.',
  'Jau vairākus gadus Rietumeiropā, īpaši Vācijā ļoti plaši tiek pielietoti ugunsdzēsības aparāti ar citu ugunsdzēsīgās vielas palaišanas metodi. Īpašu popularitāti ir guvuši ugunsdzēsības aparāti, kas neatrodas zem pastāvīga spiediena, bet kuru dzēšana tiek aktivizēta izmantojot dzenošās gāzes baloniņu. Latvijas ugunsdrošības asociācija ir sagatavojusi būtiskāko atšķirību apkopojumu, ar kuru var iepazīties šeit.',
]

const initialComments = Array.from({ length: 4 }, (_, index) => ({
  name: 'Lorem Ipsum',
  body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
  id: index,
}))

function Jaunums() {
  const [comments, setComments] = useState(initialComments)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    document.title = 'Breaking News | Latvijas Ugunsdrošības asociācija'
  }, [])

  function handleCommentSubmit(event) {
    event.preventDefault()
    const body = commentText.trim()
    if (!body) return

    setComments((currentComments) => [{ id: Date.now(), name: 'Jūs', body }, ...currentComments])
    setCommentText('')
  }

  return (
    <SiteLayout className="article-page">
      <Helmet>
        <title>Breaking News | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas jaunums." />
      </Helmet>
      <main>
        <PageBanner title="Jaunumi" />
        <section className="article-page__layout lua-container">
          <article className="article-page__article">
            <Link className="article-page__back" to="/jaunumi">← Atpakaļ</Link>
            <h1>BREAKING NEWS</h1>
            <p className="article-page__meta">Bez kategorijas • Vārds Uzvārds • 01.01.1970</p>
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="article-page__gallery">
              <img src="/image49345-k5nh-600w.png" alt="Ugunsdzēšamie aparāti" />
            </div>
          </article>
          <aside className="article-page__sidebar">
            <article className="article-page__related">
              <img src="/article11645-wq9i-400w.png" alt="Saistīts jaunums" />
              <div><span>Pasākumi</span><h2>Lorem Ipsum</h2><p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p></div>
            </article>
            <article className="article-page__related">
              <img src="/article11645-wq9i-400w.png" alt="Saistīts jaunums" />
              <div><span>Pasākumi</span><h2>Lorem Ipsum</h2><p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p></div>
            </article>
          </aside>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Jaunums
