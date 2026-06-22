// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Principles data', () => {
  it('exports exactly 5 principles', async () => {
    const { PRINCIPLES } = await import('@/content/principles')
    expect(PRINCIPLES).toHaveLength(5)
  })

  it('each principle has required fields', async () => {
    const { PRINCIPLES } = await import('@/content/principles')
    for (const p of PRINCIPLES) {
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(['devotion', 'honesty', 'transparency', 'responsibility', 'quality']).toContain(p.icon)
    }
  })
})

describe('Principles section', () => {
  it('renders section#principles', async () => {
    const { Principles } = await import('@/components/sections/Principles')
    const { container } = render(<Principles />)
    expect(container.querySelector('section#principles')).toBeInTheDocument()
  })

  it('renders "Principles" heading', async () => {
    const { Principles } = await import('@/components/sections/Principles')
    render(<Principles />)
    expect(screen.getByRole('heading', { name: /principles/i })).toBeInTheDocument()
  })

  it('renders all 5 principle titles', async () => {
    const { PRINCIPLES } = await import('@/content/principles')
    const { Principles } = await import('@/components/sections/Principles')
    render(<Principles />)
    for (const p of PRINCIPLES) {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    }
  })

  it('renders all 5 principle descriptions', async () => {
    const { PRINCIPLES } = await import('@/content/principles')
    const { Principles } = await import('@/components/sections/Principles')
    render(<Principles />)
    for (const p of PRINCIPLES) {
      expect(screen.getByText(p.description)).toBeInTheDocument()
    }
  })

  it('renders the principles grid container with one card per principle', async () => {
    const { PRINCIPLES } = await import('@/content/principles')
    const { Principles } = await import('@/components/sections/Principles')
    const { container } = render(<Principles />)
    const grid = container.querySelector('[data-principles-grid]')
    expect(grid).toBeInTheDocument()
    expect(container.querySelectorAll('[data-principle-card]')).toHaveLength(PRINCIPLES.length)
  })

  it('each card has an icon element', async () => {
    const { PRINCIPLES } = await import('@/content/principles')
    const { Principles } = await import('@/components/sections/Principles')
    const { container } = render(<Principles />)
    const icons = container.querySelectorAll('[data-principle-icon]')
    expect(icons).toHaveLength(PRINCIPLES.length)
  })
})
