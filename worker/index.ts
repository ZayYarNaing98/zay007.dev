// Redirects the workers.dev URL to the canonical custom domain, answers the
// page-view counter at /api/views, and serves every other request from the
// static assets as usual.
interface ViewsService {
  get(): Promise<number>
  hit(): Promise<number>
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
  /** Service binding to the views-counter Worker (see views-counter/). */
  VIEWS: ViewsService
}

const CANONICAL_ORIGIN = 'https://zayarnaing.com'

async function handleViews(request: Request, env: Env): Promise<Response> {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...headers, Allow: 'GET, POST' },
    })
  }
  try {
    const views = request.method === 'POST' ? await env.VIEWS.hit() : await env.VIEWS.get()
    return new Response(JSON.stringify({ views }), { headers })
  } catch {
    return new Response(JSON.stringify({ error: 'Counter unavailable' }), { status: 503, headers })
  }
}

export default {
  fetch(request: Request, env: Env): Promise<Response> | Response {
    const url = new URL(request.url)
    if (url.hostname.endsWith('.workers.dev')) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301)
    }
    if (url.pathname === '/api/views') return handleViews(request, env)
    return env.ASSETS.fetch(request)
  },
}
