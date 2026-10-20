import { useEffect, useRef, useState } from 'react'

const base = import.meta.env.BASE_URL

/** The app screens in public/screens/ are laid out at this phone size. */
const SCREEN_W = 412
const SCREEN_H = 915

/**
 * A phone frame showing one rebuilt app screen (public/screens/<name>.html),
 * drawn at real size and scaled to the frame. The screen follows the site's
 * light/dark theme by itself.
 */
export function PhoneShot({ screen, alt, className = '' }: { screen: string; alt: string; className?: string }) {
  const frame = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const fit = () => setScale(el.clientWidth / SCREEN_W)
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frame} className={`phone ${className}`} role="img" aria-label={alt}>
      {scale > 0 && (
        <iframe
          src={`${base}screens/${screen}.html`}
          title={alt}
          tabIndex={-1}
          aria-hidden
          scrolling="no"
          style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}
