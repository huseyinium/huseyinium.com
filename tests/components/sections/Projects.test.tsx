// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

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
    render(<Projects />)
    const featured = screen
      .getAllByRole('article')
      .filter((el) => el.getAttribute('data-featured') === 'true')
    expect(featured).toHaveLength(2)
    const titles = featured.map((el) => el.querySelector('h3')?.textContent)
    expect(titles).toContain('ARCY AI')
    expect(titles).toContain('Campus Arc')
  })

  it('does not render category filter tabs', () => {
    render(<Projects />)
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
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
    expect(screen.getAllByTestId('prize-carrot')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('prize-swapzilla')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('prize-verifyworld')[0]).toBeInTheDocument()
  })

  it('"View all projects →" link points to /projects', () => {
    render(<Projects />)
    const viewAll = screen.getByRole('link', { name: /view all projects/i })
    expect(viewAll).toHaveAttribute('href', '/projects')
  })
})
