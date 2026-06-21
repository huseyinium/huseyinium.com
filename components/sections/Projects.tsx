'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ChevronRight } from 'lucide-react'
import { PROJECTS, type Project } from '@/content/projects'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Marquee } from '@/components/ui/marquee'
import { Lens } from '@/components/ui/lens'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { techLogo } from '@/lib/tech-logos'

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false })

function youtubeEmbedUrl(videoUrl: string) {
  const id = videoUrl.match(/(?:youtu\.be\/|v=)([^&?]+)/)?.[1]
  return id ? `https://www.youtube.com/embed/${id}` : videoUrl
}

function formatDateRange(project: Project) {
  if (!project.startDate && !project.endDate) return null

  if (!project.startDate) {
    const [endYear, endMonth] = project.endDate!.split('-')
    return `${endMonth} ${endYear}`
  }

  const [startYear, startMonth] = project.startDate.split('-')

  if (!project.endDate) return `${startMonth}-${startYear} / Present`

  const [endYear, endMonth] = project.endDate.split('-')
  if (startYear === endYear) return `${startMonth}-${endMonth} ${startYear}`

  return `${startMonth}-${startYear} / ${endMonth}-${endYear}`
}

const MAX_VISIBLE_STACK = 5

export function ProjectCard({ project }: { project: Project }) {
  const visibleStack = project.stack.slice(0, MAX_VISIBLE_STACK)
  const hiddenStack = project.stack.slice(MAX_VISIBLE_STACK)

  return (
    <Card
      as="article"
      data-featured={project.featured ? 'true' : undefined}
      className="w-85 shrink-0 rounded-xl bg-(--color-surface) py-0 ring-1 ring-(--color-border)"
    >
      {project.isVideo && project.videoUrl ? (
        <div className="relative h-48 w-full mx-auto overflow-hidden rounded-xl bg-(--color-surface-2)">
          <HeroVideoDialog
            fill
            videoSrc={youtubeEmbedUrl(project.videoUrl)}
            thumbnailSrc={project.coverImage}
            thumbnailAlt={project.title}
          />
        </div>
      ) : project.images && project.images.length > 1 ? (
        <div className="relative h-48 w-full mx-auto overflow-hidden rounded-xl bg-(--color-surface-2)">
          <Carousel
            autoplay={false}
            images={project.images}
            alt={project.title}
            baseWidth={340}
            baseHeight={192}
          />
        </div>
      ) : (
        <Lens zoomFactor={2.5} lensSize={175}>
          <div className="relative h-48 w-full mx-auto rounded-xl overflow-hidden bg-(--color-surface-2)">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="1080px"
              className="object-cover"
            />
          </div>
        </Lens>
      )}

      <CardContent className="flex flex-col gap-3 p-6 pt-0! flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wide text-gray-300">
            {project.category.replace('-', ' ')}
          </span>
          {formatDateRange(project) && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-(--color-text-muted)">
              {formatDateRange(project)}
            </span>
          )}
        </div>
        <h3 className="font-cal text-xl font-bold! border-accent/30 -mt-2">{project.title}</h3>
        <p className="text-sm text-(--color-text-muted) leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {visibleStack.map((tech, i) => {
            const logo = techLogo(tech)
            if (!logo) {
              return (
                <Badge key={`${tech}-${i}`} variant="outline" className="text-(--color-text-muted)">
                  {tech}
                </Badge>
              )
            }
            return (
              <Tooltip key={`${tech}-${i}`}>
                <TooltipTrigger
                  render={
                    <Badge variant="outline" className="size-9 p-1! text-(--color-text-muted)">
                      <Image
                        src={logo}
                        alt={tech}
                        width={16}
                        height={16}
                        className="size-9 object-contain"
                      />
                    </Badge>
                  }
                />
                <TooltipContent>{tech}</TooltipContent>
              </Tooltip>
            )
          })}
          {hiddenStack.length > 0 && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Badge
                    variant="outline"
                    className="size-9 justify-center p-1! text-xs text-(--color-text-muted)"
                  >
                    +{hiddenStack.length}
                  </Badge>
                }
              />
              <TooltipContent>{hiddenStack.join(', ')}</TooltipContent>
            </Tooltip>
          )}
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

        {/*  <div className="mt-auto pt-4!">
          <Link
            href={`/projects/${project.id}`}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-fit')}
          >
            Read case study
          </Link>
        </div> */}
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
        <h2 className="font-cal text-4xl md:text-5xl text-center text-foreground">Projects</h2>
        <p className="text-(--color-text-muted) text-center mb-10">
          A selection of products and tools I&apos;ve built and shipped.
        </p>

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
