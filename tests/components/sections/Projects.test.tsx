// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

vi.mock('framer-motion', () => {
  const createElement = (tag: string) => {
    const MotionEl = ({ children, className, ...rest }: any) =>
      React.createElement(tag, { className, ...rest }, children)
    MotionEl.displayName = `motion.${tag}`
    return MotionEl
  }
  return {
    motion: new Proxy({}, { get: (_, tag: string) => createElement(tag) }),
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

vi.mock('@/components/3d/ProjectMicroCanvas', () => ({
  ProjectMicroCanvas: () => <div data-testid="micro-canvas" />,
}))

describe('Projects', () => {
  it('renders section with id="projects"', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('#projects')).toBeInTheDocument()
  })

  it('renders "Projects" section heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /^projects$/i })).toBeInTheDocument()
  })

  it('renders all 7 project cards by default', () => {
    render(<Projects />)
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(7)
  })

  it('featured cards (ARCY AI, Campus Arc) carry data-featured attribute', () => {
    const { container } = render(<Projects />)
    const featured = container.querySelectorAll('[data-featured="true"]')
    expect(featured).toHaveLength(2)
    const titles = Array.from(featured).map((el) => el.querySelector('h3')?.textContent)
    expect(titles).toContain('ARCY AI')
    expect(titles).toContain('Campus Arc')
  })

  it('renders All / Startups / Hackathons / Freelance filter tabs — no Personal tab', () => {
    render(<Projects />)
    expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^startups$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^hackathons$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^freelance$/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /personal/i })).not.toBeInTheDocument()
  })

  it('Startups filter shows 2 cards', () => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: /^startups$/i }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('Hackathons filter shows 3 cards', () => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: /^hackathons$/i }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('Freelance filter shows 2 cards', () => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: /^freelance$/i }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('"Read case study" links to /projects/[slug] for each card', () => {
    render(<Projects />)
    const ctaLinks = screen.getAllByRole('link', { name: /read case study/i })
    expect(ctaLinks).toHaveLength(7)
    const hrefs = ctaLinks.map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/projects/arcy-ai')
    expect(hrefs).toContain('/projects/carrot')
    expect(hrefs).toContain('/projects/verifyworld')
  })

  it('prize badges visible on Carrot, SwapZilla, VerifyWorld', () => {
    render(<Projects />)
    expect(screen.getByTestId('prize-carrot')).toBeInTheDocument()
    expect(screen.getByTestId('prize-swapzilla')).toBeInTheDocument()
    expect(screen.getByTestId('prize-verifyworld')).toBeInTheDocument()
  })

  it('"View all projects →" link points to /projects', () => {
    render(<Projects />)
    const viewAll = screen.getByRole('link', { name: /view all projects/i })
    expect(viewAll).toHaveAttribute('href', '/projects')
  })
})
