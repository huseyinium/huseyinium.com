import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  coverImage?: string
  readingTime?: number
  content: string
}

function contentDir() {
  return process.env.CONTENT_DIR ?? path.resolve(process.cwd(), 'content')
}

function blogDir() {
  return path.join(contentDir(), 'blog')
}

export async function getAllPosts(): Promise<Post[]> {
  const dir = blogDir()
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  if (files.length === 0) return []

  const posts: Post[] = []
  for (const file of files) {
    try {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      posts.push({
        slug,
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
        coverImage: data.coverImage,
        readingTime: data.readingTime,
        content,
      } satisfies Post)
    } catch (err) {
      console.error(`[mdx] failed to parse ${file}:`, err)
    }
  }

  return posts.sort((a, b) => {
    const aTime = new Date(a.date).getTime()
    const bTime = new Date(b.date).getTime()
    if (isNaN(aTime) && isNaN(bTime)) return 0
    if (isNaN(aTime)) return 1
    if (isNaN(bTime)) return -1
    return bTime - aTime
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Prevent path traversal via URL-supplied slugs
  if (!/^[a-z0-9-]+$/i.test(slug)) return null

  const file = path.join(blogDir(), `${slug}.mdx`)
  if (!fs.existsSync(file)) return null

  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    readingTime: data.readingTime,
    content,
  }
}
