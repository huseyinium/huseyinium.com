export type PrincipleIcon = 'devotion' | 'honesty' | 'transparency' | 'responsibility' | 'quality'

export interface Principle {
  title: string
  description: string
  icon: PrincipleIcon
  featured?: boolean
}

export const PRINCIPLES: Principle[] = [
  {
    title: 'Devotion',
    description:
      'I show up fully for the people and projects I commit to, not just when it is convenient.',
    icon: 'devotion',
    featured: true,
  },
  {
    title: 'Quality',
    description:
      'I would rather ship something fewer times, done well, than something often, done poorly.',
    icon: 'quality',
    featured: true,
  },
  {
    title: 'Honesty',
    description: 'I say what is true, even when a softer version would be easier to hear.',
    icon: 'honesty',
  },
  {
    title: 'Transparency',
    description:
      'I share my reasoning & progress openly so you can trust the process, not just the result.',
    icon: 'transparency',
  },
  {
    title: 'Responsibility',
    description: 'I own the outcomes of my decisions, the wins and the mistakes alike.',
    icon: 'responsibility',
  },
]
