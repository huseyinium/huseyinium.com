'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing'
import * as THREE from 'three'
import { BlendFunction } from 'postprocessing'
import { NeuralGraph } from './NeuralGraph'

const CAMERA_Z_NEAR = 8
const CAMERA_Z_FAR = 15

function SceneCamera() {
  const { camera } = useThree()
  const currentZ = useRef(CAMERA_Z_NEAR)
  const targetZ = useRef(CAMERA_Z_NEAR)
  const tiltX = useRef(0)
  const tiltY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / window.innerHeight, 1)
      targetZ.current = CAMERA_Z_NEAR + (CAMERA_Z_FAR - CAMERA_Z_NEAR) * p
    }
    const onMove = (e: MouseEvent) => {
      tiltX.current = (e.clientY / window.innerHeight - 0.5) * -5 * (Math.PI / 180)
      tiltY.current = (e.clientX / window.innerWidth - 0.5) * 3 * (Math.PI / 180)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [camera])

  useFrame(() => {
    currentZ.current += (targetZ.current - currentZ.current) * 0.05
    camera.position.z = currentZ.current
    camera.rotation.x += (tiltX.current - camera.rotation.x) * 0.05
    camera.rotation.y += (tiltY.current - camera.rotation.y) * 0.05
  })

  return null
}

function PostFX() {
  const aberrationOffset = useMemo(() => new THREE.Vector2(0.001, 0.001), [])
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} radius={0.4} />
      <ChromaticAberration offset={aberrationOffset} />
      <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.35} premultiply={false} />
      <Vignette darkness={0.5} />
    </EffectComposer>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, CAMERA_Z_NEAR] }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0A0A0A']} />
      <SceneCamera />
      <NeuralGraph />
      <PostFX />
    </Canvas>
  )
}
