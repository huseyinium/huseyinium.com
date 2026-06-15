'use client'

import Link from 'next/link'
import { PROJECTS } from '@/content/projects'
import { ProjectCard } from '@/components/sections/Projects'

const sorted = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/#projects"
          className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors mb-10 inline-block"
        >
          ← Back
        </Link>

        <h1 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-12">
          All Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
