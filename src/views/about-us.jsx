import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { useHistory } from 'react-router-dom'

import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PageBanner from '../components/PageBanner'

import './about-us-modern.css'

const sectors = [
  'Visa veida ugunsdzēsības aparātu tirdzniecība, apkope un uzpildīšana',
  'Visa veida ugunsdzēsības inventāra, tehnikas un speciālā aprīkojuma tirdzniecība',
  'Individuālo un speciālo drošības un aizsardzības līdzekļu un aprīkojuma tirdzniecība',
  'Būvkonstrukciju apstrāde ar ugunsaizsardzības pārklājumiem, to tirdzniecība. Komunikācijas eju ugunsaizsardzība',
  'Ugunsdrošo durvju un vārtu tirdzniecība',
  'Ugunsdrošās stikla-alumīnija konstrukcijas (logi, durvis, starpsienas, virsgaismas, fasādes utt.), to tirdzniecība',
  'Elektrotehniskie mērījumi. Zibens novadītāju projektēšana un uzstādīšana',
  'Ugunsdzēsības signalizācijas, ugunsgrēka izziņošanas un apsardzes signalizācijas uzstādīšana',
  'Automātisko ugunsdzēsības sistēmu projektēšana, montāža, testēšana, apkalpošana un materiālu/iekārtu tirdzniecība',
  'Ūdensapgādes, kanalizācijas, sprinkleru, siltumapgādes un ventilācijas sistēmu projektēšana, montāža, apkalpošana un ūdensvada spiediena pārbaudes',
  'Dūmvadu izgatavošana un uzstādīšana, dūmu novadīšanas un aizsardzības risinājumi, ugunsdrošības konsultācijas, instruktāžas un evakuācijas plānu izstrāde',
  'Ugunsdrošības un aizsardzības apmācība pēc 20 un 160 stundu programmām. Pirmās medicīniskās palīdzības apmācība. Civilās aizsardzības apmācība',
]

function AboutUs() {
  useEffect(() => {
    document.title = 'Par mums | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <div className="about-page lua-page">
      <Helmet>
        <title>Par mums | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības nozares uzņēmumus un speciālistus." />
      </Helmet>
      <SiteHeader />
      <main>
        <PageBanner title="Par mums" />
        <section className="about-page__feature about-page__feature--intro lua-container">
          <img src="/image45864-tn4k-300h.png" alt="Ugunsdzēšamais aparāts" />
          <div>
            <span className="lua-eyebrow">PAR ASOCIĀCIJU</span>
            <h1>LOREM IPSUM</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          </div>
        </section>
        <section className="about-page__mission">
          <div className="about-page__mission-inner lua-container">
            <div>
              <span className="lua-eyebrow">MŪSU DARBS</span>
              <h2>LOREM <em>IPSUM</em></h2>
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
          <span className="lua-eyebrow">MŪSU DARBS</span>
          <h2>LOREM <em>IPSUM</em></h2>
          <div className="about-page__sector-grid">
            {sectors.map((sector, index) => (
              <article key={sector}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{sector}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default AboutUs
