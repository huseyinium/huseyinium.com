'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, type Project } from '@/content/projects'

const ProjectMicroCanvas = dynamic(
  () => import('@/components/3d/ProjectMicroCanvas').then((m) => m.ProjectMicroCanvas),
  { ssr: false }
)

type Filter = 'all' | 'startup' | 'hackathon' | 'freelance'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Startups', value: 'startup' },
  { label: 'Hackathons', value: 'hackathon' },
  { label: 'Freelance', value: 'freelance' },
]

const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover:hover)').matches

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      data-featured={project.featured ? 'true' : undefined}
      className={`relative rounded-xl border border-[--color-border] bg-[--color-surface] overflow-hidden flex flex-col ${
        project.featured ? 'md:col-span-2 xl:col-span-3' : ''
      }`}
      onMouseEnter={() => supportsHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover / micro-canvas */}
      <div className="relative h-48 bg-[--color-surface-2] overflow-hidden">
        {hovered && (
          <div className="absolute inset-0 z-10">
            <ProjectMicroCanvas />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-6 flex-1">
        <span className="text-xs uppercase tracking-widest text-[--color-accent]">
          {project.category}
        </span>
        <h3 className="font-cal text-xl text-[--color-text-primary]">{project.title}</h3>
        <p className="text-sm text-[--color-text-muted] leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-xs px-2 py-0.5 rounded-full border border-[--color-border] text-[--color-text-muted]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.prize && (
          <p
            data-testid={`prize-${project.id}`}
            className="text-xs text-[--color-accent] border border-[--color-accent]/30 rounded px-2 py-1 w-fit hover:border-[--color-accent] transition-colors"
          >
            {project.prize}
          </p>
        )}

        <div className="flex items-center gap-4 mt-auto pt-4">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-medium text-[--color-text-primary] hover:text-[--color-accent] transition-colors"
          >
            Read case study
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
            >
              GH
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-10">
          Projects
        </h2>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-12 flex-wrap">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                active === value
                  ? 'bg-[--color-accent] text-black border-[--color-accent]'
                  : 'border-[--color-border] text-[--color-text-muted] hover:border-[--color-accent]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
