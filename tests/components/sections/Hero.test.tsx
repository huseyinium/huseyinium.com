// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

vi.mock('@/components/3d/HeroCanvas', () => ({
  HeroCanvas: () => <div data-testid="hero-canvas" className="-z-10 fixed inset-0" />,
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

  it('canvas wrapper has lower z-index than text overlay', () => {
    const { container } = render(<Hero />)
    const canvas = container.querySelector('[data-testid="hero-canvas"]')
    const textOverlay = container.querySelector('[data-testid="hero-text"]')
    expect(canvas).toBeInTheDocument()
    expect(textOverlay).toBeInTheDocument()
    expect(canvas).toHaveClass('-z-10')
    expect(textOverlay).toHaveClass('z-10')
  })

  it('hero content fades out when scrolled past 20vh', async () => {
    const { container } = render(<Hero />)
    const content = container.querySelector('[data-testid="hero-text"]')
    expect(content).toBeInTheDocument()

    await act(async () => {
      const vh20 = window.innerHeight * 0.2 + 10
      Object.defineProperty(window, 'scrollY', { value: vh20, writable: true, configurable: true })
      fireEvent.scroll(window)
    })

    const opacity = parseFloat((content as HTMLElement).style.opacity)
    expect(opacity).toBeLessThan(1)
  })
})
