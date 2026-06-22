'use client'

import { Flame, ShieldCheck, Eye, HandHeart, Gem, ClipboardCheck, Shield } from 'lucide-react'
import BorderGlowCard from '@/components/react-bits/BorderGlowCard'
import { PRINCIPLES, type Principle, type PrincipleIcon } from '@/content/principles'

const ICONS: Record<PrincipleIcon, React.ReactNode> = {
  devotion: <Flame className="w-full h-full" />,
  honesty: <Shield className="w-full h-full" />,
  transparency: <Eye className="w-full h-full" />,
  responsibility: <ClipboardCheck className="w-full h-full" />,
  quality: <Gem className="w-full h-full" absoluteStrokeWidth={true} />,
}

function PrincipleIconBadge({ icon, size }: { icon: PrincipleIcon; size: 'lg' | 'sm' }) {
  const badge = size === 'lg' ? 'w-14 h-14 p-3.5' : 'w-12 h-12 p-3'

  return (
    <div
      data-principle-icon
      className={`shrink-0 rounded-xl text-(--color-accent) bg-(--color-bg-subtle) ${badge}`}
    >
      {ICONS[icon]}
    </div>
  )
}

function PrincipleCard({ principle }: { principle: Principle }) {
  const isFeatured = principle.featured

  return (
    <div data-principle-card className="h-full">
      <BorderGlowCard
        borderRadius={16}
        backgroundColor="var(--color-bg-elevated)"
        colors={['#f97316', '#ffd45e', '#c2570f']}
        glowColor="24 95 53"
        className={`flex flex-col gap-3 h-full ${isFeatured ? 'p-8' : 'p-6'}`}
      >
        <PrincipleIconBadge icon={principle.icon} size={isFeatured ? 'lg' : 'sm'} />
        <p
          className={`text-foreground font-medium leading-snug mt-4 ${isFeatured ? 'text-xl' : 'text-lg'}`}
        >
          {principle.title}
        </p>
        <p className="text-sm text-(--color-text-secondary) leading-relaxed">
          {principle.description}
        </p>
      </BorderGlowCard>
    </div>
  )
}

export function Principles() {
  const featured = PRINCIPLES.filter((p) => p.featured)
  const rest = PRINCIPLES.filter((p) => !p.featured)

  return (
    <section id="principles" className="py-24 md:py-24">
      <div className="mx-auto px-6 w-full max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground text-center">Principles</h2>
        <p className="text-(--color-text-muted) text-center mb-8 mt-2">
          The values that shape how I build, work, and show up.
        </p>

        <div data-principles-grid className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((principle) => (
              <PrincipleCard key={principle.title} principle={principle} />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((principle) => (
              <PrincipleCard key={principle.title} principle={principle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
