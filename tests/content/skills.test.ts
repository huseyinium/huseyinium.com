import { describe, it, expect } from 'vitest'
import { SKILLS, type SkillCategory } from '@/content/skills'

describe('SKILLS data', () => {
  it('exports exactly 5 categories in order', () => {
    const names = SKILLS.map((c: SkillCategory) => c.category)
    expect(names).toEqual([
      'Frontend',
      'Backend',
      'Infrastructure & Tooling',
      'AI / ML',
      'Languages',
    ])
  })

  it('has no Web3 category', () => {
    const names = SKILLS.map((c: SkillCategory) => c.category)
    expect(names).not.toContain('Web3')
  })

  it('Frontend category has correct skills', () => {
    const frontend = SKILLS.find((c: SkillCategory) => c.category === 'Frontend')!
    expect(frontend.skills).toEqual([
      'Next.js',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Three.js / R3F',
      'shadcn/ui',
      'GSAP',
      'Redux Toolkit',
      'Figma',
    ])
  })

  it('Backend category has correct skills', () => {
    const backend = SKILLS.find((c: SkillCategory) => c.category === 'Backend')!
    expect(backend.skills).toEqual([
      'Node.js',
      'PostgreSQL',
      'Prisma ORM',
      'REST APIs',
      'NextAuth',
      'Resend',
      'Laravel (PHP)',
      'SQLite',
    ])
  })

  it('Infrastructure & Tooling category has correct skills', () => {
    const infra = SKILLS.find((c: SkillCategory) => c.category === 'Infrastructure & Tooling')!
    expect(infra.skills).toEqual(['AWS', 'Vercel', 'GitHub CI/CD', 'Docker (basic)', 'Webpack'])
  })

  it('AI / ML category has correct skills', () => {
    const ai = SKILLS.find((c: SkillCategory) => c.category === 'AI / ML')!
    expect(ai.skills).toEqual([
      'RAG pipelines',
      'Local LLM inference',
      'Microsoft Foundry Local',
      'Vector embeddings',
      'Prompt engineering',
    ])
  })

  it('Languages category has correct skills', () => {
    const langs = SKILLS.find((c: SkillCategory) => c.category === 'Languages')!
    expect(langs.skills).toEqual(['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL', 'GLSL'])
  })
})
