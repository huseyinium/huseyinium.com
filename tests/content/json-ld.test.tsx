import { describe, it, expect, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

vi.mock('@/components/sections/Hero', () => ({ Hero: () => null }))
vi.mock('@/components/sections/About', () => ({ About: () => null }))
vi.mock('@/components/sections/Projects', () => ({ Projects: () => null }))
vi.mock('@/components/sections/Skills', () => ({ Skills: () => null }))
vi.mock('@/components/sections/Achievements', () => ({ Achievements: () => null }))
vi.mock('@/components/sections/Blog', () => ({ BlogSection: () => null }))
vi.mock('@/components/sections/contact', () => ({ Contact: () => null }))
vi.mock('@/lib/blog', () => ({ getAllPosts: () => [] }))

describe('root page JSON-LD', () => {
  it('renders a script tag with application/ld+json type', async () => {
    const { default: Home } = await import('@/app/page')
    const html = renderToStaticMarkup(await Home())
    expect(html).toContain('application/ld+json')
  })

  it('JSON-LD contains @type Person', async () => {
    const { default: Home } = await import('@/app/page')
    const html = renderToStaticMarkup(await Home())
    expect(html).toContain('"@type":"Person"')
  })

  it('JSON-LD includes ARCY AI worksFor', async () => {
    const { default: Home } = await import('@/app/page')
    const html = renderToStaticMarkup(await Home())
    expect(html).toContain('ARCY AI')
  })

  it('JSON-LD includes sameAs links for social profiles', async () => {
    const { default: Home } = await import('@/app/page')
    const html = renderToStaticMarkup(await Home())
    expect(html).toContain('linkedin.com')
    expect(html).toContain('github.com')
  })
})
