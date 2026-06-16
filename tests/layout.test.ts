import { describe, it, expect, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans', className: '' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono', className: '' }),
}))

vi.mock('next/font/local', () => ({
  default: () => ({ variable: '--font-cal-sans', className: '' }),
}))

vi.mock('@/components/layout/Navbar', () => ({ Navbar: () => null }))
vi.mock('@/components/layout/Footer', () => ({ Footer: () => null }))
vi.mock('@/components/ui/CustomCursor', () => ({ CustomCursor: () => null }))
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
})
