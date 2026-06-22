export type AchievementIcon = 'trophy' | 'star' | 'medal'

export interface Achievement {
  title: string
  issuer: string
  date: string
  description: string
  icon: AchievementIcon
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: '$25,000 Grant Approved',
    issuer: 'Open Campus Incubator Cohort 1',
    date: 'Jan 2025',
    description: 'Selected and funded in the inaugural Open Campus incubator cohort.',
    icon: 'trophy',
  },
  {
    title: 'Rank #1, EduFi Category',
    issuer: 'Campus Arc BETA / EDU Chain Hackathon',
    date: 'Aug 2024',
    description: 'Topped the EduFi vertical at the EDU Chain hackathon with Campus Arc.',
    icon: 'trophy',
  },
  {
    title: 'Worldcoin Pool Prize',
    issuer: 'Carrot / ETHGlobal Cannes 2025',
    date: 'Jul 2025',
    description: 'Won a Worldcoin pool prize at ETHGlobal Cannes 2025 with Carrot.',
    icon: 'medal',
  },
  {
    title: 'Blockscout Pool Prize',
    issuer: 'SwapZilla / ETHGlobal Brussels 2024',
    date: 'Jul 2024',
    description: 'Won a Blockscout pool prize at ETHGlobal Brussels 2024 with SwapZilla.',
    icon: 'medal',
  },

  {
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey.org',
    date: 'Apr 2026',
    description: 'Completed the McKinsey Forward leadership development program.',
    icon: 'star',
  },
  {
    title: 'Founder Institute Launch Track',
    issuer: 'Founder Institute',
    date: 'Mar 2026',
    description: 'Graduated from the Founder Institute Launch Track accelerator.',
    icon: 'star',
  },
  {
    title: 'Microsoft AI Innovators Program',
    issuer: 'Microsoft',
    date: 'May 2026',
    description: 'Selected as a Microsoft AI Innovator for building with Azure AI.',
    icon: 'star',
  },
  {
    title: 'NVIDIA Developer Program Member',
    issuer: 'NVIDIA',
    date: 'Apr 2026',
    description: 'Accepted into the NVIDIA Developer Program for AI and GPU computing.',
    icon: 'star',
  },
  /*  {
    title: 'Published Author',
    issuer: 'Manevra Magazine / METU YWC',
    date: 'Fall 2023',
    description: 'Published writing in Manevra Magazine through METU Young Writers Club.',
    icon: 'star',
  }, */
]
