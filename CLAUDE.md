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
