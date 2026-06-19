'use client'

import { motion } from 'framer-motion'
import CurvedLoop from '../react-bits/CurvedLoopText'

// const STATS = [
//   { value: '2+', label: 'Startups founded' },
//   { value: '5+', label: 'Years engineering' },
//   { value: '10+', label: 'Hackathons attended' },
//   { value: 'Multiple', label: 'Prizes won' },
//   { value: '16K+', label: 'LinkedIn followers' },
//   { value: '200K+', label: 'YouTube views' },
//   { value: '100K+', label: 'Monthly IG views' },
//   { value: 'METU', label: 'METU student' },
// ]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/huseyinlorakaratas' },
  { label: 'GitHub', href: 'https://github.com/huseyinium' },
  { label: 'YouTube', href: 'https://youtube.com/@huseyinium' },
  { label: 'Instagram', href: 'https://instagram.com/huseyinium' },
]

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground mb-16 text-center">About</h2>

        <div className="grid  gap-12 md:gap-20">
          {/* Left — story */}
          <div className="flex flex-col gap-6 text-(--color-text-muted) leading-relaxed ">
            {[
              {
                id: 'about-para-builder' as const,
                text: "I've been building things since 2021 — from procedural PHP to AI agents, always focused on what actually ships and matters.",
              },
              {
                id: 'about-para-founder' as const,
                text: 'Two startups, one incubator, one accelerator, one grant. Failure taught me that conviction and velocity compound — so I keep building.',
              },
              {
                id: 'about-para-beyond' as const,
                text: 'METU student, community leader, published writer, and content creator. Engineering is one dimension — I care about the full picture.',
              },
            ].map((para, i) => (
              <motion.p
                key={para.id}
                data-testid={para.id}
                custom={i}
                variants={paragraphVariants}
                initial="hidden"
                className="text-gray-300 text-center"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {para.text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 lg:pb-48 lg:pt-52">
        <CurvedLoop
          marqueeText="⚡ I BUILT, THEREFORE I AM."
          speed={1.5}
          curveAmount={200}
          direction="right"
          interactive
        />
      </div>
    </section>
  )
}
