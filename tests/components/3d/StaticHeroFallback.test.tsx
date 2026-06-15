// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StaticHeroFallback } from '@/components/3d/StaticHeroFallback'

describe('StaticHeroFallback', () => {
  it('renders a visually hidden label for accessibility', () => {
    render(<StaticHeroFallback />)
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('fills the full viewport with aria-hidden', () => {
    const { container } = render(<StaticHeroFallback />)
    const root = container.firstElementChild as HTMLElement
    expect(root.getAttribute('aria-hidden')).toBe('true')
    expect(root.className).toMatch(/fixed|absolute|inset/)
  })

  it('contains a radial glow element', () => {
    const { container } = render(<StaticHeroFallback />)
    const glow = container.querySelector('[data-glow]')
    expect(glow).toBeInTheDocument()
  })
})
