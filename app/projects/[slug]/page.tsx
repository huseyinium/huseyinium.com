import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies'
import { Prose } from '@/components/ui/Prose'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export async function generateStaticParams() {
  const projects = getAllCaseStudies()
  return projects.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return {}
  const ogUrl = `/projects/og?title=${encodeURIComponent(study.title)}&category=${encodeURIComponent(study.category)}`
  return {
    title: study.title,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      images: [ogUrl],
    },
  }
}

export default async function ProjectSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = getCaseStudyBySlug(slug)
  if (!entry) notFound()

  const { Component, ...study } = entry

  return (
    <>
      <ScrollProgress className="h-[2px] bg-(--color-accent)" />
      <main className="min-h-screen py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-10"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to projects
          </Link>

          <div className="mb-16">
            <span className="text-xs uppercase tracking-widest text-(--color-accent) mb-4 block">
              {study.category}
            </span>
            <h1 className="font-cal text-4xl md:text-5xl text-(--color-text-primary) mb-4">
              {study.title}
            </h1>
            <p className="text-lg text-(--color-text-muted)">{study.description}</p>
          </div>

          <article>
            <Prose>
              <Component />
            </Prose>
          </article>

          <div className="mt-16 pt-8 border-t border-(--color-border) space-y-6">
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="text-xs px-2 py-0.5 rounded-full border border-(--color-border) text-(--color-text-muted)"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {study.websiteUrl && (
                <a
                  href={study.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-(--color-accent) hover:underline"
                >
                  Live site →
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
