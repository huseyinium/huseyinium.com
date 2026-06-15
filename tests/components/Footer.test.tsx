// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders quick nav links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders open source GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: /open source/i })
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/huseyin karatas/i)).toBeInTheDocument()
  })
})
