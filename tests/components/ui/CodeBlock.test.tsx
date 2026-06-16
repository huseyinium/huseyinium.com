// @vitest-environment happy-dom
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('shiki', () => ({
  codeToHtml: vi.fn(async (code: string, opts: { lang?: string }) => {
    return `<pre><code class="language-${opts.lang ?? 'text'}">${code}</code></pre>`
  }),
}))

import { CodeBlock } from '@/components/ui/CodeBlock'

describe('CodeBlock', () => {
  it('renders a div with shiki HTML output', async () => {
    const Component = await CodeBlock({ code: 'const x = 1', lang: 'ts' })
    const { container } = render(Component as React.ReactElement)
    expect(container.querySelector('pre')).toBeTruthy()
    expect(container.querySelector('code.language-ts')).toBeTruthy()
  })

  it('trims leading/trailing whitespace from code', async () => {
    const { codeToHtml } = await import('shiki')
    await CodeBlock({ code: '  const x = 1  ', lang: 'ts' })
    expect(vi.mocked(codeToHtml)).toHaveBeenCalledWith('const x = 1', expect.any(Object))
  })

  it('defaults lang to text when not specified', async () => {
    const { codeToHtml } = await import('shiki')
    await CodeBlock({ code: 'hello' })
    expect(vi.mocked(codeToHtml)).toHaveBeenCalledWith(
      'hello',
      expect.objectContaining({ lang: 'text' })
    )
  })
})
