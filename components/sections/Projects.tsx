'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ChevronRight, ExternalLink, Layers, MonitorPlay, Trophy } from 'lucide-react'
import { PROJECTS, type Achievement, type Project } from '@/content/projects'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Marquee } from '@/components/ui/marquee'
import { Lens } from '@/components/ui/lens'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { techLogo } from '@/lib/tech-logos'
import { ProjectDescription } from './ProjectDescription'

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false })

function youtubeEmbedUrl(videoUrl: string) {
  const id = videoUrl.match(/(?:youtu\.be\/|v=)([^&?]+)/)?.[1]
  return id ? `https://www.youtube.com/embed/${id}` : videoUrl
}

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function formatMonthYear(date: string) {
  const [year, month] = date.split('-')
  return `${MONTH_NAMES[Number(month) - 1]} ${year}`
}

function formatDateRange(project: Project) {
  if (!project.startDate && !project.endDate) return null

  if (!project.startDate) return formatMonthYear(project.endDate!)
  if (!project.endDate) return `${formatMonthYear(project.startDate)} - Present`
  if (project.startDate === project.endDate) return formatMonthYear(project.startDate)

  return `${formatMonthYear(project.startDate)} - ${formatMonthYear(project.endDate)}`
}

const PROJECT_LINK_BUTTON_CLASS =
  'rounded-full border-(--color-accent-dim) hover:border-(--color-accent) hover:text-(--color-accent)'

const MAX_VISIBLE_STACK = 5
const MAX_VISIBLE_ACHIEVEMENTS = 3

function getAchievements(project: Project): Achievement[] {
  return [
    ...(project.prize ? [{ icon: 'trophy' as const, tooltip: project.prize }] : []),
    ...(project.achievements ?? []),
  ]
}

export function ProjectCard({
  project,
  showTechStack = false,
}: {
  project: Project
  showTechStack?: boolean
}) {
  const visibleStack = project.stack.slice(0, MAX_VISIBLE_STACK)
  const hiddenStack = project.stack.slice(MAX_VISIBLE_STACK)
  const achievements = getAchievements(project)
  const visibleAchievements = achievements.slice(0, MAX_VISIBLE_ACHIEVEMENTS)
  const hiddenAchievements = achievements.slice(MAX_VISIBLE_ACHIEVEMENTS)

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
            {project.category.replaceAll('-', ' ')}
          </span>
          {formatDateRange(project) && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-(--color-text-muted)">
              {formatDateRange(project)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 -mt-2">
          <h3 className="font-cal text-xl font-bold! border-accent/30">{project.title}</h3>
          {achievements.length > 0 && (
            <div className="flex items-center gap-0.5">
              {visibleAchievements.map((achievement, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger
                    render={
                      <span
                        data-testid={i === 0 && project.prize ? `prize-${project.id}` : undefined}
                        className="inline-flex size-7 b items-center justify-center"
                      >
                        {achievement.icon === 'trophy' ? (
                          <div className="border border-gray-700 p-1 size-7! rounded-full flex justify-center items-center">
                            <Trophy className="size-3 text-(--color-gold)" aria-hidden="true" />
                          </div>
                        ) : (
                          <Image
                            src={achievement.icon.image}
                            alt={achievement.icon.alt}
                            width={16}
                            height={16}
                            className="size-5 object-contain"
                          />
                        )}
                      </span>
                    }
                  />
                  <TooltipContent>{achievement.tooltip}</TooltipContent>
                </Tooltip>
              ))}

              {hiddenAchievements.length > 0 && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Badge
                        variant={'outline'}
                        className="size-6 justify-center p-1! text-[10px] text-(--color-text-muted)"
                      >
                        +{hiddenAchievements.length}
                      </Badge>
                    }
                  />
                  <TooltipContent>
                    {hiddenAchievements.map((a) => a.tooltip).join(', ')}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
        <ProjectDescription text={project.description} />

        <div className="mt-auto flex flex-col gap-3">
          {showTechStack && (
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 mb-1.5 font-mono text-[10px] uppercase tracking-wide text-(--color-text-muted)">
                <Layers className="size-3" aria-hidden="true" />
                {project.scope}
              </span>
              <div className="flex flex-wrap gap-1">
                {visibleStack.map((tech, i) => {
                  const logo = techLogo(tech)
                  if (!logo) {
                    return (
                      <Badge
                        key={`${tech}-${i}`}
                        variant="outline"
                        className="text-(--color-text-muted)"
                      >
                        {tech}
                      </Badge>
                    )
                  }
                  return (
                    <Tooltip key={`${tech}-${i}`}>
                      <TooltipTrigger
                        render={
                          <Badge
                            variant="outline"
                            className="size-9 p-1! text-(--color-text-muted)"
                          >
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
            </div>
          )}

          {(project.websiteUrl ||
            project.liveDemoUrl ||
            project.githubUrl ||
            project.appStoreUrl ||
            project.googlePlayUrl) && (
            <div className="flex flex-wrap gap-2">
              {project.websiteUrl && (
                <Button
                  render={
                    <Link href={project.websiteUrl} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="secondary"
                  className={PROJECT_LINK_BUTTON_CLASS}
                  size="sm"
                >
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  Website
                </Button>
              )}
              {project.liveDemoUrl && (
                <Button
                  render={
                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="secondary"
                  className={PROJECT_LINK_BUTTON_CLASS}
                  size="sm"
                >
                  <MonitorPlay className="size-3.5" aria-hidden="true" />
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  render={
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="secondary"
                  className={PROJECT_LINK_BUTTON_CLASS}
                  size="sm"
                >
                  <Image
                    src="/logos/svg/github.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="size-4.5"
                    aria-hidden="true"
                  />
                  GitHub
                </Button>
              )}
              {project.appStoreUrl && (
                <Button
                  render={
                    <Link href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="secondary"
                  className={PROJECT_LINK_BUTTON_CLASS}
                  size="sm"
                >
                  <Image
                    src="/logos/svg/app-store.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="size-4.5"
                    aria-hidden="true"
                  />
                  App Store
                </Button>
              )}
              {project.googlePlayUrl && (
                <Button
                  render={
                    <Link href={project.googlePlayUrl} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="secondary"
                  className={PROJECT_LINK_BUTTON_CLASS}
                  size="sm"
                >
                  <Image
                    src="/logos/svg/google-play-store.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="size-4.5"
                    aria-hidden="true"
                  />
                  Google Play
                </Button>
              )}
            </div>
          )}
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
      <div className=" mx-auto w-full">
        <h2 className="font-cal text-4xl md:text-5xl text-center text-foreground">Projects</h2>
        <p className="text-(--color-text-muted) text-center mb-4 mt-2">
          A selection of products and tools I&apos;ve built and shipped.
        </p>
        <div className="mb-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm rounded-full
              border border-(--color-border) text-muted-foreground font-medium px-4 py-2
              hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            View all projects
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

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
      </div>
    </section>
  )
}
