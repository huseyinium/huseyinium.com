'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const CURSOR_DEFAULT_SIZE = 'w-2 h-2'
const CURSOR_HOVER_SIZE = 'w-10 h-10 opacity-30'

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setHovered(!!(e.target as Element).closest?.('a, button, [role="button"]'))
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      data-cursor
      className={cn(
        'pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-accent] transition-[width,height,opacity] duration-150',
        hovered ? CURSOR_HOVER_SIZE : CURSOR_DEFAULT_SIZE
      )}
      // left/top must be inline — these are runtime-computed pixel values
      style={{ left: pos.x, top: pos.y }}
    />
  )
}
