'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RotatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      const d = Math.min(delta, 0.1)
      meshRef.current.rotation.x += d * 0.6
      meshRef.current.rotation.y += d * 0.4
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial color="#B8E04A" wireframe />
    </mesh>
  )
}

export function ProjectMicroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }} gl={{ antialias: false }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#B8E04A" />
      <RotatingGeometry />
    </Canvas>
  )
}
