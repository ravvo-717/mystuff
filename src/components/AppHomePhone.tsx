/**
 * The app's Home screen, rebuilt from the Flutter code at its real size
 * (393 × 740 dp, an 18.5:9 phone) and scaled to fit:
 *   app/lib/presentation/screens/dashboard/dashboard_screen.dart  (layout)
 *   app/lib/presentation/screens/dashboard/category_bento.dart    (tiles + art)
 *   app/lib/presentation/screens/dashboard/recent_items.dart      (Recent)
 *   app/lib/presentation/widgets/app_bottom_nav.dart              (bottom bar)
 * Colours come from theme.css, which mirrors app_theme.dart.
 */

import { useStatusTime } from '../hooks/useStatusTime'

/** Material icons used by the app (Apache 2.0), 24 × 24. */
const MI = {
  search:
    'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  arrowOutward: 'M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  folderOutlined:
    'M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  starBorder:
    'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z',
  settings:
    'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
}

function MIcon({ d, size = 24, className }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={d} />
    </svg>
  )
}

/** VaultItemTypeUi.color */
const TYPE = {
  note: '#6366F1',
  card: '#10B981',
  identity: '#0EA5E9',
  document: '#64748B',
}

/* ------------------------------------------------------------------ tiles */

/** _VaultArt at rest: blue gradient, light from the top-left, and the dial. */
function VaultArt({ w, h }: { w: number; h: number }) {
  const cx = w * 0.95
  const cy = h * 0.9
  const r = w * 0.66
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0
    const a = (i * 2 * Math.PI) / 60
    const from = r * (major ? 0.83 : 0.87)
    const to = r * 0.94
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * from}
        y1={cy + Math.sin(a) * from}
        x2={cx + Math.cos(a) * to}
        y2={cy + Math.sin(a) * to}
        stroke="#fff"
        strokeOpacity={major ? 0.32 : 0.14}
        strokeWidth={major ? 1.6 : 1}
      />
    )
  })
  return (
    <svg className="ah-fill" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="ah-vault" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F8DF9" />
          <stop offset="0.55" stopColor="#2563EB" />
          <stop offset="1" stopColor="#3730A3" />
        </linearGradient>
        <radialGradient id="ah-vault-light" cx="0" cy="0" r={(Math.min(w, h) * 1.1) / w} gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill="url(#ah-vault)" />
      <rect width={w} height={h} fill="url(#ah-vault-light)" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" fillOpacity="0.07" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={r * 0.78} fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.4" />
      {ticks}
      <circle cx={cx} cy={cy - r * 0.64} r="3.5" fill="#fff" fillOpacity="0.55" />
    </svg>
  )
}

/** _TileArtPainter: line art in a 155 × 92 box pinned to the tile's right edge. */
function TileArt({ kind, color }: { kind: keyof typeof TYPE; color: string }) {
  const line = (x1: number, y: number, x2: number) => <line x1={x1} y1={y} x2={x2} y2={y} />
  let art: React.ReactNode = null
  if (kind === 'note') {
    art = (
      <g transform="rotate(-12 128 82)">
        <path d="M100 40 L146 40 L160 54 L160 120 A8 8 0 0 1 152 128 L100 128 A8 8 0 0 1 92 120 L92 48 A8 8 0 0 1 100 40 Z" />
        <path d="M146 40 L146 50 A4 4 0 0 0 150 54 L160 54" />
        {line(104, 62, 144)}
        {line(104, 72, 150)}
        {line(104, 82, 150)}
        {line(104, 92, 136)}
      </g>
    )
  } else if (kind === 'card') {
    art = (
      <>
        <rect x="86" y="38" width="82" height="52" rx="9" transform="rotate(-16 127 64)" />
        <g transform="rotate(-6 136 76)">
          <rect x="96" y="50" width="82" height="52" rx="9" />
          <rect x="106" y="62" width="15" height="12" rx="3" />
          {line(106, 88, 132)}
          <path d="M150 62 A8 8 0 0 1 150 74" />
          <path d="M156 58 A14 14 0 0 1 156 78" />
          <path d="M162 54 A20 20 0 0 1 162 82" />
        </g>
      </>
    )
  } else if (kind === 'identity') {
    const gaps = [[[0, 1]], [[0, 0.4], [0.47, 1]], [[0, 0.3], [0.38, 0.75]]]
    const arcs: React.ReactNode[] = []
    for (let i = 0; i < 7; i++) {
      const rad = 10 + i * 8
      gaps[i % 3].forEach(([from, to], j) => {
        const a0 = Math.PI + from * Math.PI
        const a1 = Math.PI + to * Math.PI
        const p = (a: number) => `${132 + rad * Math.cos(a)} ${100 + rad * Math.sin(a)}`
        arcs.push(<path key={`${i}-${j}`} d={`M${p(a0)} A${rad} ${rad} 0 0 1 ${p(a1)}`} strokeWidth="1.5" />)
      })
    }
    art = <>{arcs}</>
  } else {
    art = (
      <>
        <rect x="112" y="30" width="52" height="68" rx="7" strokeOpacity="0.5" />
        <rect x="104" y="36" width="52" height="68" rx="7" strokeOpacity="0.75" />
        <path d="M102 42 L136 42 L150 56 L150 108 A7 7 0 0 1 143 115 L102 115 A7 7 0 0 1 95 108 L95 49 A7 7 0 0 1 102 42 Z" />
        <path d="M136 42 L136 51 A5 5 0 0 0 141 56 L150 56" />
        {line(104, 66, 138)}
        {line(104, 76, 142)}
        {line(104, 86, 130)}
      </>
    )
  }
  return (
    <svg className="ah-art" viewBox="0 0 155 92" aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="ah-art-ink">
        {art}
      </g>
    </svg>
  )
}

