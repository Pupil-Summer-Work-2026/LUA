import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Landmark, Award, Shield} from 'lucide-react'
import { Link, useHistory } from 'react-router-dom'

import './landing-page.css'
import SiteLayout from '../components/SiteLayout'
import { members } from './biedri'
import { getPosts } from '../services/blogApi'

const services = [
  [Landmark, 'Standartu izstrāde','Kā svarīgāko uzdevumu asociācija uzskata ugunsdrošības standartu izstrādi un to ieviešanu, lai nodrošinātu augstus drošības standartus visā valstī.'],
  [Award, 'Izglītība un apmācības','Asociācijas biedriem ir iespēja piedalīties dažādos izglītības un apmācību pasākumos, kas palīdz uzlabot zināšanas un prasmes ugunsdrošības jomā.'],
  [Shield, 'Ugunsaizsardzība','Mūsu asociācija nodrošina ugunsdrošības pasākumus un ugunsdzēsības aprīkojumu, lai aizsargātu cilvēkus un īpašumu.']
]

function getSummary(content) {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  return normalizedContent.length > 120 ? `${normalizedContent.slice(0, 120)}...` : normalizedContent
}

function LandingPage() {
  const history = useHistory()
  const [posts, setPosts] = useState([])
  const [newsStatus, setNewsStatus] = useState('loading')

  useEffect(() => {
    document.title = 'Latvijas Ugunsdrošības asociācija'
    getPosts()
      .then((nextPosts) => {
        setPosts(nextPosts)
        setNewsStatus('ready')
      })
      .catch(() => setNewsStatus('error'))
  }, [])

  const featuredArticles = posts.slice(0, 5)

  return (
    <SiteLayout className="lua-home">
      <Helmet><title>Latvijas Ugunsdrošības asociācija</title><meta name="description" content="Latvijas Ugunsdrošības asociācija" /></Helmet>
      <main>
        <section className="lua-hero"><div className="lua-hero__content"><h1>LATVIJAS<br /><em>UGUNSDROŠĪBAS</em><br />ASOCIĀCIJA</h1><p>Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības jomas uzņēmumus un speciālistus, veicinot drošu vidi visā valstī.</p><button onClick={() => history.push('/ktparbiedru')}>Piesakieties</button></div></section>
        <section className="lua-statistics" aria-label="Asociācijas rādītāji">{[['30', 'BIEDRI'], ['4', 'SADARBĪBAS PARTNERI']].map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</section>
        <section className="lua-section lua-container lua-intro"><div className="lua-intro__copy"><span className="lua-eyebrow">PAR ASOCIĀCIJU</span><h2>DROŠĀKA<br /><em>LATVIJA</em><br />KOPĀ</h2><p>Latvijas Ugunsdrošības asociācija (LUA) ir dibināta 2002. gadā un apvieno Latvijas ugunsdrošības jomas uzņēmumus, organizācijas un speciālistus. Mēs sekmējam nozares profesionalitāti, drošību un ilgtspēju. Asociācija aktīvi sadarbojas ar valsts iestādēm, lai veidotu efektīvu ugunsdrošības politiku Latvijā.</p><button className="lua-text-link" onClick={() => history.push('/about-us')}>Uzzināt vairāk <span>→</span></button></div><div className="lua-intro__visual"><span className="lua-intro__backdrop" aria-hidden="true" /><img className="lua-intro__image" src="\Images\extintinguisher-army.jpg" alt="Ugunsdzēšamie aparāti" /></div></section>
        <section className="lua-section lua-container lua-services">{services.map(([Icon, title, description]) => <article key={title}><Icon className="lua-services__icon" aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</section>
        
        <section className="lua-section lua-container lua-news"><div className="lua-section__heading"><div><span className="lua-eyebrow">JAUNUMI</span><h2>ATKLĀJIET JAUNĀKĀS IZMAIŅAS</h2></div><button className="lua-text-link" onClick={() => history.push('/jaunumi')}>Uzzināt vairāk <span>→</span></button></div>
        <div className="lua-article-grid">{newsStatus === 'ready' && featuredArticles.map((article) => {
          const coverImage = article.images[0]

          return <Link key={article.id} to={`/jaunums/${article.id}`}>{coverImage ? <img src={coverImage.image} alt={coverImage.alt_text || article.title} /> : <div className="lua-article-grid__image-placeholder" aria-hidden="true" />}<div><h3>{article.title}</h3><p>{getSummary(article.content)}</p></div></Link>
        })}</div>
        {newsStatus === 'loading' && <p>Jaunumi tiek ielādēti...</p>}
        {newsStatus === 'error' && <p>Jaunumus pašlaik nevar ielādēt.</p>}
        {newsStatus === 'ready' && featuredArticles.length === 0 && <p>Pašlaik nav pieejamu jaunumu.</p>}</section>

        <section className="lua-community"><div className="lua-section lua-container"><span className="lua-eyebrow">BIEDRI UN PARTNERI</span><h2>MŪSU NOZARES<br /><em>KOPIENA</em></h2><h3>BIEDRU UZŅĒMUMI</h3><div className="lua-logo-carousel" role="region" aria-label="Biedru uzņēmumu logo"><div className="lua-logo-carousel__track">{[0, 1].map((copyIndex) => <div className="lua-logo-carousel__group" aria-hidden={copyIndex === 1} key={copyIndex}>{members.map(([logo, title, description, link], index) => link ? <a className="lua-logo-carousel__item" href={link} target="_blank" rel="noreferrer" tabIndex={copyIndex === 1 ? -1 : undefined} key={`${copyIndex}-${title}-${index}`}><img src={logo} alt={copyIndex === 0 ? `${title} logotips` : ''} /></a> : <div className="lua-logo-carousel__item" key={`${copyIndex}-${title}-${index}`} title={description}><img src={logo} alt={copyIndex === 0 ? `${title} logotips` : ''} /></div>)}</div>)}</div></div><h3>SADARBĪBAS PARTNERI</h3><div className="lua-logo-grid">{[['/Biedri/DAKIB.png', 'DAKIB'], ['/Biedri/iekslietu ministrija.png', 'Iekšlietu ministrija'], ['/Biedri/LDDK.svg', 'Latvijas Darba devēju konfederācija'], ['/Biedri/vugd.png', 'Valsts ugunsdzēsības un glābšanas dienests']].map(([logo, name]) => <div key={name}><img src={logo} alt={`${name} logotips`} /></div>)}</div></div></section>
        <section className="lua-join"><div><h2>KĻŪSTIET PAR LUA BIEDRU</h2><p>Pievienojieties vairāk nekā 120 uzņēmumiem, kas veido drošāku Latviju.</p></div><button onClick={() => history.push('/ktparbiedru')}>Kļūt par biedru</button></section>
      </main>
    </SiteLayout>
  )
}

export default LandingPage
