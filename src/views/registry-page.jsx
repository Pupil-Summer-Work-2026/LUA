import React from 'react'
import { Helmet } from 'react-helmet'

import './registry-page.css'

const RegistryPage = (props) => {
  return (
    <div className="registry-page-container1">
      <Helmet>
        <title>Registrācija - LUA</title>
        <meta property="og:title" content="Registrācija - LUA" />
      </Helmet>

      <div className="registry-page-content">
        <h1 className="registry-page-title">Kļūt par biedru</h1>

        <form className="registry-page-form">
          <label htmlFor="name">Vārds, Uzvārds</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">E-pasts</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="company">Uzņēmums</label>
          <input type="text" id="company" name="company" />

          <button type="submit" className="registry-page-submit">
            Iesniegt pieteikumu
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistryPage