import { useSyncExternalStore } from 'react'

// Theme lives on <html data-theme>. An inline script in index.html sets it
// before first paint (saved choice, else the system setting, else dark), so
// this hook only reads it back and keeps it in sync.
const KEY = 'theme'
const listeners = new Set<() => void>()

function saved(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function apply(dark: boolean) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  listeners.forEach(notify => notify())
}

function subscribe(notify: () => void) {
  listeners.add(notify)
  // Follow live system changes until the visitor picks a theme themselves.
  const query = window.matchMedia('(prefers-color-scheme: light)')
  const onSystemChange = () => {
    if (saved() !== 'light' && saved() !== 'dark') apply(!query.matches)
  }
  query.addEventListener('change', onSystemChange)
  return () => {
    listeners.delete(notify)
    query.removeEventListener('change', onSystemChange)
  }
}

const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light'

export function useDarkTheme(): [boolean, () => void] {
  // The pre-rendered HTML is dark; React re-renders after hydration if not.
  const dark = useSyncExternalStore(subscribe, isDark, () => true)
  const toggle = () => {
    const next = !isDark()
    try {
      localStorage.setItem(KEY, next ? 'dark' : 'light')
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
    apply(next)
  }
  return [dark, toggle]
}
