import { describe, it, expect, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans', className: '' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono', className: '' }),
}))

vi.mock('next/font/local', () => ({
  default: () => ({ variable: '--font-cal-sans', className: '' }),
}))

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }))
vi.mock('@/components/providers/PageTransition', () => ({
  PageTransition: ({ children }: { children: unknown }) => children,
}))
vi.mock('@/styles/mdx.css', () => ({}))
vi.mock('./globals.css', () => ({}))

describe('root layout metadata', () => {
  it('has openGraph image pointing to /og', async () => {
    const { metadata } = await import('@/app/layout')
    const images = metadata.openGraph?.images
    const urls = Array.isArray(images) ? images : [images]
    const hasOgRoute = urls.some((img) => {
      const url =
        typeof img === 'string'
          ? img
          : img && typeof img === 'object' && 'url' in img
            ? String(img.url)
            : ''
      return url.includes('/og')
    })
    expect(hasOgRoute).toBe(true)
  })

  it('has title template with site name suffix', async () => {
    const { metadata } = await import('@/app/layout')
    expect(metadata.title).toEqual(
      expect.objectContaining({ template: expect.stringContaining('Huseyin Karatas') })
    )
  })

  it('has keywords array including huseyinium and ARCY AI', async () => {
    const { metadata } = await import('@/app/layout')
    const keywords = metadata.keywords
    const list = Array.isArray(keywords) ? keywords : []
    expect(list.some((k) => k.toLowerCase().includes('huseyin'))).toBe(true)
    expect(list.some((k) => k.toLowerCase().includes('arcy'))).toBe(true)
  })

  it('has authors with site URL', async () => {
    const { metadata } = await import('@/app/layout')
    const authors = Array.isArray(metadata.authors) ? metadata.authors : [metadata.authors]
    expect(authors.some((a) => a && typeof a === 'object' && 'url' in a)).toBe(true)
  })

  it('has twitter card summary_large_image', async () => {
    const { metadata } = await import('@/app/layout')
    expect(JSON.stringify(metadata.twitter)).toContain('summary_large_image')
  })

  it('has robots allowing indexing', async () => {
    const { metadata } = await import('@/app/layout')
    expect(metadata.robots).toMatchObject({ index: true, follow: true })
  })

  it('has canonical URL set', async () => {
    const { metadata } = await import('@/app/layout')
    const canonical = metadata.alternates?.canonical
    expect(canonical).toMatch(/huseyinium\.com/)
  })

  it('has full openGraph fields: type, locale, siteName', async () => {
    const { metadata } = await import('@/app/layout')
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      locale: 'en_US',
      siteName: expect.stringContaining('Huseyin Karatas'),
    })
  })
})
