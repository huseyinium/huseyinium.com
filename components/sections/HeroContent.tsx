'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import LightRays from '../react-bits/LightRays'
import { WebglErrorBoundary } from '../react-bits/WebglErrorBoundary'

const introVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.6, ease: 'easeOut' as const },
  },
}

const ctaVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.4 },
  },
}

export function HeroContent() {
  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full rounded-3xl! bg-background">
        <WebglErrorBoundary
          fallback={<div className="absolute inset-0 rounded-3xl! bg-background" />}
        >
          <LightRays
            className="opacity-60"
            raysOrigin="top-center"
            raysColor="#96c8ff"
            raysSpeed={1.5}
            lightSpread={1.5}
            saturation={1}
          />
        </WebglErrorBoundary>
      </div>
      <div
        data-testid="hero-text"
        className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="pointer-events-none text-left">
            <motion.p
              variants={introVariants}
              initial="hidden"
              animate="visible"
              className="font-mono text-sm w-[80%] md:w-full mx-auto text-center text-white/60 mb-3"
            >
              Full-Stack Engineer &amp; Entrepreneur
            </motion.p>

            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-center text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              I build what modern software <br /> makes possible.
            </motion.h1>

            <motion.div
              className="pointer-events-auto flex flex-row justify-center items-center gap-3"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#contact'}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Book a call
              </Link>
              <a
                href="mailto:huseyinium.biz@gmail.com"
                className="rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/55"
              >
                Email me
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
