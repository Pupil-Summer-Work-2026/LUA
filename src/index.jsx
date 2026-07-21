import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom'

import './style.css'
import Registrs from './views/registrs.jsx'
import Sakumlapa from './views/sakumlapa.jsx'
import ParMums from './views/par-mums.jsx'
import Jaunumi from './views/jaunumi.jsx'
import Jaunums from './views/jaunums.jsx'
import Kontakti from './views/kontakti.jsx'
import Biedri from './views/biedri.jsx'
import KlutParBiedru from './views/klut-par-biedru.jsx'
import LapaNavAtrasta from './views/lapa-nav-atrasta.jsx'
import { LanguageProvider } from './i18n/LanguageContext'
import LoadingScreen from './components/LoadingScreen'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2900
    let readyFrame
    const timer = window.setTimeout(() => {
      setIsLoading(false)
      readyFrame = window.requestAnimationFrame(() => {
        document.documentElement.dataset.luaContentReady = 'true'
        window.dispatchEvent(new Event('lua:content-ready'))
      })
    }, delay)

    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(readyFrame)
      delete document.documentElement.dataset.luaContentReady
    }
  }, [])

  return (
    <LanguageProvider>
      {isLoading && <LoadingScreen />}
      <Router>
        <ScrollToTop />
        <Switch>
          <Route component={Sakumlapa} exact path="/" />
          <Route component={ParMums} exact path="/par-mums" />
          <Route component={Jaunumi} exact path="/jaunumi" />
          <Route component={Jaunums} exact path="/jaunums/:postId" />
          <Route component={Kontakti} exact path="/kontakti" />
          <Route component={Biedri} exact path="/biedri" />
          <Route component={KlutParBiedru} exact path="/klut-par-biedru" />
          <Route component={Registrs} exact path="/registrs" />
          <Redirect exact from="/about-us" to="/par-mums" />
          <Redirect exact from="/contacts" to="/kontakti" />
          <Redirect exact from="/ktparbiedru" to="/klut-par-biedru" />
          <Redirect exact from="/registry-page" to="/registrs" />
          <Route component={LapaNavAtrasta} />
        </Switch>
      </Router>
    </LanguageProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
