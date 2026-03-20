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
  hue: number
  type: "spark" | "glow" | "trail"
}

interface FloatingObject {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  angle: number
  size: number
  rotation: number
  rotationSpeed: number
}

export function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const mouseVX = useRef(0)
  const mouseVY = useRef(0)
  const particles = useRef<Particle[]>([])
  const floatingObjects = useRef<FloatingObject[]>([])
  const score = useRef(0)
  const lastMouseX = useRef(0)
  const lastMouseY = useRef(0)

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

    // Create initial floating objects (stars, geometric shapes)
    const createFloatingObject = (x?: number, y?: number) => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        angle: Math.random() * Math.PI * 2,
        size: Math.random() * 15 + 5,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      }
    }

    // Initialize some floating objects
    for (let i = 0; i < 8; i++) {
      floatingObjects.current.push(createFloatingObject())
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseX.current
      const prevY = mouseY.current

      mouseX.current = e.clientX
      mouseY.current = e.clientY

      // Calculate mouse velocity for trail direction
      mouseVX.current = mouseX.current - prevX
      mouseVY.current = mouseY.current - prevY

      // Create varied particles based on movement speed
      const speed = Math.sqrt(mouseVX.current ** 2 + mouseVY.current ** 2)
      const particleCount = Math.min(5, Math.floor(speed / 2))

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.atan2(mouseVY.current, mouseVX.current)
        const spread = (Math.random() - 0.5) * Math.PI / 3

        particles.current.push({
          x: mouseX.current + (Math.random() - 0.5) * 10,
          y: mouseY.current + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle + spread) * (2 + Math.random() * 2),
          vy: Math.sin(angle + spread) * (2 + Math.random() * 2),
          life: 1,
          maxLife: 1,
          size: Math.random() * 2 + 1,
          hue: (score.current * 2) % 360,
          type: Math.random() > 0.7 ? "glow" : "spark",
        })
      }

      // Create glow burst on fast movement
      if (speed > 8) {
        for (let i = 0; i < 3; i++) {
          particles.current.push({
            x: mouseX.current,
            y: mouseY.current,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 0.8,
            maxLife: 0.8,
            size: Math.random() * 3 + 2,
            hue: (score.current * 2) % 360,
            type: "glow",
          })
        }
      }

      lastMouseX.current = mouseX.current
      lastMouseY.current = mouseY.current
    }

    // Track mouse clicks for particle burst
    const handleMouseClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        particles.current.push({
          x: mouseX.current,
          y: mouseY.current,
          vx: Math.cos(angle) * 5,
          vy: Math.sin(angle) * 5,
          life: 1,
          maxLife: 1,
          size: Math.random() * 3 + 1,
          hue: (Math.random() * 60 + 180) % 360,
          type: "spark",
        })
      }
      score.current++
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleMouseClick)

    // Animation loop
    let animationId: number
    const animate = () => {
      // Clear with very subtle fade
      ctx.fillStyle = "rgba(3, 10, 20, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw floating objects
      for (const obj of floatingObjects.current) {
        // Gentle random movement
        obj.vx += (Math.random() - 0.5) * 0.05
        obj.vy += (Math.random() - 0.5) * 0.05
        obj.vx *= 0.98
        obj.vy *= 0.98

        obj.x += obj.vx
        obj.y += obj.vy
        obj.rotation += obj.rotationSpeed

        // Wrap around screen
        if (obj.x < -50) obj.x = canvas.width + 50
        if (obj.x > canvas.width + 50) obj.x = -50
        if (obj.y < -50) obj.y = canvas.height + 50
        if (obj.y > canvas.height + 50) obj.y = -50

        // Draw star/geometric shape
        ctx.save()
        ctx.translate(obj.x, obj.y)
        ctx.rotate(obj.rotation)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, obj.size)
        gradient.addColorStop(0, `hsla(${obj.angle * 57.3 % 360}, 100%, 60%, 0.6)`)
        gradient.addColorStop(1, `hsla(${obj.angle * 57.3 % 360}, 100%, 40%, 0)`)

        // Draw star shape
        ctx.fillStyle = gradient
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
          const x = Math.cos(angle) * obj.size
          const y = Math.sin(angle) * obj.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const particle = particles.current[i]

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.08 // slight gravity

        // Air resistance
        particle.vx *= 0.97
        particle.vy *= 0.97

        particle.life -= 0.015

        const opacity = particle.life * 0.8
        const brightness = particle.life > 0.5 ? 70 : 40

        if (particle.type === "spark") {
          ctx.fillStyle = `hsla(${particle.hue}, 100%, ${brightness}%, ${opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (particle.type === "glow") {
          const glowGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3
          )
          glowGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${opacity * 0.4})`)
          glowGradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)
          ctx.fillStyle = glowGradient
          ctx.fillRect(
            particle.x - particle.size * 3,
            particle.y - particle.size * 3,
            particle.size * 6,
            particle.size * 6
          )
        }

        if (particle.life <= 0) {
          particles.current.splice(i, 1)
        }
      }

      // Draw interactive cursor indicator
      const cursorSize = 8 + Math.sin(Date.now() / 500) * 2
      const cursorGradient = ctx.createRadialGradient(
        mouseX.current,
        mouseY.current,
        0,
        mouseX.current,
        mouseY.current,
        cursorSize * 2
      )
      cursorGradient.addColorStop(0, "rgba(79, 172, 254, 0.4)")
      cursorGradient.addColorStop(0.5, "rgba(79, 172, 254, 0.2)")
      cursorGradient.addColorStop(1, "rgba(79, 172, 254, 0)")

      ctx.fillStyle = cursorGradient
      ctx.fillRect(
        mouseX.current - cursorSize * 2,
        mouseY.current - cursorSize * 2,
        cursorSize * 4,
        cursorSize * 4
      )

      // Draw mini cursor ring
      ctx.strokeStyle = "rgba(79, 172, 254, 0.3)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(mouseX.current, mouseY.current, cursorSize, 0, Math.PI * 2)
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
