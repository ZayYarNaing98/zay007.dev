# ZayYarNaing — Portfolio

Personal portfolio site for **ZayYarNaing**, Software Engineer & Infrastructure Engineer.

Live: [zayyarnaing-portfolio.pages.dev](https://zay007.zayarnaing-pp.workers.dev)  
Source: [github.com/ZayYarNaing98/zay007.dev](https://github.com/ZayYarNaing98/zay007.dev.git)

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — build tool & dev server
- **Cloudflare Pages** — deployment
- Built with [Claude Code](https://claude.ai/code)

## Features

- Animated Linux terminal background (`zayyarnaing@zay007:~$`)
- Dark / light mode toggle (default: dark)
- Fully responsive — mobile, tablet, desktop
- Monospace design with purple accent theme

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build → dist/
npm run lint       # eslint
npm run preview    # preview production build
```

## Update Content

All portfolio content (name, bio, links, skills) is in the `data` object at the top of `src/App.tsx`. Edit that object — no other files need changing.

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name=zay007
```

Or connect the GitHub repo in the Cloudflare Pages dashboard for automatic deploys on every push:
- Build command: `npm run build`
- Output directory: `dist`

## Custom Domain

Cloudflare Dashboard → Pages → project → **Custom domains** → add your domain.
