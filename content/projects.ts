export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: 'startup' | 'hackathon' | 'freelance' | 'open-source' | 'personal'
  stack: string[]
  coverImage: string
  liveUrl?: string
  githubUrl?: string
  prize?: string
  featured: boolean
  date: string
}

export const PROJECTS: Project[] = [
  {
    id: 'arcy-ai',
    title: 'ARCY AI',
    description:
      'AI-powered recruitment platform that automates sourcing, screening, and outreach at scale.',
    longDescription:
      'ARCY AI replaces manual recruiting workflows with an end-to-end AI agent — from job spec to qualified candidate pipeline in hours, not weeks.',
    category: 'startup',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'OpenAI', 'LangChain'],
    coverImage: '/images/projects/arcy-ai.png',
    liveUrl: 'https://arcy.ai',
    featured: true,
    date: '2024-01',
  },
  {
    id: 'campus-arc',
    title: 'Campus Arc',
    description:
      'Campus community super-app connecting students to events, clubs, and opportunities.',
    longDescription:
      'Campus Arc is the operating system for campus life — events, clubs, internships, and peer connections in one place.',
    category: 'startup',
    stack: ['React Native', 'Expo', 'NestJS', 'PostgreSQL'],
    coverImage: '/images/projects/campus-arc.png',
    featured: true,
    date: '2023-09',
  },
  {
    id: 'misyon-kripto',
    title: 'misyon.kripto',
    description:
      'Crypto education platform for Turkish retail investors entering Web3 for the first time.',
    category: 'freelance',
    stack: ['Next.js', 'Tailwind CSS', 'Sanity'],
    coverImage: '/images/projects/misyon-kripto.png',
    liveUrl: 'https://misyon.com/kripto',
    featured: false,
    date: '2023-06',
  },
  {
    id: 'misyon-bond',
    title: 'misyon.bond',
    description:
      'Fixed-income investment product UI for Misyon Bank — bonds made accessible to everyday savers.',
    category: 'freelance',
    stack: ['Next.js', 'Tailwind CSS', 'REST API'],
    coverImage: '/images/projects/misyon-bond.png',
    liveUrl: 'https://misyon.com/bond',
    featured: false,
    date: '2023-08',
  },
  {
    id: 'carrot',
    title: 'Carrot — ETHGlobal Cannes 2025',
    description:
      'Web3-powered community engagement protocol rewarding on-chain actions with token incentives.',
    category: 'hackathon',
    stack: ['Solidity', 'Next.js', 'Worldcoin', 'Base'],
    coverImage: '/images/projects/carrot.png',
    githubUrl: 'https://github.com/huseyinium/carrot-beta',
    prize: 'ETHGlobal Cannes — Worldcoin Pool Prize',
    featured: false,
    date: '2025-07',
  },
  {
    id: 'swapzilla',
    title: 'SwapZilla — ETHGlobal Brussels 2024',
    description: 'Cross-chain DEX aggregator with intent-based routing for optimal swap execution.',
    category: 'hackathon',
    stack: ['Solidity', 'React', '1inch', 'LayerZero'],
    coverImage: '/images/projects/swapzilla.png',
    prize: 'ETHGlobal Brussels — 1inch Pool Prize',
    featured: false,
    date: '2024-07',
  },
  {
    id: 'verifyworld',
    title: 'VerifyWorld — ETHGlobal Istanbul 2023',
    description:
      'Decentralized identity verification layer using World ID proofs for Sybil-resistant access.',
    category: 'hackathon',
    stack: ['Solidity', 'Next.js', 'Worldcoin', 'IPFS'],
    coverImage: '/images/projects/verifyworld.png',
    prize: 'ETHGlobal Istanbul — Worldcoin Pool Prize',
    featured: false,
    date: '2023-11',
  },
  {
    id: 'rent3',
    title: 'Rent3',
    description:
      'Web3-powered rental marketplace letting tenants pay rent with crypto and on-chain deposit escrow.',
    category: 'personal',
    stack: ['Solidity', 'Next.js', 'Hardhat'],
    coverImage: '/images/projects/rent3.png',
    featured: false,
    date: '2023-04',
  },
  {
    id: 'odtu-bdays',
    title: 'ODTÜ BDAYS 2024',
    description:
      'Birthday celebration platform for METU students — event coordination and gift pooling.',
    category: 'personal',
    stack: ['React', 'Firebase'],
    coverImage: '/images/projects/odtu-bdays.png',
    featured: false,
    date: '2024-03',
  },
  {
    id: 'investbuddy',
    title: 'InvestBuddy',
    description:
      'Portfolio tracking and investment insight tool for early-stage retail investors in Turkey.',
    category: 'personal',
    stack: ['React Native', 'FastAPI', 'PostgreSQL'],
    coverImage: '/images/projects/investbuddy.png',
    featured: false,
    date: '2023-02',
  },
  {
    id: 'type-i-fast',
    title: 'Type-i Fast',
    description: 'Typing speed trainer with AI-generated passages tuned to your weak keys.',
    category: 'personal',
    stack: ['Next.js', 'OpenAI'],
    coverImage: '/images/projects/type-i-fast.png',
    featured: false,
    date: '2022-12',
  },
]
