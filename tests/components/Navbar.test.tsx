// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
})

describe('Navbar', () => {
  it('renders logo and all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText(/huseyinium/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('is transparent at the top (no backdrop class)', () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector('nav')
    expect(nav?.className).not.toMatch(/backdrop-blur/)
  })

  it('adds backdrop blur after scrolling past 80px', async () => {
    const { container } = render(<Navbar />)
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 90, writable: true, configurable: true })
      fireEvent.scroll(window)
    })
    const nav = container.querySelector('nav')
    expect(nav?.className).toMatch(/backdrop-blur/)
  })

  it('mobile menu opens and closes on hamburger click', async () => {
    render(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /menu/i })
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(hamburger)
    })
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(hamburger)
    })
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument()
  })
})
