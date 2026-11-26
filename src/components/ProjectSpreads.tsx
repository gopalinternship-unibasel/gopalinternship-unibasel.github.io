import { Link } from '@tanstack/react-router'

import type { Project } from '@/data/projects'
import { roleLabel, type Role } from '@/data/roles'
import { Diagram } from './diagrams'

const tones = ['paper', 'zone', 'ink'] as const

/**
 * The immersive version of the project index: each project takes the whole
 * screen in turn and the next one slides over it as you scroll, with the
 * sketch drawn large. Below the lg breakpoint the spreads simply stack.
 */
export function ProjectSpreads({ projects, role }: { projects: Project[]; role: Role | null }) {
  return (
    <div className="spreads mt-10 md:mt-14">
      {projects.map((p, i) => {
        const relevant = role !== null && p.roles.includes(role)
        return (
          <article key={p.slug} className="spread" data-tone={tones[i % tones.length]} aria-labelledby={`spread-${p.slug}`}>
            <div className="mx-auto w-full max-w-[1440px] px-gutter grid grid-cols-12 gap-x-6 gap-y-8 items-center">
              <div className="col-span-12 lg:col-span-5">
                <p className="text-sm text-muted">
                  {i + 1} of {projects.length}
                  {p.year ? `, ${p.year}` : ''}
                  {relevant && (
                    <>
                      <span aria-hidden>. </span>
                      <span className="text-accent-deep">Relevant for {roleLabel(role)}</span>
                    </>
                  )}
                </p>
                <h3 id={`spread-${p.slug}`} className="headline text-2xl md:text-3xl mt-3">
                  {p.title}
                </h3>
                <p className="mt-5 text-md md:text-lg leading-[1.35] max-w-[44ch] text-text">{p.tagline}</p>
                <p className="mt-5 text-sm text-muted">{p.stack.slice(0, 5).join(' / ')}</p>
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="btn mt-8">
                  Open the project
                </Link>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <div className="diagram-frame p-4 md:p-8">
                  <Diagram id={p.diagram} />
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
