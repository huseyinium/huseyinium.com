'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TechnicalSkills } from './skills/TechnicalSkills'
import { SoftSkills } from './skills/SoftSkills'

type SkillType = 'technical' | 'soft'

const DESCRIPTIONS: Record<SkillType, string> = {
  technical: 'The languages, frameworks, and tools I reach for most often.',
  soft: 'The people and product instincts that shape how I build, not just what I build.',
}

export function Skills() {
  const [skillType, setSkillType] = useState<SkillType>('technical')

  return (
    <section id="skills" className="pt-24 md:pt-32 md:pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="font-cal text-4xl md:text-5xl text-foreground text-center">Skills</h2>
        <p className="text-(--color-text-muted) text-center mb-8 mt-2">{DESCRIPTIONS[skillType]}</p>

        <Tabs
          value={skillType}
          onValueChange={(value) => setSkillType(value as SkillType)}
          className="items-center"
        >
          <TabsList className="mx-auto mb-12 h-12! w-fit gap-2 rounded-full! px-2!">
            <TabsTrigger
              className="cursor-pointer rounded-full! px-4! py-3! data-active:border-(--color-border)! data-active:bg-(--color-bg-elevated)! data-active:text-foreground!"
              value="technical"
            >
              Technical Skills
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer rounded-full! px-4! py-3! data-active:border-(--color-border)! data-active:bg-(--color-bg-elevated)! data-active:text-foreground!"
              value="soft"
            >
              Soft Skills
            </TabsTrigger>
          </TabsList>
          <TabsContent value="technical" className="w-full">
            <TechnicalSkills />
          </TabsContent>
          <TabsContent value="soft" className="w-full">
            <SoftSkills />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
