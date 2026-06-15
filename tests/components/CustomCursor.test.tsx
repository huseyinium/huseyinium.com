// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { act } from 'react'
import { CustomCursor } from '@/components/ui/CustomCursor'

describe('CustomCursor', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders cursor element on non-touch devices', async () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true })
    const { container } = render(<CustomCursor />)
    // isTouch starts as true (SSR default), flips to false after useEffect
    await waitFor(() => expect(container.querySelector('[data-cursor]')).toBeInTheDocument())
  })

  it('renders nothing on touch devices', async () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 2, configurable: true })
    const { container } = render(<CustomCursor />)
    await act(async () => {})
    expect(container.querySelector('[data-cursor]')).not.toBeInTheDocument()
  })
})
