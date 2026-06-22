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
        description: '',
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
        description: '',
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
        description: '',
      },
    ],
  },
  {
    company: 'Founder Institute',
    logo: '/logos/companies/founder-institute.svg',
    logoWidth: 120,
    logoHeight: 100,
    roles: [
      {
        title: 'Affiliate Founder, Go Beyond Lab 2026',
        period: 'Jun 2026 - Present · 1 mo',
        description: '',
      },
      {
        title: 'Affiliate Founder, Core Program Turkiye 2026, Launch Track',
        period: 'Mar 2026 - Present · 4 mos',
        description: '',
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
        description: '',
      },
      {
        title: 'Founding Software Engineer',
        period: 'May 2025 - Apr 2026 · 1 yr',
        description: '',
      },
    ],
  },
  {
    company: 'Misyon Bank',
    logo: '/logos/companies/misyon-bank.svg',
    logoWidth: 200,
    roles: [
      {
        title: 'Full-Stack Software Engineer',
        period: 'Mar 2025 - May 2025 · 3 mos',
        description: '',
      },
      {
        title: 'Full-Stack Software Engineer',
        period: 'Apr 2024 - Jan 2025 · 10 mos',
        description: '',
      },
      {
        title: 'Software Engineer (Front-End)',
        period: 'Jan 2024 - Mar 2024 · 3 mos',
        description: '',
      },
    ],
  },
  {
    company: 'InvestBuddy',
    roles: [
      {
        title: 'Software Engineer (Front-End)',
        period: 'Jan 2024 - Jun 2024 · 6 mos',
        description: '',
      },
    ],
  },
  {
    company: 'iDateBuddy',
    roles: [
      {
        title: 'Laravel Back-End Developer',
        period: 'Jun 2023 - Oct 2023 · 5 mos',
        description: '',
      },
    ],
  },
  {
    company: 'Hotelasistan',
    roles: [
      {
        title: 'Full-Stack PHP Developer',
        period: 'Jan 2023 - Jul 2023 · 7 mos',
        description: '',
      },
    ],
  },
  {
    company: 'Epifanik',
    roles: [
      {
        title: 'Founder & Front-End Developer',
        period: 'Sep 2021 - Jan 2023 · 1 yr 5 mos',
        description: '',
      },
    ],
  },
]
