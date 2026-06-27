'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Principles', href: '/#principles' },
  // { label: 'Achievements', href: '/#achievements' },
]

// Below this scroll offset the navbar always stays visible, so it doesn't
// flicker away on the tiny bounce/rubber-band scrolls near the top.
const REVEAL_THRESHOLD_PX = 80

function useScrollDirectionVisibility() {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    function onScroll() {
      if (frame.current !== null) return
      frame.current = requestAnimationFrame(() => {
        frame.current = null
        const currentY = window.scrollY
        const scrolledDown = currentY > lastScrollY.current
        setVisible(currentY < REVEAL_THRESHOLD_PX || !scrolledDown)
        lastScrollY.current = currentY
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  return visible
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrollVisible = useScrollDirectionVisibility()
  const visible = scrollVisible || open

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-24'
      }`}
    >
      <nav className="flex w-auto items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 shadow-lg backdrop-blur-xl md:w-full md:max-w-4xl">
        <Link href="/#" className="flex items-center gap-2 shrink-0">
          {/* TODO: swap for <Image> logo once provided */}
          <Image src={'/images/my-pp.svg'} alt="Huseyin Karatas PP" width={40} height={40} />
          <span className="hidden font-display text-sm font-semibold text-white sm:inline">
            Huseyin Karatas
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-white/90 md:inline-block"
        >
          Contact
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="border-white/10 bg-black/90 backdrop-blur-xl"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex items-center justify-between px-4 pt-4">
            <Link
              href="/#"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 shrink-0"
            >
              <Image src={'/images/my-pp.svg'} alt="Huseyin Karatas PP" width={40} height={40} />
              <span className="font-display text-sm font-semibold text-white">Huseyin Karatas</span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-4 pb-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-base text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-white w-[90%] mx-auto  px-4 py-2 text-center text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
