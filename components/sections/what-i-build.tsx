"use client"

import { motion } from "framer-motion"
import { Database, Zap, Cloud, Layers } from "lucide-react"

export default function WhatIBuild() {
  const categories = [
    {
      icon: Layers,
      title: "Microservices",
      description: "Scalable, event-driven architectures",
      technologies: ["NestJS", "Distributed Systems", "CQRS", "Event Sourcing"],
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Database,
      title: "Data Pipelines",
      description: "High-throughput processing systems",
      technologies: ["MongoDB", "PostgreSQL", "Real-time Analytics", "BullMQ"],
      color: "from-green-600 to-green-400",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "AWS-native serverless solutions",
      technologies: ["Lambda", "S3", "EventBridge", "API Gateway"],
      color: "from-orange-600 to-orange-400",
    },
    {
      icon: Zap,
      title: "Frontend Systems",
      description: "Interactive user experiences",
      technologies: ["React", "Angular", "Real-time UI", "State Management"],
      color: "from-purple-600 to-purple-400",
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
    <section id="what-i-build" className="py-24 relative px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
            What I Build
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Systems that scale to millions of users. Infrastructure that doesn't slow you down.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  className="relative p-6 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm h-full hover:border-blue-500/40 transition-all duration-300 group cursor-pointer"
                  whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.5)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 rounded-xl transition-all duration-300 pointer-events-none" />

                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-100 mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{category.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block text-xs bg-blue-500/15 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/20 group-hover:border-blue-500/40 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/20 transition-all duration-500" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
