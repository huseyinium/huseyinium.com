import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { EXPERIENCE, type ExperienceRole } from '@/content/experience'

function RoleList({ roles }: { roles: ExperienceRole[] }) {
  return (
    <div className="flex flex-col gap-4">
      {roles.map((role) => (
        <div key={`${role.title}-${role.period}`} className="border-l border-(--color-border) pl-4">
          <p className="text-foreground font-medium leading-snug">{role.title}</p>
          <p className="text-xs text-(--color-accent) mt-0.5">{role.period}</p>
          {role.description ? (
            <p className="text-sm text-(--color-text-secondary) mt-1.5 leading-relaxed">
              {role.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

const DEFAULT_LOGO_WIDTH = 140
const DEFAULT_LOGO_HEIGHT = 40

// The rail is a flex column stretched to the row's full height (flex default
// align-items: stretch), so the line segment below the dot always reaches
// the next entry's dot regardless of how tall the content column is.
function TimelineRail({ active, showLine }: { active: boolean; showLine: boolean }) {
  return (
    <div className="flex w-8 flex-col items-center">
      <span
        className={
          active
            ? 'mt-1.5 size-3 shrink-0 rounded-full bg-(--color-accent) shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_25%,transparent)]'
            : 'mt-1.5 size-3 shrink-0 rounded-full border border-(--color-border) bg-(--color-bg-elevated)'
        }
      />
      {showLine ? <span className="mt-1 w-px flex-1 bg-(--color-border)" /> : null}
    </div>
  )
}

function ExperienceEntry({
  entry,
  isLast,
}: {
  entry: (typeof EXPERIENCE)[number]
  isLast: boolean
}) {
  const logoWidth = entry.logoWidth ?? DEFAULT_LOGO_WIDTH
  const logoHeight = entry.logoHeight ?? DEFAULT_LOGO_HEIGHT
  const isActive = entry.roles.some((role) => role.period.includes('Present'))

  return (
    <div className="flex gap-4 md:gap-5">
      <TimelineRail active={isActive} showLine={!isLast} />
      <div className="flex flex-1 flex-col gap-4 pb-20">
        {entry.logo ? (
          <Image
            src={entry.logo}
            alt={entry.company}
            width={logoWidth}
            height={logoHeight}
            className="object-contain object-left"
            style={{ width: logoWidth, height: logoHeight }}
          />
        ) : (
          <span className="text-2xl text-foreground">{entry.company}</span>
        )}
        <RoleList roles={entry.roles} />
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto px-6 w-full">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground text-center">Experience</h2>
        <p className="text-(--color-text-muted) text-center mb-4 mt-2">
          5+ years of companies and programs I&apos;ve built with along the way.
        </p>
      </div>

      <div className="relative z-10 text-center mb-12">
        <Link
          href="https://www.linkedin.com/in/huseyinlorakaratas/details/experience"
          target="_blank"
          className="inline-flex items-center gap-1 text-sm rounded-full
              border border-(--color-border) text-muted-foreground font-medium px-4 py-2
              hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
        >
          View all details
          <ExternalLink className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mx-auto max-w-2xl px-6">
        {EXPERIENCE.map((entry, index) => (
          <ExperienceEntry
            key={entry.company}
            entry={entry}
            isLast={index === EXPERIENCE.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
