// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => React.createElement('a', { href, ...props }, children),
}))

vi.mock('@/lib/case-studies', () => ({
  getCaseStudyBySlug: vi.fn(),
  getAllCaseStudies: vi.fn(),
}))

import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies'
import ProjectSlugPage, { generateMetadata } from '@/app/projects/[slug]/page'

const MockContent: React.FC = () => (
  <div>
    <h2>Problem</h2>
    <h2>What I Built</h2>
    <h2>Outcome</h2>
  </div>
)

const mockStudy = {
  id: 'arcy-ai',
  title: 'ARCY AI',
  description: 'AI-powered recruitment platform',
  category: 'startup' as const,
  stack: ['Next.js', 'NestJS', 'PostgreSQL'],
  coverImage: '/images/projects/arcy-ai.png',
  startDate: '2024-01',
  liveUrl: 'https://arcy.ai',
  featured: true,
  Component: MockContent,
}

describe('/projects/[slug] page', () => {
  beforeEach(() => {
    vi.mocked(getCaseStudyBySlug).mockReturnValue(mockStudy)
    vi.mocked(getAllCaseStudies).mockReturnValue([])
  })

  it('renders the project title as H1', async () => {
    const Page = await ProjectSlugPage({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    render(Page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1, name: /arcy ai/i })).toBeInTheDocument()
  })

  it('renders the project content component', async () => {
    const Page = await ProjectSlugPage({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    render(Page as React.ReactElement)
    expect(screen.getByRole('heading', { name: /problem/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what i built/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /outcome/i })).toBeInTheDocument()
  })

  it('renders stack badges', async () => {
    const Page = await ProjectSlugPage({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    render(Page as React.ReactElement)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('NestJS')).toBeInTheDocument()
  })

  it('renders a back link to /projects', async () => {
    const Page = await ProjectSlugPage({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    render(Page as React.ReactElement)
    const back = screen.getByRole('link', { name: /back to projects/i })
    expect(back).toHaveAttribute('href', '/projects')
  })

  it('renders a live site link when liveUrl is provided', async () => {
    const Page = await ProjectSlugPage({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    render(Page as React.ReactElement)
    const link = screen.getByRole('link', { name: /live site/i })
    expect(link).toHaveAttribute('href', 'https://arcy.ai')
  })

  it('calls notFound when slug has no matching case study', async () => {
    vi.mocked(getCaseStudyBySlug).mockReturnValue(null)
    await expect(
      ProjectSlugPage({ params: Promise.resolve({ slug: 'nonexistent' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('generateMetadata includes openGraph image pointing to /projects/og', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    const images = meta.openGraph?.images
    const url = Array.isArray(images) ? String(images[0]) : String(images)
    expect(url).toContain('/projects/og')
    expect(url).toContain('title=')
    expect(url).toContain('category=')
  })
})
