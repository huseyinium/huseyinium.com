import { HeroCanvas } from '@/components/3d/HeroCanvas'
import { HeroContent } from './HeroContent'

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <HeroCanvas />
      <HeroContent />
    </section>
  )
}
