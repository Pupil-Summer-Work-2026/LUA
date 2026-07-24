import React, { useEffect, useRef } from 'react'

import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

// Apvieno vietnes galveni, saturu un kājeni, kā arī aktivizē sadaļu parādīšanās animācijas.
function SiteLayout({ children, className = '' }) {
  const pageRef = useRef(null)

  useEffect(() => {
    const sections = pageRef.current?.querySelectorAll('main > section, main > .page-banner') ?? []
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('lua-reveal--visible'))
      return undefined
    }

    sections.forEach((section) => section.classList.add('lua-reveal'))
    let observer

    // Vēro lapas sadaļas un parāda tās, kad tās nonāk lietotāja redzes laukā.
    const observeSections = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('lua-reveal--visible')
          observer.unobserve(entry.target)
        })
      }, { threshold: 0.12 })

      sections.forEach((section) => observer.observe(section))
    }

    if (document.documentElement.dataset.luaContentReady === 'true') observeSections()
    else window.addEventListener('lua:content-ready', observeSections, { once: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('lua:content-ready', observeSections)
    }
  }, [])

  return (
    <div className="lua-page" ref={pageRef}>
      <SiteHeader />
      <div className={className}>{children}</div>
      <SiteFooter />
    </div>
  )
}
export default SiteLayout