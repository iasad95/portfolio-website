"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  radius: number
  opacity: number
  type: "light" | "gradient"
}

interface MagneticField {
  x: number
  y: number
  strength: number
  fade: number
}

export function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const mouseVX = useRef(0)
  const mouseVY = useRef(0)
  const particles = useRef<Particle[]>([])
  const magneticFields = useRef<MagneticField[]>([])
  const lastMouseX = useRef(0)
  const lastMouseY = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseX.current
      const prevY = mouseY.current

      mouseX.current = e.clientX
      mouseY.current = e.clientY

      mouseVX.current = mouseX.current - prevX
      mouseVY.current = mouseY.current - prevY

      // Create premium smooth particles on movement
      const speed = Math.sqrt(mouseVX.current ** 2 + mouseVX.current ** 2)
      if (speed > 0.5) {
        // Create elegant light particles
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: mouseX.current,
            y: mouseY.current,
            vx: mouseVX.current * 0.3 + (Math.random() - 0.5) * 1,
            vy: mouseVY.current * 0.3 + (Math.random() - 0.5) * 1,
            life: 1,
            maxLife: 1.5,
            radius: Math.random() * 1.5 + 0.5,
            opacity: 0.6,
            type: "light",
          })
        }

        // Add magnetic field effect
        magneticFields.current.push({
          x: mouseX.current,
          y: mouseY.current,
          strength: Math.min(80, speed * 10),
          fade: 0,
        })
      }

      lastMouseX.current = mouseX.current
      lastMouseY.current = mouseY.current
    }

    // Premium click effect - elegant expansion
    const handleMouseClick = () => {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const velocity = 2.5
        particles.current.push({
          x: mouseX.current,
          y: mouseY.current,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: 1.2,
          radius: Math.random() * 2 + 1,
          opacity: 0.8,
          type: "gradient",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleMouseClick)

    // Animation loop
    let animationId: number
    const animate = () => {
      // Ultra subtle clear - preserves motion trails for premium feel
      ctx.fillStyle = "rgba(3, 10, 20, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update magnetic fields
      for (let i = magneticFields.current.length - 1; i >= 0; i--) {
        const field = magneticFields.current[i]
        field.fade += 0.03

        if (field.fade > 1) {
          magneticFields.current.splice(i, 1)
        }
      }

      // Apply magnetic forces to particles
      for (const particle of particles.current) {
        for (const field of magneticFields.current) {
          const dx = field.x - particle.x
          const dy = field.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < field.strength) {
            const force = (1 - distance / field.strength) * 0.3 * (1 - field.fade)
            particle.vx += (dx / distance) * force
            particle.vy += (dy / distance) * force
          }
        }
      }

      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const particle = particles.current[i]

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.05 // Very subtle gravity

        particle.vx *= 0.98
        particle.vy *= 0.98

        particle.life -= 1 / (particle.maxLife * 60)

        const alphaMul = Math.max(0, particle.life)

        if (particle.type === "light") {
          // Elegant soft glow
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius * 3
          )
          gradient.addColorStop(0, `rgba(79, 172, 254, ${0.4 * alphaMul})`)
          gradient.addColorStop(0.7, `rgba(79, 172, 254, ${0.1 * alphaMul})`)
          gradient.addColorStop(1, `rgba(79, 172, 254, 0)`)

          ctx.fillStyle = gradient
          ctx.fillRect(
            particle.x - particle.radius * 3,
            particle.y - particle.radius * 3,
            particle.radius * 6,
            particle.radius * 6
          )
        } else if (particle.type === "gradient") {
          // Premium bright particle
          ctx.fillStyle = `rgba(79, 172, 254, ${0.6 * alphaMul})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fill()

          // Subtle outer glow
          ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 * alphaMul})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2)
          ctx.stroke()
        }

        if (particle.life <= 0) {
          particles.current.splice(i, 1)
        }
      }

      // Premium cursor indicator - smooth breathing pulse
      const pulseSize = 6 + Math.sin(Date.now() * 0.003) * 1.5
      const cursorGradient = ctx.createRadialGradient(
        mouseX.current,
        mouseY.current,
        0,
        mouseX.current,
        mouseY.current,
        pulseSize * 2.5
      )
      cursorGradient.addColorStop(0, "rgba(79, 172, 254, 0.25)")
      cursorGradient.addColorStop(0.4, "rgba(79, 172, 254, 0.08)")
      cursorGradient.addColorStop(1, "rgba(79, 172, 254, 0)")

      ctx.fillStyle = cursorGradient
      ctx.fillRect(
        mouseX.current - pulseSize * 2.5,
        mouseY.current - pulseSize * 2.5,
        pulseSize * 5,
        pulseSize * 5
      )

      // Elegant cursor ring
      ctx.strokeStyle = `rgba(79, 172, 254, ${0.15 + Math.sin(Date.now() * 0.002) * 0.08})`
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(mouseX.current, mouseY.current, pulseSize, 0, Math.PI * 2)
      ctx.stroke()

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
