// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardContent } from '@/components/ui/card'

describe('Card', () => {
  it('renders as a div by default', () => {
    render(<Card data-testid="card">content</Card>)
    expect(screen.getByTestId('card').tagName).toBe('DIV')
  })

  it('renders as the given element via the as prop', () => {
    render(
      <Card as="article" data-testid="card">
        content
      </Card>
    )
    expect(screen.getByTestId('card').tagName).toBe('ARTICLE')
  })

  it('renders CardContent children inside', () => {
    render(
      <Card as="article">
        <CardContent>hello</CardContent>
      </Card>
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
