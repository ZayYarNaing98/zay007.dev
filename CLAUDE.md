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

All portfolio data (name, title, bio, links, skills, projects) lives in the `data` object at the top of `src/App.tsx`. To update content, edit that object — no other files need to change.

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
