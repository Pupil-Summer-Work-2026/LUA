import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

import './external-content-preferences.css'
import { useLanguage } from '../i18n/LanguageContext'

export const GOOGLE_MAPS_PREFERENCE_KEY = 'lua-google-maps-enabled'
const PREFERENCES_DIALOG_EVENT = 'lua:open-external-content-preferences'
const PREFERENCE_CHANGED_EVENT = 'lua:external-content-preference-changed'

export function isGoogleMapsEnabled() {
  return window.localStorage.getItem(GOOGLE_MAPS_PREFERENCE_KEY) === 'true'
}

function getDraftGoogleMapsPreference() {
  return true
}

export function setGoogleMapsEnabled(enabled) {
  window.localStorage.setItem(GOOGLE_MAPS_PREFERENCE_KEY, String(enabled))
  window.dispatchEvent(new CustomEvent(PREFERENCE_CHANGED_EVENT, { detail: { googleMapsEnabled: enabled } }))
}

export function openExternalContentPreferences() {
  window.dispatchEvent(new Event(PREFERENCES_DIALOG_EVENT))
}

export function useGoogleMapsEnabled() {
  const [enabled, setEnabled] = useState(isGoogleMapsEnabled)

  useEffect(() => {
    const handlePreferenceChange = (event) => setEnabled(event.detail.googleMapsEnabled)

    window.addEventListener(PREFERENCE_CHANGED_EVENT, handlePreferenceChange)
    return () => window.removeEventListener(PREFERENCE_CHANGED_EVENT, handlePreferenceChange)
  }, [])

  return [enabled, setGoogleMapsEnabled]
}

function ExternalContentPreferences({ isSiteReady }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [, setGoogleMapsPreference] = useGoogleMapsEnabled()
  const [draftGoogleMapsEnabled, setDraftGoogleMapsEnabled] = useState(getDraftGoogleMapsPreference)

  useEffect(() => {
    if (!isSiteReady || window.localStorage.getItem(GOOGLE_MAPS_PREFERENCE_KEY) !== null) return undefined

    const timer = window.setTimeout(() => {
      if (window.localStorage.getItem(GOOGLE_MAPS_PREFERENCE_KEY) === null) setIsOpen(true)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [isSiteReady])

  useEffect(() => {
    const openDialog = () => {
      setDraftGoogleMapsEnabled(getDraftGoogleMapsPreference())
      setIsSettingsOpen(false)
      setIsOpen(true)
    }

    window.addEventListener(PREFERENCES_DIALOG_EVENT, openDialog)
    return () => window.removeEventListener(PREFERENCES_DIALOG_EVENT, openDialog)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  const savePreferences = () => {
    setGoogleMapsPreference(isSettingsOpen ? draftGoogleMapsEnabled : true)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="external-content-preferences" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
      <section className="external-content-preferences__dialog" role="dialog" aria-modal="true" aria-labelledby="external-content-preferences-heading">
        <header>
          <div>
            <h2 id="external-content-preferences-heading">{t('externalContent.preferencesTitle')}</h2>
            <p>{t('externalContent.preferencesDescription')}</p>
          </div>
          <button type="button" className="external-content-preferences__close" onClick={() => setIsOpen(false)} aria-label={t('externalContent.close')}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="external-content-preferences__content">
          {isSettingsOpen ? (
            <label className="external-content-preferences__option">
              <input type="checkbox" checked={draftGoogleMapsEnabled} onChange={(event) => setDraftGoogleMapsEnabled(event.target.checked)} />
              <span>
                <strong>{t('externalContent.mapsTitle')}</strong>
                <small>{t('externalContent.mapsDescription')}</small>
              </span>
            </label>
          ) : (
            <div className="external-content-preferences__summary">
              <strong>{t('externalContent.optionalCookies')}</strong>
              <span>{t('externalContent.mapsTitle')}</span>
              <small>{t('externalContent.mapsDescription')}</small>
            </div>
          )}
        </div>
        <footer>
          {!isSettingsOpen && <button type="button" className="external-content-preferences__secondary" onClick={() => setIsSettingsOpen(true)}>{t('externalContent.settings')}</button>}
          <button type="button" className="external-content-preferences__primary" onClick={savePreferences}>{t('externalContent.save')}</button>
        </footer>
      </section>
    </div>
  )
}

export default ExternalContentPreferences