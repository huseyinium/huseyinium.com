// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ReadingProgress } from '@/components/ui/ReadingProgress'

function setScroll(scrollTop: number, scrollHeight: number, clientHeight: number) {
  Object.defineProperty(document.documentElement, 'scrollTop', {
    value: scrollTop,
    configurable: true,
  })
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  })
  Object.defineProperty(document.documentElement, 'clientHeight', {
    value: clientHeight,
    configurable: true,
  })
}

beforeEach(() => {
  setScroll(0, 1000, 500)
})

describe('ReadingProgress', () => {
  it('renders a progressbar with data-reading-progress', () => {
    render(<ReadingProgress />)
    expect(document.querySelector('[data-reading-progress]')).toBeTruthy()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('reports 0 when at the top of the page', () => {
    render(<ReadingProgress />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('reports 100 when scrolled to the bottom', async () => {
    render(<ReadingProgress />)
    await act(async () => {
      setScroll(500, 1000, 500)
      fireEvent.scroll(window)
    })
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
