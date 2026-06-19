'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BlogCard } from '@/components/ui/BlogCard'
import type { Post } from '@/lib/blog'

export function BlogSection({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id="blog"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-cal text-3xl md:text-4xl text-(--color-text-primary)">Writing</h2>
          <Link
            href="/blog"
            className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
