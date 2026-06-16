// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement('section', props, children),
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement('div', props, children),
    article: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement('article', props, children),
  },
  useInView: () => true,
}))

import { BlogCard } from '@/components/ui/BlogCard'
import { BlogSection } from '@/components/sections/Blog'

const post = {
  slug: 'hello-world',
  title: 'Hello World',
  excerpt: 'My very first post about building in public.',
  date: '2026-06-01',
  tags: ['Engineering', 'AI'],
  readingTime: 4,
}

const posts = [
  post,
  { ...post, slug: 'second', title: 'Second Post', date: '2026-05-01', tags: ['Startups'] },
  { ...post, slug: 'third', title: 'Third Post', date: '2026-04-01', tags: ['Design'] },
]

describe('BlogCard', () => {
  it('renders the post title as a link to the slug', () => {
    render(<BlogCard post={post} />)
    const link = screen.getByRole('link', { name: /hello world/i })
    expect(link).toHaveAttribute('href', '/blog/hello-world')
  })

  it('renders the excerpt', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText(/building in public/i)).toBeInTheDocument()
  })

  it('renders each tag badge', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('renders the date', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders reading time', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText(/4 min/i)).toBeInTheDocument()
  })

  it('renders "Read more" link to the post', () => {
    render(<BlogCard post={post} />)
    const link = screen.getByRole('link', { name: /read more/i })
    expect(link).toHaveAttribute('href', '/blog/hello-world')
  })
})

describe('BlogCard edge cases', () => {
  it('renders no tag badges when tags is empty', () => {
    render(<BlogCard post={{ ...post, tags: [] }} />)
    expect(screen.queryByText('Engineering')).not.toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('omits reading time when readingTime is undefined', () => {
    render(<BlogCard post={{ ...post, readingTime: undefined }} />)
    expect(screen.queryByText(/min read/i)).not.toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })
})

describe('BlogSection', () => {
  it('renders section#blog', () => {
    render(<BlogSection posts={posts} />)
    expect(document.querySelector('section#blog')).toBeTruthy()
  })

  it('renders "Writing" or "Blog" heading', () => {
    render(<BlogSection posts={posts} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders all 3 post cards', () => {
    render(<BlogSection posts={posts} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('Third Post')).toBeInTheDocument()
  })

  it('renders a "View all posts" link to /blog', () => {
    render(<BlogSection posts={posts} />)
    const link = screen.getByRole('link', { name: /view all/i })
    expect(link).toHaveAttribute('href', '/blog')
  })

  it('renders section and heading with zero posts', () => {
    render(<BlogSection posts={[]} />)
    expect(document.querySelector('section#blog')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(document.querySelectorAll('article')).toHaveLength(0)
  })
})
