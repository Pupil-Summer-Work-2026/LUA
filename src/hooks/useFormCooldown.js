import { useEffect, useState } from 'react'

function getRemainingSeconds(cooldownEndsAt) {
  return Math.max(0, Math.ceil((cooldownEndsAt - Date.now()) / 1000))
}

export function useFormCooldown() {
  const [cooldownEndsAt, setCooldownEndsAt] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  useEffect(() => {
    if (!cooldownEndsAt) return undefined

    function updateRemainingSeconds() {
      const nextRemainingSeconds = getRemainingSeconds(cooldownEndsAt)
      setRemainingSeconds(nextRemainingSeconds)
      if (nextRemainingSeconds === 0) setCooldownEndsAt(0)
    }

    updateRemainingSeconds()
    const intervalId = window.setInterval(updateRemainingSeconds, 1000)

    return () => window.clearInterval(intervalId)
  }, [cooldownEndsAt])

  function startCooldown(retryAfter) {
    const retryAfterSeconds = Number.parseInt(retryAfter, 10)
    if (!Number.isInteger(retryAfterSeconds) || retryAfterSeconds <= 0) return

    const nextCooldownEndsAt = Date.now() + (retryAfterSeconds * 1000)
    setCooldownEndsAt(nextCooldownEndsAt)
    setRemainingSeconds(retryAfterSeconds)
  }

  return {
    isOnCooldown: remainingSeconds > 0,
    remainingSeconds,
    startCooldown,
  }
}