# huseyinium.com

[![Live Site](https://img.shields.io/badge/live-huseyinium.com-B8E04A?style=flat-square)](https://huseyinium.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-r168-049EF4?style=flat-square&logo=three.js)](https://threejs.org)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.x-FF6B35?style=flat-square)](https://r3f.docs.pmnd.rs)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vercel](https://img.shields.io/badge/deployed-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

Personal portfolio for **Huseyin Karatas** — Co-Founder & CEO at ARCY AI. Cinematic, performance-first, and open source. Built with procedural Three.js visuals, Next.js App Router, and Tailwind CSS v4.

---

## Tech Stack

| Layer      | Choice                             |
| ---------- | ---------------------------------- |
| Framework  | Next.js 16.2 (App Router, Vercel)  |
| Language   | TypeScript (strict mode)           |
| Styling    | Tailwind CSS v4 + CSS custom props |
| UI         | shadcn/ui + Magic UI               |
| Animation  | Framer Motion                      |
| 3D / WebGL | React Three Fiber + Three.js       |
| Post-FX    | @react-three/postprocessing        |
| Content    | MDX (no CMS, no database)          |
| Email      | Resend                             |
| Analytics  | Vercel Analytics                   |

---

## Setup

```bash
git clone https://github.com/huseyinium/huseyinium.com.git
cd huseyinium.com
cp .env.example .env.local   # fill in the required vars (see below)
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable                   | Required | Description                                    |
| -------------------------- | -------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Yes      | Full URL of your site (e.g. `https://you.com`) |
| `NEXT_PUBLIC_CALENDLY_URL` | Yes      | Your Cal.com or Calendly booking link          |
| `RESEND_API_KEY`           | Yes      | API key from [resend.com](https://resend.com)  |
| `RESEND_FROM_EMAIL`        | Yes      | Verified sender email on Resend                |
| `YOUTUBE_API_KEY`          | No       | YouTube Data API v3 key; falls back to static  |

---

## How to Fork and Customize

This repo is designed to be forked. The content lives in two places:

**Blog posts** — add MDX files to `content/blog/`:

```
content/blog/my-new-post.mdx
```

Front matter:

```mdx
---
title: 'My Post Title'
date: '2026-06-16'
summary: 'A short description.'
tags: ['ai', 'engineering']
---

Your content here.
```

**Project case studies** — add MDX to `content/projects/` and register the project in `content/projects.ts`.

**Personal info** — update `content/skills.ts`, `content/achievements.ts`, and `content/projects.ts` (stack, achievements, and project list).

**Colors** — every color is a CSS custom property in `app/globals.css`. Change `--color-accent` (currently `#B8E04A`) and `--color-bg` to theme the whole site without touching components.

**3D scenes** — each scene is a self-contained `'use client'` component under `components/three/`. Swap, remove, or add scenes without affecting the rest of the site.

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhuseyinium%2Fhuseyinium.com&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_CALENDLY_URL,RESEND_API_KEY,RESEND_FROM_EMAIL&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fhuseyinium%2Fhuseyinium.com%23environment-variables)

Set the required env vars in the Vercel dashboard during import.

---

## License

[MIT](LICENSE) © 2026 Huseyin Karatas
