import { Link } from '@tanstack/react-router'

import type { Project } from '@/data/projects'
import { Diagram } from './diagrams'

export function ProjectArticle({ project, next }: { project: Project; next: Project }) {
  return (
    <article className="bg-paper mx-auto max-w-[1440px] px-gutter pt-8 md:pt-12 pb-20">
      <p className="text-sm">
        <Link to="/" hash="projects" className="link text-muted">
          All projects
        </Link>
      </p>

      {/* Header */}
      <header className="mt-10 md:mt-14 grid grid-cols-12 gap-x-6 gap-y-8 border-t border-ink pt-5">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="headline text-3xl">{project.title}</h1>
          <p className="mt-5 text-md md:text-lg leading-[1.35] max-w-[46ch] text-text">{project.tagline}</p>
        </div>
        <dl className="col-span-12 lg:col-span-4 lg:col-start-9 text-base self-end">
          <Row label="Context">{project.context}</Row>
          {project.year && <Row label="Year">{project.year}</Row>}
          <Row label="Team">{project.team}</Row>
          {project.myPart && <Row label="My part">{project.myPart}</Row>}
          <Row label="Stack">{project.stack.join(', ')}</Row>
        </dl>
      </header>

      {/* Diagram */}
      <figure className="mt-12 md:mt-16 grid grid-cols-12 gap-x-6 gap-y-3">
        {/* On narrow screens the sketch keeps a readable width and scrolls sideways. */}
        <div className="col-span-12 lg:col-span-9 diagram-frame p-4 md:p-10 overflow-x-auto">
          <div className="min-w-[560px]">
            <Diagram id={project.diagram} />
          </div>
        </div>
        <figcaption className="col-span-12 lg:col-span-3 text-sm text-muted lg:pt-2">
          How it fits together. {project.summary}
        </figcaption>
      </figure>

      {/* Body */}
      <div className="mt-16 md:mt-24 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <h2 className="title text-md text-muted">What it does</h2>
          <div className="mt-4 prose text-md md:text-lg leading-[1.4] text-text">
            {project.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <h2 className="title text-md text-muted">How it is built</h2>
          <ul className="mt-4 list-none">
            {project.built.map((b) => (
              <li key={b.slice(0, 24)} className="py-3 border-t border-rule text-base text-text">
                {b}
              </li>
            ))}
          </ul>

          {/* The Code block appears only when there is a link or a note to show. */}
          {(project.repo || project.repoNote) && (
            <>
              <h2 className="title text-md text-muted mt-10">Code</h2>
              {project.repo ? (
                <a href={project.repo} className="link mt-3 inline-block text-base" target="_blank" rel="noopener">
                  {project.repoLabel ?? 'Repository on GitHub'}
                </a>
              ) : (
                <p className="mt-3 text-base text-muted">{project.repoNote}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Screenshots */}
      {project.images.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h2 className="title text-md text-muted">{project.imagesTitle ?? 'In use'}</h2>
          <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-10">
            {project.images.map((img, i) => (
              // The first image spans the page when it is a wide one (screenshots,
              // sample strips); a chart keeps a readable eight-column width.
              <figure
                key={img.src}
                className={i === 0 && (img.width ?? 1600) / (img.height ?? 875) > 1.8 ? 'col-span-12' : 'col-span-12 lg:col-span-8'}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width ?? 1600}
                  height={img.height ?? 875}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto border border-rule rounded-xs"
                  style={img.pixelated ? { imageRendering: 'pixelated' } : undefined}
                />
                {img.caption && <figcaption className="mt-3 text-sm text-muted max-w-[60ch]">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Next */}
      <div className="mt-20 md:mt-28 border-t border-ink pt-5">
        <p className="text-sm text-muted">Next project</p>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="headline text-2xl md:text-3xl mt-2 inline-block hover:text-accent-deep transition-colors"
        >
          {next.title}
        </Link>
      </div>
    </article>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-2.5 border-t border-rule">
      <dt className="text-muted">{label}</dt>
      <dd className="text-text">{children}</dd>
    </div>
  )
}
