import { createFileRoute } from '@tanstack/react-router'

import { ProjectIndex } from '@/components/ProjectIndex'
import { Contact } from '@/components/Contact'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: 'Projects, Gopal Krishna' },
      {
        name: 'description',
        content:
          'Projects by Gopal Krishna: streaming seismic analytics, an AI research assistant, LifeOps AI, YOLO on 3D MRI and a VR escape game.',
      },
    ],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <main id="main" className="pt-10 md:pt-16">
      <ProjectIndex standalone />
      <Contact />
    </main>
  )
}
