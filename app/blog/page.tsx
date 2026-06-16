import { getAllPosts } from '@/lib/blog'
import { BlogPageClient } from './BlogPageClient'

export default async function BlogPage() {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  return <BlogPageClient posts={posts} tags={tags} />
}
