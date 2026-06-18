'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_LINKS } from '@/lib/nav'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const SCROLL_THRESHOLD_PX = 80

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="font-mono text-sm font-semibold text-(--color-text-primary)">
            huseyinium
          </Link>

          {/* Desktop nav */}
          <nav aria-label="main" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-(--color-text-secondary) transition-colors hover:text-(--color-accent)"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger aria-label="menu" className="flex flex-col gap-1.5 p-2 md:hidden">
              <span className="block h-0.5 w-5 bg-(--color-text-primary)" />
              <span className="block h-0.5 w-5 bg-(--color-text-primary)" />
              <span className="block h-0.5 w-5 bg-(--color-text-primary)" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="border-b border-(--color-border) bg-(--color-bg)/95 backdrop-blur-md"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <nav
                aria-label="mobile"
                className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 pt-16"
              >
                {NAV_LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-sm text-(--color-text-secondary) transition-colors hover:text-(--color-accent)"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
