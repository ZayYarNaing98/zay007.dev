// Redirects the workers.dev URL to the canonical custom domain;
// every other request is served from the static assets as usual.
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
}

const CANONICAL_ORIGIN = 'https://zayarnaing.com'

export default {
  fetch(request: Request, env: Env): Promise<Response> | Response {
    const url = new URL(request.url)
    if (url.hostname.endsWith('.workers.dev')) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301)
    }
    return env.ASSETS.fetch(request)
  },
}
