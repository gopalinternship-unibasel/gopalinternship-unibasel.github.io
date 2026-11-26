import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { roleLabel } from '@/data/roles'
import { useView } from '@/lib/view'

function listJoin(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

/**
 * The site ends on an inverted block: black paper, the email set large.
 * It is the one place the page goes dark, which is what makes it the end.
 * (In the immersive view the block is ultramarine instead.)
 */
export function Contact() {
  const { role } = useView()
  const relevant = role ? projects.filter((p) => p.roles.includes(role)).map((p) => p.title) : []

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink text-paper-on-ink">
      <div className="mx-auto max-w-[1440px] px-gutter py-20 md:py-32 grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="contact-heading" className="headline text-3xl !text-white">
            {role ? `Hiring for ${roleLabel(role).toLowerCase()}?` : 'Looking for an intern, a working student or a research assistant?'}
          </h2>
          <p className="mt-6 text-md md:text-lg leading-[1.35] max-w-[44ch] text-paper-on-ink">
            I am in Basel and open to {profile.openTo}. Email is the quickest way to reach me.
          </p>
          {role && relevant.length > 0 && (
            <p className="mt-4 text-base max-w-[44ch] text-muted-on-ink">
              For {roleLabel(role).toLowerCase()}, start with {listJoin(relevant)}.
            </p>
          )}
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
          <a
            href={`mailto:${profile.email}`}
            className="headline !text-white text-lg sm:text-xl xl:text-2xl break-words hover:!text-accent transition-colors"
            style={{ fontStretch: '90%' }}
          >
            {profile.email.split('@')[0]}
            <wbr />
            {'@'}
            {profile.email.split('@')[1]}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base list-none">
            <li>
              <a href={profile.github} className="link !text-white" rel="me noopener" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} className="link !text-white" rel="me noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            {profile.cvPath && (
              <li>
                <a href={profile.cvPath} className="link !text-white">
                  CV (PDF)
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
