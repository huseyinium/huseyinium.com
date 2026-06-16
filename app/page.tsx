import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Achievements } from '@/components/sections/Achievements'
import { BlogSection } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/contact'
import { getAllPosts } from '@/lib/blog'

export default async function Home() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <BlogSection posts={recentPosts} />
      <Contact />
    </main>
  )
}
