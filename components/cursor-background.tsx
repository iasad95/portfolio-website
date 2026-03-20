"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  type: "light" | "bright"
}

export function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const mouseVX = useRef(0)
  const mouseVY = useRef(0)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize mouse position
    mouseX.current = window.innerWidth / 2
    mouseY.current = window.innerHeight / 2

    // Track mouse movement with playful particle creation
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseX.current
      const prevY = mouseY.current

      mouseX.current = e.clientX
      mouseY.current = e.clientY

      mouseVX.current = mouseX.current - prevX
      mouseVY.current = mouseY.current - prevY

      // Create premium smooth particles on movement
      const speed = Math.sqrt(mouseVX.current ** 2 + mouseVY.current ** 2)

      // More particles on faster movement for playful feel
      if (speed > 0.1) {
        const particleCount = Math.min(4, Math.ceil(speed / 3))

        for (let i = 0; i < particleCount; i++) {
          const angle = Math.atan2(mouseVY.current, mouseVX.current) + (Math.random() - 0.5) * 0.5
          const particleSpeed = 1 + Math.random() * 1.5

          particles.current.push({
            x: mouseX.current + (Math.random() - 0.5) * 8,
            y: mouseY.current + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * particleSpeed,
            vy: Math.sin(angle) * particleSpeed,
            life: 1,
            maxLife: 2,
            size: Math.random() * 1.5 + 0.8,
            type: Math.random() > 0.6 ? "bright" : "light",
          })
        }
      }
    }

    // Premium click effect - radial expansion
    const handleMouseClick = () => {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        particles.current.push({
          x: mouseX.current,
          y: mouseY.current,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          life: 1,
          maxLife: 1.5,
          size: Math.random() * 2 + 1,
          type: "bright",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleMouseClick)

    // Animation loop
    let animationId: number
    const animate = () => {
      // Very subtle fade for motion trail effect
      ctx.fillStyle = "rgba(3, 10, 20, 0.06)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const particle = particles.current[i]

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.04 // subtle gravity

        particle.vx *= 0.96 // friction
        particle.vy *= 0.96

        particle.life -= 1 / (particle.maxLife * 60)
        const alphaMul = Math.max(0, Math.min(1, particle.life))

        if (particle.type === "light") {
          // Soft glow particles
          const glowSize = particle.size * 4
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowSize
          )
          gradient.addColorStop(0, `rgba(79, 172, 254, ${0.35 * alphaMul})`)
          gradient.addColorStop(0.5, `rgba(79, 172, 254, ${0.1 * alphaMul})`)
          gradient.addColorStop(1, `rgba(79, 172, 254, 0)`)

          ctx.fillStyle = gradient
          ctx.fillRect(
            particle.x - glowSize,
            particle.y - glowSize,
            glowSize * 2,
            glowSize * 2
          )
        } else {
          // Bright core particles
          ctx.fillStyle = `rgba(100, 200, 255, ${0.7 * alphaMul})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          // Outer glow ring
          ctx.strokeStyle = `rgba(79, 172, 254, ${0.4 * alphaMul})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 1.8, 0, Math.PI * 2)
          ctx.stroke()
        }

        if (particle.life <= 0) {
          particles.current.splice(i, 1)
        }
      }

      // Premium breathing cursor ring - the main interactive element
      const time = Date.now() * 0.002
      const breathe = 1 + Math.sin(time) * 0.3
      const cursorRingSize = 12 * breathe

      // Outer pulsing ring
      ctx.strokeStyle = `rgba(79, 172, 254, ${0.25 + Math.sin(time * 1.2) * 0.12})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(mouseX.current, mouseY.current, cursorRingSize, 0, Math.PI * 2)
      ctx.stroke()

      // Inner ring
      ctx.strokeStyle = `rgba(147, 197, 253, ${0.18 + Math.cos(time * 0.8) * 0.09})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(mouseX.current, mouseY.current, cursorRingSize * 0.5, 0, Math.PI * 2)
      ctx.stroke()

      // Center glow
      const centerGlow = ctx.createRadialGradient(
        mouseX.current,
        mouseY.current,
        0,
        mouseX.current,
        mouseY.current,
        cursorRingSize * 0.6
      )
      centerGlow.addColorStop(0, "rgba(79, 172, 254, 0.15)")
      centerGlow.addColorStop(1, "rgba(79, 172, 254, 0)")
      ctx.fillStyle = centerGlow
      ctx.fillRect(
        mouseX.current - cursorRingSize * 0.6,
        mouseY.current - cursorRingSize * 0.6,
        cursorRingSize * 1.2,
        cursorRingSize * 1.2
      )

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleMouseClick)
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
