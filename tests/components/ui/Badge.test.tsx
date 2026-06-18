// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders children as a span by default', () => {
    render(<Badge>Next.js</Badge>)
    const badge = screen.getByText('Next.js')
    expect(badge.tagName).toBe('SPAN')
  })

  it('applies outline variant classes', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline').className).toMatch(/border-border/)
  })

  it('applies destructive variant classes', () => {
    render(<Badge variant="destructive">Error</Badge>)
    expect(screen.getByText('Error').className).toMatch(/text-destructive/)
  })

  it('swaps the rendered element via the render prop', () => {
    render(<Badge render={<a href="/x" />}>Link badge</Badge>)
    const badge = screen.getByText('Link badge')
    expect(badge.tagName).toBe('A')
    expect(badge).toHaveAttribute('href', '/x')
  })
})
