"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, Users, TrendingUp } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Projects() {
  const [mounted, setMounted] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      title: "Auto-Sports Platform",
      problem: "Clubs needed intelligent scheduling without manual coordination",
      solution: "Built AI-powered platform with GPS tracking and resource optimization",
      description:
        "AI-powered sports club management system with intelligent scheduling, resource management, and real-time club tracking via GPS. Achieved 30% revenue increase and 80% resource availability.",
      tech: ["Angular", "NestJS", "MySQL", "GPS Tracking"],
      year: "2018-2019",
      metrics: [
        { label: "Revenue Lift", value: "30%", icon: TrendingUp },
        { label: "Resource Available", value: "80%", icon: Users },
      ],
    },
    {
      title: "RevBits PAM",
      problem: "Enterprise security teams lacked unified privilege access management",
      solution: "Engineered microservices platform with session forensics & audit logs",
      description:
        "Enterprise security solution with privileged session management, CI/CD integration, and comprehensive security features. Received Globee Gold Award against Thycotic.",
      tech: ["React", "NestJS", "Microservices", "Security"],
      year: "2021-2023",
      metrics: [
        { label: "Award", value: "Gold", icon: Zap },
        { label: "Security Events Logged", value: "Real-time", icon: Users },
      ],
    },
    {
      title: "Arccos Golf",
      problem: "Golfers couldn't track performance accurately in real conditions",
      solution: "Built real-time tracking with wind/slope adjustment AI",
      description:
        "First fully automated golf performance tracking system with Microsoft. Real-time wind, slope, and environmental adjustment. 40% improvement in shot accuracy.",
      tech: ["React", "Node.js", "Real-time Analytics", "GPS"],
      year: "2019-2021",
      metrics: [
        { label: "Accuracy Improvement", value: "40%", icon: TrendingUp },
        { label: "Innovation Rank", value: "#3 Global", icon: Zap },
      ],
    },
    {
      title: "Ancera",
      problem: "Food safety required slow manual contamination detection",
      solution: "Built automated detection pipelines using ML & distributed systems",
      description:
        "Food contamination detection system for early biological threat identification. Optimized detection process by 90%, generating millions in revenue for Merck & Co.",
      tech: ["React", "Node.js", "Machine Learning", "Data Analytics"],
      year: "2019-2021",
      metrics: [
        { label: "Processing Time", value: "90% ↓", icon: TrendingUp },
        { label: "Revenue Generated", value: "$M+", icon: Zap },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-24 relative scroll-mt-16 px-4">
      <SectionHeading title="Impact Delivered" subtitle="High-leverage systems at scale" />

      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <motion.button
              onClick={() => setExpandedId(expandedId === index ? null : index)}
              className="w-full text-left"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 h-full cursor-pointer group">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-medium text-blue-400 whitespace-nowrap bg-blue-500/20 px-2.5 py-1.5 rounded-full border border-blue-500/30">
                    {project.year}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-400">
                    <span className="text-blue-400 font-semibold">Problem:</span> {project.problem}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="text-green-400 font-semibold">Solution:</span> {project.solution}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.metrics.map((metric, i) => {
                    const Icon = metric.icon
                    return (
                      <div key={i} className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/10">
                        <div className="flex items-center gap-1 mb-1">
                          <Icon className="h-3.5 w-3.5 text-blue-400" />
                          <p className="text-xs text-gray-400">{metric.label}</p>
                        </div>
                        <p className="text-sm font-bold text-blue-300">{metric.value}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {expandedId === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-blue-500/10"
                  >
                    <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
                  </motion.div>
                )}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
