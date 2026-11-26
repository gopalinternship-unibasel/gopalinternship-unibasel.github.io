import { Link } from '@tanstack/react-router'
import { useEffect, useState, type CSSProperties } from 'react'

import { profile } from '@/data/profile'
import { roles } from '@/data/roles'
import { useView } from '@/lib/view'
import { HeroField } from './HeroField'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/**
 * The hero is the one choreographed moment on the site: place and date,
 * the intro and the name rise in sequence once on load. In the immersive
 * view a live field runs behind it, the date becomes a greeting with the
 * time in Basel, and the visitor can say what they are hiring for.
 */
export function Hero() {
  const [first, last] = profile.name.split(' ')
  const { immersive, setView, role, setRole } = useView()

  return (
    <section id="hero" aria-labelledby="hero-name" className="relative isolate overflow-hidden bg-paper">
      {immersive && <HeroField />}

      <div className="mx-auto max-w-[1440px] px-gutter pt-6 md:pt-10 pb-16 md:pb-20 min-h-[calc(100svh-4rem)] grid grid-cols-12 gap-x-6 content-between">
        {/* Top row: place and date (or the greeting) left, intro right */}
        <div className="col-span-12 md:col-span-4 text-sm text-muted fade-in" style={delay(100)}>
          {immersive ? (
            <Greeting />
          ) : (
            <p>
              {profile.location}
              <br />
              {profile.lastUpdated}
            </p>
          )}
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7 mt-10 md:mt-0">
          <p className="clip-line text-md md:text-lg leading-[1.3] max-w-[44ch] text-text" style={delay(250)}>
            <span>{profile.intro}</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 fade-in" style={delay(700)}>
            <Link to="/" hash="projects" className="btn">
              See the projects
            </Link>
            <a href={`mailto:${profile.email}`} className="link text-base">
              Email me
            </a>
            {!immersive && (
              <button type="button" className="link text-base cursor-pointer" onClick={() => setView('immersive')}>
                Switch to the immersive view
              </button>
            )}
          </div>

          {immersive && (
            <div className="mt-10 fade-in" style={delay(850)}>
              <p className="text-sm text-muted max-w-[40ch]">
                What are you hiring for? Pick one and the relevant work and skills come first.
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="What are you hiring for">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className="chip"
                    aria-pressed={role === r.id}
                    onClick={() => setRole(role === r.id ? null : r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom row: the name, with the statement sitting beside the first line */}
        <div className="col-span-12 mt-20 md:mt-28 grid grid-cols-12 gap-x-6 items-end">
          <h1 id="hero-name" className="display text-display col-span-12 lg:col-span-8 order-2 lg:order-1 -ml-[0.05em]">
            <span className="clip-line" style={delay(400)}>
              <span>{first}</span>
            </span>
            <span className="clip-line" style={delay(520)}>
              <span>{last}</span>
            </span>
          </h1>
          <p
            className="headline text-xl md:text-2xl lg:text-xl xl:text-2xl col-span-12 lg:col-span-4 order-1 lg:order-2 mb-12 lg:mb-[0.35em] max-w-[22ch] clip-line"
            style={delay(650)}
          >
            <span>{profile.statement}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

/** Time of day in Basel, computed in the visitor's browser and refreshed every half minute. */
function Greeting() {
  const [now, setNow] = useState<{ greeting: string; time: string } | null>(null)
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Europe/Zurich' }).format(d))
      const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' }).format(d)
      const greeting = hour < 5 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
      setNow({ greeting, time })
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <p>
      {now ? `${now.greeting}. It is ${now.time} in Basel.` : profile.location}
      <br />
      {profile.lastUpdated}
    </p>
  )
}
