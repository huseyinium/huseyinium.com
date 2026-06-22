# huseyinium.com — Portfolio Web App Specification

> **Status:** Pre-development · **Version:** 1.0.0 · **Last updated:** 2026-06-14
> **Author:** Huseyin Karatas · **Repo:** open source

This document is the single source of truth for `huseyinium.com`. Every design decision, section spec, component requirement, and technical constraint lives here. Start here before touching any code.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Target Audience & Goals](#2-target-audience--goals)
3. [Tech Stack](#3-tech-stack)
4. [Design System](#4-design-system)
5. [3D Strategy](#5-3d-strategy)
6. [Site Architecture](#6-site-architecture)
7. [Section Specifications](#7-section-specifications)
   - 7.1 [Hero](#71-hero)
   - 7.2 [About](#72-about)
   - 7.3 [Projects](#73-projects)
   - 7.4 [Experience](#74-experience)
   - 7.5 [Skills](#75-skills)
   - 7.6 [Achievements](#76-achievements)
   - 7.3a [Project Case Study Page](#73a-project-case-study-page)
   - 7.4 [Experience](#74-experience)
   - 7.5 [Skills](#75-skills)
   - 7.6 [Achievements](#76-achievements)
   - 7.7 [Blog](#77-blog)
   - 7.8 [Contact](#78-contact)
8. [Navigation & Layout](#8-navigation--layout)
9. [Animations & Interactions](#9-animations--interactions)
10. [Performance Targets](#10-performance-targets)
11. [SEO & Metadata](#11-seo--metadata)
12. [Open Source Guidelines](#12-open-source-guidelines)
13. [Deployment](#13-deployment)
14. [Content Inventory](#14-content-inventory)
15. [Testing Plan](#15-testing-plan)

---

## 1. Project Overview

**huseyinium.com** is a personal portfolio web app for Huseyin Karatas — Co-Founder & CEO at ARCY AI, full-stack engineer, serial founder, hackathon winner, published writer, and content creator. The site serves as a living professional identity hub: it closes freelance deals, attracts investors and collaborators, and showcases work in a way that reflects the builder's personality.

The site is intentionally **cinematic and technically ambitious** — using procedural Three.js visuals and heavy animation to signal that the person behind it ships real things at a high standard. It is **open source** and designed to be a reference implementation for creative developer portfolios.

### Core Tenets

- **Dark, cinematic, personal.** Not a generic dev portfolio template. Every section has personality.
- **Performance-first 3D.** Three.js is a feature, not a gimmick. It degrades gracefully.
- **Dual CTA always visible.** "Book a call" and "Email me" are never more than one click away.
- **Freelance-ready.** Projects section closes clients, not just impresses them.
- **Open source quality.** Code is clean, documented, and worth forking.

---

## 2. Target Audience & Goals

### Primary Audiences

| Audience                     | What they need to see                                    | Desired action         |
| ---------------------------- | -------------------------------------------------------- | ---------------------- |
| **Investors / VC**           | ARCY AI traction, founder credibility, execution history | Book a call            |
| **Freelance clients**        | Project quality, tech breadth, reliability signals       | Email with brief       |
| **Technical recruiters**     | Stack depth, shipped products, open source               | Book a call / LinkedIn |
| **Collaborators / founders** | Energy, values, what you're building                     | Connect on LinkedIn    |

### Primary CTAs (in priority order)

1. **"Book a call"** — calendar link (Cal.com or Calendly), frictionless, one click
2. **"Email me"** — for detailed briefs and longer-form inquiry
3. **"See my work"** — scrolls to Projects section (implicit CTA from hero)

### Success Metrics

- Visitor books a call or sends an email within the first visit
- Time on site > 90 seconds (3D engagement hook)
- Project cards load fast enough that a freelance client browses all of them
- Site passes as a professional representation at investor meetings

---

## 3. Tech Stack

### Core

| Layer         | Choice                                       | Reason                                                         |
| ------------- | -------------------------------------------- | -------------------------------------------------------------- |
| Framework     | **Next.js 16.2** (App Router, static export) | Familiar, SSG performance, Vercel-native, open-source friendly |
| Language      | **TypeScript** (strict mode)                 | Type safety, open source readability                           |
| Styling       | **Tailwind CSS v4**                          | CSS variable-based theme = easy palette swaps later            |
| UI Components | **shadcn/ui**                                | Unstyled primitives, full control                              |
| Animated UI   | **Magic UI**                                 | React bits, heavy pre-built animated components                |
| 2D Animation  | **Framer Motion**                            | Scroll-driven animations, section transitions                  |

### 3D / WebGL

| Layer              | Choice                              | Reason                                                  |
| ------------------ | ----------------------------------- | ------------------------------------------------------- |
| 3D Renderer        | **React Three Fiber (R3F)**         | Three.js in React component tree                        |
| Helpers            | **@react-three/drei**               | Camera controls, shaders, instances, helpers            |
| Post-processing    | **@react-three/postprocessing**     | Bloom, chromatic aberration, depth of field, film grain |
| Shaders            | **GLSL** (via raw shader materials) | Custom visual language, noise-based animation           |
| Physics (optional) | **@react-three/rapier**             | If interactive physics needed in hero                   |

### Content & Data

| Layer                | Choice                                                  |
| -------------------- | ------------------------------------------------------- |
| Blog / Writing       | MDX files in `/content/blog/` (static, no CMS)          |
| Project case studies | MDX files in `/content/projects/` (reuses MDX pipeline) |
| Projects data        | `/content/projects.ts` (typed data file)                |
| Experience data      | `/content/experience.ts` (typed data file)              |
| Transactional email  | **Resend** — contact form delivery                      |
| Dynamic OG images    | **@vercel/og** (Edge Runtime, `ImageResponse`)          |

### Tooling

| Tool                | Purpose                              |
| ------------------- | ------------------------------------ |
| Bun                 | Package manager + scripts            |
| ESLint + Prettier   | Code quality                         |
| Husky + lint-staged | Pre-commit hooks                     |
| Turbopack           | Dev server (built into Next.js 16.2) |

### Deployment

| Layer           | Choice                                                    |
| --------------- | --------------------------------------------------------- |
| Hosting         | **Vercel** (free tier)                                    |
| Domain          | `huseyinium.com`                                          |
| Analytics       | Vercel Analytics (privacy-first, no cookie banner needed) |
| Preview deploys | Automatic per PR (critical for open source contributors)  |

---

## 4. Design System

### Color Palette

All colors are defined as CSS custom properties in `globals.css` and exposed via Tailwind's theme config. Changing the accent means changing one variable.

```css
:root {
  /* Base */
  --color-bg: #0a0a0a; /* near-black void */
  --color-bg-elevated: #111111; /* cards, panels */
  --color-bg-subtle: #1a1a1a; /* hover states, borders */

  /* Accent — the brand color */
  --color-accent: #b8e04a; /* lime-green, primary glow */
  --color-accent-dim: #8aaf2e; /* dimmed accent for secondary states */
  --color-accent-glow: #b8e04a33; /* accent at 20% opacity for glows */

  /* Text */
  --color-text-primary: #f0f0f0; /* headings */
  --color-text-secondary: #a0a0a0; /* body, descriptions */
  --color-text-muted: #555555; /* timestamps, labels */

  /* Borders */
  --color-border: #222222;
  --color-border-accent: #b8e04a44; /* accent-tinted borders */

  /* Semantic */
  --color-success: #b8e04a;
  --color-error: #ff4444;
}
```

### Typography

```css
/* Font stack */
--font-sans: 'Geist', system-ui, sans-serif; /* body, UI */
--font-mono: 'Geist Mono', 'JetBrains Mono', monospace; /* code, labels */
--font-display: 'Cal Sans', system-ui, sans-serif; /* hero heading + section headings only */
/* Cal Sans: self-host woff2 from cal.com/fonts or install @calcom/cal-sans npm package.
   Body and UI text stays Geist. Only apply font-display to .text-hero and section H2s. */

/* Scale (fluid, clamp-based) */
--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
--text-sm: clamp(0.875rem, 2vw, 1rem);
--text-base: clamp(1rem, 2.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 3vw, 1.25rem);
--text-xl: clamp(1.25rem, 3.5vw, 1.5rem);
--text-2xl: clamp(1.5rem, 4vw, 2rem);
--text-3xl: clamp(2rem, 5vw, 3rem);
--text-4xl: clamp(2.5rem, 6vw, 4rem);
--text-hero: clamp(3rem, 8vw, 6rem);
```

### Spacing & Grid

- 8px base unit
- 12-column grid, `max-w-7xl` container
- Section padding: `py-24 lg:py-32`
- Card gap: `gap-6`

### Motion Tokens

```ts
export const motion = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    crawl: 1.2,
  },
  ease: {
    out: [0.0, 0.0, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1],
    spring: { type: 'spring', stiffness: 100, damping: 15 },
    bounce: { type: 'spring', stiffness: 400, damping: 10 },
  },
}
```

### Component Variants

- **Accent border:** `border border-[--color-border-accent]`
- **Glow card:** `bg-[--color-bg-elevated] shadow-[0_0_30px_var(--color-accent-glow)]`
- **Accent text:** `text-[--color-accent]`
- **Muted badge:** `bg-[--color-bg-subtle] text-[--color-text-muted] rounded-full px-3 py-1 text-xs font-mono`

### Theme Switching

The CSS variable approach means a future theme swap (e.g., light mode, alternate accent) requires only:

```css
[data-theme='violet'] {
  --color-accent: #8b5cf6;
  --color-accent-dim: #6d28d9;
  --color-accent-glow: #8b5cf633;
}
```

No component changes required.

---

## 5. 3D Strategy

### Philosophy

**Hybrid model:** Maximum 3D intensity at the hero entry point, decreasing as the user scrolls deeper into content. This mirrors award-winning portfolios (Bruno Simon, Jordan Breton) and solves two real problems: performance on mid-range devices, and cognitive hierarchy (3D earns attention, content earns trust).

### Scroll Arc

```
Section       3D Intensity    Technique
──────────────────────────────────────────────────────
Hero          ████████████    Full procedural scene (R3F canvas, full-screen)
About         ██░░░░░░░░░░    Particle drift in background (lightweight)
Projects      ███░░░░░░░░░    Isolated micro-canvases per card (on hover only)
Experience    ░░░░░░░░░░░░    No 3D (static CSS card grid)
Skills        ██░░░░░░░░░░    Subtle floating icons or particle burst on hover
Achievements  ░░░░░░░░░░░░    No 3D
Blog          ░░░░░░░░░░░░    No 3D
Contact       █░░░░░░░░░░░    Minimal particle field behind CTA
```

### Hero 3D Scene — "The Signal"

**Concept:** An infinite dark void with a pulsing, procedural neural-graph structure at center. Represents the AI agent / PMF loop concept of ARCY AI without screaming "Web3" or being generic. This is the screenshot moment.

**Technical implementation:**

```
Geometry:      ~200–500 nodes as THREE.InstancedMesh (SphereGeometry, r=0.05)
               Edges as THREE.LineSegments (BufferGeometry, dynamic positions)
               Nodes positioned via seeded random + noise displacement

Animation:     Each node oscillates on a unique sin/cos frequency
               Edge opacity pulses: nodes that are "active" brighten edges
               Entire graph slowly rotates on Y axis (0.0003 rad/frame)
               Cursor position warps nearest nodes (raycaster → repulsion force)

Shaders:       Node material: custom ShaderMaterial
                 - Emissive #B8E04A glow
                 - Fresnel edge highlight
                 - Animated opacity via noise
               Edge material: LineBasicMaterial with transparency

Post-processing stack:
               - UnrealBloomPass (threshold: 0.2, strength: 0.8, radius: 0.4)
               - ChromaticAberrationEffect (offset: [0.001, 0.001])
               - FilmGrainEffect (premultiply: false, blendFunction: OVERLAY)
               - VignetteEffect (darkness: 0.5)

Camera:        PerspectiveCamera, fov 60, slowly orbits via useFrame
               Scroll → camera Z eases from 8 → 15 (pulls back, reveals more)
               Mouse → subtle camera tilt (max ±5deg X, ±3deg Y)

Performance:   InstancedMesh for all nodes (single draw call)
               Edge geometry rebuilt only when topology changes (not per frame)
               Suspend render when tab not visible (document.visibilityState)
               Reduce instance count on mobile (500 → 150)
```

**GLSL Node Shader (vertex):**

```glsl
uniform float uTime;
uniform float uNoiseScale;
attribute float aOffset;
varying float vGlow;

// Simplex noise → position displacement
vec3 displaced = position + vec3(
  sin(uTime * 0.5 + aOffset * 6.28) * uNoiseScale,
  cos(uTime * 0.4 + aOffset * 4.71) * uNoiseScale,
  sin(uTime * 0.3 + aOffset * 3.14) * uNoiseScale
);
vGlow = sin(uTime + aOffset * 12.0) * 0.5 + 0.5;
gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
```

**GLSL Node Shader (fragment):**

```glsl
uniform vec3 uAccentColor;   // #B8E04A
varying float vGlow;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = (1.0 - dist * 2.0) * (0.6 + vGlow * 0.4);
  gl_FragColor = vec4(uAccentColor * (0.8 + vGlow * 0.5), alpha);
}
```

### About Section — Particle Background

- 100 particles, slow drift, very low opacity (0.15–0.3)
- Particles are simple `THREE.Points` with `PointsMaterial`
- Rendered in a fixed-position background canvas behind the section
- Suspended on mobile for performance

### Projects Section — Micro-Canvas Hover Effect

- Each project card has a small `<Canvas>` (isolated R3F context)
- Canvas is inactive until hover (saves GPU)
- On hover: rotating abstract geometry related to the project type
- Activates via Framer Motion `onHoverStart`

### Contact Section — Minimal Particle Field

- 50 particles, very slow, accent-colored
- Only visible behind the CTA block, low opacity

### Fallback Strategy

All Three.js scenes are wrapped in:

```tsx
<Suspense fallback={<StaticHeroFallback />}>
  <Canvas>
    <HeroScene />
  </Canvas>
</Suspense>
```

`StaticHeroFallback` is a CSS-only gradient with a subtle radial glow — looks intentional, not broken.

On devices where `WebGLRenderingContext` is unavailable (rare but real):

```ts
const webglAvailable = (() => {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
})()
```

---

## 6. Site Architecture

### Routing

Single-page application with anchor-based navigation. No sub-routes except:

```
/                     ← main portfolio (all sections)
/blog                 ← blog listing page
/blog/[slug]          ← individual blog post (MDX)
/projects             ← full project listing (all 11 projects)
/projects/[slug]      ← project case study page (MDX)
```

### File Structure

```
huseyinium.com/
├── app/
│   ├── layout.tsx              ← root layout, fonts, analytics
│   ├── page.tsx                ← main portfolio page (all sections)
│   ├── blog/
│   │   ├── page.tsx            ← blog listing
│   │   ├── [slug]/
│   │   │   └── page.tsx        ← blog post
│   │   └── og/
│   │       └── route.tsx       ← blog post OG image (Vercel OG)
│   ├── projects/
│   │   ├── page.tsx            ← full project listing
│   │   ├── [slug]/
│   │   │   └── page.tsx        ← project case study
│   │   └── og/
│   │       └── route.tsx       ← project OG image (Vercel OG)
│   ├── og/
│   │   └── route.tsx           ← default site OG image (Vercel OG)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        ← contact form handler (Resend)
│   └── globals.css             ← CSS variables, base styles
│
├── components/
│   ├── 3d/
│   │   ├── HeroScene.tsx       ← "The Signal" neural graph
│   │   ├── ParticleDrift.tsx   ← background particle system
│   │   ├── ProjectMicroCanvas.tsx
│   │   └── ContactParticles.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx   ← case study page layout
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Achievements.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── ProjectCard.tsx
│   │   ├── ExperienceItem.tsx
│   │   ├── SkillBadge.tsx
│   │   ├── AchievementCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── StatCounter.tsx
│   │   └── SectionHeader.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── providers/
│       └── ThemeProvider.tsx
│
├── content/
│   ├── projects.ts             ← typed project data
│   ├── experience.ts           ← typed experience data
│   ├── achievements.ts         ← typed achievements data
│   ├── skills.ts               ← typed skills data
│   ├── blog/
│   │   ├── post-slug.mdx       ← blog posts
│   │   └── ...
│   └── projects/
│       ├── arcy-ai.mdx         ← case study MDX
│       ├── campus-arc.mdx
│       ├── misyon-kripto.mdx
│       ├── misyon-bond.mdx
│       └── ...
│
├── lib/
│   ├── utils.ts                ← cn() and misc helpers
│   ├── motion.ts               ← animation constants
│   └── mdx.ts                  ← MDX parsing helpers
│
├── public/
│   ├── favicon.ico
│   └── images/
│       └── projects/           ← project screenshots
│
├── styles/
│   └── mdx.css                 ← prose styles for blog posts
│
├── SPEC.md                     ← this file
├── README.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. Section Specifications

### 7.1 Hero

**Purpose:** First impression. Communicate identity, hook with 3D, surface both CTAs.

**Layout:** Full viewport height (`100dvh`). Three.js canvas fills the entire background. Content overlaid in the center/left with `absolute` positioning.

**Content:**

```
[Small label, font-mono, accent color]
"Co-Founder & CEO · Full-Stack Engineer"

[Hero heading, massive, white]
"Huseyin
Karatas."

[Subheading, muted]
"At 19 I shipped two regulated FinTech products at a bank.
Then I watched my own platform churn most of its users.
So I built the thing that would have saved it."

[CTA row]
[Button: "Book a call" → calendar link]     [Button outline: "Email me" → contact form]

[Scroll indicator, animated arrow, bottom center]
```

**3D:** "The Signal" neural graph scene (see Section 5). On scroll past 20vh, hero content fades out and camera begins pulling back.

**Interactions:**

- Cursor moves → neural graph nodes nearest cursor repel slightly
- Hover on "Book a call" → bloom intensity increases briefly (subtle)
- Scroll → camera Z eases back, graph becomes context not foreground

**Components:**

- `HeroScene` (R3F, full-screen canvas, `position: fixed` then becomes `absolute` after scroll threshold)
- `AnimatedText` (Framer Motion stagger on hero words)
- `CTAButton` (shadcn Button, custom accent variant)
- `ScrollIndicator` (animated bounce arrow)

**Mobile:** Neural graph stays but with 150 nodes (down from 500). Hero text resizes via fluid type scale. CTA buttons stack vertically.

> **LCP Safety Rules**
>
> - Hero text container must render in initial HTML — never lazy-loaded via JS
> - Canvas must have a lower `z-index` than the text overlay at all times
> - `StaticHeroFallback` must be visually close to the loaded state: radial `#B8E04A` glow on `#0A0A0A` — not a blank screen
> - Canvas element must have explicit `width: 100%; height: 100%` CSS so it never causes CLS
> - Wrap `<HeroScene>` in an `ErrorBoundary` that renders `<StaticHeroFallback>` on any runtime error (shader compile failures, WebGL context loss, GLSL uniform errors)

---

### 7.2 About

**Purpose:** Humanize. Tell the founder story. Give investors/collaborators context on who Huseyin is beyond a resume.

**Layout:** Two-column on desktop (text left, stats/visual right). Single column on mobile.

**Content:**

```
[Section header]
"About"

[Left column — story paragraphs]
Paragraph 1: The builder identity — coding since 2021, from procedural PHP
to AI agents, always building things that matter.

Paragraph 2: The founder identity — two startups, one incubator program,
one accelerator, one grant. What failure taught you and what you're building now.

Paragraph 3: Beyond code — METU student, community leader, published writer,
content creator. The full person.

[Right column — stat grid, Row 1: founder/product]
┌─────────────────┬─────────────────┐
│   2+ startups   │   5+ years      │
│   founded       │   engineering   │
├─────────────────┼─────────────────┤
│  10+ hackathons │  Multiple       │
│  attended       │  prizes won     │
└─────────────────┴─────────────────┘

[Row 2: audience/community]
┌─────────────────┬─────────────────┐
│  16K+ LinkedIn  │  200K+ YouTube  │
│  followers      │  views          │
├─────────────────┼─────────────────┤
│  100K+ monthly  │  METU           │
│  IG views       │  student        │
└─────────────────┴─────────────────┘

[Below stat grid — "Find me online" icon link row]
[LinkedIn icon → linkedin.com/in/huseyinkaratas]
[GitHub icon → github.com/huseyinium]
[YouTube icon → youtube.com/@huseyinium]
[Instagram icon → instagram.com/huseyinium]
```

**Components:**

- `SectionHeader` — consistent section label + title
- `StatCounter` — animated number count-up on scroll into view (Framer Motion + useInView)
- `ParticleDrift` — very subtle background particles
- `AnimatedText` — paragraphs fade in staggered on scroll

**Interactions:**

- Stats count up when section scrolls into view (intersection observer)
- "ARCY AI" link → glows on hover with accent color

---

### 7.3 Projects

**Purpose:** Close freelance clients. Show breadth and depth. Let investors see execution history.

**Layout:** Responsive grid. Featured projects (2) get full-width cards. Standard projects get a 2-col then 3-col grid.

**Project Card Anatomy:**

```
┌──────────────────────────────────────────┐
│  [Project screenshot / cover image]      │
│  [Micro-canvas overlay on hover — 3D]   │
├──────────────────────────────────────────┤
│  [Tag: "Startup" / "Hackathon" / "Freelance"]
│  [Project title]                H3       │
│  [One-line description]          p       │
│  [Tech stack badges]            row      │
│  ─────────────────────────────────────  │
│  [Primary CTA: "Read case study" → /projects/[slug]]
│  [Secondary: GitHub icon link — if available]
│  [Hackathon prize badge — if applicable] │
└──────────────────────────────────────────┘
```

Each project card links to `/projects/[slug]` for the full case study. The card's primary CTA is "Read case study", not "Live site".

**Project Data Shape:**

```ts
interface Project {
  id: string
  title: string
  description: string // 1-2 sentences
  longDescription?: string // for featured cards
  category: 'startup' | 'hackathon' | 'freelance' | 'open-source' | 'personal'
  stack: string[]
  coverImage: string // /images/projects/[id].png
  liveUrl?: string
  githubUrl?: string
  prize?: string // "ETHGlobal Cannes — Worldcoin Pool Prize"
  featured: boolean // shows in top 2 slots
  date: string // "2025-07"
}
```

**Projects in main grid (7 cards):**

| #   | Project                               | Category  | Featured |
| --- | ------------------------------------- | --------- | -------- |
| 1   | ARCY AI                               | Startup   | Yes      |
| 2   | Campus Arc                            | Startup   | Yes      |
| 3   | misyon.kripto                         | Freelance | No       |
| 4   | misyon.bond                           | Freelance | No       |
| 5   | Carrot (ETHGlobal Cannes 2025)        | Hackathon | No       |
| 6   | SwapZilla (ETHGlobal Brussels 2024)   | Hackathon | No       |
| 7   | VerifyWorld (ETHGlobal Istanbul 2023) | Hackathon | No       |

Removed from main grid (archived): Rent3, ODTÜ BDAYS 2024, InvestBuddy, Type-i Fast. Add a "View all projects →" link below the grid pointing to `/projects`, where all 11 projects appear.

**Filtering:**

- Filter tabs: All / Startups / Hackathons / Freelance
- Framer Motion `AnimatePresence` for filter transitions (cards slide out/in)

**Interactions:**

- Hover on card → micro-canvas activates (subtle rotating geometry, accent glow)
- Prize badge → glows accent on hover
- "Read case study" → navigates to `/projects/[slug]`

---

### 7.3a Project Case Study Page

**Route:** `/projects/[slug]`

**Purpose:** Give investors and freelance clients a full narrative on the most important projects. Deeper than a card — shows problem-solving, not just shipping.

**Required case study pages:** ARCY AI, Campus Arc, misyon.kripto, misyon.bond. All other projects get a minimal MDX page with title, description, stack, and links.

**Page Layout:**

```
[Hero block — full width]
  [Category badge]
  [Project title]       H1, Cal Sans
  [One-line description] muted

[Three content sections]
  ## Problem
  [MDX prose — what problem existed, why it mattered]

  ## What I Built
  [MDX prose — technical decisions, architecture, challenges solved]
  [Optional: code snippets, architecture diagrams]

  ## Outcome
  [MDX prose — results, metrics, what shipped, what you learned]

[Footer block]
  [Stack badges row]
  [Live site link] [GitHub link]
  [← Back to projects]
```

**MDX Frontmatter Shape:**

```ts
interface CaseStudyFrontmatter {
  id: string
  title: string
  description: string // one line
  problem: string // one-sentence summary for meta
  outcome: string // one-sentence summary for meta
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  coverImage: string // /images/projects/[id].png
  date: string // "2026-04"
  category: 'startup' | 'hackathon' | 'freelance'
}
```

**MDX pipeline:** Reuses the same `lib/mdx.ts` helper as blog posts. Same Shiki syntax highlighting, same prose styles via `styles/mdx.css`.

**OG image:** Generated dynamically via `app/projects/og/route.tsx` — project title + category badge on dark background.

---

### 7.4 Experience

**Purpose:** Validate credibility for recruiters and investors. Timeline of professional history.

**Layout:** Static grid of cards, one per company. Single column on mobile, two columns on `md+`. No scroll-driven animation.

**Card Anatomy:**

```
┌─────────────────────────────┐
│  [Company logo / name]       │
│  ─────────────────────────   │
│  [Role Title]                │
│  [Date range]   accent color │
│  [Description]  optional     │
│  ─ (repeat per role) ─        │
└─────────────────────────────┘
```

**Entries (chronological, newest first):**

1. **Co-Founder & CEO** — ARCY AI (Apr 2026–Present)
2. **Affiliate Founder** — Founder Institute (Mar 2026–Present)
3. **Co-Founder & CEO / Founding SWE** — Campus Arc (May 2025–Apr 2026)
4. **Full-Stack Engineer** — Inveo Kripto/Misyon Kripto (Mar–May 2025)
5. **Full-Stack Engineer** — Misyon Bank (Jan 2024–Jan 2025)
6. **Front-End Engineer** — InvestBuddy (Jan–Jun 2024)

Note: McKinsey Forward Program, Microsoft AI Innovators Program, and NVIDIA Developer Program are achievements/programs — they appear in Section 7.6 Achievements, not here.

**Interactions:**

- Static — no scroll-driven animation
- Company name hover → subtle accent underline

**Volunteer / Community** (separate subsection, collapsed by default):

- Developer Team Lead — ODTÜ Blockchain
- Web/Cloud Team Lead — GDGC METU
- ODTÜ Representative — TBD Genç Ankara

---

### 7.5 Skills

**Purpose:** Quick visual inventory of technical capabilities. Helps recruiters and freelance clients assess fit.

**Layout:** Grouped by category. Each skill is a badge. Categories have headers.

**Skill Categories:**

```
Frontend
  Next.js · React · TypeScript · TailwindCSS · Framer Motion · Three.js / R3F
  shadcn/ui · GSAP · Redux Toolkit · Figma

Backend
  Node.js · PostgreSQL · Prisma ORM · REST APIs · NextAuth · Resend
  Laravel (PHP) · SQLite

Infrastructure & Tooling
  AWS · Vercel · GitHub CI/CD · Docker (basic) · Webpack

AI / ML
  RAG pipelines · Local LLM inference · Microsoft Foundry Local
  Vector embeddings · Prompt engineering

Languages
  TypeScript · JavaScript · Python · PHP · SQL · GLSL
```

**Interaction:**

- Skill badge hover → accent glow, slight scale
- Category header fades in on scroll
- Optional: skill badges float in with stagger animation on section entry

---

### 7.6 Achievements

**Purpose:** Social proof. Shows that Huseyin wins things, not just ships things.

**Layout:** Card grid (2-col desktop, 1-col mobile). Each achievement is a card with icon, title, issuer, date, and short description.

**Achievement Card Anatomy:**

```
┌─────────────────────────────┐
│  [Icon — trophy/star/etc]   │
│  [Achievement Title]   H4   │
│  [Issuer]          accent   │
│  [Date]            muted    │
│  [Description]     1 line   │
└─────────────────────────────┘
```

**Achievements to include:**

| Achievement                      | Issuer                                | Date      |
| -------------------------------- | ------------------------------------- | --------- |
| $25,000 Grant Approved           | Open Campus Incubator Cohort 1        | Jan 2025  |
| Rank #1, EduFi Category          | Campus Arc BETA — EDU Chain Hackathon | Aug 2024  |
| Worldcoin Pool Prize             | Carrot — ETHGlobal Cannes 2025        | Jul 2025  |
| Blockscout Pool Prize            | SwapZilla — ETHGlobal Brussels 2024   | Jul 2024  |
| Worldcoin Pool Prize             | VerifyWorld — ETHGlobal Istanbul 2023 | Nov 2023  |
| McKinsey Forward Program         | McKinsey.org                          | Apr 2026  |
| Founder Institute — Launch Track | Founder Institute                     | Mar 2026  |
| Microsoft AI Innovators Program  | Microsoft                             | May 2026  |
| NVIDIA Developer Program Member  | NVIDIA                                | Apr 2026  |
| Published Author                 | Manevra Magazine — METU YWC           | Fall 2023 |

---

### 7.7 Blog

**Purpose:** Showcase thinking depth. SEO. Long-form content for investors and collaborators who want to understand how Huseyin thinks.

**Layout:**

- Section preview on main page: 3 most recent posts as cards
- `/blog` page: full listing with search/filter
- `/blog/[slug]` page: full MDX post with reading time, date, tags

**Blog Post Card Anatomy:**

```
┌─────────────────────────────────────┐
│  [Cover image — optional]           │
│  [Tag badges]                       │
│  [Post title]                 H3    │
│  [Excerpt — 2 lines]          p     │
│  [Date · Reading time]      muted   │
│  [Read more →]              accent  │
└─────────────────────────────────────┘
```

**MDX Post Frontmatter:**

```yaml
---
title: 'Post Title'
excerpt: 'One paragraph summary'
date: '2026-06-14'
tags: ['AI', 'Startups', 'Engineering']
coverImage: '/images/blog/post-slug.png'
readingTime: 5
---
```

**Blog post page features:**

- Reading progress bar (top of viewport, accent color)
- Estimated reading time (calculated from word count)
- Table of contents (auto-generated from H2/H3 headings)
- Code blocks with syntax highlighting (Shiki or Prism)
- Back to blog link
- "Share on Twitter/X" and "Share on LinkedIn" buttons
- Related posts (by tag matching)

**Initial content plan:**

- Minimum 3 posts before launch (don't launch with empty blog)
- Suggested topics: "What I learned building two startups at 20", "Why I joined McKinsey Forward as a founder", "Building RAG locally with Microsoft Foundry"

---

### 7.8 Contact

**Purpose:** Convert. This is the final CTA. Make it easy, reduce friction, be human.

**Layout:** Centered, single column. Large heading. Two CTA buttons. Social links row below.

**Content:**

```
[Overline]
"Let's build something"

[Heading]
"Got a project, opportunity,
or just want to talk?"

[Body]
"I'm open to freelance work, co-founder conversations,
investment discussions, and interesting people.
Prefer a call? Book 15 minutes. Have a project brief?
Fill out the form below."

[Primary CTA]
[Button: "Book a 15-min call" → Calendly/Cal.com]

[Contact form — inline, below primary CTA]
  Name     [text input]
  Email    [email input]
  Message  [textarea, 4 rows]
           [Button: "Send message"]

  On success: "Message sent. I'll get back to you within 24 hours."
  On error:   "Something went wrong. Try emailing me directly."

[Divider]

[Social links row]
LinkedIn (@huseyinkaratas) · GitHub · YouTube (@huseyinium) · Instagram (@huseyinium)

[Footer note — muted]
"Usually responds within 24 hours."
```

**Form behavior:** Submits to `POST /api/contact` which uses Resend to deliver the message to `huseyinkaratas2003@gmail.com`. Validation: all fields required, email must be valid format. No captcha (keep friction low).

**3D:** Minimal particle field behind the CTA block (50 particles, accent color, very slow drift).

**Interactions:**

- Form fields: accent focus ring on focus
- Submit button: loading spinner while in-flight
- Social links → icon + username, hover glow
- Page-level ambient particles in background

---

## 8. Navigation & Layout

### Navbar

**Behavior:**

- Transparent on load (hero shows through)
- Blurs and gains background (`backdrop-blur-md bg-[--color-bg]/80`) after scrolling 80px
- Fixed to top (`position: fixed`, `z-50`)
- Active section highlighted in nav (intersection observer on each section)

**Content:**

```
[Logo / "HK" monogram — left]                    [Nav links — right]
                                                  About Projects Experience
                                                  Skills Blog
                                                  [Button: "Let's talk"]
```

**Mobile:** Hamburger → full-screen overlay menu with links staggered in.

### Footer

```
[Logo left]                              [Quick links right]
huseyinium.com                           About · Projects · Blog · Contact

[Bottom row]
© 2026 Huseyin Karatas                   Made with Next.js + Three.js
Open source on GitHub →
```

### Section IDs (for anchor navigation)

```
#hero · #about · #projects · #experience · #skills
#achievements · #blog · #contact
```

---

## 9. Animations & Interactions

### Scroll-Triggered (Framer Motion `whileInView`)

All section content animates in on scroll with:

```ts
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
viewport={{ once: true, margin: "-100px" }}
```

Stagger children with `variants` + `staggerChildren: 0.1`.

### Page Load

```
1. Background void (instant — CSS)
2. Three.js hero scene loads (Suspense)
3. Hero text animates in (stagger words, 0.1s each)
4. CTA buttons fade in (after text completes)
5. Scroll indicator bounces in
```

Total time to interactive: < 3 seconds on fast connection.

### Cursor

Custom cursor on desktop:

- Default: small circle, accent color, 8px diameter
- Hover on links/buttons: expands to 40px, low opacity
- Hover on 3D canvas: crosshair style

### Page Transitions

Next.js page transitions between `/`, `/blog/*`, and `/projects/*`:

- Framer Motion `AnimatePresence` in root layout
- Fade + slight upward translate (0.3s)

### Reduced Motion

All animations respect `prefers-reduced-motion`:

```ts
const prefersReducedMotion = useReducedMotion()
// pass to Framer Motion variants and Three.js uTime multiplier
```

---

## 10. Performance Targets

### Core Web Vitals (Target)

| Metric    | Target  | Notes                                                                            |
| --------- | ------- | -------------------------------------------------------------------------------- |
| LCP       | < 2.5s  | Hero text (not canvas) is LCP — canvas must have lower z-index than text overlay |
| FID / INP | < 100ms | No heavy JS on main thread                                                       |
| CLS       | < 0.1   | Reserve canvas height, no layout shifts                                          |
| FCP       | < 1.5s  | CSS-based fallback renders first                                                 |
| TTFB      | < 200ms | Static export on Vercel edge                                                     |

### Three.js Performance Budget

| Scene             | Max draw calls | Max triangles | Target FPS                  |
| ----------------- | -------------- | ------------- | --------------------------- |
| Hero neural graph | 3              | 50K           | 60fps desktop, 30fps mobile |
| About particles   | 1              | 1K            | 60fps                       |
| Contact particles | 1              | 500           | 60fps                       |

### Bundle Size Budget

| Chunk          | Max size (gzipped)   |
| -------------- | -------------------- |
| Main page JS   | < 150KB              |
| Three.js chunk | < 80KB (lazy loaded) |
| R3F chunk      | < 60KB (lazy loaded) |
| Total initial  | < 250KB              |

Three.js and R3F are loaded lazily via `next/dynamic` with `ssr: false`:

```ts
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <StaticHeroFallback />,
})
```

### Image Optimization

- All project screenshots: WebP, max 800px wide, `next/image` with `priority` on above-fold
- Blog cover images: WebP, `loading="lazy"` below fold
- No unoptimized images in production

### Mobile Strategy

- Three.js scenes: reduce geometry by 70% (500 → 150 particles, fewer edges)
- Micro-canvases on project cards: disabled on mobile (hover doesn't exist)
- Custom cursor: disabled on touch devices

---

## 11. SEO & Metadata

### Root Metadata (`app/layout.tsx`)

```ts
export const metadata: Metadata = {
  title: {
    default: 'Huseyin Karatas — Co-Founder, Full-Stack Engineer',
    template: '%s | Huseyin Karatas',
  },
  description:
    'Co-Founder & CEO at ARCY AI. Full-stack engineer, serial founder, and content creator based in Istanbul. Building AI agents that close the product-market fit loop.',
  keywords: [
    'Huseyin Karatas',
    'ARCY AI',
    'full-stack engineer',
    'AI founder',
    'Next.js developer',
    'React developer',
    'Istanbul developer',
    'huseyinium',
    'freelance developer Turkey',
  ],
  authors: [{ name: 'Huseyin Karatas', url: 'https://huseyinium.com' }],
  creator: 'Huseyin Karatas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://huseyinium.com',
    siteName: 'Huseyin Karatas',
    title: 'Huseyin Karatas — Co-Founder, Full-Stack Engineer',
    description: 'Building AI agents that close the product-market fit loop.',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huseyin Karatas — Co-Founder, Full-Stack Engineer',
    description: 'Building AI agents that close the product-market fit loop.',
    images: ['/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: 'https://huseyinium.com' },
}
```

### OG Image Generation (Vercel OG)

OG images are dynamically generated using `@vercel/og` (Edge Runtime, `ImageResponse`). Three templates — no static PNG files needed:

1. **Default site OG** → `app/og/route.tsx` — dark background, Cal Sans name, `#B8E04A` accent, tagline
2. **Blog post OG** → `app/blog/og/route.tsx` — post title + date + site name, same design system
3. **Project case study OG** → `app/projects/og/route.tsx` — project title + category badge

Each template accepts query params (`?title=...&category=...`) and returns a 1200×630 PNG via `ImageResponse`.

### Blog Post Metadata

Each MDX post generates its own metadata from frontmatter:

- `title`: post title + site name
- `description`: excerpt field
- `openGraph.images`: points to `app/blog/og/route.tsx?title=[title]&date=[date]`

### Structured Data (JSON-LD)

On root page:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Huseyin Karatas",
  "url": "https://huseyinium.com",
  "jobTitle": "Co-Founder & CEO",
  "worksFor": { "@type": "Organization", "name": "ARCY AI" },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Middle East Technical University"
  },
  "sameAs": [
    "https://linkedin.com/in/huseyinkaratas",
    "https://github.com/huseyinium",
    "https://youtube.com/@huseyinium",
    "https://instagram.com/huseyinium"
  ]
}
```

### Sitemap

Auto-generated via `next-sitemap`:

```
https://huseyinium.com/
https://huseyinium.com/blog/
https://huseyinium.com/blog/[each-post-slug]
https://huseyinium.com/projects/
https://huseyinium.com/projects/[each-project-slug]
```

---

## 12. Open Source Guidelines

### Repository

- **License:** MIT
- **GitHub:** `huseyinkaratas/huseyinium.com` (or `huseyinium/huseyinium.com`)
- **Stars goal:** Optimized to be forkable — clean code, zero magic numbers, documented data shapes

### README Requirements

The `README.md` must include:

- Live site link
- Screenshot / demo GIF of the hero 3D scene
- Tech stack badges
- One-command setup: `bun install && bun dev`
- How to fork and customize (change content files)
- Environment variables table
- Deploy to Vercel button
- License badge

### Environment Variables

```env
# Required
NEXT_PUBLIC_SITE_URL=https://huseyinium.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/huseyinkaratas

# Required — contact form delivery
RESEND_API_KEY=
RESEND_FROM_EMAIL=          # e.g. onboarding@resend.dev or your verified domain

# Optional — for YouTube API (falls back to static data)
YOUTUBE_API_KEY=

# Optional — Vercel Analytics (auto-configured on Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

### CONTRIBUTING.md

Light contribution guide:

- How to add a blog post (add MDX to `/content/blog/`)
- How to report bugs (GitHub Issues)
- Code style (ESLint + Prettier, auto-enforced)
- PR checklist

### Code Quality Standards

- **TypeScript strict mode** — no `any`, no type assertions without justification
- **No magic numbers** — all constants named and in `lib/constants.ts`
- **Component size** — no component > 200 lines; split if larger
- **No inline styles** — Tailwind classes only, CSS variables for design tokens
- **Accessible** — all interactive elements keyboard navigable, ARIA labels on 3D canvas

---

## 13. Deployment

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1", "fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### Build Pipeline

```json
// package.json scripts
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "type-check": "tsc --noEmit"
}
```

### Domain Setup

- Domain `huseyinium.com` → Vercel DNS
- `www.huseyinium.com` → redirect to apex
- SSL: auto via Vercel

### Preview Deployments

- Every PR → `huseyinium-com-git-[branch]-[user].vercel.app`
- Useful for open source contributors to preview changes

### Analytics

Vercel Analytics enabled (privacy-first, no cookies, no GDPR banner needed):

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
// <Analytics /> in root layout
```

---

## 14. Content Inventory

Everything needed before launch. Track completion here.

### Copy

- [ ] Hero tagline (1 line)
- [ ] Hero subheading (locked: "At 19 I shipped two regulated FinTech products at a bank...")
- [ ] About paragraphs (3 paragraphs)
- [ ] Project descriptions (7 grid cards × 1-2 sentences + 4 archived × 1 sentence)
- [ ] Experience descriptions (6 entries × 2-3 sentences)
- [ ] Case study long-form (4 required: ARCY AI, Campus Arc, misyon.kripto, misyon.bond)

### Assets

- [ ] Profile photo (high quality, dark background preferred)
- [ ] Project screenshots (11 projects — crop to 16:9)
- [ ] Blog cover images (minimum 3 for launch)
- [ ] Favicon (SVG + ICO, "HK" monogram in #B8E04A)
- [ ] Cal Sans font file (woff2, self-hosted or via @calcom/cal-sans)

### OG Templates (code, not image files)

- [ ] Default site OG (`app/og/route.tsx`)
- [ ] Blog post OG (`app/blog/og/route.tsx`)
- [ ] Project case study OG (`app/projects/og/route.tsx`)

### External Links

- [ ] Calendly/Cal.com link configured
- [ ] LinkedIn URL confirmed
- [ ] GitHub profile URL
- [ ] YouTube channel URL (@huseyinium)
- [ ] Instagram URL (@huseyinium)
- [ ] ARCY AI website URL (arcyai.com)
- [ ] Campus Arc website URL (campusarc.com)

### Blog Posts (minimum 3 before launch)

- [ ] Post 1 (draft)
- [ ] Post 2 (draft)
- [ ] Post 3 (draft)

### Code

- [ ] Next.js 16.2 project initialized
- [ ] Tailwind v4 + CSS variables configured
- [ ] shadcn/ui installed and themed
- [ ] R3F + Drei + postprocessing installed
- [ ] Hero neural graph scene (The Signal)
- [ ] All 8 sections implemented
- [ ] Case study MDX pipeline (`/projects/[slug]`)
- [ ] Contact form API route (`/api/contact` + Resend)
- [ ] Vercel OG routes (3 templates)
- [ ] Blog MDX pipeline
- [ ] SEO metadata
- [ ] Sitemap
- [ ] README
- [ ] Vercel deployment live

---

---

## 15. Testing Plan

### Philosophy

Tests verify **behavior through public interfaces**, not implementation details. A test that breaks on refactor but not on behavioral regression is a bad test.

For a portfolio site the surfaces that actually break silently are: the MDX pipeline, the contact API route, and the rendered page structure (section IDs, metadata). Three.js scenes and Framer Motion animations are not tested — they have no stable public interface and WebGL doesn't run in Node.

### Infrastructure

| Tool                 | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| **Vitest**           | Unit and integration tests for `lib/` and `app/api/`           |
| **@playwright/test** | E2E tests for page structure, navigation, and the contact form |
| **msw**              | Mock Resend HTTP calls in API route tests (no real email sent) |

```bash
bun add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
bun add -D @playwright/test
bun add -D msw
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

`playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  webServer: { command: 'bun dev', url: 'http://localhost:3000', reuseExistingServer: true },
  use: { baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
})
```

### What We Test

#### Layer 1 — `lib/` functions (Vitest unit)

`lib/mdx.ts` is the highest-risk utility: it parses all content and its bugs silently produce 404s or wrong data.

| Behavior                                          | Test                                  |
| ------------------------------------------------- | ------------------------------------- |
| `getAllPosts()` returns posts sorted newest-first | Parse fixture MDX files, assert order |
| `getPostBySlug(slug)` returns correct frontmatter | Fixture file with known frontmatter   |
| `getPostBySlug` returns `null` for unknown slug   | Assert null, not throw                |
| `getAllProjects()` returns all project MDX files  | Count fixture files                   |
| Post without optional `coverImage` doesn't error  | Fixture without the field             |

#### Layer 2 — API routes (Vitest integration)

`app/api/contact/route.ts` — only testable behavior is input validation and the Resend call.

| Behavior                                        | Test                         |
| ----------------------------------------------- | ---------------------------- |
| POST with all valid fields → 200 + success JSON | Mock Resend, assert response |
| POST with missing `name` → 400                  | No mock needed               |
| POST with invalid email format → 400            | No mock needed               |
| POST with missing `message` → 400               | No mock needed               |
| POST when Resend throws → 500 + error JSON      | Mock Resend to reject        |

msw intercepts `https://api.resend.com` — no real email sent in tests.

#### Layer 3 — OG image routes (Vitest integration)

| Behavior                                                  | Test                         |
| --------------------------------------------------------- | ---------------------------- |
| `GET /og` returns 200 with `content-type: image/png`      | Fetch route handler directly |
| `GET /blog/og?title=Foo&date=2026-01-01` returns 200      | Same                         |
| `GET /projects/og?title=Bar&category=startup` returns 200 | Same                         |

#### Layer 4 — Page structure (Playwright E2E)

These tests catch the class of regression where a section disappears, an anchor breaks, or metadata goes missing.

| Behavior                                                  | Test                                                    |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `/` renders all 8 section IDs (`#hero` … `#contact`)      | `page.locator('#hero')` etc.                            |
| Hero text is in initial HTML (not JS-deferred)            | `page.content()` before hydration includes hero heading |
| Canvas `z-index` is lower than hero text                  | Computed CSS assertion                                  |
| Nav links scroll to correct sections                      | Click "About", assert `#about` in view                  |
| Nav becomes opaque after 80px scroll                      | Scroll 100px, assert backdrop class                     |
| `/blog` renders blog listing                              | `page.locator('article')` count > 0                     |
| `/blog/[slug]` renders post title and reading time        | Visit first post URL                                    |
| `/projects/[slug]` renders problem/built/outcome headings | Visit first project URL                                 |

#### Layer 5 — Contact form (Playwright E2E)

| Behavior                                              | Test                                                           |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| Form shows validation error when submitted empty      | Submit empty, assert error message                             |
| Form shows success message on valid submit (mock API) | Intercept `POST /api/contact`, return 200, assert success copy |
| Form shows error message when API fails               | Intercept route, return 500, assert error copy                 |
| Submit button shows loading state while in-flight     | Intercept with delay, assert spinner                           |

Use Playwright `page.route('/api/contact', ...)` to intercept — no Resend key needed in E2E.

### What We Explicitly Don't Test

| Area                        | Why                                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Three.js / WebGL scenes     | No stable DOM surface; WebGL unavailable in Node/Chromium headless without GPU                                             |
| Framer Motion animations    | Animation values are implementation details; visual regression belongs in visual testing tools (Chromatic), not unit tests |
| CSS custom property values  | Design token changes intentionally cascade; testing specific hex values couples tests to design                            |
| `StaticHeroFallback` render | Only activates on WebGL failure — hard to simulate reliably; covered by code review instead                                |
| OG image visual output      | Pixel-level — belongs in visual snapshot testing, not behavioral testing                                                   |

### TDD Loop for This Project

Follow vertical slices — one behavior at a time:

```
RED:   Write test for one behavior → fails (function/route doesn't exist yet)
GREEN: Write minimal code to pass → passes
NEXT:  Move to next behavior
```

Start with `lib/mdx.ts` because everything downstream (blog, projects, OG images, metadata) depends on it.

**Sequence:**

1. `getAllPosts` returns empty array when no MDX files exist
2. `getAllPosts` returns one post when one MDX file exists with correct frontmatter
3. `getAllPosts` sorts newest-first when multiple posts exist
4. `getPostBySlug` returns correct post for known slug
5. `getPostBySlug` returns null for unknown slug
6. Contact API: 400 on missing fields
7. Contact API: 200 on valid input (Resend mocked)
8. Contact API: 500 on Resend failure
9. E2E: homepage section IDs present
10. E2E: contact form success/error states

_This spec is the contract between vision and implementation. When in doubt, return here._
