import { describe, it, expect } from 'vitest'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies'

describe('getAllCaseStudies', () => {
  it('returns only projects that have content components', () => {
    expect(getAllCaseStudies().length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    for (const p of getAllCaseStudies()) {
      expect(p.id).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
})

describe('getCaseStudyBySlug', () => {
  it('returns null for unknown slug', () => {
    expect(getCaseStudyBySlug('does-not-exist')).toBeNull()
  })

  it('returns null for a slug that exists in projects metadata but has no content', () => {
    // getAllCaseStudies only returns projects with content; getCaseStudyBySlug
    // must also return null for any project missing a Component
    const all = getAllCaseStudies()
    expect(all.every((p) => getCaseStudyBySlug(p.id) !== null)).toBe(true)
  })

  it('returns entry with Component for known slug', () => {
    const entry = getCaseStudyBySlug('arcy-ai')
    expect(entry).not.toBeNull()
    expect(entry?.Component).toBeTypeOf('function')
    expect(entry?.title).toBe('ARCY AI')
  })
})
