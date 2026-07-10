import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import LandingPage from './views/landing-page'
import AboutUs from './views/about-us'
import Jaunumi from './views/jaunumi'
import Jaunums from './views/jaunums'
import Contacts from './views/contacts'
import Biedri from './views/biedri'
import Ktparbiedru from './views/ktparbiedru'
import NotFound from './views/not-found'

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
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
