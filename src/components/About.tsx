import { profile } from '@/data/profile'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-gutter py-20 md:py-28">
      <SectionHeading id="about-heading" title="About" lede="Where I come from, what I have been doing, and what is on the desk this semester." />

      <div className="mt-12 md:mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-7 prose text-md md:text-lg leading-[1.4]">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <dl className="col-span-12 md:col-span-4 md:col-start-9 text-base">
          {profile.facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3 border-t border-rule">
              <dt className="text-muted">{f.label}</dt>
              <dd className="text-text">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      </div>
    </section>
  )
}
