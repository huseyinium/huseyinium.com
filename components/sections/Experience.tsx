import Image from 'next/image'
import { Timeline } from '@/components/ui/timeline'
import { EXPERIENCE, type ExperienceRole } from '@/content/experience'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

function RoleList({ roles }: { roles: ExperienceRole[] }) {
  return (
    <div className="flex flex-col gap-5">
      {roles.map((role) => (
        <div key={`${role.title}-${role.period}`}>
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

export function Experience() {
  const data = EXPERIENCE.map((entry) => {
    const logoWidth = entry.logoWidth ?? DEFAULT_LOGO_WIDTH
    const logoHeight = entry.logoHeight ?? DEFAULT_LOGO_HEIGHT

    return {
      title: entry.logo ? (
        <Image
          src={entry.logo}
          alt={entry.company}
          width={logoWidth}
          height={logoHeight}
          className="object-contain object-left"
          style={{ width: logoWidth, height: logoHeight }}
        />
      ) : (
        <span className="text-2xl text-white!">{entry.company}</span>
      ),
      content: <RoleList roles={entry.roles} />,
    }
  })

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto px-6 w-full ">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground text-center">Experience</h2>
        <p className="text-(--color-text-muted) text-center mb-4 mt-2">
          5+ years of companies and programs I&apos;ve built with along the way.
        </p>
      </div>

      <div className="relative z-10 md:-mb-12 text-center">
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

      <Timeline data={data} />
    </section>
  )
}
