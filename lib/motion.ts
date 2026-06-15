export const motion = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    crawl: 1.2,
  },
  ease: {
    out: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
    spring: { type: 'spring' as const, stiffness: 100, damping: 15 },
    bounce: { type: 'spring' as const, stiffness: 400, damping: 10 },
  },
}
