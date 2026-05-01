import { useEffect, useState } from 'react'
import './App.css'
import TerminalBg from './TerminalBg'

const data = {
  name: 'ZayYarNaing',
  title: 'Software Engineer / Infrastructure Engineer',
  bio: `I'm a software and infrastructure engineer who enjoys building reliable systems from the ground up.
    From designing and developing web applications to deploying and operating scalable cloud infrastructure,
    I strive to deliver clean, maintainable solutions across the full stack.`,
  links: [
    { label: 'GitHub', href: '#', display: 'github.com/zayyarnaing' },
    { label: 'LinkedIn', href: '#', display: 'linkedin.com/in/zayyarnaing' },
    { label: 'Email', href: '#', display: 'zayarnaing.pp@gmail.com' },
    { label: 'X / Twitter', href: '#', display: '@zayyarnaing' },
  ],
  skills: [
    {
      group: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'Bash'],
    },
    {
      group: 'Frontend',
      items: ['React', 'Vue', 'HTML / CSS', 'Tailwind CSS', 'Vite'],
    },
    {
      group: 'Backend',
      items: ['Node.js', 'Express', 'REST API', 'GraphQL', 'PostgreSQL', 'MySQL'],
    },
    {
      group: 'Infrastructure',
      items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Linux', 'Nginx', 'Terraform', 'CI/CD'],
    },
  ],
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <TerminalBg />
      <button
        className="theme-toggle"
        onClick={() => setDark(d => !d)}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
      <main className="portfolio">
        {/* About */}
        <section className="section">
          <h1 className="about-name">{data.name}</h1>
          <p className="about-title">{data.title}</p>
          <p className="about-bio">{data.bio}</p>
        </section>

        {/* Links */}
        <section className="section">
          <h2 className="section-heading">Links</h2>
          <ul className="links-list">
            {data.links.map((link) => (
              <li key={link.label}>
                <span className="link-label">{link.label}</span>
                <a className="link-value" href={link.href}>
                  {link.display}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="section">
          <h2 className="section-heading">Skills</h2>
          {data.skills.map((group) => (
            <div key={group.group} className="skill-group">
              <p className="skill-group-label">{group.group}</p>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} ZayYarNaing</p>
          <p>
            <a href="#" target="_blank" rel="noopener noreferrer">View Source on GitHub</a>
            {' · '}Built with{' '}
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>
          </p>
        </footer>
      </main>
    </>
  )
}
