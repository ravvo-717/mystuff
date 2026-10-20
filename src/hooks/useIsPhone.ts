import { useEffect, useState } from 'react'

/** Matches the phone layout in theme.css (max-width: 640px). */
const PHONE = '(max-width: 640px)'

/** True while the screen is phone-sized; for sizes CSS cannot set, like a phone mockup's width. */
export function useIsPhone() {
  const [phone, setPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(PHONE).matches)
  useEffect(() => {
    const query = window.matchMedia(PHONE)
    const onChange = () => setPhone(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return phone
}
