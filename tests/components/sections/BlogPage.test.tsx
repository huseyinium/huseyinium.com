// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

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

vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}))

import { getAllPosts } from '@/lib/blog'
import BlogPage from '@/app/blog/page'

const mockPosts = [
  {
    slug: 'ai-product-lessons',
    title: 'AI Product Lessons',
    excerpt: 'What I learned building AI products.',
    date: '2026-06-01',
    tags: ['AI', 'Startups'],
    readingTime: 5,
  },
  {
    slug: 'building-in-public',
    title: 'Building in Public',
    excerpt: 'Why transparency wins.',
    date: '2026-05-01',
    tags: ['Startups'],
    readingTime: 3,
  },
  {
    slug: 'typescript-tips',
    title: 'TypeScript Tips',
    excerpt: 'Strict mode tricks.',
    date: '2026-04-01',
    tags: ['Engineering'],
    readingTime: 6,
  },
]

describe('/blog listing page', () => {
  beforeEach(() => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
  })

  it('renders "All Posts" heading', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders all 3 post cards initially', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    expect(screen.getByText('AI Product Lessons')).toBeInTheDocument()
    expect(screen.getByText('Building in Public')).toBeInTheDocument()
    expect(screen.getByText('TypeScript Tips')).toBeInTheDocument()
  })

  it('renders tag filter buttons for each unique tag', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    expect(screen.getByRole('button', { name: /AI/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Startups/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Engineering/i })).toBeInTheDocument()
  })

  it('filters posts when a tag button is clicked', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    fireEvent.click(screen.getByRole('button', { name: /^Engineering$/i }))
    expect(screen.getByText('TypeScript Tips')).toBeInTheDocument()
    expect(screen.queryByText('AI Product Lessons')).not.toBeInTheDocument()
    expect(screen.queryByText('Building in Public')).not.toBeInTheDocument()
  })

  it('renders a link back to the homepage', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    const back = screen.getByRole('link', { name: /back|home/i })
    expect(back).toHaveAttribute('href', '/')
  })

  it('renders only "All" filter button and no cards when posts is empty', async () => {
    vi.mocked(getAllPosts).mockReturnValue([])
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    expect(screen.getByRole('button', { name: /^All$/i })).toBeInTheDocument()
    expect(document.querySelectorAll('article')).toHaveLength(0)
  })

  it('clicking active tag again resets filter to show all posts', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    fireEvent.click(screen.getByRole('button', { name: /^Engineering$/i }))
    expect(screen.queryByText('AI Product Lessons')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /^Engineering$/i }))
    expect(screen.getByText('AI Product Lessons')).toBeInTheDocument()
    expect(screen.getByText('Building in Public')).toBeInTheDocument()
  })

  it('clicking "All" button after tag filter shows all posts', async () => {
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    fireEvent.click(screen.getByRole('button', { name: /^Engineering$/i }))
    expect(screen.queryByText('AI Product Lessons')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /^All$/i }))
    expect(screen.getByText('AI Product Lessons')).toBeInTheDocument()
    expect(screen.getByText('Building in Public')).toBeInTheDocument()
  })

  it('shows each tag button once even when multiple posts share a tag', async () => {
    const sharedTagPosts = [
      { ...mockPosts[0]!, tags: ['AI'] },
      { ...mockPosts[1]!, tags: ['AI', 'Startups'] },
    ]
    vi.mocked(getAllPosts).mockReturnValue(sharedTagPosts)
    const Page = await BlogPage()
    render(Page as React.ReactElement)
    expect(screen.getAllByRole('button', { name: /^AI$/i })).toHaveLength(1)
  })
})
