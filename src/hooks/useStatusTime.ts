import { useEffect, useState } from 'react'

/** The time as an Android status bar shows it: the visitor's 12 or 24 hour
 *  setting, without AM/PM. Same rule as public/screens/screens.js. */
export function statusTime(date = new Date()) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
    .formatToParts(date)
    .filter((p) => p.type !== 'dayPeriod')
    .map((p) => p.value)
    .join('')
    .trim()
}

/** The visitor's current time, updated on the minute. */
export function useStatusTime() {
  const [time, setTime] = useState(statusTime)
  useEffect(() => {
    let timer = 0
    const tick = () => {
      setTime(statusTime())
      timer = window.setTimeout(tick, 60000 - (Date.now() % 60000) + 50)
    }
    timer = window.setTimeout(tick, 60000 - (Date.now() % 60000) + 50)
    return () => window.clearTimeout(timer)
  }, [])
  return time
}
