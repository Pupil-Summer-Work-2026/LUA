import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Registrs from './views/registry-page.jsx'
import LandingPage from './views/landing-page.jsx'
import AboutUs from './views/about-us.jsx'
import Jaunumi from './views/jaunumi.jsx'
import Jaunums from './views/jaunums.jsx'
import Contacts from './views/contacts.jsx'
import Biedri from './views/biedri.jsx'
import Ktparbiedru from './views/ktparbiedru.jsx'
import NotFound from './views/not-found.jsx'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={LandingPage} exact path="/" />
        <Route component={AboutUs} exact path="/about-us" />
        <Route component={Jaunumi} exact path="/jaunumi" />
        <Route component={Jaunums} exact path="/jaunums" />
        <Route component={Contacts} exact path="/contacts" />
        <Route component={Biedri} exact path="/biedri" />
        <Route component={Ktparbiedru} exact path="/ktparbiedru" />
        <Route component={Registrs} exact path="/registry-page" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
