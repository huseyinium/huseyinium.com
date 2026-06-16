// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Prose } from '@/components/ui/Prose'

describe('Prose', () => {
  it('applies prose-content class to wrapper', () => {
    const { container } = render(
      <Prose>
        <p>text</p>
      </Prose>
    )
    expect(container.firstChild).toHaveClass('prose-content')
  })

  it('renders children inside the wrapper', () => {
    const { getByText } = render(
      <Prose>
        <p>hello</p>
      </Prose>
    )
    expect(getByText('hello')).toBeInTheDocument()
  })

  it('merges additional className with prose-content', () => {
    const { container } = render(
      <Prose className="custom-class">
        <p>text</p>
      </Prose>
    )
    expect(container.firstChild).toHaveClass('prose-content', 'custom-class')
  })
})
