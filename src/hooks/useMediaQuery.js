import { useState, useEffect } from 'react'

// Breakpoints en accord avec tokens.css
export const BREAKPOINTS = {
  sm:  '(min-width: 640px)',
  md:  '(min-width: 768px)',
  lg:  '(min-width: 1024px)',
  xl:  '(min-width: 1280px)',
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Raccourcis pratiques
export function useIsMobile()  { return !useMediaQuery(BREAKPOINTS.md) }
export function useIsTablet()  { return useMediaQuery(BREAKPOINTS.md) && !useMediaQuery(BREAKPOINTS.lg) }
export function useIsDesktop() { return useMediaQuery(BREAKPOINTS.lg) }
