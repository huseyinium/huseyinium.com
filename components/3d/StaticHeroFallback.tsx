export function StaticHeroFallback() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[--color-bg]">
      <span role="img" aria-label="Hero background" className="sr-only" />
      <div
        data-glow
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, var(--color-accent-glow) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
