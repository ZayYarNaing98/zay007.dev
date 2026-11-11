import { useEffect, useState } from 'react'

// Counts one view per browser session: the first load in a session POSTs
// (increments), later loads only GET. The count comes from the
// views-counter Worker via the site Worker's /api/views route.
const SESSION_KEY = 'zay007:viewed'

function alreadyCounted(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function markCounted() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Storage blocked: the next load counts again, which is acceptable.
  }
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

export default function ViewCount() {
  // null until loaded (and on the pre-rendered HTML), so nothing shows if
  // the counter is unreachable.
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const method = alreadyCounted() ? 'GET' : 'POST'
    fetch('/api/views', { method, signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((body: { views?: unknown }) => {
        if (typeof body.views !== 'number') return
        if (method === 'POST') markCounted()
        setViews(body.views)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  if (views === null) return null
  return (
    <p className="view-count">
      <EyeIcon />
      <span>
        <strong>{views.toLocaleString('en-US')}</strong> {views === 1 ? 'view' : 'views'}
      </span>
    </p>
  )
}
