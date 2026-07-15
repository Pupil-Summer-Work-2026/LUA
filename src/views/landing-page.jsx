import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { Landmark, Award, Shield} from 'lucide-react'
import { Link, useHistory } from 'react-router-dom'

import './landing-page.css'
import SiteLayout from '../components/SiteLayout'
import { featuredMemberLogos } from '../data/members'

const services = [
  [Landmark, 'Standartu izstrāde','Kā svarīgāko uzdevumu asociācija uzskata ugunsdrošības standartu izstrādi un to ieviešanu, lai nodrošinātu augstus drošības standartus visā valstī.'],
  [Award, 'Izglītība un apmācības','Asociācijas biedriem ir iespēja piedalīties dažādos izglītības un apmācību pasākumos, kas palīdz uzlabot zināšanas un prasmes ugunsdrošības jomā.'],
  [Shield, 'Ugunsaizsardzība','Mūsu asociācija nodrošina ugunsdrošības pasākumus un ugunsdzēsības aprīkojumu, lai aizsargātu cilvēkus un īpašumu.']
]

const articles = [
  ['/Images/extinguisher-top.jpg','c1','A good title','This is how the text will look'],
  ['/Images/fire-alarm.jpg','c2','A working title','We are still writing'],
  ['/Images/firehose.jpg', 'c3', 'Simple title', 'Waiting...'],
  ['/Images/fire-outfit.jpg', 'c4', 'Another title', 'Experimenting with text is not forbides'],
  ['/Images/matchbox.jpg', 'c5', 'yup', 'text example']
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
        <section className="lua-hero"><div className="lua-hero__content"><h1>LATVIJAS<br /><em>UGUNSDROŠĪBAS</em><br />ASOCIĀCIJA</h1><p>Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības jomas uzņēmumus un speciālistus, veicinot drošu vidi visā valstī.</p><button onClick={() => history.push('/ktparbiedru')}>Piesakieties</button></div></section>
      <section className="lua-statistics" aria-label="Asociācijas rādītāji">{[['30', 'BIEDRI'], ['4', 'SADARBĪBAS PARTNERI']].map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</section>
        <section className="lua-section lua-container lua-intro"><div className="lua-intro__copy"><span className="lua-eyebrow">PAR ASOCIĀCIJU</span><h2>DROŠĀKA<br /><em>LATVIJA</em><br />KOPĀ</h2><p>Latvijas Ugunsdrošības asociācija (LUA) ir dibināta 2002. gadā un apvieno Latvijas ugunsdrošības jomas uzņēmumus, organizācijas un speciālistus. Mēs sekmējam nozares profesionalitāti, drošību un ilgtspēju. Asociācija aktīvi sadarbojas ar valsts iestādēm, lai veidotu efektīvu ugunsdrošības politiku Latvijā.</p><button className="lua-text-link" onClick={() => history.push('/about-us')}>Uzzināt vairāk <span>→</span></button></div><div className="lua-intro__visual"><span className="lua-intro__backdrop" aria-hidden="true" /><img className="lua-intro__image" src="\Images\extintinguisher-army.jpg" alt="Ugunsdzēšamie aparāti" /></div></section>
        <section className="lua-section lua-container lua-services">{services.map(([Icon, title, description]) => <article key={title}><Icon className="lua-services__icon" aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</section>
        <section className="lua-section lua-container lua-news"><div className="lua-section__heading"><div><span className="lua-eyebrow">JAUNUMI</span><h2>ATKLĀJIET JAUNĀKĀS IZMAIŅAS</h2></div><button className="lua-text-link" onClick={() => history.push('/jaunumi')}>Uzzināt vairāk <span>→</span></button></div><div className="lua-article-grid">{articles.map(([image, category, title, description]) => <Link key={image} to="/jaunums"><img src={image} alt="Jaunuma attēls" /><div><span>{category}</span><h3>{title}</h3><p>{description}</p></div></Link>)}</div></section>
        <section className="lua-community"><div className="lua-section lua-container"><span className="lua-eyebrow">BIEDRI UN PARTNERI</span><h2>MŪSU NOZARES<br /><em>KOPIENA</em></h2><h3>BIEDRU UZŅĒMUMI</h3><div className="lua-logo-carousel" role="region" aria-label="Biedru uzņēmumu logo"><div className="lua-logo-carousel__track">{[0, 1].map((copyIndex) => <div className="lua-logo-carousel__group" aria-hidden={copyIndex === 1} key={copyIndex}>{featuredMemberLogos.map((logo) => <div className="lua-logo-carousel__item" key={`${copyIndex}-${logo}`}><img src={logo} alt={copyIndex === 0 ? 'Biedra logo' : ''} /></div>)}</div>)}</div></div><h3>SADARBĪBAS PARTNERI</h3><div className="lua-logo-grid lua-logo-grid--empty">{Array.from({ length: 4 }, (_, index) => <div key={index} />)}</div></div></section>
        <section className="lua-join"><div><h2>KĻŪSTIET PAR LUA BIEDRU</h2><p>Pievienojieties vairāk nekā 120 uzņēmumiem, kas veido drošāku Latviju.</p></div><button onClick={() => history.push('/ktparbiedru')}>Kļūt par biedru</button></section>
      </main>
    </SiteLayout>
  )
}

export default LandingPage
