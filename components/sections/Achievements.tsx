'use client'

import { Trophy, Star, Medal } from 'lucide-react'
import { ACHIEVEMENTS, type AchievementIcon } from '@/content/achievements'

const ICONS: Record<AchievementIcon, React.ReactNode> = {
  trophy: <Trophy className="w-6 h-6 text-(--color-accent)" />,
  star: <Star className="w-6 h-6 text-(--color-accent)" />,
  medal: <Medal className="w-6 h-6 text-(--color-accent)" />,
}

export function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className=" mx-auto px-6 w-full">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground text-center">Achievements</h2>
        <p className="text-(--color-text-muted) text-center mb-8">
          Competitions, hackathons, and recognitions along the way.
        </p>

        <div data-achievements-grid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={`${achievement.title}-${achievement.date}`}
              data-achievement-card
              className="rounded-xl bg-(--color-bg-elevated) ring-1 ring-(--color-border) p-6 flex gap-4
                hover:ring-(--color-accent)/40 hover:shadow-[0_0_24px_var(--color-accent-glow)]
                transition-all duration-200"
            >
              <div data-achievement-icon className="mt-0.5 shrink-0">
                {ICONS[achievement.icon]}
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-foreground font-medium leading-snug text-lg">
                  {achievement.title}
                </p>
                <p className="text-sm text-(--color-accent) truncate">{achievement.issuer}</p>
                <p className="text-xs text-(--color-text-muted)">{achievement.date}</p>
                <p className="text-sm text-(--color-text-secondary) mt-1 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
