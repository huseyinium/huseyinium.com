'use client'

import dynamic from 'next/dynamic'
import { Suspense, useSyncExternalStore } from 'react'
import { StaticHeroFallback } from './StaticHeroFallback'
import { HeroErrorBoundary } from './HeroErrorBoundary'
import { checkWebGLSupport } from '@/lib/webgl'

const HeroScene = dynamic(() => import('./HeroScene').then((m) => ({ default: m.HeroScene })), {
  ssr: false,
})

const NOOP_SUBSCRIBE = () => () => {}

export function HeroCanvas() {
  // useSyncExternalStore is the React-idiomatic way to read client-only state
  // without triggering set-state-in-effect lint violations or hydration mismatches.
  // getServerSnapshot returns null so SSR renders StaticHeroFallback consistently.
  const webglOk = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => checkWebGLSupport(),
    () => null
  )

  return (
    <div className="w-full h-screen fixed inset-0 -z-10">
      {webglOk !== true && <StaticHeroFallback />}
      {webglOk === true && (
        <HeroErrorBoundary>
          <Suspense fallback={<StaticHeroFallback />}>
            <HeroScene />
          </Suspense>
        </HeroErrorBoundary>
      )}
    </div>
  )
}
