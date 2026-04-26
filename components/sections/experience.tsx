"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Experience() {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const experiences = [
    {
      company: "Biztree",
      position: "Senior Software Engineer",
      duration: "Jan 2023 - Present",
      location: "Remote",
      stage: "Current",
      description:
        "Architected a unified NestJS microservices backend powering 5+ SaaS applications serving 12M+ users. Reduced API latency by 45% with BullMQ and RabbitMQ. Led a zero-downtime MongoDB migration for 50M+ records using safe batch processing and rollback strategies. Built CloudDrive supporting 500K daily file operations with RBAC, S3 presigned URLs, and AWS Lambda thumbnail generation.",
      highlights: [
        "Architected unified microservices backend for 12M+ users",
        "CloudDrive: 500K daily file operations with secure access",
        "Zero-downtime migration: 50M+ MongoDB records",
        "Reduced API latency by 45% using BullMQ + RabbitMQ",
        "Built HRM backend with PostgreSQL, TypeORM, and CQRS",
        "AI middleware for document workflows and chat features with token tracking",
      ],
    },
    {
      company: "InvoZone",
      position: "Senior Software Engineer",
      duration: "Oct 2021 - Jan 2023",
      location: "Lahore, Pakistan",
      stage: "2021-2023",
      description:
        "Delivered an enterprise Privileged Access Management (PAM) platform for RevBits security teams. Designed a scalable microservices architecture with load balancing, multi-instance clustering, and session forensics. Won Gold in the 2022 Globee Awards against Thycotic.",
      highlights: [
        "Enterprise PAM platform: credential & session management",
        "Scalable microservices with load balancing and clustering",
        "Session forensics and audit capabilities: keystroke/video recording",
        "Improved deployment speed by 30%",
        "Security hardening: XSS, SQL injection, brute-force protection",
        "RevBits PAM: Globee Gold Award 2022",
      ],
    },
    {
      company: "TenX",
      position: "Software Engineer",
      duration: "Aug 2018 - Oct 2021",
      location: "Lahore, Pakistan",
      stage: "2018-2021",
      description:
        "Built full-stack applications for Ancera (food safety) and Arccos Golf (sports analytics). Engineered distributed, resource-intensive systems for scientific data processing and real-time analytics with measurable impact.",
      highlights: [
        "Ancera: automated contamination detection with 90% processing improvement",
        "Arccos Golf: real-time performance tracking with #3 sports innovation ranking",
        "Distributed system design for high-throughput processing",
        "Improved release frequency by 2x through CI/CD automation",
        "Optimized internal NPM packages for developer productivity",
        "40% improvement in shot strategy accuracy for Arccos",
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="experience" className="py-24 relative scroll-mt-16 px-4">
      <SectionHeading title="Systems Architect Journey" subtitle="Scaling across companies and industries" />

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                variants={itemVariants}
                className="w-full text-left"
              >
                <motion.div
                  className={cn(
                    "relative p-6 rounded-xl border transition-all duration-300 cursor-pointer group",
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border-blue-500/50 shadow-lg shadow-blue-500/15"
                      : "bg-gray-900/30 border-blue-500/20 hover:border-blue-500/40 hover:bg-gray-900/40",
                  )}
                  whileHover={{ x: 4 }}
                >
                  <div className="absolute left-0 top-6 w-1 h-12 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1" />

                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-300 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-blue-400 font-semibold">{exp.company}</p>
                    </div>
                    <motion.div
                      animate={activeIndex === index ? { x: 4 } : { x: 0 }}
                      className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <div className="flex gap-4 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-blue-400" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-blue-400" />
                      {exp.location}
                    </div>
                  </div>

                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-blue-500/10 space-y-3"
                    >
                      <p className="text-sm text-gray-300 leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="inline-block bg-blue-500/15 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-500/20"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl p-4 sticky top-32">
              <h4 className="text-sm font-bold text-gray-100 mb-4">Career Timeline</h4>
              <div className="space-y-3">
                {experiences.map((exp, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-all duration-300 text-xs",
                      activeIndex === index
                        ? "bg-blue-500/30 text-blue-300 font-semibold border border-blue-500/50"
                        : "text-gray-400 hover:bg-blue-500/10 hover:text-blue-300",
                    )}
                  >
                    <div className="font-semibold">{exp.stage}</div>
                    <div className="text-gray-500">{exp.company}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
