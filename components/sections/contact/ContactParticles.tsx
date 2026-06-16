'use client'

import { Component, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT_DESKTOP = 50
const PARTICLE_COUNT_MOBILE = 15

function makePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 10
    arr[i * 3 + 1] = (Math.random() - 0.5) * 10
    arr[i * 3 + 2] = (Math.random() - 0.5) * 5
  }
  return arr
}

const POSITIONS_DESKTOP = makePositions(PARTICLE_COUNT_DESKTOP)
const POSITIONS_MOBILE = makePositions(PARTICLE_COUNT_MOBILE)

class ParticlesErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    return this.state.hasError ? null : this.props.children
  }
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  const positions = isMobile ? POSITIONS_MOBILE : POSITIONS_DESKTOP

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#B8E04A" transparent opacity={0.6} />
    </points>
  )
}

export function ContactParticles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
      <ParticlesErrorBoundary>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Particles />
        </Canvas>
      </ParticlesErrorBoundary>
    </div>
  )
}
