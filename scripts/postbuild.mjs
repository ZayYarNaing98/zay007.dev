// Post-build step: pre-render the SPA to static HTML and emit agent-native
// resources (JSON-LD, llms.txt, sitemap.xml) from the single content source
// in src/data.ts. Runs after `vite build` (see package.json "build").
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = resolve(import.meta.dirname, '..')

// Locate the built index.html (the Cloudflare/Vite output may nest it).
const candidates = [
  join(ROOT, 'dist', 'index.html'),
  join(ROOT, 'dist', 'client', 'index.html'),
]
const indexPath = candidates.find(existsSync)
if (!indexPath) {
  console.error('postbuild: could not find built index.html in', candidates)
  process.exit(1)
}
const distDir = dirname(indexPath)

// 1. SSR-build the server entry (react plugin only — we do not want the
//    Cloudflare plugin involved in the pre-render pass). Output lives under
//    node_modules so externalized deps (react) resolve normally.
const ssrOut = join(ROOT, 'node_modules', '.cache', 'zay-ssr')
await build({
  root: ROOT,
  logLevel: 'warn',
  plugins: [react()],
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: ssrOut,
    emptyOutDir: true,
    copyPublicDir: false,
  },
})

const { render, data } = await import(
  pathToFileURL(join(ssrOut, 'entry-server.js')).href
)

const SITE = data.url.replace(/\/$/, '')
const plainBio = data.bio.replace(/\s+/g, ' ').trim()

// 2. JSON-LD Person — lets agents parse the author as a structured entity.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: data.name,
  url: SITE + '/',
  jobTitle: data.title,
  description: plainBio,
  sameAs: data.links
    .filter((l) => l.href.startsWith('http'))
    .map((l) => l.href),
  knowsAbout: data.skills.flatMap((g) => g.items),
}
const jsonLdTag =
  '<script type="application/ld+json">' +
  JSON.stringify(jsonLd) +
  '</script>'

// 3. Inject pre-rendered markup + structured data into index.html.
let html = readFileSync(indexPath, 'utf8')
const appHtml = render()
html = html.replace('<!--ssr-outlet-->', appHtml)
html = html.replace('<!--ssr-head-->', jsonLdTag)
writeFileSync(indexPath, html)

// 4. llms.txt — the emerging standard for an agent-readable site summary.
const llms = [
  `# ${data.name}`,
  '',
  `> ${data.title}. ${plainBio}`,
  '',
  '## Links',
  ...data.links.map((l) => `- [${l.label}](${l.href}): ${l.display}`),
  '',
  '## Skills',
  ...data.skills.map((g) => `- **${g.group}**: ${g.items.join(', ')}`),
  '',
].join('\n')
writeFileSync(join(distDir, 'llms.txt'), llms)

// 5. sitemap.xml
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  `  <url><loc>${SITE}/</loc></url>\n` +
  '</urlset>\n'
writeFileSync(join(distDir, 'sitemap.xml'), sitemap)

// 6. Cleanup temp SSR build.
rmSync(ssrOut, { recursive: true, force: true })

console.log(
  `postbuild: pre-rendered ${indexPath} and wrote llms.txt + sitemap.xml`,
)
