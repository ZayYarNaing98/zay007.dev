import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds are pre-rendered (scripts/postbuild.mjs), so the root
// already contains markup we hydrate. In dev the root is empty, so we mount.
// The development placeholder comment is a child node, but is not SSR markup.
if (root.childElementCount > 0) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
