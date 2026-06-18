'use client'

import { motion } from 'framer-motion'
import { SKILLS } from '@/content/skills'
import { Badge } from '@/components/ui/badge'

const MotionBadge = motion.create(Badge)

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
        <h2 className="font-cal text-4xl md:text-5xl text-(--color-text-primary) mb-16">Skills</h2>

        <div className="flex flex-col gap-12">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <motion.h3
                className="text-xs uppercase tracking-widest text-(--color-accent) mb-4"
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
                  <MotionBadge
                    key={skill}
                    data-skill-badge
                    variant="outline"
                    variants={badgeVariants}
                    className="h-auto rounded-full px-3 py-1 text-sm
                      bg-(--color-bg-elevated) border-(--color-border)
                      text-(--color-text-muted)
                      hover:text-(--color-accent) hover:border-(--color-accent) hover:shadow-[0_0_8px_var(--color-accent)]
                      transition-all duration-200 cursor-default select-none"
                  >
                    {skill}
                  </MotionBadge>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
