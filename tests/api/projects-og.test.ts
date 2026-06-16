import { describe, it, expect, vi } from 'vitest'

vi.mock('@vercel/og', () => ({
  ImageResponse: class {
    status = 200
    headers = new Headers({ 'content-type': 'image/png' })
  },
}))

async function makeRequest(params: Record<string, string>) {
  const { GET } = await import('@/app/projects/og/route')
  const url = new URL('http://localhost/projects/og')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return GET(new Request(url.toString()))
}

describe('GET /projects/og', () => {
  it('returns an image response for valid params', async () => {
    const res = await makeRequest({ title: 'ARCY AI', category: 'startup' })
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/png')
  })

  it('returns an image response when title is missing (graceful fallback)', async () => {
    const res = await makeRequest({})
    expect(res.status).toBe(200)
  })
})
