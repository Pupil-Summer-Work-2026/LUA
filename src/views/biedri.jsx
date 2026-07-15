import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './biedri-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

export const members = [
  ['/Biedri/almo.png', 'ALMO Ugunsdrošība', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/aphelp.png', 'AP HELP', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/arcofire.png', 'Arco Fire', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/astramar_liepaja.png', 'Astramar Liepāja', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/daugavpils1.png', 'Daugavpils', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/dns automatika.png', 'DNS Automātika', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/etex-logo.webp', 'Etex', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/fireline-pluss.jpg', 'Fireline Pluss', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/fnserviss.svg', 'FN Serviss', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/iskada.png', 'Iskada', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/kingspan-logo.svg', 'Kingspan', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/knauf.png', 'Knauf', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/kopos.png', 'Kopos', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/ldzrss.png', 'LDZ Ritošā sastāva serviss', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/logo-latakva-fire.svg', 'Latakva Fire', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/logo-victaulic.webp', 'Victaulic', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/obo bettermann.svg', 'OBO Bettermann', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/onninen.svg', 'Onninen', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/padtex insulation.jpg', 'Padtex Insulation', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/sels.svg', 'Sels', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/sprinkler_service_logo.svg', 'Sprinkler Service', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/tyco.png', 'Tyco', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/unimars_logo.png', 'Unimars Group', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/Uprent_logo.webp', 'Uprent', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/Biedri/URB-Logo.png', 'URB', 'Pievienojiet uzņēmuma logotipu un aprakstu šeit.', ''],
  ['/Biedri/vesmann.png', 'Viessmann', 'Pievienojiet uzņēmuma logotipu un aprakstu šeit.', ''],
  ['/Biedri/viza.png', 'Viza', 'Pievienojiet uzņēmuma logotipu un aprakstu šeit.', ''],
]

function Biedri() {
  useEffect(() => {
    document.title = 'Biedri | Latvijas Ugunsdrošības asociācija'
  }, [])

  return (
    <SiteLayout className="members-page">
      <Helmet>
        <title>Biedri | Latvijas Ugunsdrošības asociācija</title>
        <meta name="description" content="Latvijas Ugunsdrošības asociācijas biedru uzņēmumi." />
      </Helmet>
      <main>
        <PageBanner title="Biedri" />
        <section className="members-page__content lua-container">
          <h1>LATVIJAS UGUNSDROŠĪBAS ASOCIĀCIJAS BIEDRI</h1>
          <div className="members-page__grid">
            {members.map(([logo, title, description, link], index) => {
              const card = (
                <article className="members-page__card" tabIndex={link ? undefined : 0} key={`${title}-${index}`}>
                  {logo && <img src={logo} alt={`${title} logotips`} />}
                  <div className="members-page__card-details">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {link && <span>Apmeklēt vietni →</span>}
                  </div>
                </article>
              )

              return link ? (
                <a className="members-page__card-link" href={link} target="_blank" rel="noreferrer" key={`${title}-${index}`}>{card}</a>
              ) : card
            })}
          </div>
        </section>
        <section className="members-page__join">
          <div>
            <h2>KĻŪSTIET PAR LUA BIEDRU</h2>
            <p>Pievienojies vairāk nekā 120 uzņēmumiem, kas veido drošāku Latviju.</p>
          </div>
          <Link to="/ktparbiedru">Piesakieties <span>→</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Biedri
