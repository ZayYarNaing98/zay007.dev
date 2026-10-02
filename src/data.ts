// Single source of truth for all portfolio content.
// Consumed by the React UI (App.tsx) AND the build-time agent-file
// generator (scripts/postbuild.mjs) so the rendered page, llms.txt,
// sitemap.xml and JSON-LD can never drift apart.

export interface Link {
  label: string
  href: string
  display: string
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface PortfolioData {
  name: string
  title: string
  /** Canonical site URL, no trailing slash. */
  url: string
  bio: string
  links: Link[]
  skills: SkillGroup[]
}

export const data: PortfolioData = {
  name: 'ZayYarNaing',
  title: 'Software Engineer / Infrastructure Engineer',
  url: 'https://zay007.zayarnaing-pp.workers.dev',
  bio: `I'm a software and infrastructure engineer who enjoys building reliable systems from the ground up.
    From designing and developing web applications to deploying and operating scalable cloud infrastructure,
    I strive to deliver clean, maintainable solutions across the full stack.`,
  links: [
    { label: 'GitHub', href: 'https://github.com/ZayYarNaing98', display: 'github.com/zayyarnaing' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zay-yar-naing-b76399255', display: 'linkedin.com/in/zayyarnaing' },
    { label: 'Email', href: 'mailto:zayarnaing.pp@gmail.com', display: 'zayarnaing.pp@gmail.com' },
    { label: 'X', href: 'https://x.com/ZayYarN81868814', display: '@zayyarnaing' },
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

/** Collapse the multi-line bio into a single clean sentence run. */
export function plainBio(d: PortfolioData = data): string {
  return d.bio.replace(/\s+/g, ' ').trim()
}
