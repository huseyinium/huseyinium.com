// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

vi.mock('@/components/Galaxy', () => ({
  default: () => <div data-testid="hero-galaxy" />,
}))

vi.mock('framer-motion', () => {
  const createElement = (tag: string) => {
    const MotionEl = ({
      children,
      className,
      style,
      animate,
      initial,
      transition,
      variants,
      custom,
      ...rest
    }: any) => React.createElement(tag, { className, style, ...rest }, children)
    MotionEl.displayName = `motion.${tag}`
    return MotionEl
  }

  return {
    motion: new Proxy({}, { get: (_, tag: string) => createElement(tag) }),
    useScroll: () => ({ scrollY: { on: vi.fn(), get: () => 0 } }),
    useMotionValue: (v: number) => ({ get: () => v, set: vi.fn(), on: vi.fn() }),
    useTransform: () => ({ get: () => 1, on: vi.fn() }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
})

describe('Hero', () => {
  it('renders the hero heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /huseyin karatas/i })).toBeInTheDocument()
  })

  it('renders the overline with correct copy', () => {
    render(<Hero />)
    expect(screen.getByText(/co-founder & ceo · full-stack engineer/i)).toBeInTheDocument()
  })

  it('renders the subheading with exact copy', () => {
    render(<Hero />)
    expect(screen.getByText(/at 19 i shipped two regulated fintech products/i)).toBeInTheDocument()
  })

  it('renders "Book a call" CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /book a call/i })).toBeInTheDocument()
  })

  it('"Email me" CTA links to #contact', () => {
    render(<Hero />)
    const emailLink = screen.getByRole('link', { name: /email me/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', '#contact')
  })

  it('renders a scroll indicator', () => {
    render(<Hero />)
    expect(screen.getByRole('img', { name: /scroll down/i })).toBeInTheDocument()
  })

  it('galaxy background has lower z-index than text overlay', () => {
    const { container } = render(<Hero />)
    const galaxy = container.querySelector('[data-testid="hero-galaxy"]')
    const textOverlay = container.querySelector('[data-testid="hero-text"]')
    expect(galaxy).toBeInTheDocument()
    expect(textOverlay).toBeInTheDocument()
    expect(galaxy?.parentElement).toHaveClass('-z-10')
    expect(textOverlay).toHaveClass('z-10')
  })
})
