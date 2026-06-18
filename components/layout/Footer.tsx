import { NAV_LINKS } from '@/lib/nav'

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm text-(--color-text-primary)">huseyinium.com</span>
            <span className="text-xs text-(--color-text-muted)">
              © {new Date().getFullYear()} Huseyin Karatas · Made with Next.js + Three.js
            </span>
          </div>

          <nav className="flex items-center gap-6">
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
        </div>

        <div className="mt-6 border-t border-(--color-border) pt-6 text-center">
          <a
            href="https://github.com/huseyinium/huseyinium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-accent)"
          >
            Open source on GitHub →
          </a>
        </div>
      </div>
    </footer>
  )
}
