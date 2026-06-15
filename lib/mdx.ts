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

export interface CaseStudy {
  slug: string
  title: string
  description: string
  category: 'startup' | 'hackathon' | 'freelance'
  stack: string[]
  coverImage: string
  date: string
  liveUrl?: string
  githubUrl?: string
  content: string
}

function projectsDir() {
  return path.join(contentDir(), 'projects')
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null

  const file = path.join(projectsDir(), `${slug}.mdx`)
  if (!fs.existsSync(file)) return null

  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    category: data.category ?? 'startup',
    stack: data.stack ?? [],
    coverImage: data.coverImage ?? '',
    date: data.date ?? '',
    liveUrl: data.liveUrl,
    githubUrl: data.githubUrl,
    content,
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const dir = projectsDir()
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  if (files.length === 0) return []

  const studies: CaseStudy[] = []
  for (const file of files) {
    try {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      studies.push({
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        category: data.category ?? 'startup',
        stack: data.stack ?? [],
        coverImage: data.coverImage ?? '',
        date: data.date ?? '',
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        content,
      } satisfies CaseStudy)
    } catch (err) {
      console.error(`[mdx] failed to parse ${file}:`, err)
    }
  }

  return studies.sort((a, b) => {
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
