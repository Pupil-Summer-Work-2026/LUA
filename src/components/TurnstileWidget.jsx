import React, { useEffect, useRef, useState } from 'react'

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || import.meta.env.VITE_TURNSTILE_API_KEY
let scriptPromise

// Ielādē Cloudflare Turnstile skriptu tikai vienu reizi visā vietnē.
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = TURNSTILE_SCRIPT_URL
      script.async = true
      script.defer = true
      script.onload = () => resolve(window.turnstile)
      script.onerror = () => reject(new Error('Unable to load Turnstile.'))
      document.head.appendChild(script)
    })
  }

  return scriptPromise
}

// Attēlo Turnstile CAPTCHA un nodod formas tokenu vecākkomponentam.
function TurnstileWidget({ onTokenChange, resetKey }) {
  const containerRef = useRef(null)
  const onTokenChangeRef = useRef(onTokenChange)
  const [error, setError] = useState('')

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange
  }, [onTokenChange])

  useEffect(() => {
    if (!siteKey) {
      setError('Captcha configuration is unavailable.')
      return undefined
    }

    let widgetId
    let isActive = true

    loadTurnstile()
      .then((turnstile) => {
        if (!isActive || !turnstile || !containerRef.current) return

        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onTokenChangeRef.current(token),
          'expired-callback': () => onTokenChangeRef.current(''),
          'error-callback': () => {
            onTokenChangeRef.current('')
            setError('Captcha verification could not load. Please try again.')
          },
        })
      })
      .catch(() => {
        if (isActive) setError('Captcha verification could not load. Please try again.')
      })

    return () => {
      isActive = false
      if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [resetKey])

  return (
    <div className="turnstile-widget">
      <div ref={containerRef} />
      {error && <p className="turnstile-widget__error" role="alert">{error}</p>}
    </div>
  )
}

export default TurnstileWidget