# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (hot reload)
npm run build     # tsc type-check + vite build → dist/
npm run lint      # eslint on all .ts/.tsx files
npm run preview   # preview the production build locally
```

There is no test suite configured.

Type-check only (no emit):
```bash
npx tsc --noEmit
```

## Architecture

Single-page portfolio built with React 19 + TypeScript, bundled by Vite 8. No routing — the entire page is one component.

### Content

All portfolio content (name, title, url, bio, links, skills) lives in the `data` object in `src/data.ts` — the single source of truth. `src/App.tsx` renders it, and the build (`scripts/postbuild.mjs`) generates the agent-native files from it. To update content, edit `src/data.ts` only. Link icons are mapped by `link.label` via `iconMap` in `App.tsx`.

### Agent-native build (isitagentready.com)

The site is a client SPA, so `npm run build` runs an extra `scripts/postbuild.mjs` step that makes it readable to AI agents and no-JS crawlers:

- **Pre-render**: SSR-builds `src/entry-server.tsx` and injects the real HTML into `dist/index.html` at the `<!--ssr-outlet-->` marker. `src/main.tsx` then `hydrateRoot`s that markup (and falls back to `createRoot` in dev, where the root is empty).
- **JSON-LD** `Person` is generated from `data` and injected at the `<!--ssr-head-->` marker.
- **`dist/llms.txt`** and **`dist/sitemap.xml`** are generated from `data`.
- **`public/robots.txt`** (static) explicitly allows AI crawlers and points to the sitemap.

The canonical domain is hardcoded as `data.url` (`https://zay007.zayarnaing-pp.workers.dev`) in `src/data.ts`; meta/OG/canonical tags in `index.html` use the same domain. Change both if the domain changes.

### Styling

Two CSS files, no CSS framework:

- `src/index.css` — global reset, typography, CSS custom properties (`--bg`, `--fg`, `--muted`, `--accent`, `--border`, `--tag-bg`, `--tag-fg`, `--link`), and dark mode overrides via `@media (prefers-color-scheme: dark)`. Edit here to change the colour scheme.
- `src/App.css` — all layout and component styles, scoped by class names. Edit here to change spacing, card styles, section headings, etc.

### TypeScript config

Strict mode is on: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Target is ES2023, bundler module resolution.

## Deployment (Cloudflare Pages)

The site deploys as a static SPA to **Cloudflare Pages** (not Workers). `public/_redirects` is already configured to serve `index.html` for all routes.

### One-time setup

```bash
npm install -g wrangler
wrangler login
```

### Deploy

```bash
npm run build
wrangler pages deploy dist --project-name=zayyarnaing-portfolio
```

The live URL will be `zayyarnaing-portfolio.pages.dev` after the first deploy.

### Custom domain

1. Cloudflare Dashboard → Pages → project → **Custom domains**
2. Add your domain — Cloudflare sets the DNS record automatically if the domain is managed by Cloudflare, or provides a `CNAME` record to add at your registrar.

### Auto-deploy via GitHub

Connect the repo in Cloudflare Pages dashboard:
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` triggers a redeploy automatically.
