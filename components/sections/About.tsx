'use client'

import { motion } from 'framer-motion'
import { StatCounter } from '@/components/ui/StatCounter'
import { ParticleDrift } from '@/components/3d/ParticleDrift'

const STATS = [
  { value: '2+', label: 'Startups founded' },
  { value: '5+', label: 'Years engineering' },
  { value: '10+', label: 'Hackathons attended' },
  { value: 'Multiple', label: 'Prizes won' },
  { value: '16K+', label: 'LinkedIn followers' },
  { value: '200K+', label: 'YouTube views' },
  { value: '100K+', label: 'Monthly IG views' },
  { value: 'METU', label: 'METU student' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/huseyinkaratas' },
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
      <div className="hidden md:block absolute inset-0 -z-10">
        <ParticleDrift />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-(--color-text-primary) mb-16">About</h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left — story */}
          <div className="flex flex-col gap-6 text-(--color-text-muted) leading-relaxed">
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
                whileInView="visible"
                viewport={{ once: true }}
              >
                {para.text}
              </motion.p>
            ))}
          </div>

          {/* Right — stats + social */}
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-(--color-text-muted) mb-4">
                Find me online
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
