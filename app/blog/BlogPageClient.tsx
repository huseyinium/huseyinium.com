'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BlogCard } from '@/components/ui/BlogCard'
import type { Post } from '@/lib/blog'

function tagButtonClass(active: boolean) {
  return `text-xs px-3 py-1 rounded-full border transition-colors ${
    active
      ? 'border-[--color-accent] text-[--color-accent]'
      : 'border-[--color-border] text-[--color-text-muted] hover:border-[--color-accent]/40'
  }`
}

export function BlogPageClient({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  return (
    <main className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link
          href="/"
          className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors mb-10 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-4">Writing</h1>
        <p className="text-[--color-text-muted] mb-12">
          Thoughts on AI, startups, engineering, and building in public.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          <button onClick={() => setActiveTag(null)} className={tagButtonClass(activeTag === null)}>
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={tagButtonClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
