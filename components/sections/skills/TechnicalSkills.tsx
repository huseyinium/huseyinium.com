import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'

interface OrbitLogo {
  name: string
  src: string
}

interface Orbit {
  radius: number
  iconSize: number
  duration: number
  reverse?: boolean
  logos: OrbitLogo[]
}

// Innermost orbit = core languages, outermost = deployment & tooling.
// Sourced 1:1 from public/logos/svg, grouped into one ring per layer of the
// stack. The 12 granular aws-* service icons are deliberately left out here
// (they're used for per-project tech badges in Projects.tsx) in favor of the
// single umbrella Amazon Web Services mark — a dozen AWS micro-icons in one
// ring would read as noise rather than signal in a skills overview.
const ORBITS: Orbit[] = [
  {
    radius: 80,
    iconSize: 60,
    duration: 20,
    logos: [
      { name: 'TypeScript', src: '/logos/svg/typescript.svg' },
      { name: 'JavaScript', src: '/logos/svg/javascript.svg' },
    ],
  },
  {
    radius: 155,
    iconSize: 68,
    duration: 34,
    reverse: true,
    logos: [
      { name: 'React', src: '/logos/svg/react.svg' },
      { name: 'Next.js', src: '/logos/svg/nextjs.svg' },
      { name: 'Tailwind CSS', src: '/logos/svg/tailwind-css.svg' },
      { name: 'CSS', src: '/logos/svg/css.svg' },
      { name: 'Redux', src: '/logos/svg/redux.svg' },
      { name: 'shadcn/ui', src: '/logos/svg/shadcn.svg' },
      { name: 'Framer Motion', src: '/logos/svg/framer-motion.svg' },
      { name: 'Vite', src: '/logos/svg/vitejs.svg' },
      { name: 'Expo', src: '/logos/svg/expo.svg' },
    ],
  },
  {
    radius: 230,
    iconSize: 72,
    duration: 48,
    logos: [
      { name: 'Node.js', src: '/logos/svg/nodejs.svg' },
      { name: 'NestJS', src: '/logos/svg/nestjs.svg' },
      { name: 'Express', src: '/logos/svg/express.svg' },
      { name: 'PostgreSQL', src: '/logos/svg/postgresql.svg' },
      { name: 'Prisma', src: '/logos/svg/prisma-orm.svg' },
      { name: 'Redis', src: '/logos/svg/redis.svg' },
      { name: 'Socket.io', src: '/logos/svg/socketio.svg' },
      { name: 'Nginx', src: '/logos/svg/nginx.svg' },
    ],
  },
  {
    radius: 300,
    iconSize: 78,
    duration: 60,
    reverse: true,
    logos: [
      { name: 'OpenAI', src: '/logos/svg/openai.svg' },
      { name: 'Claude', src: '/logos/svg/claude.svg' },
      { name: 'Claude Code', src: '/logos/svg/claude-code.svg' },
    ],
  },
  {
    radius: 375,
    iconSize: 82,
    duration: 74,
    logos: [
      { name: 'Amazon Web Services', src: '/logos/svg/amazon-web-services.svg' },
      { name: 'Vercel', src: '/logos/svg/vercel.svg' },
      { name: 'Docker', src: '/logos/svg/docker.svg' },
      { name: 'Git', src: '/logos/svg/git.svg' },
      { name: 'GitHub', src: '/logos/svg/github.svg' },
      { name: 'Bun', src: '/logos/svg/bun.svg' },
      { name: 'ESLint', src: '/logos/svg/eslint.svg' },
      { name: 'Babel', src: '/logos/svg/babel.svg' },
      { name: 'Jest', src: '/logos/svg/jest.svg' },
      { name: 'Postman', src: '/logos/svg/postman.svg' },
      { name: 'Figma', src: '/logos/svg/figma.svg' },
      { name: 'Stripe', src: '/logos/svg/stripe.svg' },
      { name: 'Resend', src: '/logos/svg/resend.svg' },
      { name: 'npm', src: '/logos/svg/npm.svg' },
    ],
  },
]

function OrbitIcon({ name, src, size }: OrbitLogo & { size: number }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <div className="flex items-center justify-center ">
            <Image src={src} alt={name} width={size} height={size} className="object-contain" />
          </div>
        }
      />
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}

// Below `sm` the orbit shrinks so far that icons become unreadable, tiny,
// overlapping dots, so phones get a static grid of the same logos instead.
function SkillsGrid() {
  const logos = ORBITS.flatMap((orbit) => orbit.logos)
  return (
    <div className="grid grid-cols-5 gap-3 sm:hidden">
      {logos.map((logo) => (
        <Tooltip key={logo.name}>
          <TooltipTrigger
            render={
              <div className="flex size-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg-elevated) p-2">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            }
          />
          <TooltipContent>{logo.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

// The orbit cluster is laid out at full size (820px) then scaled down per
// breakpoint via transform, so the radius math above stays simple while the
// rendered footprint still fits next to the explanation text.
function SkillsOrbit() {
  return (
    <div className="relative hidden shrink-0 items-center justify-center overflow-hidden sm:flex sm:size-102.5 md:size-133.75 lg:size-125 xl:size-170">
      <div className="relative size-208 scale-[0.296] sm:scale-[0.37] md:scale-[0.4805] lg:scale-[0.591] xl:scale-[0.739]">
        {ORBITS.map((orbit) => (
          <OrbitingCircles
            key={orbit.radius}
            radius={orbit.radius}
            iconSize={orbit.iconSize}
            duration={orbit.duration}
            reverse={orbit.reverse}
          >
            {orbit.logos.map((logo) => (
              <OrbitIcon key={logo.name} {...logo} size={orbit.iconSize * 0.65} />
            ))}
          </OrbitingCircles>
        ))}
      </div>
    </div>
  )
}

export function TechnicalSkills() {
  return (
    <div className="flex flex-col items-center gap-16 xl:flex-row xl:items-center xl:justify-center xl:gap-12">
      <SkillsGrid />
      <SkillsOrbit />
    </div>
  )
}
