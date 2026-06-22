export interface ExperienceRole {
  title: string
  period: string
  description?: string
}

export interface ExperienceCompany {
  company: string
  logo?: string
  /** Override the default logo box size (px). Useful when source logos have wildly different aspect ratios. */
  logoWidth?: number
  logoHeight?: number
  roles: ExperienceRole[]
}

export const EXPERIENCE: ExperienceCompany[] = [
  {
    company: 'ARCY AI',
    logo: '/logos/companies/arcy-ai.svg',
    logoWidth: 200,
    roles: [
      {
        title: 'Co-Founder & CEO & Founding Engineer',
        period: 'Apr 2026 - Present · 3 mos',
        description:
          'Building embedded AI agents that close the Product-Market Fit loop autonomously.',
      },
    ],
  },
  {
    company: 'Microsoft',
    logo: '/logos/companies/microsoft.svg',
    logoWidth: 200,
    roles: [
      {
        title: 'AI Innovators Program Intern',
        period: 'May 2026 - Present · 2 mos',
        description:
          'Building a fully offline RAG-based document Q&A assistant using Microsoft Foundry Local, combining local LLM inference, vector embeddings, and SQLite to answer questions from custom knowledge bases without any cloud dependency.',
      },
    ],
  },
  {
    company: 'McKinsey.org',
    logo: '/logos/companies/mckinsey.svg',
    logoWidth: 200,
    logoHeight: 100,
    roles: [
      {
        title: 'Forward Program – McKinsey & Company',
        period: 'Apr 2026 - Present · 3 mos',
        description:
          'Going through a 10-week leadership development training covering adaptability, structured problem solving, communicating for impact, relationships and well-being, and digital and AI essentials.',
      },
    ],
  },
  {
    company: 'Founder Institute',
    logo: '/logos/companies/founder-institute.svg',
    logoWidth: 150,
    logoHeight: 100,
    roles: [
      {
        title: 'Affiliate Founder, Go Beyond Lab 2026',
        period: 'Jun 2026 - Present · 1 mo',
        description:
          'An 8-week programme going from idea to investor-ready pitch through weekly workshops, coaching, and mentor office hours, covering problem validation through TAM/SAM/SOM analysis to GTM strategy.',
      },
      {
        title: 'Affiliate Founder, Core Program Turkiye 2026, Launch Track',
        period: 'Mar 2026 - Present · 4 mos',
        description:
          "Advancing ARCY AI as a core member of Founder Institute's Launch Track, the world's largest pre-seed accelerator, sharpening the business model, go-to-market strategy, and investor readiness.",
      },
    ],
  },
  {
    company: 'Campus Arc',
    logo: '/logos/companies/campus-arc.svg',
    logoWidth: 210,
    logoHeight: 100,
    roles: [
      {
        title: 'Co-Founder & CEO',
        period: 'May 2025 - Apr 2026 · 1 yr',
        description:
          'Founded and shaped Campus Arc from the ground up, crafting its vision, mission, business model, and go-to-market strategy. Personally secured the platform’s first 100+ partners through direct outreach and strategic relationship-building. Led early-stage fundraising, branding, and positioning.',
      },
      {
        title: 'Founding Software Engineer',
        period: 'May 2025 - Apr 2026 · 1 yr',
        description:
          "Led end-to-end architecture and development of Campus Arc's full-stack platform using React, Next.js, TailwindCSS, PostgreSQL, Prisma ORM, and AWS.",
      },
    ],
  },
  {
    company: 'Misyon Bank',
    logo: '/logos/companies/misyon-bank.svg',
    logoWidth: 200,
    roles: [
      {
        title: 'Full-Stack Software Engineer (Misyon Kripto)',
        period: 'Mar 2025 - May 2025 · 3 mos',
        description:
          "Developed the Proof of Concept for TokenBull, Türkiye's leading tokenized crypto investing platform backed by an official bank, demonstrating the product's core functionality within Misyon Bank's digital innovation initiatives.",
      },
      {
        title: 'Full-Stack Software Engineer',
        period: 'Apr 2024 - Jan 2025 · 10 mos',
        description:
          'Led full-stack development with Next.js, Prisma, and PostgreSQL on Vercel with CI/CD via GitHub. Built REST APIs, integrated WalletConnect, and implemented auth with NextAuth and ReCaptcha.',
      },
      {
        title: 'Software Engineer (Front-End)',
        period: 'Jan 2024 - Mar 2024 · 3 mos',
        description:
          'Built responsive, TypeScript-driven front-end applications for a global fintech project using React, Next.js, TailwindCSS, and GSAP, integrating WalletConnect for the Web3 transition.',
      },
    ],
  },
  {
    company: 'InvestBuddy',
    roles: [
      {
        title: 'Software Engineer (Front-End)',
        period: 'Jan 2024 - Jun 2024 · 6 mos',
        description:
          'Built the full responsive UI with TypeScript and Next.js, a scalable Redux Toolkit architecture, and Chart.js dashboards. InvestBuddy was accepted into Thirdweb’s Startup Program Cohort 2.',
      },
    ],
  },
]
