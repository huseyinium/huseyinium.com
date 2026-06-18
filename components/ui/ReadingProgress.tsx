'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Progress
      data-reading-progress
      value={progress}
      className="fixed top-0 inset-x-0 z-50 gap-0 p-0"
      trackClassName="h-[2px] rounded-none bg-transparent"
      indicatorClassName="bg-[--color-accent] transition-[width] duration-100"
    />
  )
}
