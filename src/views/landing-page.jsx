import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

import './landing-page.css'
import SiteLayout from '../components/SiteLayout'
import { featuredMemberLogos } from '../data/members'

const services = [
  ['▱', 'Standartu izstrāde'],
  ['◇', 'Izglītība un apmācības'],
  ['♙', 'Nozares pārstāvniecība'],
]

const articles = [
  '/placeholderbilde1231-g9db-200h.png',
  '/placeholderbilde1231-t6kh-200h.png',
  '/placeholderbilde1232-73ld-200h.png',
  '/rectangle241231-n5j-200h.png',
  '/rectangle241231-ild8-200h.png',
]

function LandingPage() {
  const history = useHistory()

  useEffect(() => {
    document.title = 'Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="lua-home">
      <Helmet><title>Latvijas Ugunsdrošības asociācija</title><meta name="description" content="Latvijas Ugunsdrošības asociācija" /></Helmet>
      <main>
        <section className="lua-hero"><div className="lua-hero__content"><h1>LATVIJAS<br /><em>UGUNSDROŠĪBAS</em><br />ASOCIĀCIJA</h1><p>Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības jomas uzņēmumus un speciālistus, veicinot drošu vidi visā valstī.</p><button onClick={() => history.push('/about-us')}>Par mums</button></div></section>
        <section className="lua-statistics" aria-label="Asociācijas rādītāji">{[['0', 'BIEDRI'], ['0', 'SPONSORI'], ['0', 'PARTNERI'], ['0', 'RAKSTI']].map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</section>
        <section className="lua-section lua-container lua-intro"><div className="lua-intro__copy"><span className="lua-eyebrow">PAR ASOCIĀCIJU</span><h2>DROŠĀKA<br /><em>LATVIJA</em><br />KOPĀ</h2><p>Latvijas Ugunsdrošības asociācija (LUA) ir dibināta 2002. gadā un apvieno Latvijas ugunsdrošības jomas uzņēmumus, organizācijas un speciālistus. Mēs sekmējam nozares profesionalitāti, drošību un ilgtspēju.</p><p>Asociācija aktīvi sadarbojas ar valsts iestādēm, lai veidotu efektīvu ugunsdrošības politiku Latvijā.</p><button className="lua-text-link" onClick={() => history.push('/about-us')}>Uzzināt vairāk <span>→</span></button></div><img className="lua-intro__image" src="/image171686-9gsk-500h.png" alt="Ugunsdrošība" /></section>
        <section className="lua-section lua-container lua-services">{services.map(([icon, title]) => <article key={title}><span className="lua-services__icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></article>)}</section>
        <section className="lua-section lua-container lua-news"><div className="lua-section__heading"><div><span className="lua-eyebrow">MŪSU DARBS</span><h2>LOREM <em>IPSUM</em></h2></div><button className="lua-text-link" onClick={() => history.push('/jaunumi')}>Uzzināt vairāk <span>→</span></button></div><div className="lua-article-grid">{articles.map((image) => <article key={image} onClick={() => history.push('/jaunums')}><img src={image} alt="Jaunuma attēls" /><div><span>Pasākumi</span><h3>Lorem Ipsum</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p></div></article>)}</div></section>
        <section className="lua-community"><div className="lua-section lua-container"><span className="lua-eyebrow">BIEDRI UN PARTNERI</span><h2>MŪSU NOZARES<br /><em>KOPIENA</em></h2><h3>BIEDRU UZŅĒMUMI</h3><div className="lua-logo-grid">{featuredMemberLogos.map((logo) => <div key={logo}><img src={logo} alt="Biedra logo" /></div>)}</div><h3>SADARBĪBAS PARTNERI</h3><div className="lua-logo-grid lua-logo-grid--empty">{Array.from({ length: 6 }, (_, index) => <div key={index} />)}</div></div></section>
        <section className="lua-join"><div><h2>KĻŪSTIET PAR LUA BIEDRU</h2><p>Pievienojieties vairāk nekā 120 uzņēmumiem, kas veido drošāku Latviju.</p></div><button onClick={() => history.push('/ktparbiedru')}>Kļūt par biedru</button></section>
      </main>
    </SiteLayout>
  )
}

export default LandingPage
