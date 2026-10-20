import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { site } from '../config'

const policy = site.privacy
const sectionIds = policy.sections.map((s) => s.id)

/** The privacy policy. On wide screens a contents list stays beside you,
 *  marking the section you are reading; on phones it is a plain document. */
export function Privacy() {
  const active = useActiveSection(sectionIds)
  return (
    <Layout>
      <div className="policy">
        <header className="policy-head">
          <h1>{policy.title}</h1>
          <p className="policy-intro">{policy.intro}</p>
          <p className="policy-updated">Last updated {policy.updated}</p>
        </header>

        <div className="policy-body">
          <nav className="policy-toc" aria-label="On this page">
            <small>On this page</small>
            {policy.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={s.id === active ? 'on' : undefined}>
                {s.title}
              </a>
            ))}
          </nav>

          <article>
            {policy.sections.map((s) => (
              <section key={s.id} id={s.id} className="policy-section">
                <h2>{s.title}</h2>
                {s.blocks.map((block, j) =>
                  'p' in block ? (
                    <p key={j}>{linkify(block.p)}</p>
                  ) : 'quote' in block ? (
                    <blockquote key={j}>{block.quote}</blockquote>
                  ) : (
                    <ul key={j}>
                      {block.list.map((item) => (
                        <li key={item}>{linkify(item)}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
    </Layout>
  )
}

/** The id of the section nearest the top of the screen. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const update = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.3) current = id
      }
      // At the very bottom the last sections can't reach the top, so mark the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = ids[ids.length - 1]
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [ids])
  return active
}

/** Turns [label](https://...), emails and bare https:// links in policy text into links. */
function linkify(text: string) {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^)]+\)|(?:\S+@\S+\.[a-z]+|https:\/\/[^\s]+?)(?=[.,]?(?:\s|$)))/).map((part, i) => {
    const labelled = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/)
    if (labelled) {
      return (
        <a key={i} href={labelled[2]} target="_blank" rel="noreferrer">
          {labelled[1]}
        </a>
      )
    }
    if (part.startsWith('https://')) {
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer">
          {part.replace('https://', '')}
        </a>
      )
    }
    if (part.includes('@')) {
      return (
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>
      )
    }
    return part
  })
}
