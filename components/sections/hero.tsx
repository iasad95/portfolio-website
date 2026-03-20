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
    "Architecting microservices for scale",
    "Reducing API latency by 45%",
    "Building distributed systems",
    "Designing event-driven architectures"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const currentStatement = valuePropStatements[currentIndex]
    let charIndex = 0

    if (isTyping) {
      const typingInterval = setInterval(() => {
        charIndex++
        setDisplayText(currentStatement.slice(0, charIndex))
        if (charIndex >= currentStatement.length) {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 60)
      return () => clearInterval(typingInterval)
    } else {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % valuePropStatements.length)
        setDisplayText("")
        setIsTyping(true)
      }, 2500)
      return () => clearTimeout(delayTimeout)
    }
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
          <p className="text-lg md:text-xl text-gray-200 font-medium min-h-[2.5rem] leading-relaxed">
            <span className="text-blue-400 font-bold">{">"} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">{displayText}</span>
            {isTyping && <span className="animate-pulse text-blue-400">▌</span>}
          </p>
          <p className="text-gray-400 text-sm font-medium">8+ years building distributed systems • AWS Certified • MERN • MEAN</p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          I architect scalable SaaS platforms with microservices and event-driven systems. Proven track record: 45% latency reduction, 40% dev effort cut, 12M+ users served.
        </motion.p>

        <motion.div variants={itemVariants} className="pt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
            >
              View Projects
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/resume/asad-resume.pdf"
              download="Asad-Resume.pdf"
              className="inline-flex items-center gap-2 bg-gray-900/60 hover:bg-gray-900 text-blue-300 border border-blue-500/40 font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-blue-400/60 hover:text-blue-200"
            >
              <FileText className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6 pt-4">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-all"
            aria-label="GitHub"
            whileHover={{ scale: 1.3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/i-asad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-all"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.3, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="mailto:asad@asadcodes.com"
            className="text-gray-400 hover:text-blue-400 transition-all"
            aria-label="Email"
            whileHover={{ scale: 1.3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-6 w-6" />
          </motion.a>
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
