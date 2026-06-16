import { describe, it, expect, vi, beforeAll } from 'vitest'

vi.mock('@vercel/og', () => ({
  ImageResponse: class {
    status = 200
    headers = new Headers({ 'content-type': 'image/png' })
  },
}))

beforeAll(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)) })
  )
})

async function makeRequest(params: Record<string, string>) {
  const { GET } = await import('@/app/blog/og/route')
  const url = new URL('http://localhost/blog/og')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return GET(new Request(url.toString()))
}

describe('GET /blog/og', () => {
  it('returns a valid PNG image response for a titled post', async () => {
    const res = await makeRequest({ title: 'My Post', date: '2026-06-14' })
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/png')
  })

  it('returns an image response when params are missing (graceful fallback)', async () => {
    const res = await makeRequest({})
    expect(res.status).toBe(200)
  })
})
