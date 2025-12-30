"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative pt-16 px-4" id="hero">
      <div
        className={cn(
          "absolute w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] opacity-0 transition-opacity duration-1000",
          mounted && "opacity-40",
        )}
      ></div>

      <div
        className={cn(
          "text-center space-y-8 max-w-4xl opacity-0 transform translate-y-8 transition-all duration-1000",
          mounted && "opacity-100 translate-y-0",
        )}
      >
        <div>
          <p className="text-sm md:text-base font-medium text-blue-400 mb-2 tracking-widest uppercase">
            Welcome to my portfolio
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300">
              Asad
            </span>
          </h1>
        </div>

        <div className="space-y-2">
          <p className="text-xl md:text-2xl text-gray-300 font-medium">Full Stack Developer</p>
          <p className="text-lg text-gray-400">JavaScript • React • Angular • Node.js • TypeScript • Microservices</p>
        </div>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Software Engineer at Biztree with 6+ years of experience building scalable web applications and complex
          solutions. Recognized among the top 1% developers globally by Andela and Turing.
        </p>

        <div className="pt-4 flex flex-wrap gap-3 justify-center">
          <Link
            href="#about"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore My Work
          </Link>
          <a
            href="https://www.linkedin.com/in/i-asad/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 text-blue-400 border border-blue-500/30 font-medium px-8 py-3 rounded-lg transition-all duration-300"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>

        <div className="flex justify-center gap-6 pt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/i-asad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:asad@asadcodes.com"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" aria-label="Scroll to About section">
          <ArrowDown className="text-blue-400 h-8 w-8" />
        </Link>
      </div>
    </section>
  )
}
