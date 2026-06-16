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

async function makeRequest() {
  const { GET } = await import('@/app/og/route')
  return GET()
}

describe('GET /og', () => {
  it('returns a valid PNG image response', async () => {
    const res = await makeRequest()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/png')
  })
})
