// Single source of truth for all portfolio content.
// Consumed by the React UI (App.tsx) AND the build-time agent-file
// generator (scripts/postbuild.mjs) so the rendered page, llms.txt,
// sitemap.xml and JSON-LD can never drift apart.

export interface Link {
  label: string
  href: string
  display: string
  /** Serve as a file download (e.g. the CV PDF) instead of navigating. */
  download?: boolean
}

export interface StackLine {
  key: string
  value: string
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface Experience {
  role: string
  company: string
  period: string
  location: string
  highlights: string[]
}

export interface PortfolioData {
  name: string
  title: string
  /** Canonical site URL, no trailing slash. */
  url: string
  bio: string
  /** Status pill in the hero, e.g. "Open to remote roles". */
  availability: string
  /** One-line pitch in the closing contact block. */
  contactNote: string
  /** Lines shown in the hero's `cat stack.yml` terminal card. */
  stack: StackLine[]
  links: Link[]
  experience: Experience[]
  skills: SkillGroup[]
}

export const data: PortfolioData = {
  name: 'Zay Yar Naing',
  title: 'Software Engineer / DevOps Engineer',
  url: 'https://zayarnaing.com',
  bio: `I'm a senior software engineer with a DevOps focus and a strong full-stack background.
    I build reliable systems end to end, from designing web applications and RESTful APIs to automating
    infrastructure as code, running zero-downtime CI/CD pipelines, and operating scalable, well-monitored cloud platforms.`,
  availability: 'Open to remote roles',
  contactNote: "I'm open to remote backend / DevOps roles and contract work. I usually reply within a day.",
  stack: [
    { key: 'role', value: 'senior-software + devops' },
    { key: 'apps', value: '[laravel, next.js, react, node]' },
    { key: 'infra', value: '[docker, kubernetes, terraform, ansible]' },
    { key: 'cloud', value: '[aws, gcp, digitalocean]' },
    { key: 'deploys', value: 'blue/green, zero-downtime' },
    { key: 'observability', value: '[new-relic, grafana, slo]' },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/ZayYarNaing98', display: 'github.com/ZayYarNaing98' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zay-yar-naing-b76399255', display: 'linkedin.com/in/zay-yar-naing-b76399255' },
    { label: 'Email', href: 'mailto:zayarnaing.pp@gmail.com', display: 'zayarnaing.pp@gmail.com' },
    { label: 'X', href: 'https://x.com/ZayYarN81868814', display: '@ZayYarN81868814' },
    { label: 'CV', href: '/zayarnaing-cv.pdf', display: 'Download CV (PDF)', download: true },
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'AcePlusSolutions Company Limited',
      period: 'Jun 2023 – Present',
      location: 'Yangon, Myanmar',
      highlights: [
        'Build RESTful APIs for web and mobile applications, and deploy and maintain modern web apps.',
        'Build and maintain a CI/CD pipeline with Ansible for containerized APIs using blue/green environments for zero-downtime deployments.',
        'Use Docker and Linux for containerization and efficient application deployment in an Agile Scrum team.',
        'Develop monitoring and observability solutions with New Relic and Grafana.',
        'Generate infrastructure diagrams from existing Terraform code, improving visibility and collaboration.',
        'Identify and remediate critical security vulnerabilities uncovered during penetration testing.',
        'Make technical decisions, refactor code, and provide code reviews and feedback to team members.',
        'Mentor junior developers and standardize team coding practices.',
      ],
    },
    {
      role: 'DevOps Engineer',
      company: 'Hivelocity (APS outsourced services)',
      period: 'Aug 2024 – Sep 2025',
      location: 'Japan',
      highlights: [
        'Managed high-traffic fan event platforms on AWS, delivering instant, reliable access during major releases.',
        'Built a resilient CI/CD pipeline for containerized APIs with blue/green deployments for zero-downtime releases.',
        'Contributed to migrating microservices and Hivelocloud API servers from EC2 to a containerized architecture, boosting performance and scalability.',
        'Supported the transition to Aurora Serverless, improving database scalability and data retrieval performance.',
        'Automated deployment and maintenance workflows with Python, Terraform, and Ansible, and produced infrastructure diagrams from existing Terraform code.',
        'Integrated Slack ChatOps with AWS ECS APIs for real-time deployment control and monitoring.',
        'Redefined SLOs with New Relic and set up proactive Slack alerting, improving incident response times.',
        'Designed load testing benchmarks and defined SLI/SLO metrics for new microservices.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Leaptechnology',
      period: 'Dec 2024 – Sep 2026',
      location: 'Singapore (Remote)',
      highlights: [
        'Developed an integrated management software system for interior design companies.',
        'Built RESTful APIs using Laravel with a Domain-Driven Design (DDD) architecture.',
        'Resolved critical security vulnerabilities identified during a penetration test.',
        'Made key technical decisions, performed code refactoring, and reviewed code for team members.',
      ],
    },
  ],
  skills: [
    {
      group: 'Languages',
      items: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL', 'Bash'],
    },
    {
      group: 'Frontend',
      items: ['React', 'Next.js', 'HTML / CSS', 'Tailwind CSS', 'Bootstrap', 'Sass', 'jQuery', 'Vite', 'Webpack'],
    },
    {
      group: 'Backend',
      items: ['Laravel', 'Node.js', 'REST API', 'GraphQL', 'Domain-Driven Design', 'PostgreSQL', 'MySQL'],
    },
    {
      group: 'Infrastructure',
      items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'DigitalOcean', 'Linux / Ubuntu', 'Nginx', 'Apache', 'Terraform', 'Ansible'],
    },
    {
      group: 'CI/CD & Observability',
      items: ['GitHub Actions', 'CircleCI', 'Blue/Green Deployments', 'New Relic', 'Grafana', 'Uptime Kuma', 'SLI / SLO'],
    },
    {
      group: 'Tools',
      items: ['Git', 'GitLab', 'Jira', 'Blue', 'Agile Scrum'],
    },
  ],
}

/** Collapse the multi-line bio into a single clean sentence run. */
export function plainBio(d: PortfolioData = data): string {
  return d.bio.replace(/\s+/g, ' ').trim()
}
