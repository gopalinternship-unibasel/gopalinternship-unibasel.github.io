import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { roles, type Role } from '@/data/roles'

/**
 * Two ways to see the site.
 *  plain:     the editorial version, quiet and fast.
 *  immersive: colour-blocked sections, a live data field behind the name,
 *             full-screen project spreads and the "what are you hiring for"
 *             selector.
 * The choice and the role are kept in localStorage. A tiny inline script in
 * the document head applies the saved view before first paint, so there is
 * no flash; React picks the same value up after mount.
 */
export type View = 'plain' | 'immersive'

export const VIEW_KEY = 'gk-view'
export const ROLE_KEY = 'gk-role'

interface ViewState {
  view: View
  /** True once the client has read storage; before that, everything renders plain. */
  mounted: boolean
  /** mounted && view === 'immersive' */
  immersive: boolean
  setView: (v: View) => void
  toggleView: () => void
  role: Role | null
  setRole: (r: Role | null) => void
}

const ViewContext = createContext<ViewState | null>(null)

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>('plain')
  const [role, setRoleState] = useState<Role | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(VIEW_KEY) === 'immersive') setViewState('immersive')
      const r = localStorage.getItem(ROLE_KEY)
      if (r && roles.some((x) => x.id === r)) setRoleState(r as Role)
    } catch {
      // storage blocked: stay plain
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.dataset.view = view
    try {
      localStorage.setItem(VIEW_KEY, view)
    } catch {
      // ignore
    }
  }, [view, mounted])

  useEffect(() => {
    if (!mounted) return
    try {
      if (role) localStorage.setItem(ROLE_KEY, role)
      else localStorage.removeItem(ROLE_KEY)
    } catch {
      // ignore
    }
  }, [role, mounted])

  const setView = useCallback((v: View) => setViewState(v), [])
  const toggleView = useCallback(() => setViewState((v) => (v === 'plain' ? 'immersive' : 'plain')), [])
  const setRole = useCallback((r: Role | null) => setRoleState(r), [])

  const value = useMemo<ViewState>(
    () => ({ view, mounted, immersive: mounted && view === 'immersive', setView, toggleView, role, setRole }),
    [view, mounted, setView, toggleView, role, setRole],
  )

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

export function useView() {
  const ctx = useContext(ViewContext)
  if (!ctx) throw new Error('useView must be used inside ViewProvider')
  return ctx
}
