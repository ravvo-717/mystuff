import { Icon } from '../components/Icon'
import { Layout } from '../components/Layout'
import { PhoneShot } from '../components/PhoneShot'
import { site } from '../config'

const base = import.meta.env.BASE_URL

export function Showcase() {
  return (
    <Layout>
      <Hero />
      <GetIt />
    </Layout>
  )
}

/** `short` puts the two buttons side by side on phones, with shorter labels. */
function DownloadButtons({ short = false }: { short?: boolean }) {
  const label = (full: string, brief: string) =>
    short ? (
      <>
        <span className="desktop-only">{full}</span>
        <span className="phone-only">{brief}</span>
      </>
    ) : (
      full
    )
  return (
    <div className={`actions${short ? ' actions-row' : ''}`}>
      <a className="btn primary" href={site.links.download}>
        <Icon name="download" size={18} />
        {label(site.hero.primary, site.hero.primaryShort)}
      </a>
      <a className="btn ghost" href={site.links.itch}>
        {label(site.hero.secondary, site.hero.secondaryShort)}
      </a>
    </div>
  )
}

/** Centre-stage hero: centred copy, then three real screenshots rising out
 *  of the fold. */
function Hero() {
  const [left, mid, right] = site.hero.screens
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>
          {site.hero.headline.split('\n').map((line) => {
            const [before, after] = line.split(site.hero.highlight)
            return (
              <span key={line}>
                {after === undefined ? (
                  line
                ) : (
                  <>
                    {before}
                    <span className="hero-hl">{site.hero.highlight}</span>
                    {after}
                  </>
                )}
              </span>
            )
          })}
        </h1>
        <p className="hero-sub">{site.hero.sub}</p>
        <DownloadButtons short />
        <small className="hero-note">
          <span className="desktop-only">{site.hero.note}</span>
          <span className="phone-only">{site.hero.notePhone}</span> · <a href={`${base}learn.html`}>Learn more</a>
        </small>
        <div className="trio">
          <PhoneShot {...left} className="t-left" />
          <PhoneShot {...mid} className="t-mid" />
          <PhoneShot {...right} className="t-right" />
        </div>
      </div>
    </section>
  )
}

/** Download copy on the left; on the right the app's own "Get started"
 *  checklist, with the download already ticked. */
function GetIt() {
  const { eyebrow, title, sub, meta, card, steps } = site.install
  const done = steps.filter((step) => step.done).length
  return (
    <section className="section getit">
      <div className="getit-copy reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h2>
          {title.split('\n').map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="getit-sub">{sub}</p>
        <DownloadButtons />
        <small className="getit-meta">{meta}</small>
      </div>

      <div className="gs reveal" style={{ transitionDelay: '90ms' }}>
        <div className="gs-card">
          <div className="gs-head">
            <img src={`${base}brand/mystuff-icon.png`} width={46} height={46} alt="" />
            <span>
              <b>{card.title}</b>
              <small>{card.sub}</small>
            </span>
            <span className="gs-count">
              {done} of {steps.length}
            </span>
          </div>
          <div className="gs-progress">
            <i style={{ width: `${(done / steps.length) * 100}%` }} />
          </div>
          {steps.map((step) => (
            <div key={step.title} className={`gs-task${step.done ? ' done' : ''}`}>
              <span className="gs-ring">{step.done && <Icon name="check" size={15} />}</span>
              <span className="gs-text">
                <b>{step.title}</b>
                <small>{step.line}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
