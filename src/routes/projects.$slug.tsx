import { createFileRoute, notFound } from '@tanstack/react-router'

import { getProject, nextProject } from '@/data/projects'
import { profile } from '@/data/profile'
import { ProjectArticle } from '@/components/ProjectArticle'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return { project, next: nextProject(params.slug) }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { project } = loaderData
    const title = `${project.title}, Gopal Krishna`
    const image = project.images[0] ? `${profile.siteUrl}${project.images[0].src}` : `${profile.siteUrl}/og.png`
    return {
      meta: [
        { title },
        { name: 'description', content: project.tagline },
        { property: 'og:title', content: title },
        { property: 'og:description', content: project.tagline },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: image },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: project.tagline },
        { name: 'twitter:image', content: image },
      ],
    }
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { project, next } = Route.useLoaderData()
  return (
    <main id="main" className="bg-paper">
      <ProjectArticle project={project} next={next} />
    </main>
  )
}
