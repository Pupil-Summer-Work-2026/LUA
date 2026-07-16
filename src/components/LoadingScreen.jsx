import React from 'react'

import './loading-screen.css'

function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Lapas ielāde">
      <object className="loading-screen__art" data="/LUA big shield landscape SVG.svg" type="image/svg+xml" aria-hidden="true" tabIndex="-1">
        <img src="/LUA big shield landscape SVG.svg" alt="" />
      </object>
    </div>
  )
}

export default LoadingScreen