import type { ComponentType } from 'react'
import { PROJECTS, type Project } from '@/content/projects'
import ArcyAi from '@/content/projects/arcy-ai'
import CampusArc from '@/content/projects/campus-arc'
import Carrot from '@/content/projects/carrot'
import InvestBuddy from '@/content/projects/investbuddy'
import MisyonBond from '@/content/projects/misyon-bond'
import MisyonKripto from '@/content/projects/misyon-kripto'
import OdtuBdays from '@/content/projects/odtu-bdays'
import Rent3 from '@/content/projects/rent3'
import SwapZilla from '@/content/projects/swapzilla'
import TypeIFast from '@/content/projects/type-i-fast'
import VerifyWorld from '@/content/projects/verifyworld'

export type { Project }

export interface CaseStudyEntry extends Project {
  Component: ComponentType
}

const CONTENT: Record<string, ComponentType> = {
  'arcy-ai': ArcyAi,
  'campus-arc': CampusArc,
  carrot: Carrot,
  investbuddy: InvestBuddy,
  'misyon-bond': MisyonBond,
  'misyon-kripto': MisyonKripto,
  'odtu-bdays': OdtuBdays,
  rent3: Rent3,
  swapzilla: SwapZilla,
  'type-i-fast': TypeIFast,
  verifyworld: VerifyWorld,
}

function sortableDate(project: Project) {
  return project.startDate ?? project.endDate ?? ''
}

export function getAllCaseStudies(): Project[] {
  return [...PROJECTS]
    .filter((p) => p.id in CONTENT)
    .sort((a, b) => sortableDate(b).localeCompare(sortableDate(a)))
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntry | null {
  const project = PROJECTS.find((p) => p.id === slug)
  if (!project) return null
  const Component = CONTENT[slug]
  if (!Component) return null
  return { ...project, Component }
}
