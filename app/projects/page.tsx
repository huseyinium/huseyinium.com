'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { PROJECTS } from '@/content/projects'
import { ProjectCard } from '@/components/sections/Projects'

const sorted = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/#projects"
          className="flex items-center justify-center gap-1 text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-10"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Back
        </Link>

        <h1 className="font-cal text-4xl md:text-5xl text-foreground text-center mb-12">
          All Projects
        </h1>

        <div className="flex flex-wrap justify-center gap-6 md:justify-start">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
