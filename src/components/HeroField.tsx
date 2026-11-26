import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

/**
 * The live field behind the name in the immersive view: a stream of points
 * drifting left to right, joined to their near neighbours, pushed aside by
 * the pointer. A nod to the two things the projects keep coming back to,
 * streams of events and neighbourhoods in an embedding. Canvas 2D, a couple
 * of hundred points, paused when off screen or in a hidden tab. With
 * reduced motion it draws one still frame.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    type Pt = { x: number; y: number; vx: number; vy: number; accent: boolean }
    const pts: Pt[] = []
    const mouse = { x: -1e4, y: -1e4 }
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let hidden = document.visibilityState === 'hidden'

    const resize = () => {
      const r = host.getBoundingClientRect()
      w = r.width
      h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(220, Math.max(70, (w * h) / 7000)))
      pts.length = 0
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0.25 + Math.random() * 0.5,
          vy: (Math.random() - 0.5) * 0.15,
          accent: Math.random() < 0.08,
        })
      }
    }

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h)
      if (animate) {
        for (const p of pts) {
          p.x += p.vx
          p.y += p.vy + Math.sin((p.x + p.y) * 0.01) * 0.12
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 140 * 140) {
            const d = Math.sqrt(d2) || 1
            const f = (140 - d) / 140
            p.x += (dx / d) * f * 2.2
            p.y += (dy / d) * f * 2.2
          }
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }
      }
      ctx.lineWidth = 1
      const reach = 80
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < reach * reach) {
            const alpha = (1 - Math.sqrt(d2) / reach) * 0.22
            ctx.strokeStyle = `rgba(242, 242, 236, ${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.accent ? '#2439e0' : 'rgba(242, 242, 236, 0.85)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.accent ? 3 : 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      draw(true)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (reduce) {
        draw(false)
        return
      }
      if (visible && !hidden) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -1e4
      mouse.y = -1e4
    }
    const onVisibility = () => {
      hidden = document.visibilityState === 'hidden'
      start()
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })

    resize()
    start()
    window.addEventListener('resize', resize)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
    }
  }, [reduce])

  return <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full" aria-hidden="true" />
}
