'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PROJECTS, type Project } from '@/content/projects'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Marquee } from '@/components/ui/marquee'
import { Lens } from '@/components/ui/lens'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TECH_LOGOS: Record<string, string> = {
  'next.js': '/logos/svg/nextjs.svg',
  react: '/logos/svg/react.svg',
  'react native': '/logos/svg/react.svg',
  nestjs: '/logos/svg/nestjs.svg',
  'node.js': '/logos/svg/nodejs.svg',
  postgresql: '/logos/svg/postgresql.svg',
  typescript: '/logos/svg/typescript.svg',
  javascript: '/logos/svg/javascript.svg',
  github: '/logos/svg/github.svg',
  docker: '/logos/svg/docker.svg',
  redis: '/logos/svg/redis.svg',
  prisma: '/logos/svg/prisma-orm.svg',
  expo: '/logos/svg/expo.svg',
  firebase: '/logos/svg/firebase.svg',
  'tailwind css': '/logos/svg/tailwind-css.svg',
  vercel: '/logos/svg/vercel.svg',
  'amazon web services': '/logos/svg/amazon-web-services.svg',
  aws: '/logos/svg/amazon-web-services.svg',
}

function techLogo(tech: string) {
  return TECH_LOGOS[tech.toLowerCase()]
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      as="article"
      data-featured={project.featured ? 'true' : undefined}
      className="w-85 shrink-0 rounded-xl bg-(--color-surface) py-0 ring-1 ring-(--color-border)"
    >
      <Lens zoomFactor={2} lensSize={175}>
        <div className="relative h-48 w-full overflow-hidden bg-(--color-surface-2)">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="340px"
            className="object-cover"
          />
        </div>
      </Lens>

      <CardContent className="flex flex-col gap-3 p-6 flex-1">
        <h3 className="font-cal text-xl font-bold! border-accent/30">{project.title}</h3>
        <p className="text-sm text-(--color-text-muted) leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map((tech, i) => {
            const logo = techLogo(tech)
            return (
              <Badge
                key={`${tech}-${i}`}
                variant="outline"
                className="p-2.5! text-(--color-text-muted)"
              >
                {logo && (
                  <Image
                    src={logo}
                    alt=""
                    width={12}
                    height={12}
                    data-icon="inline-start"
                    className="size-3 object-contain"
                  />
                )}
                {tech}
              </Badge>
            )
          })}
        </div>

        {project.prize && (
          <Badge
            data-testid={`prize-${project.id}`}
            variant="outline"
            className="w-fit border-accent/30 text-(--color-accent) hover:border-(--color-accent)"
          >
            {project.prize}
          </Badge>
        )}

        <div className="mt-auto pt-4!">
          <Link
            href={`/projects/${project.id}`}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-fit')}
          >
            Read case study
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function Projects() {
  const mainProjects = PROJECTS.filter((p) => p.category !== 'personal')
  const half = Math.ceil(mainProjects.length / 2)
  const rowOne = mainProjects.slice(0, half)
  const rowTwo = mainProjects.slice(half)

  return (
    <section id="projects" className="pb-24 md:pb-32 ">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-center text-foreground mb-10">
          Projects
        </h2>

        <div className="flex flex-col gap-6 -mx-6">
          <Marquee pauseOnHover className="[--duration:50s]">
            {rowOne.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:50s]">
            {rowTwo.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Marquee>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-0.5 text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
          >
            View all projects
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
