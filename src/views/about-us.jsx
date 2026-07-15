import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { useHistory } from 'react-router-dom'

import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

import './about-us-modern.css'

const sectors = [
  { title: 'Visa veida ugunsdzēsības aparātu tirdzniecība, apkope un uzpildīšana', label: '/Lables/fire%20extinguisher.svg' },
  { title: 'Visa veida ugunsdzēsības inventāra, tehnikas un speciālā aprīkojuma tirdzniecība', label: '/Lables/fire%20axes.svg' },
  { title: 'Individuālo un speciālo drošības un aizsardzības līdzekļu un aprīkojuma tirdzniecība', label: '/Lables/fire%20helmet.svg' },
  { title: 'Būvkonstrukciju apstrāde ar ugunsaizsardzības pārklājumiem, to tirdzniecība. Komunikācijas eju ugunsaizsardzība', label: '/Lables/fire%20shield.svg' },
  { title: 'Ugunsdrošo durvju un vārtu tirdzniecība', label: '/Lables/fire.svg' },
  { title: 'Ugunsdrošās stikla-alumīnija konstrukcijas (logi, durvis, starpsienas, virsgaismas, fasādes utt.), to tirdzniecība', label: '/Lables/warning%20sign.svg' },
  { title: 'Elektrotehniskie mērījumi. Zibens novadītāju projektēšana un uzstādīšana', label: '/Lables/high%20voltage%20label.svg' },
  { title: 'Ugunsdzēsības signalizācijas, ugunsgrēka izziņošanas un apsardzes signalizācijas uzstādīšana', label: '/Lables/alarm%20bell.svg' },
  { title: 'Automātisko ugunsdzēsības sistēmu projektēšana, montāža, testēšana, apkalpošana un materiālu/iekārtu tirdzniecība', label: '/Lables/sprinkler.svg' },
  { title: 'Ūdensapgādes, kanalizācijas, sprinkleru, siltumapgādes un ventilācijas sistēmu projektēšana, montāža, apkalpošana un ūdensvada spiediena pārbaudes', label: '/Lables/water%20droplet.svg' },
  { title: 'Dūmvadu izgatavošana un uzstādīšana, dūmu novadīšanas un aizsardzības risinājumi, ugunsdrošības konsultācijas, instruktāžas un evakuācijas plānu izstrāde', label: '/Lables/alarm%20light.svg' },
  { title: 'Ugunsdrošības un aizsardzības apmācība pēc 20 un 160 stundu programmām. Pirmās medicīniskās palīdzības apmācība. Civilās aizsardzības apmācība', label: '/Lables/red%20cross.svg' },
]

function AboutUs() {
  useEffect(() => {
    document.title = 'Par mums | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="about-page">
      <Helmet>
        <title>Par mums | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības nozares uzņēmumus un speciālistus." />
      </Helmet>
      <main>
        <PageBanner title="Par mums" />
        <section className="about-page__feature about-page__feature--intro lua-container">
          <img src="/image45864-tn4k-300h.png" alt="Ugunsdzēšamais aparāts" />
          <div>
            <span className="lua-eyebrow">PAR ASOCIĀCIJU</span>
            <h1>KAS IR <em>LUA</em>?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          </div>
        </section>
        <section className="about-page__mission">
          <div className="about-page__mission-inner lua-container">
            <div>
              <span className="lua-eyebrow">PAR NODARBOŠANOS</span>
              <h2>MŪSU LOMA <em>UGUNSDROŠĪBĀ</em></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
              </ul>
            </div>
            <img src="/image65819-qo9r-500w.png" alt="Degošs sērkociņš" />
          </div>
        </section>
        <section className="about-page__sectors lua-container">
          <span className="lua-eyebrow">MŪSU PIEDĀVĀJUMS BIEDRIEM</span>
          <h2>PIEDĀVĀJUMI UN PAKALPOJUMI</h2>
          <div className="about-page__sector-grid">
            {sectors.map(({ title, label }, index) => (
              <article key={title} style={{ '--sector-label': `url("${label}")` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

export default AboutUs
