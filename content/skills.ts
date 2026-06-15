export interface SkillCategory {
  category: string
  skills: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
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
    ],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'PostgreSQL',
      'Prisma ORM',
      'REST APIs',
      'NextAuth',
      'Resend',
      'Laravel (PHP)',
      'SQLite',
    ],
  },
  {
    category: 'Infrastructure & Tooling',
    skills: ['AWS', 'Vercel', 'GitHub CI/CD', 'Docker (basic)', 'Webpack'],
  },
  {
    category: 'AI / ML',
    skills: [
      'RAG pipelines',
      'Local LLM inference',
      'Microsoft Foundry Local',
      'Vector embeddings',
      'Prompt engineering',
    ],
  },
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL', 'GLSL'],
  },
]
