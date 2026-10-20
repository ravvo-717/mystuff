import { useEffect, useState, type ReactNode } from 'react'
import { site } from '../config'
import { useReveal } from '../hooks/useReveal'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'

const base = import.meta.env.BASE_URL
const year = new Date().getFullYear()

/** The other pages in the phone menu; Home is shown on every page but itself. */
const PAGES = [
  { label: 'How it works', file: 'learn.html' },
  { label: 'Privacy policy', file: 'privacy.html' },
]
const isHome = (path: string) => !PAGES.some((page) => path.endsWith(page.file))

/** The sticky header, footer and theme handling every page shares. */
export function Layout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme()
  useReveal()
  // Clear over the hero; frosted glass once the page scrolls.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The phone menu: closes with Escape or when the screen grows past phone size.
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const wide = window.matchMedia('(min-width: 641px)')
    const onWide = () => wide.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [menuOpen])

  const path = typeof location === 'undefined' ? '' : location.pathname

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}${menuOpen ? ' open' : ''}`}>
        <a
          href={base}
          className="header-logo"
          aria-label={`${site.appName} by ${site.brand}`}
          onClick={(e) => {
            // Already home: scroll up instead of reloading the page.
            if (!isHome(path)) return
            e.preventDefault()
            setMenuOpen(false)
            window.scrollTo({ top: 0 })
          }}
        >
          <img
            className="logo-ms only-light"
            src={`${base}brand/mystuff-wordmark-on-light.svg`}
            alt={site.appName}
            height={26}
          />
          <img
            className="logo-ms only-dark"
            src={`${base}brand/mystuff-wordmark-on-dark.svg`}
            alt={site.appName}
            height={26}
          />
          <span className="logo-byline">
            <span className="logo-by">by</span>
            <img
              className="logo-rv only-light"
              src={`${base}brand/ravvo-main-black.svg`}
              alt={site.brand}
              height={17}
            />
            <img
              className="logo-rv only-dark"
              src={`${base}brand/ravvo-main-white.svg`}
              alt={site.brand}
              height={17}
            />
          </span>
        </a>
        <span className="grow" />
        <button type="button" className="icon-btn" onClick={toggle} aria-label="Switch theme">
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
        <a className="btn small desktop-only" href={site.links.download}>
          <Icon name="download" size={16} />
          Download
        </a>
        <button
          type="button"
          className="icon-btn menu-btn phone-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="phone-menu"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
        </button>

        <div id="phone-menu" className="phone-menu" hidden={!menuOpen}>
          <nav aria-label="Pages">
            {/* Only the other pages: the one you're on is left out. */}
            {!isHome(path) && <a href={base}>Home</a>}
            {PAGES.filter((page) => !path.endsWith(page.file)).map((page) => (
              <a key={page.label} href={base + page.file}>
                {page.label}
              </a>
            ))}
          </nav>
          <a className="btn primary menu-download" href={site.links.download}>
            <Icon name="download" size={18} />
            {site.hero.primary}
          </a>
        </div>
      </header>
      {menuOpen && <div className="menu-shade" onClick={() => setMenuOpen(false)} aria-hidden />}
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <img className="footer-cobrand only-dark phone-only" src={`${base}brand/mystuff-ravvo-cobrand-on-dark.svg`} alt={`${site.appName} by ${site.brand}`} height={22} />
          <img className="footer-cobrand only-light phone-only" src={`${base}brand/mystuff-ravvo-cobrand-on-light.svg`} alt={`${site.appName} by ${site.brand}`} height={22} />
          <span className="footer-copy">
            © {year} {site.brand}
          </span>
          <nav>
            <a href={`${base}learn.html`}>How it works</a>
            <a href={`${base}privacy.html`}>Privacy policy</a>
            <a href={site.links.github}>GitHub</a>
            <a href={`mailto:${site.email}`}>
              <span className="desktop-only">{site.email}</span>
              <span className="phone-only">Email us</span>
            </a>
          </nav>
        </div>
      </footer>
    </>
  )
}
