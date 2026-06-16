import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSend = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: mockSend } })),
}))

async function makeRequest(body: unknown, contentType = 'application/json') {
  const { POST } = await import('@/app/api/contact/route')
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: JSON.stringify(body),
  })
  return POST(request)
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules()
    process.env.RESEND_API_KEY = 'test-key'
    process.env.RESEND_FROM_EMAIL = 'test@example.com'
    mockSend.mockResolvedValue({ data: { id: 'mock-id' }, error: null })
  })

  it('returns { success: true } when Resend delivers successfully', async () => {
    const res = await makeRequest({ name: 'Alice', email: 'alice@example.com', message: 'Hello' })
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json).toEqual({ success: true })
  })

  it('returns 400 when required fields are missing', async () => {
    const res = await makeRequest({ email: 'alice@example.com' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when email format is invalid', async () => {
    const res = await makeRequest({ name: 'Alice', email: 'not-an-email', message: 'Hello' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when message exceeds 2000 characters', async () => {
    const res = await makeRequest({ name: 'Alice', email: 'a@b.com', message: 'x'.repeat(2001) })
    expect(res.status).toBe(400)
  })

  it('returns 500 when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY
    const res = await makeRequest({ name: 'Alice', email: 'alice@example.com', message: 'Hello' })
    expect(res.status).toBe(500)
  })

  it('returns { error } when Resend fails', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'Resend error' } })
    const res = await makeRequest({ name: 'Alice', email: 'alice@example.com', message: 'Hello' })
    const json = await res.json()
    expect(res.status).toBe(500)
    expect(json).toHaveProperty('error')
  })
})
