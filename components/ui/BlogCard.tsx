import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Post } from '@/lib/blog'

export function BlogCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`

  return (
    <article className="group flex flex-col gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-6 hover:border-(--color-accent)/40 transition-colors">
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-(--color-accent)/30 text-(--color-accent)"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link href={href} className="block">
        <h3 className="font-cal text-lg text-foreground group-hover:text-(--color-accent) transition-colors line-clamp-2">
          {post.title}
        </h3>
      </Link>

      <p className="text-sm text-(--color-text-muted) line-clamp-2 flex-1">{post.excerpt}</p>

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-(--color-text-muted)">
          {post.date}
          {post.readingTime ? ` · ${post.readingTime} min read` : ''}
        </span>
        <Link
          href={href}
          className="inline-flex items-center gap-0.5 text-xs text-(--color-accent) hover:underline"
        >
          Read more
          <ChevronRight className="size-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
