import { useEffect, useState } from 'react'
import './App.css'
import { data, plainBio, type Focus, type Link } from './data'

const NAV = [
  { href: '#build', label: 'What I build' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const SOCIALS = ['GitHub', 'LinkedIn', 'X']

// Skill groups from this one onward are infra/ops, tinted green.
const GREEN_SKILLS_FROM = 'Infrastructure'

const STAGES = ['commit', 'build', 'test', 'switch']

const CV_FILENAME = 'ZayYarNaing-CV.pdf'

function linkFor(label: string): Link | undefined {
  return data.links.find((l) => l.label === label)
}

function Svg({ children, size = 18 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: (
    <Svg>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </Svg>
  ),
  LinkedIn: (
    <Svg>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </Svg>
  ),
  X: (
    <Svg>
      <path d="M4 4l16 16M20 4 4 20" />
    </Svg>
  ),
}

const focusIcons: Record<Focus['icon'], React.ReactNode> = {
  code: (
    <Svg size={24}>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </Svg>
  ),
  iac: (
    <Svg size={24}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M17.5 14v7M14 17.5h7" />
    </Svg>
  ),
  pipeline: (
    <Svg size={24}>
      <path d="M4 12h4l3-8 4 16 3-8h2" />
    </Svg>
  ),
  cloud: (
    <Svg size={24}>
      <path d="M17.5 19H8a5 5 0 1 1 1.2-9.9A6 6 0 0 1 20.5 12a3.5 3.5 0 0 1-3 7z" />
    </Svg>
  ),
}

const MailIcon = (
  <Svg>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
)

const DownloadIcon = (
  <Svg size={16}>
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </Svg>
)

const SunIcon = (
  <Svg>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
)

const MoonIcon = (
  <Svg>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Svg>
)

const pad = (n: number) => String(n).padStart(2, '0')

/** Decorative blue/green deployment pipeline for the hero. */
function Pipeline() {
  return (
    <div
      className="card pipeline"
      role="img"
      aria-label="Illustration: a blue/green deployment pipeline switching live traffic from the blue environment to the green environment"
    >
      <div className="pipeline-head">
        <span>deploy.pipeline / production</span>
        <span className="pill pill-live">
          <span className="dot" />
          healthy
        </span>
      </div>
      <div className="stages">
        {STAGES.map((s, i) => (
          <div key={s} className={`stage${i === STAGES.length - 1 ? ' is-active' : ''}`}>
            <span className="stage-n">{pad(i + 1)}</span>
            <span className="stage-name">{s}</span>
            <span className="stage-bar" />
          </div>
        ))}
      </div>
      <div className="switch">
        <div className="lb">load balancer</div>
        <svg className="switch-lines" viewBox="0 0 320 56" fill="none" strokeWidth="2" strokeLinecap="round" preserveAspectRatio="none" aria-hidden="true">
          <path d="M160 0v18H70v38" stroke="var(--line)" strokeDasharray="4 6" />
          <path d="M160 0v18h90v38" stroke="var(--green)" />
        </svg>
        <div className="envs">
          <div className="env env-blue">
            <span className="env-label">BLUE</span>
            <span>previous release</span>
            <span className="env-traffic">traffic 0%</span>
            <span className="env-bar" />
          </div>
          <div className="env env-green">
            <span className="env-label">GREEN · LIVE</span>
            <span>new release</span>
            <span className="env-traffic">traffic 100%</span>
            <span className="env-bar" />
          </div>
        </div>
      </div>
      <div className="pipeline-foot">
        <span className="c-green">✓</span> switch complete — zero-downtime deployment
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const email = linkFor('Email')
  const cv = linkFor('CV')
  const github = linkFor('GitHub')
  const linkedin = linkFor('LinkedIn')

  const nameParts = data.name.split(' ')
  const lastName = nameParts.pop()
  const firstNames = nameParts.join(' ')

  const greenSkillsIndex = data.skills.findIndex((g) => g.group === GREEN_SKILLS_FROM)

  return (
    <>
      <header className="site-header">
        <nav className="container nav" aria-label="Main">
          <a href="#top" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="brand-name">{data.name}</span>
          </a>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? SunIcon : MoonIcon}
            </button>
            {cv && (
              <a href={cv.href} className="nav-cv" download={CV_FILENAME}>
                {DownloadIcon}CV
              </a>
            )}
          </div>
        </nav>
      </header>

      <main id="top" className="container">
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-h">
          <div className="hero-copy">
            <div className="hero-id">
              <img
                className="hero-avatar"
                src="/avatar.webp"
                alt={`Photo of ${data.name}`}
                width={160}
                height={160}
              />
              <span className="hero-role">
                <span className="dot" aria-hidden="true" />
                {data.title}
              </span>
            </div>
            <h1 id="hero-h" className="hero-name">
              {firstNames}
              {firstNames && <br />}
              <span className="c-blue">{lastName}</span>
              <span className="c-green" aria-hidden="true">.</span>
            </h1>
            <p className="hero-bio">{plainBio()}</p>
            <div className="hero-ctas">
              {email && (
                <a href={email.href} className="btn btn-primary">
                  {MailIcon}Email me
                </a>
              )}
              {cv && (
                <a href={cv.href} className="btn btn-ghost" download={CV_FILENAME}>
                  {cv.display}
                </a>
              )}
            </div>
            <ul className="hero-socials">
              {SOCIALS.map((label) => {
                const l = linkFor(label)
                if (!l) return null
                return (
                  <li key={label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {socialIcons[label]}
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <Pipeline />
        </section>

        {/* Stack strip */}
        <ul className="stack" aria-label="Tech stack">
          {data.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        {/* What I build */}
        <section id="build" className="section section-first" aria-labelledby="build-h">
          <p className="eyebrow">/ what I build</p>
          <h2 id="build-h" className="section-title">Reliable systems, end to end.</h2>
          <div className="focus-grid">
            {data.focus.map((f, i) => (
              <article key={f.title} className="card focus-card">
                <div className="focus-top">
                  <span className={`focus-icon${i >= 2 ? ' is-green' : ''}`}>{focusIcons[f.icon]}</span>
                  <span>{pad(i + 1)}</span>
                </div>
                <h3 className="focus-title">{f.title}</h3>
                <ul className="chips" aria-label="Tools">
                  {f.tags.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="section" aria-labelledby="exp-h">
          <p className="eyebrow">/ experience</p>
          <h2 id="exp-h" className="section-title">Experience</h2>
          <ol className="jobs">
            {data.experience.map((job, i) => {
              const current = job.period.includes('Present')
              return (
                <li key={`${job.company}-${job.role}`} className="card job">
                  <div className="job-meta">
                    <span className="job-n" aria-hidden="true">{pad(i + 1)}</span>
                    <h3 className="job-role">{job.role}</h3>
                    <span className="job-company">{job.company}</span>
                    <span className="job-location">{job.location}</span>
                    <div className="job-when">
                      {current && (
                        <span className="pill pill-live">
                          <span className="dot" aria-hidden="true" />
                          Current
                        </span>
                      )}
                      <span className="job-period">{job.period}</span>
                    </div>
                  </div>
                  <ul className="job-highlights">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Skills */}
        <section id="skills" className="section" aria-labelledby="skills-h">
          <p className="eyebrow">/ skills</p>
          <h2 id="skills-h" className="section-title">Skills</h2>
          <div className="skills-grid">
            {data.skills.map((group, i) => (
              <div key={group.group} className="card skill-card">
                <h3 className={`skill-label${greenSkillsIndex >= 0 && i >= greenSkillsIndex ? ' is-green' : ''}`}>
                  {group.group}
                </h3>
                <ul className="skill-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact" aria-labelledby="contact-h">
          <div className="contact-copy">
            <p className="eyebrow">/ contact</p>
            <h2 id="contact-h" className="contact-title">
              Get in touch<span aria-hidden="true">.</span>
            </h2>
            {email && (
              <a href={email.href} className="contact-email">
                {email.display}
              </a>
            )}
          </div>
          <div className="contact-actions">
            {email && (
              <a href={email.href} className="btn btn-solid">Email me</a>
            )}
            {cv && (
              <a href={cv.href} className="btn" download={CV_FILENAME}>{cv.display}</a>
            )}
            {github && (
              <a href={github.href} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
            )}
            {linkedin && (
              <a href={linkedin.href} className="btn" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {data.name}</p>
          <p>
            <a href="https://github.com/ZayYarNaing98/zay007.dev" target="_blank" rel="noopener noreferrer">View Source on GitHub</a>
            {' · '}Built with{' '}
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>
          </p>
        </div>
      </footer>
    </>
  )
}
