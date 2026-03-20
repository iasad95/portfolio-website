"use client"

import { useEffect, useRef } from "react"

export function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const particles = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }>
  >([])

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

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY

      // Create particles at cursor
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: mouseX.current,
          y: mouseY.current,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          maxLife: 1,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(3, 10, 20, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const particle = particles.current[i]

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.15 // gravity

        // Update life
        particle.life -= 0.02

        // Draw particle
        const opacity = particle.life
        ctx.fillStyle = `hsla(219, 89%, 52%, ${opacity * 0.6})`
        const size = Math.max(1, particle.life * 3)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Remove dead particles
        if (particle.life <= 0) {
          particles.current.splice(i, 1)
        }
      }

      // Draw subtle glow circle at cursor
      const gradient = ctx.createRadialGradient(mouseX.current, mouseY.current, 0, mouseX.current, mouseY.current, 40)
      gradient.addColorStop(0, "rgba(79, 172, 254, 0.12)")
      gradient.addColorStop(1, "rgba(79, 172, 254, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(mouseX.current - 40, mouseY.current - 40, 80, 80)

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
