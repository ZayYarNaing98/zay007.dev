// Server entry used only at build time by scripts/postbuild.mjs to
// pre-render the page to static HTML. Never shipped to the browser.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { data } from './data'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
