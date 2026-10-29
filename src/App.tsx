import { useEffect, useState } from 'react'
import './App.css'
import { data, type Link } from './data'

const CV_FILENAME = 'ZayYarNaing-CV.pdf'

const email = data.links.find((l) => l.label === 'Email')
const cv = data.links.find((l) => l.download)
// Profiles shown as icon links in the hero (GitHub, LinkedIn, X).
const socials = data.links.filter((l) => l.href.startsWith('http'))

const iconMap: Record<string, () => React.ReactElement> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l16 16M20 4 4 20"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
    </svg>
  )
}

function CvLink({ link, className, children }: { link: Link; className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={link.href} download={CV_FILENAME}>
      {children}
    </a>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="page">
      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <a className="nav-brand" href="#top">
            ~/zayyarnaing<span className="accent">_</span>
          </a>
          <a className="nav-link" href="#experience">Experience</a>
          <a className="nav-link" href="#skills">Skills</a>
          <a className="nav-link" href="#contact">Contact</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          {cv && <CvLink link={cv} className="btn btn-primary btn-sm">Download CV</CvLink>}
        </nav>
      </header>

      <main id="top" className="container">
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-name">
          <div className="hero-intro">
            <div className="hero-meta">
              <img
                className="avatar"
                src="/avatar.webp"
                alt={`Photo of ${data.name}`}
                width={72}
                height={72}
              />
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {data.availability}
              </span>
            </div>
            <p className="kicker">$ whoami</p>
            <h1 id="hero-name" className="hero-name">{data.name}</h1>
            <p className="hero-title">{data.title}</p>
            <p className="hero-bio">{data.bio}</p>
            <div className="hero-actions">
              {email && (
                <a className="btn btn-primary" href={email.href}>
                  <EmailIcon />
                  Email me
                </a>
              )}
              <a className="btn btn-outline" href="#experience">See experience</a>
            </div>
            <ul className="socials">
              {socials.map((link) => {
                const Icon = iconMap[link.label]
                return (
                  <li key={link.label}>
                    <a className="social" href={link.href} aria-label={`${link.label}: ${link.display}`}>
                      {Icon && <Icon />}
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="terminal" aria-label="Tech stack summary">
            <div className="terminal-bar">
              <span className="terminal-dot" aria-hidden="true" />
              <span className="terminal-dot" aria-hidden="true" />
              <span className="terminal-dot" aria-hidden="true" />
              <span className="terminal-title">zay007 — stack.yml</span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="t-user">zay@zay007</span>
                <span className="t-path">:~$</span> cat stack.yml
              </div>
              {data.stack.map((line) => (
                <div key={line.key}>
                  <span className="accent">{line.key}</span>: {line.value}
                </div>
              ))}
              <div className="terminal-prompt">
                <span className="t-user">zay@zay007</span>
                <span className="t-path">:~$</span> <span className="t-cursor" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="section" aria-labelledby="exp-h">
          <p className="kicker"># experience</p>
          <h2 id="exp-h" className="section-title">Where I've worked</h2>
          <ol className="jobs">
            {data.experience.map((job) => {
              const current = job.period.includes('Present')
              return (
                <li key={`${job.company}-${job.role}`} className="job">
                  <div className="job-when">
                    <span className="job-period">{job.period}</span>
                    {current && <span className="badge-current">Current</span>}
                  </div>
                  <div className="job-body">
                    <h3 className="job-role">{job.role}</h3>
                    <p className="job-meta">
                      <span className="job-company">{job.company}</span>{' '}
                      <span className="job-location">@ {job.location}</span>
                    </p>
                    <ul className="job-highlights">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Skills */}
        <section id="skills" className="section" aria-labelledby="skills-h">
          <p className="kicker"># skills</p>
          <h2 id="skills-h" className="section-title">Toolbox</h2>
          <div className="skills">
            {data.skills.map((group) => (
              <div key={group.group} className="skill-row">
                <h3 className="skill-label">{group.group}</h3>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact" aria-labelledby="contact-h">
          <p className="kicker">$ ./contact.sh</p>
          <h2 id="contact-h" className="section-title">Need someone to build it and keep it running?</h2>
          <p className="contact-note">{data.contactNote}</p>
          <div className="contact-actions">
            {email && <a className="btn btn-primary" href={email.href}>{email.display}</a>}
            {cv && <CvLink link={cv} className="btn btn-outline">Download CV (PDF)</CvLink>}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {data.name}</span>
          <span>
            <a href="https://github.com/ZayYarNaing98/zay007.dev" target="_blank" rel="noopener noreferrer">View source</a>
            {' · '}Built with{' '}
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
