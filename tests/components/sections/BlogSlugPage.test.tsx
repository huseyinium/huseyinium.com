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

vi.mock('@/lib/blog', () => ({
  getPostBySlug: vi.fn(),
  getAllPosts: vi.fn(),
}))

import { getPostBySlug, getAllPosts } from '@/lib/blog'
import type { Post } from '@/lib/blog'
import BlogSlugPage from '@/app/blog/[slug]/page'

const MockContent: React.FC = () => <div data-testid="post-content">Post content here</div>

const mockPost: Post = {
  slug: 'ai-product-lessons',
  title: 'AI Product Lessons',
  excerpt: 'What I learned building AI products.',
  date: '2026-06-01',
  tags: ['AI', 'Startups'],
  readingTime: 5,
  toc: [
    { id: 'what-i-learned', text: 'What I Learned', level: 2 as const },
    { id: 'key-takeaways', text: 'Key Takeaways', level: 2 as const },
  ],
}

const relatedPost: Post = {
  slug: 'building-in-public',
  title: 'Building in Public',
  excerpt: 'Why transparency wins.',
  date: '2026-05-01',
  tags: ['AI', 'Startups'],
  readingTime: 3,
}

describe('/blog/[slug] page', () => {
  beforeEach(() => {
    vi.mocked(getPostBySlug).mockReturnValue({ ...mockPost, Component: MockContent })
    vi.mocked(getAllPosts).mockReturnValue([mockPost, relatedPost])
  })

  it('renders the post title as H1', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(
      screen.getByRole('heading', { level: 1, name: /AI Product Lessons/i })
    ).toBeInTheDocument()
  })

  it('renders the post content component', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(screen.getByTestId('post-content')).toBeInTheDocument()
  })

  it('renders a reading progress bar element', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(document.querySelector('[data-reading-progress]')).toBeTruthy()
  })

  it('renders a table of contents with H2 heading links from toc field', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    const tocNav = document.querySelector('nav[aria-label="Table of contents"]')
    expect(tocNav).toBeTruthy()
    expect(tocNav?.querySelector('a[href="#what-i-learned"]')).toBeTruthy()
    expect(tocNav?.querySelector('a[href="#key-takeaways"]')).toBeTruthy()
  })

  it('renders share on X/Twitter link', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(screen.getByRole('link', { name: /share on x|share on twitter/i })).toBeInTheDocument()
  })

  it('renders share on LinkedIn link', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(screen.getByRole('link', { name: /share on linkedin/i })).toBeInTheDocument()
  })

  it('renders related posts section', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(screen.getByText('Building in Public')).toBeInTheDocument()
  })

  it('renders a back link to /blog', async () => {
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    const back = screen.getByRole('link', { name: /back to blog/i })
    expect(back).toHaveAttribute('href', '/blog')
  })

  it('calls notFound when slug has no matching post', async () => {
    vi.mocked(getPostBySlug).mockReturnValue(null)
    await expect(
      BlogSlugPage({ params: Promise.resolve({ slug: 'nonexistent' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('does not render TOC when toc is undefined', async () => {
    const postNoToc = { ...mockPost, toc: undefined }
    vi.mocked(getPostBySlug).mockReturnValue({ ...postNoToc, Component: MockContent })
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(document.querySelector('nav[aria-label="Table of contents"]')).toBeNull()
  })

  it('does not render related posts section when no posts share tags', async () => {
    const unrelatedPost = { ...relatedPost, tags: ['Totally-Different'] }
    vi.mocked(getAllPosts).mockReturnValue([mockPost, unrelatedPost])
    const Page = await BlogSlugPage({ params: Promise.resolve({ slug: 'ai-product-lessons' }) })
    render(Page as React.ReactElement)
    expect(screen.queryByText('Related Posts')).not.toBeInTheDocument()
  })
})
