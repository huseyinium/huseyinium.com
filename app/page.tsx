import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Principles } from '@/components/sections/Principles'
import { Achievements } from '@/components/sections/Achievements'
import { BlogSection } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/contact'
import { getAllPosts } from '@/lib/blog'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Huseyin Karatas',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huseyinium.com',
  jobTitle: 'Co-Founder & CEO',
  worksFor: { '@type': 'Organization', name: 'ARCY AI' },
  alumniOf: { '@type': 'EducationalOrganization', name: 'Middle East Technical University' },
  sameAs: [
    'https://linkedin.com/in/huseyinkaratas',
    'https://github.com/huseyinium',
    'https://youtube.com/@huseyinium',
    'https://instagram.com/huseyinium',
  ],
}

export default async function Home() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      {/* <About /> */}
      <Projects />
      <Skills />
      <Experience />
      <Principles />
      {/*  <Achievements /> */}
      {/* <BlogSection posts={recentPosts} /> */}
      <Contact />
    </main>
  )
}
