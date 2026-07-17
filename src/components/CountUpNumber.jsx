import React, { useEffect, useRef, useState } from 'react'

function CountUpNumber({ value, duration = 1200, ...props }) {
  const [displayValue, setDisplayValue] = useState(0)
  const numberRef = useRef(null)

  useEffect(() => {
    const numberElement = numberRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!numberElement || prefersReducedMotion || !('IntersectionObserver' in window)) {
      setDisplayValue(value)
      return undefined
    }

    let animationFrame
    let observer
    let hasStarted = false

    const startCounting = () => {
      if (hasStarted) return

      hasStarted = true
      const startedAt = performance.now()

      const updateValue = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.round(value * easedProgress))

        if (progress < 1) animationFrame = window.requestAnimationFrame(updateValue)
      }

      animationFrame = window.requestAnimationFrame(updateValue)
    }

    const observeNumber = () => {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return

        startCounting()
        observer.disconnect()
      }, { threshold: 0.45 })

      observer.observe(numberElement)
    }

    if (document.documentElement.dataset.luaContentReady === 'true') observeNumber()
    else window.addEventListener('lua:content-ready', observeNumber, { once: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('lua:content-ready', observeNumber)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [duration, value])

  return <strong {...props} ref={numberRef}>{displayValue}</strong>
}

export default CountUpNumber