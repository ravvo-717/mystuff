import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const stored = (): Theme | null => {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

const system = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/** Follows the visitor's system theme until they use the toggle. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (location.hash === '#dark') return 'dark'
    if (location.hash === '#light') return 'light'
    return stored() ?? system()
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    // The phone browser's address bar matches the page (the --bg colours in theme.css).
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', theme === 'dark' ? '#05060b' : '#fbfbfe')
    })
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private window: the choice just lasts this visit.
    }
  }

  return { theme, toggle }
}
