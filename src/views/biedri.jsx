import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './biedri.css'
import SiteLayout from '../components/SiteLayout'
import PageBanner from '../components/PageBanner'
import { useLanguage } from '../i18n/LanguageContext'

export const members = [
  ['/Biedri/almo.png', 'ALMO Ugunsdrošība','https://company.lursoft.lv/lv/almo/42103029093', true],
  ['/Biedri/aphelp.png', 'AP HELP','https://ap-help.lv/'],
  ['/Biedri/arcofire.png', 'Arco Fire','https://arcofire.com/lv/sakums/'],
  ['/Biedri/astramar_liepaja.png', 'Astramar Liepāja','https://www.astramarliepaja.lv/#!/pageMain', true],
  ['/Biedri/daugavpils1.png', 'Daugavpils Brīvprātīgo Ugunsdzēsēju Biedrība','https://company.lursoft.lv/lv/daugavpils-pilsetas-un-rajona-brivpratigo-ugunsdzeseju-biedriba/40008064870', true],
  ['/Biedri/dns automatika.png', 'DNS Automātika','https://www.dumunovadisana.lv/', true],
  ['/Biedri/etex-logo.webp', 'Etex','https://www.etexgroup.com/en'],
  ['/Biedri/fireline-pluss.jpg', 'Fireline Pluss','https://company.lursoft.lv/en/f-line/50203263451', true],
  ['/Biedri/fnserviss.svg', 'FN Serviss','https://fnserviss.lv/'],
  ['/Biedri/iskada.png', 'Iskada','https://iskada.lv/lv/'],
  ['/Biedri/kingspan-logo.svg', 'Kingspan','https://www.kingspan.com/lv'],
  ['/Biedri/knauf.png', 'Knauf','https://knauf.com/lv-LV'],
  ['/Biedri/kopos.png', 'Kopos','https://www.kopos.lv/lv'],
  ['/Biedri/logo-latakva-fire.svg', 'Latakva Fire','https://www.latakva.com/lv/'],
  ['/Biedri/ldzrss.png', 'LDZ Ritošā sastāva serviss','https://company.lursoft.lv/en/ldz-ritosa-sastava-serviss/40003788351'],
  ['/Biedri/obo bettermann.svg', 'OBO Bettermann','https://www.obo.lv/'],
  ['/Biedri/onninen.svg', 'Onninen','https://www.onninen.lv/'],
  ['/Biedri/padtex insulation.jpg', 'Padtex Insulation','https://www.padtex.lv/', true],
  ['/Biedri/sels.svg', 'Sels','https://sels.lv/'],
  ['/Biedri/sprinkler_service_logo.svg', 'Sprinkler Service','https://sprinkler.lv/lv/'],
  ['/Biedri/tyco.png', 'Tyco','https://www.tyco-fire.com/', true],
  ['/Biedri/unimars_logo.png', 'Unimars Group','https://www.unimars.eu/', true],
  ['/Biedri/Uprent_logo.webp', 'Uprent','https://uprent.eu/'],
  ['/Biedri/URB-Logo.png', 'URB','https://company.lursoft.lv/lv/ugunsdrosibas-risinajumu-birojs/40203153361', true],
  ['/Biedri/vesmann.png', 'Vesmann managment','https://www.vesmann.lv/', true],
  ['/Biedri/logo-victaulic.webp', 'Victaulic','http://www.victaulicfire.com/'],
  ['/Biedri/viza.png', 'Viza','https://company.lursoft.lv/lv/viza/41503010853', true],
]

function Biedri() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('members.pageTitle')
  }, [t])

  return (
    <SiteLayout className="members-page">
      <Helmet>
        <title>{t('members.pageTitle')}</title>
        <meta name="description" content={t('members.meta')} />
      </Helmet>
      <main>
        <PageBanner title={t('members.title')} />
        <section className="members-page__content lua-container">
          <h1>{t('members.heading')}</h1>
          <div className="members-page__grid">
            {members.map(([logo, title, link, hasWhiteBackground], index) => {
              const card = (
                <article className="members-page__card" tabIndex={link ? undefined : 0} key={`${title}-${index}`}>
                  {logo && <img className={hasWhiteBackground ? 'logo--blend-background' : undefined} src={logo} alt={`${title} ${t('members.logoSuffix')}`} />}
                  <div className="members-page__card-details">
                    <h2>{title}</h2>
                    {link && <span>{t('members.visit')} →</span>}
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
            <h2>{t('members.joinHeading')}</h2>
            <p>{t('members.joinText')}</p>
          </div>
          <Link to="/klut-par-biedru">{t('members.apply')} <span>→</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Biedri
