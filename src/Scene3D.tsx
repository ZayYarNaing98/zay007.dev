import { useEffect, useRef } from 'react'

// Decorative 3D background: a slowly rotating network of nodes, drawn on a
// 2D canvas with a hand-rolled perspective projection (no WebGL, no deps).
// The pointer tilts the network and scrolling pitches it. With
// prefers-reduced-motion it renders a single still frame instead.

interface Vec3 {
  x: number
  y: number
  z: number
}

interface Packet {
  edge: number
  t: number
  speed: number
}

interface Scene {
  nodes: Vec3[]
  edges: [number, number][]
  packets: Packet[]
}

const NEIGHBOURS = 2
const CAMERA = 2.6 // camera distance, in sphere radii
const SPIN_SPEED = 0.05 // radians per second

// Small seeded PRNG so the network has the same shape on every load.
function mulberry32(seed: number): () => number {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildScene(count: number): Scene {
  const rand = mulberry32(7)

  // Nodes scattered through a spherical shell (radius 0.45–1).
  const nodes: Vec3[] = []
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1
    const phi = rand() * Math.PI * 2
    const r = 0.45 + rand() * 0.55
    const s = Math.sqrt(1 - u * u)
    nodes.push({ x: r * s * Math.cos(phi), y: r * u, z: r * s * Math.sin(phi) })
  }

  // Link every node to its nearest neighbours.
  const seen = new Set<string>()
  const edges: [number, number][] = []
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, NEIGHBOURS)
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([i, j])
      }
    }
  })

  // "Packets" that travel along the links.
  const packets: Packet[] = []
  const packetCount = Math.round(count / 6)
  for (let i = 0; i < packetCount; i++) {
    packets.push({
      edge: Math.floor(rand() * edges.length),
      t: rand(),
      speed: 0.25 + rand() * 0.45,
    })
  }

  return { nodes, edges, packets }
}

export default function Scene3D({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Kept across theme switches so the network does not jump back.
  const spinRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = buildScene(window.innerWidth < 640 ? 56 : 110)
    const nodeRgb = dark ? '192, 132, 252' : '124, 58, 237'
    const packetRgb = dark ? '34, 211, 238' : '76, 29, 149'
    const strength = dark ? 1 : 0.7

    let width = 0
    let height = 0
    let raf = 0
    let last = 0
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    const projected = scene.nodes.map(() => ({ x: 0, y: 0, depth: 0 }))

    const render = () => {
      const radius = Math.max(420, Math.max(width, height) * 0.6)
      const cx = width / 2
      const cy = height / 2
      const yaw = spinRef.current + eased.x * 0.5
      const pitch = 0.35 + eased.y * 0.3 + window.scrollY * 0.0005
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosX = Math.cos(pitch)
      const sinX = Math.sin(pitch)

      scene.nodes.forEach((n, i) => {
        // Rotate around Y (yaw), then X (pitch), then project.
        const x = n.x * cosY + n.z * sinY
        const z1 = n.z * cosY - n.x * sinY
        const y = n.y * cosX - z1 * sinX
        const z = n.y * sinX + z1 * cosX
        const scale = CAMERA / (CAMERA + z)
        const p = projected[i]
        p.x = cx + x * radius * scale
        p.y = cy + y * radius * scale
        p.depth = (1 - z) / 2 // 1 = nearest, 0 = farthest
      })

      ctx.clearRect(0, 0, width, height)

      ctx.lineWidth = 1
      for (const [a, b] of scene.edges) {
        const pa = projected[a]
        const pb = projected[b]
        const depth = (pa.depth + pb.depth) / 2
        ctx.strokeStyle = `rgba(${nodeRgb}, ${(0.04 + depth * 0.2) * strength})`
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      }

      for (const p of projected) {
        ctx.fillStyle = `rgba(${nodeRgb}, ${(0.12 + p.depth * 0.43) * strength})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.8 + p.depth * 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const packet of scene.packets) {
        const [a, b] = scene.edges[packet.edge]
        const pa = projected[a]
        const pb = projected[b]
        const x = pa.x + (pb.x - pa.x) * packet.t
        const y = pa.y + (pb.y - pa.y) * packet.t
        const depth = pa.depth + (pb.depth - pa.depth) * packet.t
        const alpha = (0.25 + depth * 0.55) * strength
        ctx.fillStyle = `rgba(${packetRgb}, ${alpha * 0.18})`
        ctx.beginPath()
        ctx.arc(x, y, 3 + depth * 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${packetRgb}, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, 1 + depth * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      spinRef.current += dt * SPIN_SPEED
      eased.x += (pointer.x - eased.x) * 0.05
      eased.y += (pointer.y - eased.y) * 0.05
      for (const packet of scene.packets) {
        packet.t += dt * packet.speed
        if (packet.t >= 1) {
          packet.t = 0
          packet.edge = Math.floor(Math.random() * scene.edges.length)
        }
      }
      render()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (still || raf || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      render()
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / width) * 2 - 1
      pointer.y = (e.clientY / height) * 2 - 1
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    start()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (!still) window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [dark])

  return <canvas ref={canvasRef} className="scene-3d" aria-hidden="true" />
}