function SmallTile({ kind, label, count }: { kind: keyof typeof TYPE; label: string; count: number }) {
  const color = TYPE[kind]
  return (
    <div className="ah-tile ah-small" style={{ ['--ah-type' as string]: color }}>
      <TileArt kind={kind} color={color} />
      <div className="ah-tile-content">
        <div className="ah-tile-top">
          <span className="ah-dot" />
          <span className="ah-tile-label">{label}</span>
          <MIcon d={MI.arrowOutward} size={18} className="ah-arrow" />
        </div>
        <span className="ah-count">{count}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ screen */

const W = 393
const H = 740
const TILE_W = (W - 40 - 10) / 2

const RECENT = [
  { title: 'Netflix', detail: 'Password · you@gmail.com', time: 'now', color: '#2563EB' },
  { title: 'HDFC Millennia', detail: 'Card · •••• 7730', time: '2h', color: '#10B981' },
  { title: 'Trip to Ooty', detail: 'Note', time: '1d', color: '#8B5CF6' },
  { title: 'Aadhaar', detail: 'Identity', time: '3d', color: '#F59E0B' },
]

/**
 * `visibleHeight` (dp) shows only the top of the screen; the phone then fades
 * out at the bottom instead of ending in a frame.
 */
export function AppHomePhone({ width = 270, visibleHeight }: { width?: number; visibleHeight?: number }) {
  const scale = width / W
  const time = useStatusTime()
  const shown = Math.min(visibleHeight ?? H, H)
  return (
    <div
      className={`ah-device${visibleHeight ? " ah-faded" : ""}`}
      role="img"
      aria-label="The MyStuff Home screen: Passwords, Notes, Cards, Identities and Documents, and recent items"
    >
      <div className="ah-clip" style={{ width, height: shown * scale, borderRadius: 40 * scale }}>
      <div className="ah-screen" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {/* Android status bar */}
        <div className="ah-status">
          <span>{time}</span>
          <span className="ah-status-icons" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21L1 9.5C4 6.5 7.8 5 12 5s8 1.5 11 4.5L12 21z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 22h20V2L2 22z" />
            </svg>
            <svg width="11" height="18" viewBox="0 0 11 18" fill="currentColor">
              <rect x="3" y="0" width="5" height="2" rx="1" />
              <rect x="0" y="2" width="11" height="16" rx="2.5" />
            </svg>
          </span>
        </div>

        {/* AppBar: wordmark + Search + Menu */}
        <div className="ah-appbar">
          <span className="ah-wordmark">
            My<i>Stuff</i>
          </span>
          <span className="ah-grow" />
          <span className="ah-barbtn">
            <MIcon d={MI.search} size={21} />
          </span>
          <span className="ah-barbtn">
            <MIcon d={MI.menu} size={21} />
          </span>
        </div>

        <div className="ah-body">
          <div className="ah-section">Categories</div>
          <div className="ah-bento">
            <div className="ah-tile ah-hero">
              <VaultArt w={TILE_W} h={92 * 2 + 10} />
              <div className="ah-tile-content">
                <div className="ah-tile-top">
                  <span className="ah-tile-label">Passwords</span>
                  <MIcon d={MI.arrowOutward} size={18} className="ah-arrow" />
                </div>
                <span className="ah-count ah-count-hero">13</span>
              </div>
            </div>
            <div className="ah-stack">
              <SmallTile kind="note" label="Notes" count={8} />
              <SmallTile kind="card" label="Cards" count={3} />
            </div>
          </div>
          <div className="ah-row2">
            <SmallTile kind="identity" label="Identities" count={4} />
            <SmallTile kind="document" label="Documents" count={9} />
          </div>

          <div className="ah-section ah-with-action">
            Recent<span className="ah-seeall">See all</span>
          </div>
          <div className="ah-recent">
            {RECENT.slice(0, 2).map((r, i) => (
              <div key={r.title}>
                {i > 0 && <div className="ah-divider" />}
                <div className="ah-recent-row">
                  <span className="ah-avatar" style={{ color: r.color, background: `${r.color}24` }}>
                    {r.title[0]}
                  </span>
                  <span className="ah-recent-text">
                    <b>{r.title}</b>
                    <small>{r.detail}</small>
                  </span>
                  <span className="ah-time">{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AppBottomNav: floating bar, Home selected */}
        <div className="ah-nav">
          <span className="ah-nav-pill" />
          {[
            { d: MI.home, label: 'Home', on: true },
            { d: MI.folderOutlined, label: 'My Stuff' },
            { d: MI.starBorder, label: 'Favourites' },
            { d: MI.settings, label: 'Settings' },
          ].map((n) => (
            <span key={n.label} className={`ah-nav-item${n.on ? ' on' : ''}`}>
              <MIcon d={n.d} size={24} />
              <span>{n.label}</span>
            </span>
          ))}
        </div>
        <span className="ah-gesture" aria-hidden />
      </div>
      </div>
    </div>
  )
}
