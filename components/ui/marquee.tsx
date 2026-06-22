'use client'

import {
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'

import { cn } from '@/lib/utils'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover and let the user scroll/drag freely
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragOrigin = useRef<{ pointer: number; scroll: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const interactive = pauseOnHover && !vertical

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!track) return
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (delta === 0) return
    event.preventDefault()
    track.scrollLeft += delta
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!track) return
    dragOrigin.current = { pointer: event.clientX, scroll: track.scrollLeft }
    track.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!track || !dragOrigin.current) return
    track.scrollLeft = dragOrigin.current.scroll - (event.clientX - dragOrigin.current.pointer)
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    trackRef.current?.releasePointerCapture(event.pointerId)
    dragOrigin.current = null
    setIsDragging(false)
  }

  function handleMouseLeave() {
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  return (
    <div
      {...props}
      ref={trackRef}
      onWheel={interactive ? handleWheel : undefined}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerUp={interactive ? endDrag : undefined}
      onPointerLeave={interactive ? endDrag : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={cn(
        'group flex gap-(--gap) p-2 [--duration:40s] [--gap:1rem]',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
          'overflow-x-hidden': !interactive,
          'overflow-x-auto cursor-grab active:cursor-grabbing': interactive,
          'overscroll-x-contain': interactive,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn('flex shrink-0 justify-around gap-(--gap)', {
              'animate-marquee flex-row': !vertical,
              'animate-marquee-vertical flex-col': vertical,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
              '[animation-direction:reverse]': reverse,
              'pointer-events-none': isDragging,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
