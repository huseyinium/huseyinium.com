// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/dynamic so the dynamic import resolves synchronously in tests
vi.mock('next/dynamic', () => ({
  default: (fn: () => Promise<{ default: React.ComponentType }>) => {
    // Return a component that renders nothing (Canvas not available in happy-dom)
    const Dynamic = () => null
    Dynamic.displayName = 'DynamicHeroScene'
    return Dynamic
  },
}))

import { HeroCanvas } from '@/components/3d/HeroCanvas'
import React from 'react'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('HeroCanvas', () => {
  it('renders StaticHeroFallback when WebGL is unavailable', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    render(<HeroCanvas />)
    // StaticHeroFallback has aria-hidden root and role=img span
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('does not render StaticHeroFallback when WebGL is available', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      {} as WebGL2RenderingContext
    )
    render(<HeroCanvas />)
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
  })

  it('always renders a container with explicit dimensions (no CLS)', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      {} as WebGL2RenderingContext
    )
    const { container } = render(<HeroCanvas />)
    const root = container.firstElementChild as HTMLElement
    expect(root.className).toMatch(/w-full/)
    expect(root.className).toMatch(/h-/)
  })
})
