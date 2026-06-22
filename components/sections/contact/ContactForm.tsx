'use client'

import { useState, useId } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'timeout'

const FETCH_TIMEOUT_MS = 10_000

export function ContactForm() {
  const id = useId()
  const nameId = `${id}-name`
  const emailId = `${id}-email`
  const messageId = `${id}-message`

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  function clearFieldError(field: string) {
    setValidationErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = 'Name is required'
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address'
    }
    if (!message.trim()) errors.message = 'Message is required'
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setState('loading')

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
        signal: controller.signal,
      })
      if (res.ok) {
        setState('success')
      } else {
        setState('error')
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setState('timeout')
      } else {
        setState('error')
      }
    } finally {
      clearTimeout(timer)
    }
  }

  if (state === 'success') {
    return (
      <p className="text-(--color-text-secondary) text-sm">
        Message sent. I&apos;ll get back to you within 24 hours.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">
      {state === 'error' && (
        <p role="alert" className="text-red-400 text-sm">
          Something went wrong. Try emailing me directly.
        </p>
      )}
      {state === 'timeout' && (
        <p role="alert" className="text-red-400 text-sm">
          Request timed out. Check your connection and try again.
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor={nameId} className="text-sm text-(--color-text-secondary)">
          Name
        </label>
        <input
          id={nameId}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            clearFieldError('name')
          }}
          className="rounded-lg border border-(--color-border) bg-(--color-bg-elevated)
            px-3 py-2 text-sm text-foreground outline-none
            focus:border-(--color-accent) transition-colors"
        />
        {validationErrors.name && (
          <span className="text-xs text-red-400">{validationErrors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={emailId} className="text-sm text-(--color-text-secondary)">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            clearFieldError('email')
          }}
          className="rounded-lg border border-(--color-border) bg-(--color-bg-elevated)
            px-3 py-2 text-sm text-foreground outline-none
            focus:border-(--color-accent) transition-colors"
        />
        {validationErrors.email && (
          <span className="text-xs text-red-400">{validationErrors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={messageId} className="text-sm text-(--color-text-secondary)">
          Message
        </label>
        <textarea
          id={messageId}
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            clearFieldError('message')
          }}
          className="rounded-lg border border-(--color-border) bg-(--color-bg-elevated)
            px-3 py-2 text-sm text-foreground outline-none resize-none
            focus:border-(--color-accent) transition-colors"
        />
        {validationErrors.message && (
          <span className="text-xs text-red-400">{validationErrors.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="flex items-center justify-center gap-2 rounded-lg
          bg-gradient-accent  font-medium px-4 py-2.5 text-sm cursor-pointer
          hover:opacity-90 transition-opacity disabled:opacity-60 text-white!"
      >
        {state === 'loading' && (
          <span
            data-loading
            className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin"
          />
        )}
        Send message
      </button>
    </form>
  )
}
