// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from '@/components/sections/About'

vi.mock('@/components/3d/ParticleDrift', () => ({
  ParticleDrift: () => <div data-testid="particle-drift" />,
}))

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
    useMotionValue: (v: number) => ({ get: () => v, set: vi.fn(), on: vi.fn() }),
    useTransform: (_: unknown, fn: (v: number) => number) => fn(0),
    animate: vi.fn(),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('About', () => {
  it('renders section with id="about"', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })

  it('renders "About" section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /^about$/i })).toBeInTheDocument()
  })

  it('renders 3 story paragraphs', () => {
    render(<About />)
    expect(screen.getByTestId('about-para-builder')).toBeInTheDocument()
    expect(screen.getByTestId('about-para-founder')).toBeInTheDocument()
    expect(screen.getByTestId('about-para-beyond')).toBeInTheDocument()
  })

  it('renders all 8 stats with correct values and labels', () => {
    const { container } = render(<About />)
    const statValues = ['2+', '5+', '10+', 'Multiple', '16K+', '200K+', '100K+', 'METU']
    statValues.forEach((v) => {
      expect(container.querySelector(`[data-value="${v}"]`)).toBeInTheDocument()
    })
    expect(screen.getByText(/startups founded/i)).toBeInTheDocument()
    expect(screen.getByText(/years engineering/i)).toBeInTheDocument()
    expect(screen.getByText(/hackathons/i)).toBeInTheDocument()
    expect(screen.getByText(/prizes won/i)).toBeInTheDocument()
    expect(screen.getByText(/linkedin followers/i)).toBeInTheDocument()
    expect(screen.getByText(/youtube views/i)).toBeInTheDocument()
    expect(screen.getByText(/monthly ig views/i)).toBeInTheDocument()
    expect(screen.getAllByText(/metu student/i).length).toBeGreaterThan(0)
  })

  it('renders "Find me online" with 4 social links opening in new tab', () => {
    render(<About />)
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    const github = screen.getByRole('link', { name: /github/i })
    const youtube = screen.getByRole('link', { name: /youtube/i })
    const instagram = screen.getByRole('link', { name: /instagram/i })

    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/huseyinkaratas')
    expect(github).toHaveAttribute('href', 'https://github.com/huseyinium')
    expect(youtube).toHaveAttribute('href', 'https://youtube.com/@huseyinium')
    expect(instagram).toHaveAttribute('href', 'https://instagram.com/huseyinium')
    ;[linkedin, github, youtube, instagram].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })

  it('renders ParticleDrift background', () => {
    render(<About />)
    expect(screen.getByTestId('particle-drift')).toBeInTheDocument()
  })

  it('ParticleDrift wrapper is hidden on mobile via aria-hidden or CSS class', () => {
    const { container } = render(<About />)
    const particleWrapper = container.querySelector('[data-testid="particle-drift"]')?.parentElement
    expect(particleWrapper).toHaveClass('hidden md:block')
  })
})
