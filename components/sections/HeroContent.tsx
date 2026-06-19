'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const WORDS = ['Huseyin', 'Karatas']

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

const ctaVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: WORDS.length * 0.1 + 0.3, duration: 0.4 },
  },
}

export function HeroContent() {
  const [opacity, setOpacity] = useState(1)
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    function onScroll() {
      const threshold = window.innerHeight * 0.2
      const ratio = Math.max(0, 1 - window.scrollY / threshold)
      setOpacity(ratio)
      setScrolledPast(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      data-testid="hero-text"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
    >
      <motion.p
        className="font-mono text-sm tracking-widest text-(--color-accent) uppercase mb-6"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Full-Stack Engineer & Entrepreneur
      </motion.p>

      <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-tight mb-6">
        {WORDS.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="inline-block mr-4"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="max-w-xl text-lg text-(--color-text-muted) mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        At 19 I shipped two regulated FinTech products at a bank. Then I watched my own platform
        churn most of its users. So I built the thing that would have saved it.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
      >
        <Link
          href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#contact'}
          className={cn(buttonVariants(), 'bg-(--color-accent) text-black hover:opacity-90')}
        >
          Book a call
        </Link>
        <a href="#contact" className={buttonVariants({ variant: 'outline' })}>
          Email me
        </a>
      </motion.div>

      {!scrolledPast && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <svg
            role="img"
            aria-label="Scroll down"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      )}
    </div>
  )
}
