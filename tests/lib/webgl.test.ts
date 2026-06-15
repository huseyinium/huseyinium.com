// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { checkWebGLSupport, getNodeCount } from '@/lib/webgl'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('checkWebGLSupport', () => {
  it('returns false when getContext throws', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('WebGL not supported')
    })
    expect(checkWebGLSupport()).toBe(false)
  })

  it('returns false when getContext returns null', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    expect(checkWebGLSupport()).toBe(false)
  })

  it('returns true when getContext returns a context object', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      {} as WebGL2RenderingContext
    )
    expect(checkWebGLSupport()).toBe(true)
  })
})

describe('getNodeCount', () => {
  it('returns 150 on touch devices', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 2, configurable: true })
    expect(getNodeCount()).toBe(150)
  })

  it('returns 500 on desktop', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true })
    expect(getNodeCount()).toBe(500)
  })
})
