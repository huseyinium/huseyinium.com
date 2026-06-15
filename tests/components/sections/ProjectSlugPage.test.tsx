// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

vi.mock('@/lib/mdx', () => ({
  getCaseStudyBySlug: vi.fn(),
}))

import { getCaseStudyBySlug } from '@/lib/mdx'
import ProjectSlugPage from '@/app/projects/[slug]/page'

const mockStudy = {
  slug: 'arcy-ai',
  title: 'ARCY AI',
  description: 'AI-powered recruitment platform',
  category: 'startup' as const,
  stack: ['Next.js', 'NestJS', 'PostgreSQL'],
  coverImage: '/images/projects/arcy-ai.png',
  date: '2024-01',
  liveUrl: 'https://arcy.ai',
  content: `## Problem\n\nManual recruiting is slow.\n\n## What I Built\n\nAn AI agent pipeline.\n\n## Outcome\n\nClosed 10 clients in 3 months.`,
}

describe('/projects/[slug] page', () => {
  beforeEach(() => {
    vi.mocked(getCaseStudyBySlug).mockResolvedValue(mockStudy)
  })

  it('renders the project title as H1', async () => {
    const Page = await ProjectSlugPage({ params: Promise.resolve({ slug: 'arcy-ai' }) })
    render(Page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1, name: /arcy ai/i })).toBeInTheDocument()
  })

  it('renders problem, built, and outcome section headings', async () => {
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

  it('calls notFound when slug has no matching case study', async () => {
    vi.mocked(getCaseStudyBySlug).mockResolvedValue(null)
    await expect(
      ProjectSlugPage({ params: Promise.resolve({ slug: 'nonexistent' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })
})
