import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import path from 'path'

// Use a temp fixtures dir isolated from real content
const FIXTURES = path.resolve(__dirname, '../fixtures')
const BLOG_DIR = path.join(FIXTURES, 'blog')
const PROJECTS_DIR = path.join(FIXTURES, 'projects')

// Override the content dir used by mdx.ts via env var
process.env.CONTENT_DIR = FIXTURES

import { getAllPosts, getPostBySlug, getCaseStudyBySlug, getAllCaseStudies } from '@/lib/mdx'

function writeMdx(dir: string, filename: string, content: string) {
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, filename), content)
}

function clearDir(dir: string) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
}

describe('getAllPosts', () => {
  beforeEach(() => {
    clearDir(BLOG_DIR)
    clearDir(PROJECTS_DIR)
  })
  afterEach(() => {
    if (existsSync(FIXTURES)) rmSync(FIXTURES, { recursive: true, force: true })
  })

  it('returns empty array when no blog posts exist', async () => {
    const posts = await getAllPosts()
    expect(posts).toEqual([])
  })

  it('sorts posts newest-first when multiple posts exist', async () => {
    writeMdx(
      BLOG_DIR,
      'older.mdx',
      `---
title: "Older"
excerpt: ""
date: "2026-01-01"
tags: []
---
`
    )
    writeMdx(
      BLOG_DIR,
      'newer.mdx',
      `---
title: "Newer"
excerpt: ""
date: "2026-06-01"
tags: []
---
`
    )
    writeMdx(
      BLOG_DIR,
      'middle.mdx',
      `---
title: "Middle"
excerpt: ""
date: "2026-03-01"
tags: []
---
`
    )

    const posts = await getAllPosts()
    expect(posts.map((p) => p.slug)).toEqual(['newer', 'middle', 'older'])
  })

  it('returns one post with correct frontmatter when one MDX file exists', async () => {
    writeMdx(
      BLOG_DIR,
      'hello-world.mdx',
      `---
title: "Hello World"
excerpt: "My first post"
date: "2026-06-01"
tags: ["Engineering"]
readingTime: 3
---

Post body here.
`
    )

    const posts = await getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0]).toMatchObject({
      slug: 'hello-world',
      title: 'Hello World',
      excerpt: 'My first post',
      date: '2026-06-01',
      tags: ['Engineering'],
      readingTime: 3,
    })
  })
})

describe('getCaseStudyBySlug', () => {
  beforeEach(() => {
    clearDir(BLOG_DIR)
    clearDir(PROJECTS_DIR)
  })
  afterEach(() => {
    if (existsSync(FIXTURES)) rmSync(FIXTURES, { recursive: true, force: true })
  })

  it('returns null for unknown slug', async () => {
    const study = await getCaseStudyBySlug('does-not-exist')
    expect(study).toBeNull()
  })

  it('returns case study with correct data for known slug', async () => {
    writeMdx(
      PROJECTS_DIR,
      'arcy-ai.mdx',
      `---
title: "ARCY AI"
description: "AI-powered recruitment platform"
category: "startup"
stack: ["Next.js", "NestJS"]
coverImage: "/images/projects/arcy-ai.png"
date: "2024-01"
liveUrl: "https://arcy.ai"
---

## Problem

Manual recruiting is slow.

## What I Built

An AI agent pipeline.

## Outcome

Closed 10 clients in 3 months.
`
    )

    const study = await getCaseStudyBySlug('arcy-ai')
    expect(study).toMatchObject({
      slug: 'arcy-ai',
      title: 'ARCY AI',
      description: 'AI-powered recruitment platform',
      category: 'startup',
      stack: ['Next.js', 'NestJS'],
      coverImage: '/images/projects/arcy-ai.png',
      date: '2024-01',
      liveUrl: 'https://arcy.ai',
    })
    expect(study?.content).toContain('Manual recruiting is slow.')
  })
})

describe('getAllCaseStudies', () => {
  beforeEach(() => {
    clearDir(BLOG_DIR)
    clearDir(PROJECTS_DIR)
  })
  afterEach(() => {
    if (existsSync(FIXTURES)) rmSync(FIXTURES, { recursive: true, force: true })
  })

  it('returns empty array when no case studies exist', async () => {
    const studies = await getAllCaseStudies()
    expect(studies).toEqual([])
  })

  it('sorts case studies newest-first', async () => {
    writeMdx(
      PROJECTS_DIR,
      'older.mdx',
      `---
title: "Older"
description: ""
category: "startup"
stack: []
coverImage: ""
date: "2023-01"
---
`
    )
    writeMdx(
      PROJECTS_DIR,
      'newer.mdx',
      `---
title: "Newer"
description: ""
category: "hackathon"
stack: []
coverImage: ""
date: "2025-07"
---
`
    )

    const studies = await getAllCaseStudies()
    expect(studies.map((s) => s.slug)).toEqual(['newer', 'older'])
  })
})

describe('getPostBySlug', () => {
  beforeEach(() => {
    clearDir(BLOG_DIR)
    clearDir(PROJECTS_DIR)
  })
  afterEach(() => {
    if (existsSync(FIXTURES)) rmSync(FIXTURES, { recursive: true, force: true })
  })

  it('returns null for unknown slug', async () => {
    const post = await getPostBySlug('does-not-exist')
    expect(post).toBeNull()
  })

  it('returns post with correct data for known slug', async () => {
    writeMdx(
      BLOG_DIR,
      'my-post.mdx',
      `---
title: "My Post"
excerpt: "A great read"
date: "2026-05-10"
tags: ["AI", "Startups"]
readingTime: 7
---

The actual body of the post.
`
    )

    const post = await getPostBySlug('my-post')
    expect(post).toMatchObject({
      slug: 'my-post',
      title: 'My Post',
      excerpt: 'A great read',
      date: '2026-05-10',
      tags: ['AI', 'Startups'],
      readingTime: 7,
    })
    expect(post?.content).toContain('The actual body of the post.')
  })
})
