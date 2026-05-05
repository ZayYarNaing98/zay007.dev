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
    { label: 'GitHub', icon: GitHubIcon, href: 'https://github.com/ZayYarNaing98', display: 'github.com/zayyarnaing' },
    { label: 'LinkedIn', icon: LinkedInIcon, href: 'https://www.linkedin.com/in/zay-yar-naing-b76399255', display: 'linkedin.com/in/zayyarnaing' },
    { label: 'Email', icon: EmailIcon, href: 'mailto:zayarnaing.pp@gmail.com', display: 'zayarnaing.pp@gmail.com' },
    { label: 'X', icon: XIcon, href: 'https://x.com/ZayYarN81868814', display: '@zayyarnaing' },
  ],
  skills: [
    {
      group: 'Languages',
      items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'Bash'],
    },
    {
      group: 'Frontend',
      items: ['React', 'Next.js', 'HTML / CSS', 'Tailwind CSS', 'Vite'],
    },
    {
      group: 'Backend',
      items: ['Node.js', 'Laravel', 'REST API', 'GraphQL', 'PostgreSQL', 'MySQL'],
    },
    {
      group: 'Infrastructure',
      items: ['Docker', 'AWS', 'GCP', 'Linux', 'Nginx', 'Terraform', 'Ansible', 'CI/CD', 'Monitoring (Grafana, New Relic)'],
    },
  ],
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
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
                <span className="link-label">
                  <link.icon />
                  {link.label}
                </span>
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
            <a href="https://github.com/ZayYarNaing98/zay007.dev.git" target="_blank" rel="noopener noreferrer">View Source on GitHub</a>
            {' · '}Built with{' '}
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>
          </p>
        </footer>
      </main>
    </>
  )
}
