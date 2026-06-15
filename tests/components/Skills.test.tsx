// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from '@/components/sections/Skills'

describe('Skills section', () => {
  it('renders the section with id="skills"', () => {
    const { container } = render(<Skills />)
    const section = container.querySelector('section#skills')
    expect(section).toBeInTheDocument()
  })

  it('renders a visible "Skills" heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
  })

  it('renders all 5 category headers', () => {
    render(<Skills />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure & Tooling')).toBeInTheDocument()
    expect(screen.getByText('AI / ML')).toBeInTheDocument()
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })

  it('renders all skill badges from data', () => {
    render(<Skills />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('RAG pipelines')).toBeInTheDocument()
    expect(screen.getByText('GLSL')).toBeInTheDocument()
  })

  it('does not render a Web3 category', () => {
    render(<Skills />)
    expect(screen.queryByText('Web3')).not.toBeInTheDocument()
  })

  it('skill badges have hover accent class applied', () => {
    const { container } = render(<Skills />)
    const badges = container.querySelectorAll('[data-skill-badge]')
    expect(badges.length).toBeGreaterThan(0)
    badges.forEach((badge) => {
      expect(badge.className).toMatch(/hover:/)
    })
  })
})
