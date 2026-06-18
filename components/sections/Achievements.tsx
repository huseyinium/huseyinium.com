'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Medal } from 'lucide-react'
import { ACHIEVEMENTS, type AchievementIcon } from '@/content/achievements'
import { Card, CardContent } from '@/components/ui/card'

const ICONS: Record<AchievementIcon, React.ReactNode> = {
  trophy: <Trophy className="w-5 h-5 text-[--color-accent]" />,
  star: <Star className="w-5 h-5 text-[--color-accent]" />,
  medal: <Medal className="w-5 h-5 text-[--color-accent]" />,
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const MotionCard = motion.create(Card)

export function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-[--color-text-primary] mb-16">
          Achievements
        </h2>

        <div data-achievements-grid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((achievement) => (
            <MotionCard
              key={`${achievement.title}-${achievement.date}`}
              data-achievement-card
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-xl bg-[--color-bg-elevated] ring-[--color-border]
                hover:ring-[--color-accent]/40 transition-colors duration-200"
            >
              <CardContent className="flex gap-4">
                <div data-achievement-icon className="mt-0.5 shrink-0">
                  {ICONS[achievement.icon]}
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-[--color-text-primary] font-medium leading-snug">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-[--color-accent] truncate">{achievement.issuer}</p>
                  <p className="text-xs text-[--color-text-muted]">{achievement.date}</p>
                  <p className="text-sm text-[--color-text-secondary] mt-1 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  )
}
