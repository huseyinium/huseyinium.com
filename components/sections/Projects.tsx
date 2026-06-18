'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, type Project } from '@/content/projects'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

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

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      as="article"
      data-featured={project.featured ? 'true' : undefined}
      className={cn(
        'rounded-xl bg-[--color-surface] py-0 ring-1 ring-[--color-border]',
        project.featured && 'md:col-span-2 xl:col-span-3'
      )}
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

      <CardContent className="flex flex-col gap-3 p-6 flex-1">
        <span className="text-xs uppercase tracking-widest text-[--color-accent]">
          {project.category}
        </span>
        <h3 className="font-cal text-xl text-[--color-text-primary]">{project.title}</h3>
        <p className="text-sm text-[--color-text-muted] leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map((tech, i) => (
            <Badge key={`${tech}-${i}`} variant="outline" className="text-[--color-text-muted]">
              {tech}
            </Badge>
          ))}
        </div>

        {project.prize && (
          <Badge
            data-testid={`prize-${project.id}`}
            variant="outline"
            className="w-fit border-[--color-accent]/30 text-[--color-accent] hover:border-[--color-accent]"
          >
            {project.prize}
          </Badge>
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
      </CardContent>
    </Card>
  )
}

export function Projects() {
  const [active, setActive] = useState<Filter>('all')

  const mainProjects = PROJECTS.filter((p) => p.category !== 'personal')
  const filtered =
    active === 'all' ? mainProjects : mainProjects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-10">
          Projects
        </h2>

        <Tabs
          value={active}
          onValueChange={(value) => setActive(value as Filter)}
          className="mb-12"
        >
          <TabsList className="flex-wrap h-auto bg-transparent p-0 gap-2">
            {FILTERS.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-full border border-[--color-border] px-4 py-1.5 text-sm text-[--color-text-muted] data-active:border-[--color-accent] data-active:bg-[--color-accent] data-active:text-black"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

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
