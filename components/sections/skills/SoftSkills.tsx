import {
  MessagesSquare,
  Lightbulb,
  Users,
  ShieldCheck,
  Shuffle,
  type LucideIcon,
  Compass,
  Key,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SoftSkill {
  name: string
  description: string
  icon: LucideIcon
}

const SOFT_SKILLS: SoftSkill[] = [
  {
    name: 'Communication',
    description: 'Translating between engineering, design, and stakeholders, async-first.',
    icon: MessagesSquare,
  },
  {
    name: 'Product Thinking',
    description: 'Asking why before how, shipping outcomes rather than just features.',
    icon: Lightbulb,
  },
  {
    name: 'Leadership',
    description: 'Setting direction and unblocking a team, not just writing code.',
    icon: Compass,
  },
  {
    name: 'Ownership',
    description: 'Treating every system I touch like mine to maintain, end to end.',
    icon: Key,
  },
  {
    name: 'Adaptability',
    description: 'Comfortable switching stacks and contexts as the problem demands.',
    icon: Shuffle,
  },
]

export function SoftSkills() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      {SOFT_SKILLS.map(({ name, description, icon: Icon }) => (
        <Card key={name} className="rounded-full bg-(--color-surface) ring-1 ring-(--color-border)">
          <CardContent className="flex items-center justify-start gap-4 px-8 text-center sm:gap-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-(--color-bg-elevated) text-(--color-accent)">
              <Icon className="size-6" />
            </div>
            <div className="flex min-w-0 flex-col sm:items-baseline">
              <h3 className="shrink-0 font-medium text-foreground sm:w-44 text-left">{name}</h3>
              <p className="text-sm text-(--color-text-muted) text-left">{description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
