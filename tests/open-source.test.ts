import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '..')

describe('LICENSE', () => {
  let text = ''
  beforeAll(() => {
    if (fs.existsSync(path.join(root, 'LICENSE'))) {
      text = fs.readFileSync(path.join(root, 'LICENSE'), 'utf-8')
    }
  })

  it('exists', () => {
    expect(fs.existsSync(path.join(root, 'LICENSE'))).toBe(true)
  })

  it('is MIT', () => {
    expect(text).toContain('MIT License')
  })

  it('has a copyright year', () => {
    expect(text).toMatch(/20\d{2}/)
  })

  it('names Huseyin Karatas', () => {
    expect(text).toContain('Huseyin Karatas')
  })
})

describe('.env.example', () => {
  let text = ''
  beforeAll(() => {
    const filePath = path.join(root, '.env.example')
    if (fs.existsSync(filePath)) {
      text = fs.readFileSync(filePath, 'utf-8')
    }
  })

  it('exists', () => {
    expect(fs.existsSync(path.join(root, '.env.example'))).toBe(true)
  })

  it('has NEXT_PUBLIC_SITE_URL', () => {
    expect(text).toContain('NEXT_PUBLIC_SITE_URL')
  })

  it('has NEXT_PUBLIC_CALENDLY_URL', () => {
    expect(text).toContain('NEXT_PUBLIC_CALENDLY_URL')
  })

  it('has RESEND_API_KEY', () => {
    expect(text).toContain('RESEND_API_KEY')
  })

  it('has RESEND_FROM_EMAIL', () => {
    expect(text).toContain('RESEND_FROM_EMAIL')
  })

  it('has YOUTUBE_API_KEY', () => {
    expect(text).toContain('YOUTUBE_API_KEY')
  })
})

describe('README.md', () => {
  let text = ''
  beforeAll(() => {
    const filePath = path.join(root, 'README.md')
    if (fs.existsSync(filePath)) {
      text = fs.readFileSync(filePath, 'utf-8')
    }
  })

  it('exists', () => {
    expect(fs.existsSync(path.join(root, 'README.md'))).toBe(true)
  })

  it('has live site badge linking huseyinium.com', () => {
    expect(text).toContain('huseyinium.com')
  })

  it('has tech stack section heading', () => {
    expect(text).toMatch(/##\s*(tech\s+stack|stack)/i)
  })

  it('has one-command setup', () => {
    expect(text).toContain('bun install')
    expect(text).toContain('bun dev')
  })

  it('has customization section', () => {
    expect(text.toLowerCase()).toMatch(/fork|customiz/i)
  })

  it('has environment variables section', () => {
    expect(text).toContain('RESEND_API_KEY')
  })

  it('has deploy to Vercel button or link', () => {
    expect(text.toLowerCase()).toContain('vercel')
  })

  it('has MIT license badge or mention', () => {
    expect(text.toLowerCase()).toContain('mit')
  })
})

describe('CONTRIBUTING.md', () => {
  let text = ''
  beforeAll(() => {
    const filePath = path.join(root, 'CONTRIBUTING.md')
    if (fs.existsSync(filePath)) {
      text = fs.readFileSync(filePath, 'utf-8')
    }
  })

  it('exists', () => {
    expect(fs.existsSync(path.join(root, 'CONTRIBUTING.md'))).toBe(true)
  })

  it('explains how to add a blog post', () => {
    expect(text.toLowerCase()).toMatch(/blog post|mdx/)
  })

  it('has bug reporting section', () => {
    expect(text.toLowerCase()).toMatch(/bug|issue/)
  })

  it('mentions code style tools', () => {
    expect(text.toLowerCase()).toMatch(/eslint|prettier/)
  })

  it('has PR checklist', () => {
    expect(text.toLowerCase()).toMatch(/pull request|pr checklist|\[ \]/)
  })
})
