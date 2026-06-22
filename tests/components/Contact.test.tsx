// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

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

  it('renders an "Email me" mailto link next to the call button', async () => {
    await renderContact()
    const link = screen.getByRole('link', { name: /email me/i })
    expect(link).toHaveAttribute('href', expect.stringMatching(/^mailto:/))
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
