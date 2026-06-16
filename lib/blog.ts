import type { ComponentType } from 'react'
import BuildingArcyAi from '@/content/blog/building-arcy-ai'
import TypescriptStrictModeLessons from '@/content/blog/typescript-strict-mode-lessons'
import BuildingInPublic from '@/content/blog/building-in-public'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readingTime?: number
  toc?: TocEntry[]
}

export interface PostEntry extends Post {
  Component: ComponentType
}

const REGISTRY: PostEntry[] = [
  {
    slug: 'building-arcy-ai',
    title: 'What I Learned Building ARCY AI',
    excerpt:
      'Twelve months building an AI recruitment platform from zero to revenue — the lessons that actually stuck.',
    date: '2026-05-20',
    tags: ['AI', 'Startups'],
    readingTime: 7,
    toc: [
      {
        id: 'the-problem-is-never-the-technology',
        text: 'The Problem Is Never the Technology',
        level: 2,
      },
      { id: 'distribution-eats-product', text: 'Distribution Eats Product', level: 2 },
      {
        id: 'accuracy-matters-more-than-comprehensiveness',
        text: 'Accuracy Matters More Than Comprehensiveness',
        level: 2,
      },
      { id: 'key-takeaways', text: 'Key Takeaways', level: 2 },
    ],
    Component: BuildingArcyAi,
  },
  {
    slug: 'typescript-strict-mode-lessons',
    title: 'Six Months of TypeScript Strict Mode — What Actually Changed',
    excerpt:
      'I turned on strict mode across a 30k-line codebase. Here is what broke, what I fixed, and what I will never go back on.',
    date: '2026-04-10',
    tags: ['Engineering', 'TypeScript'],
    readingTime: 5,
    toc: [
      { id: 'what-broke-first', text: 'What Broke First', level: 2 },
      { id: 'null-checks-revealed-real-bugs', text: 'Null Checks Revealed Real Bugs', level: 2 },
      { id: 'what-i-will-never-give-up', text: 'What I Will Never Give Up', level: 2 },
      { id: 'the-maintenance-payoff', text: 'The Maintenance Payoff', level: 2 },
    ],
    Component: TypescriptStrictModeLessons,
  },
  {
    slug: 'building-in-public',
    title: 'Why I Build in Public',
    excerpt:
      'Transparency is not a marketing tactic. It is a forcing function for thinking clearly and building the right things.',
    date: '2026-03-05',
    tags: ['Startups', 'Founders'],
    readingTime: 4,
    toc: [
      { id: 'it-forces-clarity', text: 'It Forces Clarity', level: 2 },
      { id: 'accountability-is-real', text: 'Accountability Is Real', level: 2 },
      { id: 'the-feedback-loop-is-compressed', text: 'The Feedback Loop Is Compressed', level: 2 },
      { id: 'what-i-have-learned', text: 'What I Have Learned', level: 2 },
    ],
    Component: BuildingInPublic,
  },
]

export function getAllPosts(): Post[] {
  return [...REGISTRY]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ Component: _Component, ...post }) => post)
}

export function getPostBySlug(slug: string): PostEntry | null {
  return REGISTRY.find((p) => p.slug === slug) ?? null
}
