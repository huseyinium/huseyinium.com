// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Achievements data', () => {
  it('exports exactly 10 achievements', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    expect(ACHIEVEMENTS).toHaveLength(10)
  })

  it('each achievement has required fields', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    for (const a of ACHIEVEMENTS) {
      expect(a.title).toBeTruthy()
      expect(a.issuer).toBeTruthy()
      expect(a.date).toBeTruthy()
      expect(a.description).toBeTruthy()
      expect(['trophy', 'star', 'medal']).toContain(a.icon)
    }
  })
})

describe('Achievements section', () => {
  it('renders section#achievements', async () => {
    const { Achievements } = await import('@/components/sections/Achievements')
    const { container } = render(<Achievements />)
    expect(container.querySelector('section#achievements')).toBeInTheDocument()
  })

  it('renders "Achievements" heading', async () => {
    const { Achievements } = await import('@/components/sections/Achievements')
    render(<Achievements />)
    expect(screen.getByRole('heading', { name: /achievements/i })).toBeInTheDocument()
  })

  it('renders all 10 achievement titles', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    const { Achievements } = await import('@/components/sections/Achievements')
    render(<Achievements />)
    const titleCounts = ACHIEVEMENTS.reduce<Record<string, number>>((acc, a) => {
      acc[a.title] = (acc[a.title] ?? 0) + 1
      return acc
    }, {})
    for (const [title, count] of Object.entries(titleCounts)) {
      expect(screen.getAllByText(title)).toHaveLength(count)
    }
  })

  it('renders each issuer with accent color class', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    const { Achievements } = await import('@/components/sections/Achievements')
    render(<Achievements />)
    for (const a of ACHIEVEMENTS) {
      const issuerEls = screen.getAllByText(a.issuer)
      issuerEls.forEach((el) => expect(el.className).toMatch(/color-accent|accent/))
    }
  })

  it('renders each date with muted color class', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    const { Achievements } = await import('@/components/sections/Achievements')
    render(<Achievements />)
    for (const a of ACHIEVEMENTS) {
      const dateEls = screen.getAllByText(a.date)
      dateEls.forEach((el) => expect(el.className).toMatch(/muted/))
    }
  })

  it('renders the achievements grid container', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    const { Achievements } = await import('@/components/sections/Achievements')
    const { container } = render(<Achievements />)
    const grid = container.querySelector('[data-achievements-grid]')
    expect(grid).toBeInTheDocument()
    expect(container.querySelectorAll('[data-achievement-card]')).toHaveLength(ACHIEVEMENTS.length)
  })

  it('each card has an icon element', async () => {
    const { ACHIEVEMENTS } = await import('@/content/achievements')
    const { Achievements } = await import('@/components/sections/Achievements')
    const { container } = render(<Achievements />)
    const icons = container.querySelectorAll('[data-achievement-icon]')
    expect(icons).toHaveLength(ACHIEVEMENTS.length)
  })
})
