'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { PROJECTS } from '@/content/projects'
import { ProjectCard } from '@/components/sections/Projects'

const sorted = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-4 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-sm rounded-full
              border border-(--color-border) text-muted-foreground font-medium px-4 py-2
              hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back
          </Link>
        </div>

        <h1 className="font-cal text-4xl md:text-5xl text-foreground text-center mb-12">
          All Projects
        </h1>

        <div className="flex flex-wrap justify-center gap-6 md:justify-center">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
