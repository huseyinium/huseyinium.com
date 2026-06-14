# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`huseyinium.com` — personal portfolio for Huseyin Karatas. Open source. Full spec in `SPEC.md` — read it before making architectural decisions. It is the single source of truth.

## Commands

```bash
bun install          # install dependencies
bun dev              # dev server (Turbopack, Next.js 16.2)
bun build            # production build
bun lint             # ESLint
bun format           # Prettier
bun type-check       # tsc --noEmit
```

No test suite yet — verify features by running `bun dev` and observing in browser.

## Architecture

**Framework:** Next.js 16.2 App Router, static export. All 3D components are `'use client'` and loaded via `next/dynamic` with `ssr: false`.

**Single-page + sub-routes:** `/` renders all portfolio sections as one long scroll. `/blog/[slug]` and `/projects/[slug]` are separate pages sharing the same root layout.

**3D pipeline:** React Three Fiber wraps Three.js. Custom GLSL shaders live as inline `ShaderMaterial` strings — no `.glsl` files, no bundler plugin needed. Post-processing via `@react-three/postprocessing`. All Three.js scenes are lazy-loaded and wrapped in `<Suspense>` + `<ErrorBoundary>` that renders `<StaticHeroFallback>` on failure.

**Styling:** Tailwind CSS v4 with all design tokens as CSS custom properties in `globals.css`. Never hardcode colors — always use `var(--color-*)`. The accent is `#B8E04A`. Changing the palette means changing CSS variables only, no component edits.

**Fonts:** Geist (body/UI via `next/font/google`) + Geist Mono (code/labels) + Cal Sans (hero heading and section H2s only — self-hosted woff2 via `next/font/local`).

**Content:** Blog posts and project case studies are MDX files in `content/blog/` and `content/projects/`. Parsed via `lib/mdx.ts`. No CMS, no database.

**Contact form:** `POST /api/contact` → Resend. Handler in `app/api/contact/route.ts`. Requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` env vars.

**OG images:** Generated at runtime via `@vercel/og` (Edge Runtime). Three routes: `app/og/route.tsx` (default), `app/blog/og/route.tsx`, `app/projects/og/route.tsx`.

## Key Constraints

- **LCP is the hero text, not the canvas.** Canvas must always have a lower `z-index` than the text overlay. Hero text must render in initial HTML, never JS-deferred.
- **No 3D models.** Everything is procedural: `THREE.InstancedMesh`, `THREE.LineSegments`, custom `ShaderMaterial`. No Blender exports, no GLTF.
- **TypeScript strict mode.** No `any`. No type assertions without a comment explaining why.
- **Component size limit: 200 lines.** Split if larger.
- **No inline styles.** Tailwind classes only; CSS variables for tokens.
- **Mobile 3D budget:** reduce node/particle count by 70% on touch devices.

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://huseyinium.com
NEXT_PUBLIC_CALENDLY_URL=                    # Cal.com or Calendly link
RESEND_API_KEY=                              # required for contact form
RESEND_FROM_EMAIL=                           # verified sender domain
YOUTUBE_API_KEY=                             # optional, falls back to static data
```

## Skill Routing

When the user's request matches an available skill, invoke it via the Skill tool.

- Product ideas / brainstorming → `/office-hours`
- Architecture decisions → `/plan-eng-review`
- Bugs / errors → `/investigate`
- Visual polish / design check → `/design-review`
- Pre-commit review → `/review`
- Ship / PR → `/ship`
- QA the running site → `/qa`
- Break work into issues → `/to-issues`
