'use client'

import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { OrbitingCircles } from '../ui/orbiting-circles'

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

function SkillsExplanation() {
  return (
    <div className="flex flex-col gap-10 xl:max-w-md">
      {/* {SKILLS.map((group) => (
        <div key={group.category}>
          <motion.h3
            className="text-xs uppercase tracking-widest text-(--color-accent) mb-4"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {group.category}
          </motion.h3>

          <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {group.skills.map((skill) => (
              <MotionBadge
                key={skill}
                data-skill-badge
                variant="outline"
                variants={badgeVariants}
                className="h-auto rounded-full px-3 py-1 text-sm
                  bg-(--color-bg-elevated) border-(--color-border)
                  text-(--color-text-muted)
                  hover:text-(--color-accent) hover:border-(--color-accent) hover:shadow-[0_0_8px_var(--color-accent)]
                  transition-all duration-200 cursor-default select-none"
              >
                {skill}
              </MotionBadge>
            ))}
          </motion.div>
        </div>
      ))} */}
    </div>
  )
}

// The orbit cluster is laid out at full size (820px) then scaled down per
// breakpoint via transform, so the radius math above stays simple while the
// rendered footprint still fits next to the explanation text.
function SkillsOrbit() {
  return (
    <div className="relative flex size-82.5 shrink-0 items-center justify-center overflow-hidden sm:size-102.5 md:size-133.75 lg:size-125 xl:size-170">
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

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground text-center">Skills</h2>
        <p className="text-(--color-text-muted) text-center mb-8">
          The languages, frameworks, and tools I reach for most often.
        </p>
        {/*  <p className="text-gray-300 leading-relaxed text-center mb-16">
          I build across the full stack — React and Next.js on the front end, Node.js and PostgreSQL
          underneath — then ship it on AWS and Vercel with Docker and CI/CD wired in. The orbit
          mirrors that: the languages and frameworks I reach for daily sit closest to the center,
          while the deployment and tooling layers that get it into production sit further out.
        </p> */}

        <div className="flex flex-col items-center gap-16 xl:flex-row xl:items-center xl:justify-center xl:gap-12">
          {/* <SkillsExplanation /> */}
          <SkillsOrbit />
        </div>
      </div>
    </section>
  )
}
