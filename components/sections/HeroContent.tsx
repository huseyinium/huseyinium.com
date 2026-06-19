'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Strands from '../react-bits/Strands'
import { WebglErrorBoundary } from '../react-bits/WebglErrorBoundary'

//const WORDS = ['I build,', 'therefore I am.']
const WORDS = ['I build', 'what modern software capable of.']
// const WORDS = ['I imagine,', 'so I build.']

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
  return (
    <>
      <div className="absolute inset-0 -z-10 rounded-3xl!">
        <WebglErrorBoundary fallback={<div className="absolute inset-0 bg-(--color-bg)" />}>
          <Strands
            colors={['#F97316', '#7C3AED', '#06B6D4']}
            count={3}
            speed={0.5}
            amplitude={1}
            waviness={1}
            thickness={0.7}
            glow={2.6}
            taper={3}
            spread={1}
            intensity={0.6}
            saturation={2}
            opacity={1}
            scale={1.5}
            glass={false}
            refraction={1}
            dispersion={1}
            glassSize={1}
            hueShift={0}
          />
        </WebglErrorBoundary>
      </div>
      <div
        data-testid="hero-text"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
      >
        <motion.p className="relative inline-block  text-sm mb-6" transition={{ duration: 0.4 }}>
          I&apos;m Huseyin Karatas, a Full-Stack Engineer & Entrepreneur
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-gray-100 via-gray-500 to-gray-900 bg-clip-text text-transparent mix-blend-overlay blur-[1.5px]"
          >
            I&apos;m Huseyin Karatas, a Full-Stack Engineer & Entrepreneur
          </span>
        </motion.p>

        <div
          aria-hidden
          className="hero-lens-glow absolute top-1/2 left-1/2 h-32 w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 md:h-48"
        />

        <h1 className="font-display text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="relative inline-block mr-4"
            >
              {word}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-gray-100 via-gray-500 to-gray-900 bg-clip-text text-transparent mix-blend-overlay blur-[1.5px]"
              >
                {word}
              </span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="pointer-events-auto flex flex-row items-center gap-3"
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
            href="#contact"
            className="rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/55"
          >
            Email me
          </a>
        </motion.div>
      </div>
    </>
  )
}
