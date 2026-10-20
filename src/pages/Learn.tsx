import { AppHomePhone } from '../components/AppHomePhone'
import { Icon } from '../components/Icon'
import { Layout } from '../components/Layout'
import { site } from '../config'
import { useIsPhone } from '../hooks/useIsPhone'

/** The detail page: what MyStuff keeps, how it keeps it safe, and the
 *  longer questions. Everything the front page deliberately leaves out. */
export function Learn() {
  const learn = site.learn
  return (
    <Layout>
      <KeepTour />

      <Journey />

      <section className="section">
        <h2 className="reveal">{learn.faqTitle}</h2>
        <p className="journey-sub reveal">{learn.faqSub}</p>
        <div className="big3">
          {learn.faq
            .filter((f) => f.big)
            .map((f, i) => (
              <div key={f.q} className={`big3-card reveal${i === 0 ? ' big3-first' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="jtag">{f.q}</span>
                <span className="big3-answer">{f.short}.</span>
                <p>{f.a}</p>
              </div>
            ))}
        </div>
        <div className="big3-more">
          {learn.faq
            .filter((f) => !f.big)
            .map((f, i) => (
              <div key={f.q} className="big3-small reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <h3>
                  <span className="big3-icon">
                    <Icon name={f.icon} size={18} />
                  </span>
                  {f.q}
                </h3>
                <p>{f.a}</p>
              </div>
            ))}
        </div>
        <div className="getit-actions reveal">
          <a className="btn primary" href={site.links.download}>
            <Icon name="download" size={18} />
            {site.hero.primary}
          </a>
        </div>
      </section>
    </Layout>
  )
}

/** "What you can keep": the app's Home screen with the six kinds around it. */
function KeepTour() {
  const { keepTitle, keepSub, keep } = site.learn
  const phone = useIsPhone()
  const label = (item: (typeof keep)[number], i: number) => (
    <div key={item.name} className="keep-label reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
      <span className="keep-badge" style={{ ['--kc' as string]: item.color }}>
        <Icon name={item.icon} size={20} />
      </span>
      <span>
        <b>{item.name}</b>
        <small>{item.line}</small>
      </span>
    </div>
  )
  return (
    <section className="section learn-first">
      {/* The first heading on the page, so it is the page's h1. */}
      <h1 className="reveal">{keepTitle}</h1>
      <p className="journey-sub reveal">{keepSub}</p>
      <div className="keep-tour">
        <div className="keep-side keep-left desktop-only">{keep.slice(0, 3).map(label)}</div>
        <div className="keep-phone reveal">
          <AppHomePhone width={phone ? 262 : 330} visibleHeight={phone ? 500 : 600} />
        </div>
        <div className="keep-side keep-right desktop-only">{keep.slice(3).map((item, i) => label(item, i + 3))}</div>
      </div>

      {/* Phones: the six kinds as one list, like an Android settings screen. */}
      <div className="klist phone-only reveal">
        {keep.map((item) => (
          <div key={item.name} className="kl-row" style={{ ['--kc' as string]: item.color }}>
            <span className="keep-badge">
              <Icon name={item.icon} size={20} />
            </span>
            <span>
              <b>{item.name}</b>
              <small>{item.line}</small>
            </span>
            <i />
          </div>
        ))}
      </div>
    </section>
  )
}

/** "Private by design": one password followed from the phone, through
 *  encryption, into the visitor's own Drive. */
function Journey() {
  const { safetyTitle, safetySub, journey, safetyMore } = site.learn
  const { phone, encrypt, backup } = journey
  return (
    <section className="section journey-section">
      <h2 className="reveal">{safetyTitle}</h2>
      <p className="journey-sub reveal">{safetySub}</p>

      <div className="journey">
        <div className="jstep reveal">
          <span className="jno" aria-hidden>1</span>
          <span className="jtag">
            <span className="desktop-only">1 · </span>
            {phone.tag}
          </span>
          <h3>{phone.title}</h3>
          <div className="jplain">
            <small>{phone.sample.label}</small>
            {phone.sample.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <p>{phone.line}</p>
        </div>

        <div className="jstep jlocked reveal" style={{ transitionDelay: '90ms' }}>
          <span className="jno" aria-hidden>2</span>
          <span className="jtag">
            <span className="desktop-only">2 · </span>
            {encrypt.tag}
          </span>
          <h3 className="jlockline">
            <span className="jpad">
              <Icon name="lock" size={20} />
            </span>
            {encrypt.title}
          </h3>
          <code className="jcipher" aria-label="Encrypted data">
            <i>U2FsdGVk</i>
            {encrypt.cipher}
          </code>
          <p>{encrypt.line}</p>
        </div>

        <div className="jstep reveal" style={{ transitionDelay: '180ms' }}>
          <span className="jno" aria-hidden>3</span>
          <span className="jtag">
            <span className="desktop-only">3 · </span>
            {backup.tag}
          </span>
          <h3>{backup.title}</h3>
          <div className="jdrive">
            <Icon name="cloud" size={20} />
            <span>
              {backup.file}
              <small>{backup.fileNote}</small>
            </span>
          </div>
          <div className="jnone">
            <Icon name="x" size={18} />
            {backup.none}
          </div>
        </div>
      </div>

      <div className="jmore">
        {safetyMore.map((fact, i) => (
          <div key={fact.text} className="safety-line reveal" style={{ transitionDelay: `${i * 70}ms` }}>
            <Icon name={fact.icon} size={20} />
            <span>{fact.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
