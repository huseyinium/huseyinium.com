// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('next/dynamic', () => ({
  default: () => () => null,
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  global.fetch = fetchMock
})

async function renderContact() {
  const { Contact } = await import('@/components/sections/contact')
  return render(<Contact />)
}

describe('Contact section layout', () => {
  it('renders section with id="contact"', async () => {
    const { container } = await renderContact()
    expect(container.querySelector('section#contact')).toBeInTheDocument()
  })

  it('renders a visible "Contact" heading', async () => {
    await renderContact()
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders "Book a 15-min call" button when calendar URL is set', async () => {
    process.env.NEXT_PUBLIC_CALENDLY_URL = 'https://cal.com/huseyinium'
    await renderContact()
    const link = screen.getByRole('link', { name: /book a 15.min call/i })
    expect(link).toHaveAttribute('href', 'https://cal.com/huseyinium')
  })

  it('hides "Book a 15-min call" button when calendar URL is not set', async () => {
    delete process.env.NEXT_PUBLIC_CALENDLY_URL
    await renderContact()
    expect(screen.queryByRole('link', { name: /book a 15.min call/i })).not.toBeInTheDocument()
  })

  it('renders "Usually responds within 24 hours"', async () => {
    await renderContact()
    expect(screen.getByText(/usually responds within 24 hours/i)).toBeInTheDocument()
  })

  it('has no mailto link', async () => {
    const { container } = await renderContact()
    const mailtoLinks = container.querySelectorAll('a[href^="mailto:"]')
    expect(mailtoLinks.length).toBe(0)
  })
})

describe('Social links', () => {
  it('renders LinkedIn link opening in new tab', async () => {
    await renderContact()
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
  })

  it('renders GitHub link opening in new tab', async () => {
    await renderContact()
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  it('renders YouTube link opening in new tab', async () => {
    await renderContact()
    const link = screen.getByRole('link', { name: /youtube/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('href', expect.stringContaining('youtube.com'))
  })

  it('renders Instagram link opening in new tab', async () => {
    await renderContact()
    const link = screen.getByRole('link', { name: /instagram/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('href', expect.stringContaining('instagram.com'))
  })
})

describe('ContactForm', () => {
  it('renders Name, Email, Message fields and submit button', async () => {
    await renderContact()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('blocks submit when fields are empty', async () => {
    await renderContact()
    const button = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(button)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('blocks submit when email format is invalid', async () => {
    const user = userEvent.setup()
    await renderContact()
    await user.type(screen.getByLabelText(/name/i), 'Alice')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('shows spinner while request is in-flight', async () => {
    fetchMock.mockReturnValue(new Promise(() => {}))
    const user = userEvent.setup()
    await renderContact()
    await user.type(screen.getByLabelText(/name/i), 'Alice')
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled()
    expect(document.querySelector('[data-loading]')).toBeInTheDocument()
  })

  it('shows timeout message when fetch is aborted', async () => {
    fetchMock.mockRejectedValue(Object.assign(new DOMException('aborted', 'AbortError')))
    const user = userEvent.setup()
    await renderContact()
    await user.type(screen.getByLabelText(/name/i), 'Alice')
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => expect(screen.getByText(/request timed out/i)).toBeInTheDocument())
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows success message after delivery', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
    const user = userEvent.setup()
    await renderContact()
    await user.type(screen.getByLabelText(/name/i), 'Alice')
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() =>
      expect(
        screen.getByText(/message sent.*i'll get back to you within 24 hours/i)
      ).toBeInTheDocument()
    )
  })

  it('shows error message on API failure and keeps form visible', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Something broke' }),
    })
    const user = userEvent.setup()
    await renderContact()
    await user.type(screen.getByLabelText(/name/i), 'Alice')
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() =>
      expect(
        screen.getByText(/something went wrong.*try emailing me directly/i)
      ).toBeInTheDocument()
    )
    // form stays visible so user can retry
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })
})
