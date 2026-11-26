import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { nav, profile } from '@/data/profile'
import { useView } from '@/lib/view'

/** Which section is in view on the front page; drives the underline in the nav. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const sections = nav
      .map((n) => document.getElementById(n.hash))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [enabled])
  return active
}

function ViewToggle({ className = '' }: { className?: string }) {
  const { view, toggleView } = useView()
  const on = view === 'immersive'
  return (
    <button
      type="button"
      className={`view-toggle ${className}`}
      aria-pressed={on}
      onClick={toggleView}
      title={on ? 'Switch to the plain view' : 'Switch to the immersive view'}
    >
      <span className="dot" aria-hidden />
      Immersive view
    </button>
  )
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname === '/'
  const active = useActiveSection(isHome)
  const [open, setOpen] = useState(false)
  const firstLink = useRef<HTMLAnchorElement>(null)

  // Close the menu on navigation, lock scroll while it is open, close on Escape.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="site-header sticky top-0 z-40 bg-paper/95">
      <div className="mx-auto max-w-[1440px] px-gutter h-16 flex items-center justify-between">
        <Link to="/" className="title text-md hover:text-accent-deep transition-colors" aria-label="Gopal Krishna, home">
          {profile.name}
        </Link>

        <nav aria-label="Sections" className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.hash}
              to="/"
              hash={n.hash}
              className="link text-base"
              style={{
                textDecorationColor: active === n.hash ? 'var(--color-accent)' : undefined,
                textDecorationThickness: active === n.hash ? '2px' : undefined,
              }}
              aria-current={active === n.hash ? 'location' : undefined}
            >
              {n.label}
            </Link>
          ))}
          <ViewToggle className="ml-2" />
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center gap-2 text-base font-medium -mr-2 px-2 py-2 rounded-xs cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="mobile-menu md:hidden fixed inset-0 top-16 z-50 flex flex-col">
          <nav aria-label="Sections" className="px-gutter pt-10 flex flex-col gap-2">
            {nav.map((n, i) => (
              <Link
                key={n.hash}
                to="/"
                hash={n.hash}
                ref={i === 0 ? firstLink : undefined}
                className="headline text-3xl !text-white py-2 border-b border-white/15"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="px-gutter pt-8">
            <ViewToggle />
          </div>
          <div className="mt-auto px-gutter pb-10 text-base">
            <p className="text-[#a3a39c]">{profile.location}</p>
            <a href={`mailto:${profile.email}`} className="link !text-white">
              {profile.email}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
