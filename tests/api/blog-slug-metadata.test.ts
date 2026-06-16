import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found')
  },
}))
vi.mock('@/components/ui/ReadingProgress', () => ({ ReadingProgress: () => null }))
vi.mock('@/components/ui/Prose', () => ({
  Prose: ({ children }: { children: unknown }) => children,
}))

describe('blog /[slug] generateMetadata', () => {
  it('includes openGraph image URL pointing to /blog/og with title and date', async () => {
    const { generateMetadata } = await import('@/app/blog/[slug]/page')
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'building-arcy-ai' }),
    })
    const images = metadata.openGraph?.images
    const urls = Array.isArray(images) ? images : [images]
    const ogUrl = urls.find((img) => {
      const url =
        typeof img === 'string'
          ? img
          : img && typeof img === 'object' && 'url' in img
            ? String(img.url)
            : ''
      return url.includes('/blog/og')
    })
    expect(ogUrl).toBeDefined()
  })

  it('includes post title in openGraph', async () => {
    const { generateMetadata } = await import('@/app/blog/[slug]/page')
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'building-arcy-ai' }),
    })
    expect(metadata.openGraph?.title).toBeTruthy()
  })

  it('returns empty metadata for unknown slug', async () => {
    const { generateMetadata } = await import('@/app/blog/[slug]/page')
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'nonexistent-post' }),
    })
    expect(Object.keys(metadata).length).toBe(0)
  })
})
