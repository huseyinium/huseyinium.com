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

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
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
    } satisfies Post
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
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
