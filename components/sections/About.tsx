'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CurvedLoop from '../react-bits/CurvedLoopText'

// const STATS = [
//   { value: '2+', label: 'Startups founded' },
//   { value: '5+', label: 'Years engineering' },
//   { value: '10+', label: 'Hackathons attended' },
//   { value: 'Multiple', label: 'Prizes won' },
//   { value: '16K+', label: 'LinkedIn followers' },
//   { value: '200K+', label: 'YouTube views' },
//   { value: '100K+', label: 'Monthly IG views' },
//   { value: 'METU', label: 'METU student' },
// ]

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground mb-16 text-center">About</h2>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-20 items-center">
          {/* Left — portrait */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/my-pp.svg"
              alt="Huseyin Karatas"
              width={280}
              height={280}
              className="w-48 h-48 md:w-70 md:h-70 rounded-full border border-(--color-border)"
            />
          </motion.div>

          {/* Right — story */}
          <div className="flex flex-col gap-6 text-(--color-text-muted) leading-relaxed">
            {[
              {
                id: 'about-para-builder' as const,
                text: "I'm Huseyin Karatas, a 22-year-old full-stack engineer and entrepreneur, graduated from METU, Turkiye's top technical university. I've spent the last 5+ years building software products from zero to production.",
              },
              {
                id: 'about-para-builder' as const,
                text: "Across 20+ projects, I've shipped regulated fintech platforms, developer tools, and B2B software with real users and revenue.",
              },
            ].map((para, i) => (
              <motion.p
                key={para.id}
                data-testid={para.id}
                custom={i}
                variants={paragraphVariants}
                initial="hidden"
                className="text-gray-200 text-lg text-center md:text-left"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {para.text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
      {/*  <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 lg:pb-48 lg:pt-52">
        <CurvedLoop
          marqueeText="⚡ I BUILT, THEREFORE I AM."
          speed={1.5}
          curveAmount={100}
          direction="right"
          interactive
        />
      </div> */}
    </section>
  )
}
