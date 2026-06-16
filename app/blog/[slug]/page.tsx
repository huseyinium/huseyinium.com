import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { ReadingProgress } from '@/components/ui/ReadingProgress'
import { Prose } from '@/components/ui/Prose'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  }
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postEntry = getPostBySlug(slug)
  if (!postEntry) notFound()

  const { Component, toc, ...post } = postEntry
  const allPosts = getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huseyinium.com'}/blog/${post.slug}`
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors mb-10 inline-block"
          >
            ← Back to blog
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[--color-accent]/30 text-[--color-accent]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-4">
              {post.title}
            </h1>
            <p className="text-[--color-text-muted]">
              {post.date}
              {post.readingTime ? ` · ${post.readingTime} min read` : ''}
            </p>
          </header>

          {toc && toc.length > 0 && (
            <nav
              aria-label="Table of contents"
              className="mb-12 p-4 rounded-xl border border-[--color-border] bg-[--color-surface]"
            >
              <p className="text-xs uppercase tracking-widest text-[--color-text-muted] mb-3">
                Contents
              </p>
              <ol className="space-y-1.5">
                {toc.map((h) => (
                  <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article className="mb-16">
            <Prose>
              <Component />
            </Prose>
          </article>

          <div className="flex gap-4 mb-16 pt-8 border-t border-[--color-border]">
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
            >
              Share on X →
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
            >
              Share on LinkedIn →
            </a>
          </div>

          {related.length > 0 && (
            <section className="pt-8 border-t border-[--color-border]">
              <h2 className="font-cal text-xl text-[--color-text-primary] mb-6">Related Posts</h2>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                    <p className="text-[--color-text-primary] group-hover:text-[--color-accent] transition-colors font-medium">
                      {p.title}
                    </p>
                    <p className="text-sm text-[--color-text-muted] mt-1">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
