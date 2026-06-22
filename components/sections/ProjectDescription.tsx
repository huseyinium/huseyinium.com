'use client'

import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ProjectDescription({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setIsTruncated(el.scrollHeight > el.clientHeight + 1)
  }, [text])

  const paragraph = (
    <p ref={ref} className="text-sm text-(--color-text-muted) leading-relaxed line-clamp-3">
      {text}
    </p>
  )

  if (!isTruncated) return paragraph

  return (
    <Tooltip>
      <TooltipTrigger render={paragraph} />
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  )
}
