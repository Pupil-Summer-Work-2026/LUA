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

function getAssociationYears() {
  const startDate = new Date(2002, 3, 4)
  const today = new Date()
  const hasAnniversaryPassed = today.getMonth() > startDate.getMonth() || (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate())

  return today.getFullYear() - startDate.getFullYear() - (hasAnniversaryPassed ? 0 : 1)
}

function AboutUs() {
  const associationYears = getAssociationYears()

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
          <div className="about-page__years" aria-label={`Latvijas Ugunsdrošības asociācijai ir ${associationYears} gadi`}>
            <img src="/Images/biznesa gadi.svg" alt="" />
            <strong aria-hidden="true">{associationYears}</strong>
          </div>
          <div>
            <span className="lua-eyebrow">PAR ASOCIĀCIJU</span>
            <h1>KAS IR <em>LUA</em>?</h1>
            <p>Biedrības mērķis ir Latvijas Republikas ugunsdzēsības un ugunsdrošības servisa uzņēmumu un darbinieku apvienošana kopīgam radošam darbam un to interešu aizsardzība.</p>
            <br/>
            <p>Pēc savas darbības un organizatoriskās uzbūves “Latvijas Ugunsdrošības asociācija” ir brīvprātīga, profesionāla biedrība, kuras pamatmērķis ir sekmēt tās biedru savstarpējo sadarbību un profesionālo izaugsmi, aizstāvēt savu biedru saimnieciskās, ekonomiskās un tiesiskās intereses, kā arī aktīva darbība Latvijas ugunsdzēsības un ugunsdrošības pakalpojumu sniegšanas tirgū un savu biedru pārstāvniecība pašvaldību un valsts institūcijās. “Latvijas Ugunsdrošības asociācija” ir vienīgā šāda profila sabiedriska organizācija Latvijā.</p>
            <br/>
            <p>Kā svarīgāko uzdevumu savai darbībai Biedrība izvirza iedzīvotāju ugunsdrošības nodrošināšanu valstī un uzskata, ka to var panākt ar vienotu darbību likumdošanas un normatīvās bāzes pilnveidošanā, kvalitatīvu ugunsdrošības, pakalpojumu sniegšanu, profesionālu speciālistu sagatavošanu un efektīvu sabiedrības informēšanu jautājumos par ugunsdrošību. Īpašā uzmanība, pēc Biedrība biedru domām, šo jautājumu risināšanā un aktualizēšanā sabiedrībā ir jāveltī sadarbībai ar masu informācijas līdzekļiem.</p>
            <br/>
            <p>“Latvijas Ugunsdrošības asociācija” dibināta 2002. gadā un uz pašreizējo brīdi apvieno ap 30 Latvijas un starptautiskos vadošos ugunsdzēsības un ugunsdrošības servisa uzņēmumus. Biedrība sadarbojas ar citām sabiedriskām organizācijām. No 2008. gada “Latvijas Ugunsdrošības asociācija” ir Iekšlietu Ministrijas sabiedrības Konsultatīvās drošības padomes biedrs un vada darba grupu “Ugunsdrošība un civilā aizsardzība”. “Latvijas Ugunsdrošības asociācija” ir “Latvijas Darba Devēju Konfederācijas” biedrs.</p>
          </div>
        </section>
        <section className="about-page__mission">
          <div className="about-page__mission-inner lua-container">
            <div>
              <span className="lua-eyebrow">PAR NODARBOŠANOS</span>
              <h2>MŪSU LOMA <em>UGUNSDROŠĪBĀ</em></h2>
              <p>Asociācijas ikdienas un radošais darbs tiek plānots un norisinās pa vairākām darba grupām:</p>
              <br/>
              <ul>
                <li>Ugunsdzēsības aparāti un to apkalpošana.</li>
                <li>Ugunsdzēsības automātika un signalizācijas sistēmas, to projektēšana, uzstādīšana un apkalpošana.</li>
                <li>Būvtehniskā ugunsaizsardzība.</li>
                <li>Dūmvadi, ventilācija. To uzstādīšana un apkalpošana.</li>
                <li>Ugunsdrošības speciālistu apmācība.</li>
              </ul>
            </div>
            <img src="/Images/lit-match.jpg" alt="Aizdegta sērkociņa liesma" />
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
