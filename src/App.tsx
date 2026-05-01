import './App.css'

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
  projects: [
    {
      name: 'Project Alpha',
      desc: 'A full-stack web application for managing tasks and workflows. Built with React on the frontend and Node.js on the backend, deployed on AWS with automated CI/CD pipelines.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      href: '#',
    },
    {
      name: 'Infra Toolkit',
      desc: 'A collection of Terraform modules and Bash scripts for provisioning cloud infrastructure on AWS and GCP, following best practices for security and scalability.',
      tags: ['Terraform', 'AWS', 'GCP', 'Bash', 'Docker'],
      href: '#',
    },
    {
      name: 'API Gateway Service',
      desc: 'A lightweight reverse proxy and API gateway service built in Go, with support for rate limiting, authentication, and dynamic routing.',
      tags: ['Go', 'Docker', 'Nginx', 'REST API'],
      href: '#',
    },
  ],
}

export default function App() {
  return (
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

      {/* Projects */}
      <section className="section">
        <h2 className="section-heading">Projects</h2>
        <div className="projects-list">
          {data.projects.map((project) => (
            <div key={project.name} className="project-card">
              <div className="project-header">
                <p className="project-name">{project.name}</p>
                <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">
                  View →
                </a>
              </div>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} ZayYarNaing</p>
        <p>
          <a href="#" target="_blank" rel="noopener noreferrer">View Source on GitHub</a>
          {' · '}Built with React + TypeScript
        </p>
      </footer>
    </main>
  )
}
