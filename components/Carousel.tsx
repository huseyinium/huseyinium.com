'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue, type PanInfo } from 'motion/react'
import Image from 'next/image'

export interface CarouselProps {
  images: string[]
  alt: string
  baseWidth?: number
  baseHeight?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
}

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 }

interface CarouselItemProps {
  src: string
  alt: string
  index: number
  itemWidth: number
  itemHeight: number
  trackItemOffset: number
  x: MotionValue<number>
}

function CarouselItem({
  src,
  alt,
  index,
  itemWidth,
  itemHeight,
  trackItemOffset,
  x,
}: CarouselItemProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ]
  const rotateY = useTransform(x, range, [35, 0, -35], { clamp: false })

  return (
    <motion.div
      className="relative shrink-0 cursor-grab overflow-hidden active:cursor-grabbing"
      style={{ width: itemWidth, height: itemHeight, rotateY }}
    >
      <Image src={src} alt={alt} fill sizes="400px" draggable={false} className="object-cover" />
    </motion.div>
  )
}

export default function Carousel({
  images,
  alt,
  baseWidth = 340,
  baseHeight = 192,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
}: CarouselProps) {
  const trackItemOffset = baseWidth
  const canLoop = loop && images.length > 1
  const itemsForRender = useMemo(() => {
    if (!canLoop) return images
    return [images[images.length - 1], ...images, images[0]]
  }, [images, canLoop])

  const [position, setPosition] = useState(canLoop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return undefined
    const container = containerRef.current
    const onEnter = () => setIsHovered(true)
    const onLeave = () => setIsHovered(false)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined
    if (pauseOnHover && isHovered) return undefined
    const timer = setInterval(() => {
      setPosition((prev) => prev + 1)
    }, autoplayDelay)
    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationComplete = () => {
    if (!canLoop || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }
    const lastCloneIndex = itemsForRender.length - 1
    if (position === lastCloneIndex) {
      setIsJumping(true)
      setPosition(1)
      x.set(-trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }
    if (position === 0) {
      setIsJumping(true)
      setPosition(images.length)
      x.set(-images.length * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }
    setIsAnimating(false)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0
    if (direction === 0) return
    setPosition((prev) => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return canLoop ? next : Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = canLoop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      }

  const activeIndex =
    images.length === 0 ? 0 : canLoop ? (position - 1 + images.length) % images.length : position

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ width: baseWidth, height: baseHeight }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          x,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + baseWidth / 2}px 50%`,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((src, index) => (
          <CarouselItem
            key={`${src}-${index}`}
            src={src}
            alt={alt}
            index={index}
            itemWidth={baseWidth}
            itemHeight={baseHeight}
            trackItemOffset={trackItemOffset}
            x={x}
          />
        ))}
      </motion.div>
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full border-0 p-0 transition-colors duration-150 ${
                activeIndex === index ? 'bg-white' : 'bg-white/40'
              }`}
              onClick={() => setPosition(canLoop ? index + 1 : index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
