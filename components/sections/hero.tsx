"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  
  const valuePropStatements = [
    "Building scalable SaaS systems",
    "Architecting microservices",
    "Optimizing for performance",
    "Designing systems at scale"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const currentStatement = valuePropStatements[currentIndex]
    let charIndex = 0
    let typingInterval: NodeJS.Timeout

    if (isTyping && charIndex < currentStatement.length) {
      typingInterval = setInterval(() => {
        setDisplayText((prev) => prev + currentStatement[charIndex])
        charIndex++
        if (charIndex === currentStatement.length) {
          setIsTyping(false)
        }
      }, 50)
    } else if (!isTyping) {
      const pauseTimeout = setTimeout(() => {
        setIsTyping(true)
        setDisplayText("")
        setCurrentIndex((prev) => (prev + 1) % valuePropStatements.length)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    return () => clearInterval(typingInterval)
  }, [isTyping, currentIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative pt-16 px-4 overflow-hidden" id="hero">
      <motion.div
        className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-6 max-w-4xl relative z-10"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="h-5 w-5 text-blue-400" />
            <p className="text-sm md:text-base font-medium text-blue-400 tracking-widest uppercase">
              Senior Software Engineer
            </p>
            <Sparkles className="h-5 w-5 text-blue-400" />
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300">
              Asad
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <p className="text-lg md:text-xl text-gray-300 font-medium min-h-[2rem]">
            <span className="text-blue-400">{">"} </span>
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
          <p className="text-gray-500 text-sm">8+ years building distributed systems | AWS Certified | MERN • MEAN</p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          I architect scalable SaaS platforms with microservices and event-driven systems. Proven track record: 45% latency reduction, 40% dev effort cut, 12M+ users served.
        </motion.p>

        <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View Projects
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Link>
          <a
            href="/resume/asad-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-blue-400 border border-blue-500/30 font-semibold px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-blue-500/60 hover:scale-105"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6 pt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-all hover:scale-125"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/i-asad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-all hover:scale-125"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:asad@asadcodes.com"
            className="text-gray-400 hover:text-blue-400 transition-all hover:scale-125"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Link href="#projects" aria-label="Scroll to Projects section">
          <ArrowDown className="text-blue-400 h-6 w-6" />
        </Link>
      </motion.div>
    </section>
  )
}
