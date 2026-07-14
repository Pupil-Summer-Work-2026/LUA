import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import './ktparbiedru-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

function Ktparbiedru() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Iestāšanās | Latvijas Ugunsdrošības asociācija'
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setIsSubmitted(true)
  }

  return (
    <SiteLayout className="join-page">
      <Helmet>
        <title>Iestāšanās | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Informācija par iestāšanos Latvijas Ugunsdrošības asociācijā." />
      </Helmet>
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
        <section className="join-page__application" aria-labelledby="application-heading">
          <div className="join-page__application-heading">
            <h2 id="application-heading">Piesakiet savu uzņēmumu</h2>
          </div>
          <form className="join-page__form" onSubmit={handleSubmit} onChange={() => setIsSubmitted(false)}>
            <label>
              Uzņēmuma nosaukums
              <input name="companyName" type="text" autoComplete="organization" required />
            </label>
            <label>
              Amats uzņēmumā
              <input name="position" type="text" autoComplete="organization-title" required />
            </label>
            <label>
              Vārds un uzvārds
              <input name="fullName" type="text" autoComplete="name" required />
            </label>
            <label>
              E-pasts
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Tālrunis
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
            <label className="join-page__form-description">
              Īss uzņēmuma apraksts
              <textarea name="companyDescription" rows="5" required />
            </label>
            <div className="join-page__form-action">
              <button type="submit">Nosūtīt pieteikumu</button>
              {isSubmitted && <p role="status">Paldies! Jūsu pieteikums ir sagatavots izskatīšanai.</p>}
            </div>
          </form>
        </section>
        <section className="join-page__notice">
          <strong>i</strong>
          <p>Lēmumu par biedra uzņemšanu Biedrībā pieņem valde. Valdei pieteicēja lūgums ir jāizskata tuvākās sēdes laikā, taču ne ilgāk kā divu nedēļu laikā no visu nepieciešamo dokumentu saņemšanas brīža. Uz valdes sēdi, kurā izskata pieteicēja lūgumu, ir jāuzaicina pats pieteicējs un jādod viņam vārds sava viedokļa paušanai. Pieteicēja neierašanās nav šķērslis valdes lēmuma pieņemšanai. Valdei motivēts lēmums rakstveidā jāpaziņo pieteicējam nedēļas laikā no tā pieņemšanas brīža.</p>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Ktparbiedru
