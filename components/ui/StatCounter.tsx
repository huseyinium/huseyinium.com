'use client'

import { useRef } from 'react'
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

interface StatCounterProps {
  value: string
  label: string
}

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const numericMatch = value.match(/^(\d+)/)
  const numeric = numericMatch ? parseInt(numericMatch[1], 10) : null
  const suffix = numeric !== null ? value.slice(String(numeric).length) : ''

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (isInView && numeric !== null) {
      animate(count, numeric, { duration: 1.2, ease: 'easeOut' })
    }
  }, [isInView, numeric, count])

  return (
    <div ref={ref} className="flex flex-col gap-1" data-value={value}>
      <span className="text-2xl font-bold text-gradient-accent">
        {numeric !== null ? <motion.span>{rounded}</motion.span> : value}
        {suffix}
      </span>
      <span className="text-sm text-(--color-text-muted)">{label}</span>
    </div>
  )
}
