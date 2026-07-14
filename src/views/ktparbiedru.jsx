import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './ktparbiedru-modern.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PageBanner from '../components/PageBanner'

function Ktparbiedru() {
  useEffect(() => {
    document.title = 'Iestāšanās asociācijā | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <div className="join-page lua-page">
      <Helmet>
        <title>Iestāšanās asociācijā | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Informācija par iestāšanos Latvijas Ugunsdrošības asociācijā." />
      </Helmet>
      <SiteHeader />
      <main>
        <PageBanner title="Iestāšanās asociācijā" />
        <section className="join-page__intro">
          <div className="join-page__copy">
            <h1>KĻŪSTI PAR<br /><em>BIEDRU!</em></h1>
            <p>Kļūt par biedru ir vienkārši. Pievienojieties profesionāļiem, kuri kopā veido drošāku Latviju.</p>
            <p>Jebkura Latvijas Republikā reģistrēta juridiska persona vai tiesībspējīga personālsabiedrība, kas nodarbojas ar ugunsdzēsību vai ugunsdzēsības servisu, vai ir tieši saistīta ar to, un atbalsta Biedrības mērķus, kā arī apņemas ievērot tās statūtus.</p>
          </div>
          <img src="/image171686-9gsk-500h.png" alt="Latvijas Ugunsdrošības asociācijas pieredze" />
        </section>
        <section className="join-page__documents">
          <h2>Biedrības valdei iesniedzamie dokumenti</h2>
          <a className="join-page__document" href="#" onClick={(event) => event.preventDefault()}>
            <span>DOC</span>
            <span>LUA_iesniegums.docx</span>
          </a>
        </section>
        <section className="join-page__notice">
          <strong>i</strong>
          <p>Lēmumu par biedra uzņemšanu Biedrībā pieņem valde. Valdei pieteicēja lūgums ir jāizskata tuvākās sēdes laikā, taču ne ilgāk kā divu nedēļu laikā no visu nepieciešamo dokumentu saņemšanas brīža. Uz valdes sēdi, kurā izskata pieteicēja lūgumu, ir jāuzaicina pats pieteicējs un jādod viņam vārds sava viedokļa paušanai. Pieteicēja neierašanās nav šķērslis valdes lēmuma pieņemšanai. Valdei motivēts lēmums rakstveidā jāpaziņo pieteicējam nedēļas laikā no tā pieņemšanas brīža.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Ktparbiedru
