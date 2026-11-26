import { Link } from '@tanstack/react-router'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useMemo, useRef, useState } from 'react'

import { roleLabel } from '@/data/roles'
import { canvas, clusters, contexts, roleContexts } from '@/data/skills'
import { useView } from '@/lib/view'
import { SectionHeading } from './SectionHeading'

/**
 * Skills as a map rather than a list of bars. Each skill is a point inside
 * its cluster; choosing a project, internship or course lights up the
 * skills it drew on and dims the rest, and a line is drawn through them.
 * If the visitor said what they are hiring for, that selection is the
 * starting point. The list on the right is the accessible version of the
 * same data and reacts the same way, so the SVG is purely visual and hidden
 * from assistive technology.
 */
export function SkillsMap() {
  const { role } = useView()
  const [context, setContext] = useState<string | null>(null)
  const [hoverSkill, setHoverSkill] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const mapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(mapRef, { once: true, margin: '-15% 0px' })

  const activeSkills = useMemo(() => {
    const ctx = contexts.find((c) => c.id === context)
    if (ctx) return new Set(ctx.skills)
    if (role) {
      return new Set(roleContexts[role].flatMap((id) => contexts.find((c) => c.id === id)?.skills ?? []))
    }
    return null
  }, [context, role])

  const contextsWithSkill = useMemo(() => {
    if (!hoverSkill) return null
    return new Set(contexts.filter((c) => c.skills.includes(hoverSkill)).map((c) => c.id))
  }, [hoverSkill])

  const stateFor = (id: string) => {
    const on = (activeSkills?.has(id) ?? false) || hoverSkill === id
    const dim = (activeSkills !== null && !activeSkills.has(id)) || (hoverSkill !== null && hoverSkill !== id && !on)
    return { on, dim }
  }

  // A short line through the highlighted skills of each cluster, left to
  // right: one small constellation per cluster, never across the map.
  const constellation = useMemo(() => {
    if (!activeSkills || activeSkills.size < 2) return null
    const parts = clusters
      .map((cl) => cl.skills.filter((s) => activeSkills.has(s.id)).sort((a, b) => a.x - b.x || a.y - b.y))
      .filter((pts) => pts.length >= 2)
      .map((pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' '))
    return parts.length ? parts.join(' ') : null
  }, [activeSkills])

  const activeLabel = contexts.find((c) => c.id === context)
  let order = 0

  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-gutter py-20 md:py-28">
        <SectionHeading
          id="skills-heading"
          title="Skills, plotted"
          lede="A map instead of a list. Pick a project, an internship or a course to see which skills it drew on; what sits close together tends to get used together."
        />

        <div className="mt-10 md:mt-14 flex flex-wrap gap-2" role="group" aria-label="Highlight the skills used in">
          <button type="button" className="chip" aria-pressed={context === null} onClick={() => setContext(null)}>
            {role ? `All for ${roleLabel(role).toLowerCase()}` : 'Everything'}
          </button>
          {contexts.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={context === c.id}
              data-has={contextsWithSkill?.has(c.id) ? 'true' : undefined}
              onClick={() => setContext((cur) => (cur === c.id ? null : c.id))}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
          {/* The map: decorative mirror of the list. */}
          <div ref={mapRef} className="hidden md:block col-span-12 lg:col-span-8">
            <svg viewBox={`0 0 ${canvas.w} ${canvas.h}`} className="w-full h-auto" aria-hidden="true" focusable="false">
              {clusters.map((cl) => (
                <g key={`hull-${cl.id}`}>
                  <rect x={cl.box.x} y={cl.box.y} width={cl.box.w} height={cl.box.h} rx={3} className="cluster-hull" />
                  <text x={cl.box.x + 12} y={cl.box.y + 22} className="cluster-label">
                    {cl.label}
                  </text>
                </g>
              ))}
              {constellation && !reduce && <path key={constellation} d={constellation} pathLength={1} className="constellation" />}
              {constellation && reduce && <path d={constellation} className="constellation-still" />}
              {clusters.map((cl) =>
                cl.skills.map((s) => {
                  const { on, dim } = stateFor(s.id)
                  const i = order++
                  return (
                    <motion.g
                      key={s.id}
                      className="skill-point"
                      data-on={on ? 'true' : undefined}
                      data-dim={dim ? 'true' : undefined}
                      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                      animate={inView ? { opacity: 1, scale: 1 } : undefined}
                      transition={{ delay: 0.03 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                      onMouseEnter={() => setHoverSkill(s.id)}
                      onMouseLeave={() => setHoverSkill(null)}
                    >
                      <circle cx={s.x} cy={s.y} r={on ? 7 : 5} />
                      <text x={s.x + 13} y={s.y + 5}>
                        {s.label}
                      </text>
                    </motion.g>
                  )
                }),
              )}
            </svg>
          </div>

          {/* The list: the same data, readable by everyone. */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-sm text-muted mb-4" aria-live="polite">
              {activeLabel ? (
                <>
                  Highlighted: skills used in {activeLabel.label}
                  {activeLabel.slug && (
                    <>
                      {' '}
                      (
                      <Link to="/projects/$slug" params={{ slug: activeLabel.slug }} className="link">
                        open project
                      </Link>
                      )
                    </>
                  )}
                  .
                </>
              ) : role ? (
                <>Highlighted: everything that counts for {roleLabel(role).toLowerCase()}. Choose a project above to narrow it down.</>
              ) : (
                'Everything, grouped. Choose a project above to narrow it down.'
              )}
            </p>
            <dl>
              {clusters.map((cl) => (
                <div key={cl.id} className="py-3 border-t border-rule grid grid-cols-[8.5rem_1fr] gap-x-4">
                  <dt className="text-sm text-muted pt-0.5">{cl.label}</dt>
                  <dd className="text-base leading-[1.6]">
                    {cl.skills.map((s, i) => {
                      const { on, dim } = stateFor(s.id)
                      return (
                        <span key={s.id}>
                          {i > 0 && <span aria-hidden>, </span>}
                          <span
                            className="skill-tag"
                            data-on={on ? 'true' : undefined}
                            data-dim={dim ? 'true' : undefined}
                            onMouseEnter={() => setHoverSkill(s.id)}
                            onMouseLeave={() => setHoverSkill(null)}
                          >
                            {s.label}
                          </span>
                        </span>
                      )
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
