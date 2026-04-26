"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, FileText, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative pt-20 px-4" id="hero">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8 max-w-4xl"
      >
        {/* Profile Image */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20220821_015236-fkmtCRbCvo7wt8XHs5LmBs2saIUmL7.jpg"
              alt="Asad"
              width={128}
              height={128}
              className="rounded-full border-2 border-blue-500/50 shadow-lg"
              priority
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Senior Full-Stack Engineer
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 font-semibold">
            Building AI-Enabled SaaS Systems That Scale
          </p>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          I design and ship Node.js, NestJS, React, Angular, and AWS platforms that handle real-world load, reduce latency by 45%, and support 12M+ users. 8+ years of proven results in building distributed systems that stay reliable as they grow.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="https://wa.me/923164363605"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book a Call
          </a>
          <a
            href="/resume.pdf"
            download="Asad-Resume.pdf"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-blue-300 border border-blue-500/40 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-6 pt-6">
          <a
            href="https://www.linkedin.com/in/i-asad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/iasad95"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.upwork.com/freelancers/asad007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            aria-label="Upwork"
          >
            <Briefcase className="h-6 w-6" />
          </a>
          <a
            href="mailto:asad@asadcodes.com"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
