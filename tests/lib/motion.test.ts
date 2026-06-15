import { describe, it, expect } from 'vitest'
import { motion } from '@/lib/motion'

describe('motion tokens', () => {
  it('exports duration values', () => {
    expect(motion.duration.fast).toBe(0.15)
    expect(motion.duration.normal).toBe(0.3)
    expect(motion.duration.slow).toBe(0.6)
    expect(motion.duration.crawl).toBe(1.2)
  })

  it('exports easing arrays for css-compatible easings', () => {
    expect(motion.ease.out).toEqual([0.0, 0.0, 0.2, 1])
    expect(motion.ease.inOut).toEqual([0.4, 0, 0.2, 1])
  })

  it('exports spring configs with stiffness and damping', () => {
    expect(motion.ease.spring).toMatchObject({ type: 'spring', stiffness: 100, damping: 15 })
    expect(motion.ease.bounce).toMatchObject({ type: 'spring', stiffness: 400, damping: 10 })
  })
})
