import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { ProjectIndex } from '@/components/ProjectIndex'
import { SkillsMap } from '@/components/SkillsMap'
import { Timeline } from '@/components/Timeline'
import { Contact } from '@/components/Contact'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <ProjectIndex />
      <SkillsMap />
      <Timeline />
      <Contact />
    </main>
  )
}
