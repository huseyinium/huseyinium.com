// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('defaults to the technical skills tab and description', () => {
    render(<Skills />)
    expect(screen.getByText(/languages, frameworks, and tools/i)).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Technical Skills' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
  })

  it('switches to soft skills on tab click, updating the description and content', async () => {
    render(<Skills />)
    await userEvent.click(screen.getByRole('tab', { name: 'Soft Skills' }))

    expect(screen.getByText(/people and product instincts/i)).toBeInTheDocument()
    expect(screen.getByText('Communication')).toBeInTheDocument()
    expect(screen.getByText('Product Thinking')).toBeInTheDocument()
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('Ownership')).toBeInTheDocument()
    expect(screen.getByText('Adaptability')).toBeInTheDocument()
  })
})
