'use client'

import { motion } from 'framer-motion'
import { SKILLS } from '@/content/skills'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const badgeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-16">Skills</h2>

        <div className="flex flex-col gap-12">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <motion.h3
                className="text-xs uppercase tracking-widest text-[--color-accent] mb-4"
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.category}
              </motion.h3>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    data-skill-badge
                    variants={badgeVariants}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm
                      bg-[--color-bg-elevated] border border-[--color-border]
                      text-[--color-text-muted]
                      hover:text-[--color-accent] hover:border-[--color-accent] hover:shadow-[0_0_8px_var(--color-accent)]
                      transition-all duration-200 cursor-default select-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
