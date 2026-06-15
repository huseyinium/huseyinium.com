'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getNodeCount } from '@/lib/webgl'

const ACCENT = new THREE.Color('#B8E04A')
const EDGE_DISTANCE = 2.5
const REPULSION_RADIUS = 1.5
const REPULSION_STRENGTH = 0.08
const REPULSION_DECAY = 0.92

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uNoiseScale;
attribute float aOffset;
varying float vGlow;
void main() {
  vec3 displaced = position + vec3(
    sin(uTime * 0.5 + aOffset * 6.28) * uNoiseScale,
    cos(uTime * 0.4 + aOffset * 4.71) * uNoiseScale,
    sin(uTime * 0.3 + aOffset * 3.14) * uNoiseScale
  );
  vGlow = sin(uTime + aOffset * 12.0) * 0.5 + 0.5;
  gl_PointSize = 4.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`

const FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uAccentColor;
varying float vGlow;
void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = (1.0 - dist * 2.0) * (0.6 + vGlow * 0.4);
  gl_FragColor = vec4(uAccentColor * (0.8 + vGlow * 0.5), alpha);
}
`

export function NeuralGraph() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useRef(new THREE.Vector2(999, 999))
  const repulsion = useRef(new Float32Array(getNodeCount() * 3))

  const N = useMemo(() => getNodeCount(), [])

  const { basePositions, aOffsets, edgePositions, edgePairs } = useMemo(() => {
    const rng = seeded(42)
    const basePositions = new Float32Array(N * 3)
    const aOffsets = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      basePositions[i * 3] = (rng() - 0.5) * 8
      basePositions[i * 3 + 1] = (rng() - 0.5) * 5
      basePositions[i * 3 + 2] = (rng() - 0.5) * 4
      aOffsets[i] = rng()
    }
    const edgePairsList: number[] = []
    for (let i = 0; i < N; i++) {
      const ax = basePositions[i * 3],
        ay = basePositions[i * 3 + 1],
        az = basePositions[i * 3 + 2]
      const near: [number, number][] = []
      for (let j = i + 1; j < N; j++) {
        const dx = ax - basePositions[j * 3],
          dy = ay - basePositions[j * 3 + 1],
          dz = az - basePositions[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < EDGE_DISTANCE) near.push([d, j])
      }
      near.sort((a, b) => a[0] - b[0])
      near.slice(0, 3).forEach(([, j]) => edgePairsList.push(i, j))
    }
    const edgeCount = edgePairsList.length / 2
    const edgePairs = new Uint32Array(edgePairsList)
    const edgePositions = new Float32Array(edgeCount * 6)
    for (let e = 0; e < edgeCount; e++) {
      const a = edgePairs[e * 2],
        b = edgePairs[e * 2 + 1]
      edgePositions.set(
        [basePositions[a * 3], basePositions[a * 3 + 1], basePositions[a * 3 + 2]],
        e * 6
      )
      edgePositions.set(
        [basePositions[b * 3], basePositions[b * 3 + 1], basePositions[b * 3 + 2]],
        e * 6 + 3
      )
    }
    return { basePositions, aOffsets, edgePositions, edgePairs }
  }, [N])

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseScale: { value: 0.12 },
          uAccentColor: { value: ACCENT },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
      }),
    []
  )

  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.15 }),
    []
  )

  useEffect(() => {
    if (!pointsRef.current || !linesRef.current) return
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(basePositions.slice(), 3))
    pGeo.setAttribute('aOffset', new THREE.BufferAttribute(aOffsets, 1))
    const prevPGeo = pointsRef.current.geometry
    pointsRef.current.geometry = pGeo

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions.slice(), 3))
    const prevLGeo = linesRef.current.geometry
    linesRef.current.geometry = lGeo

    return () => {
      prevPGeo.dispose()
      prevLGeo.dispose()
    }
  }, [basePositions, aOffsets, edgePositions])

  useEffect(() => {
    return () => {
      shaderMat.dispose()
      lineMat.dispose()
    }
  }, [shaderMat, lineMat])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current || !pointsRef.current || !linesRef.current) return
    if (document.visibilityState === 'hidden') return

    shaderMat.uniforms.uTime.value = clock.getElapsedTime()
    groupRef.current.rotation.y += 0.0003

    const rep = repulsion.current
    const pos = basePositions
    const mx = mouse.current.x * 5,
      my = mouse.current.y * 3

    for (let i = 0; i < N; i++) {
      const dx = pos[i * 3] - mx,
        dy = pos[i * 3 + 1] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPULSION_RADIUS && dist > 0.001) {
        const f = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * REPULSION_STRENGTH
        rep[i * 3] += (dx / dist) * f
        rep[i * 3 + 1] += (dy / dist) * f
      }
      rep[i * 3] *= REPULSION_DECAY
      rep[i * 3 + 1] *= REPULSION_DECAY
      rep[i * 3 + 2] *= REPULSION_DECAY
    }

    const pAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < N; i++)
      pAttr.setXYZ(
        i,
        pos[i * 3] + rep[i * 3],
        pos[i * 3 + 1] + rep[i * 3 + 1],
        pos[i * 3 + 2] + rep[i * 3 + 2]
      )
    pAttr.needsUpdate = true

    const lAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute
    const ec = edgePairs.length / 2
    for (let e = 0; e < ec; e++) {
      const a = edgePairs[e * 2],
        b = edgePairs[e * 2 + 1]
      lAttr.setXYZ(e * 2, pos[a * 3] + rep[a * 3], pos[a * 3 + 1] + rep[a * 3 + 1], pos[a * 3 + 2])
      lAttr.setXYZ(
        e * 2 + 1,
        pos[b * 3] + rep[b * 3],
        pos[b * 3 + 1] + rep[b * 3 + 1],
        pos[b * 3 + 2]
      )
    }
    lAttr.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} material={shaderMat} />
      <lineSegments ref={linesRef} material={lineMat} />
    </group>
  )
}
