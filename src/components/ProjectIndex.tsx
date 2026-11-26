import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'

import { projects } from '@/data/projects'
import { roleLabel } from '@/data/roles'
import { useView } from '@/lib/view'
import { Diagram } from './diagrams'
import { ProjectSpreads } from './ProjectSpreads'
import { SectionHeading } from './SectionHeading'

const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']

/** The number of projects spelt out for the lede, so it never goes stale. */
function countWord(n: number) {
  return COUNT_WORDS[n] ?? String(n)
}

/**
 * Projects as an index, not a card grid: one row per project, the whole row
 * inverting on hover, and a sketch of the hovered project held in a sticky
 * panel beside the list. In the immersive view the rows become full-screen
 * spreads. When the visitor has said what they are hiring for, matching
 * projects move to the top.
 */
export function ProjectIndex({ standalone = false }: { standalone?: boolean }) {
  const { immersive, role } = useView()
  const ordered = useMemo(
    () => (role ? [...projects].sort((a, b) => Number(b.roles.includes(role)) - Number(a.roles.includes(role))) : projects),
    [role],
  )
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const active = ordered.find((p) => p.slug === activeSlug) ?? ordered[0]
  const reduce = useReducedMotion()

  const lede = immersive
    ? 'Each project takes the screen in turn. Scroll through them; open any for the full account.'
    : `${countWord(projects.length)} pieces of work, from a streaming system to hackathon products. Hover a row for a sketch of how it works; open it for the full account.`

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-gutter py-20 md:py-28">
        <SectionHeading
          id="projects-heading"
          as={standalone ? 'h1' : 'h2'}
          title={standalone ? 'Projects' : 'Selected projects'}
          lede={lede}
        />
        {role && (
          <p className="mt-6 text-sm text-accent-deep" aria-live="polite">
            Ordered for {roleLabel(role).toLowerCase()}.
          </p>
        )}
      </div>

      {immersive ? (
        <ProjectSpreads projects={ordered} role={role} />
      ) : (
        <div className="mx-auto max-w-[1440px] px-gutter pb-20 md:pb-28 grid grid-cols-12 gap-x-6">
          <ul className="col-span-12 lg:col-span-7 list-none" onMouseLeave={() => setActiveSlug(ordered[0].slug)}>
            {ordered.map((p, i) => (
              <li key={p.slug} className="border-t border-rule last:border-b">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="project-row py-6 md:py-7 grid grid-cols-12 gap-x-4 gap-y-2"
                  style={{ '--row-bleed': '1rem' } as React.CSSProperties}
                  data-active={!standalone && activeSlug === p.slug && i !== 0 ? 'true' : undefined}
                  onMouseEnter={() => setActiveSlug(p.slug)}
                  onFocus={() => setActiveSlug(p.slug)}
                >
                  <div className="col-span-12 md:col-span-2 text-sm muted-row text-muted pt-1 md:pt-2">
                    {p.year ?? ''}
                    {p.year && <br />}
                    {p.team}
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="title text-xl md:text-2xl leading-[1.05]">{p.title}</h3>
                    <p className="mt-3 text-base md:text-md max-w-[52ch] muted-row text-muted leading-[1.4]">{p.tagline}</p>
                    <p className="mt-4 text-sm muted-row text-muted">
                      {p.stack.slice(0, 5).map((s, j) => (
                        <span key={s}>
                          {j > 0 && <span aria-hidden> / </span>}
                          {s}
                        </span>
                      ))}
                    </p>
                    {role && p.roles.includes(role) && (
                      <p className="mt-2 text-sm text-accent-deep muted-row">Relevant for {roleLabel(role).toLowerCase()}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
            <div className="sticky top-24">
              <figure className="diagram-frame p-6 aspect-[600/380]" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.slug}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <Diagram id={active.diagram} />
                  </motion.div>
                </AnimatePresence>
              </figure>
              <p className="mt-3 text-sm text-muted">
                {active.title}: {active.context}
                {active.year ? `, ${active.year}` : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
