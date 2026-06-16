import { describe, it, expect } from 'vitest'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

describe('getAllPosts', () => {
  it('returns at least 3 posts', () => {
    expect(getAllPosts().length).toBeGreaterThanOrEqual(3)
  })

  it('sorts posts newest-first', () => {
    const posts = getAllPosts()
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1]!.date) >= new Date(posts[i]!.date)).toBe(true)
    }
  })

  it('each post has required fields', () => {
    for (const post of getAllPosts()) {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(post.excerpt).toBeTruthy()
      expect(post.date).toBeTruthy()
      expect(Array.isArray(post.tags)).toBe(true)
      expect(typeof post.readingTime === 'number' || post.readingTime === undefined).toBe(true)
      expect(Array.isArray(post.toc) || post.toc === undefined).toBe(true)
    }
  })

  it('does not include Component in returned posts', () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect('Component' in post).toBe(false)
    }
  })
})

describe('getPostBySlug', () => {
  it('returns null for unknown slug', () => {
    expect(getPostBySlug('does-not-exist')).toBeNull()
  })

  it('returns entry with Component for known slug', () => {
    const knownSlug = getAllPosts()[0]!.slug
    const entry = getPostBySlug(knownSlug)
    expect(entry).not.toBeNull()
    expect(entry?.Component).toBeTypeOf('function')
    expect(entry?.slug).toBe(knownSlug)
  })
})
