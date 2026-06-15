// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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

import ProjectsPage from '@/app/projects/page'

describe('/projects page', () => {
  it('renders "All Projects" heading', () => {
    render(<ProjectsPage />)
    expect(screen.getByRole('heading', { name: /all projects/i })).toBeInTheDocument()
  })

  it('renders all 11 project cards', () => {
    render(<ProjectsPage />)
    expect(screen.getAllByRole('article')).toHaveLength(11)
  })

  it('featured projects (ARCY AI, Campus Arc) appear first', () => {
    render(<ProjectsPage />)
    const articles = screen.getAllByRole('article')
    const titles = articles.map((a) => a.querySelector('h3')?.textContent)
    expect(titles[0]).toBe('ARCY AI')
    expect(titles[1]).toBe('Campus Arc')
  })

  it('renders a link back to the homepage portfolio section', () => {
    render(<ProjectsPage />)
    const back = screen.getByRole('link', { name: /back/i })
    expect(back).toHaveAttribute('href', '/#projects')
  })
})
