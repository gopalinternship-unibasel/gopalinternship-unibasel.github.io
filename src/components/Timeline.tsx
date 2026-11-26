import { Link } from '@tanstack/react-router'

import { certificates, timeline } from '@/data/timeline'
import { SectionHeading } from './SectionHeading'

/**
 * Background as a dated list, newest first. The left column carries the
 * dates, which is the only reason the rows are ordered and ruled.
 */
export function Timeline() {
  return (
    <section id="background" aria-labelledby="background-heading" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-gutter py-20 md:py-28">
      <SectionHeading id="background-heading" title="Background" lede="Education, work, hackathons and the odd event, newest first." />

      <ol className="mt-12 md:mt-16 list-none">
        {timeline.map((t) => (
          <li key={`${t.sort}-${t.title}`} className="grid grid-cols-12 gap-x-6 gap-y-2 py-6 md:py-7 border-t border-rule">
            <div className="col-span-6 md:col-span-2 title text-md">{t.when}</div>
            <div className="col-span-6 md:col-span-2 text-sm text-muted md:pt-1">{t.kind}</div>
            <div className="col-span-12 md:col-span-8 lg:col-span-7">
              <h3 className="title text-md md:text-lg leading-[1.2]">
                {t.projectSlug ? (
                  <Link to="/projects/$slug" params={{ slug: t.projectSlug }} className="link">
                    {t.title}
                  </Link>
                ) : (
                  t.title
                )}
              </h3>
              <p className="mt-1 text-base text-muted">
                {t.org}
                {t.place ? `, ${t.place}` : ''}
              </p>
              {t.details?.map((d) => (
                <p key={d.slice(0, 24)} className="mt-3 text-base max-w-[62ch] text-text">
                  {d}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid grid-cols-12 gap-x-6 text-base text-muted">
        <p className="col-span-12 md:col-span-7 md:col-start-5">
          Also: {certificates.map((c) => `${c.title} (${c.by})`).join('; ')}. References from both internships available on request.
        </p>
      </div>
      </div>
    </section>
  )
}
