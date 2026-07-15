import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './biedri-modern.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'

const members = [
  ['/image141632-vy7k-200h.png', 'Biedrs 01', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 02', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 03', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 04', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 05', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 06', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 07', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 08', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 09', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 10', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 11', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 12', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 13', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 14', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 15', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 16', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 17', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 18', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 19', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 20', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 21', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 22', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 23', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 24', 'Pievienojiet uzņēmuma aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 25', 'Pievienojiet uzņēmuma logotipu un aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 26', 'Pievienojiet uzņēmuma logotipu un aprakstu šeit.', ''],
  ['/image141632-vy7k-200h.png', 'Biedrs 27', 'Pievienojiet uzņēmuma logotipu un aprakstu šeit.', ''],
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
