"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Experience() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const experiences = [
    {
      company: "Biztree",
      position: "Senior Software Engineer",
      duration: "Jan 2023 - Present",
      location: "Remote",
      description:
        "Architected a unified NestJS microservices backend powering 5+ SaaS applications serving 12M+ users. Led MongoDB V1 to V2 migration (50M+ records) with zero downtime. Built CloudDrive platform supporting 500K daily file operations with RBAC and S3 integration.",
      highlights: [
        "Reduced API latency by 45% using BullMQ + RabbitMQ",
        "Cut backend development effort by 40%",
        "Implemented distributed queue system",
        "Built HRM backend with CQRS architecture",
        "Developed AI middleware for 12M+ users",
        "Applied event-driven workflows with AWS EventBridge"
      ],
    },
    {
      company: "InvoZone",
      position: "Senior Software Engineer",
      duration: "Oct 2021 - Jan 2023",
      location: "Lahore, Pakistan",
      description:
        "Delivered enterprise Privileged Access Management (PAM) platform with credential management, session recording, and key & certificate management. Designed scalable microservices architecture with load balancing and multi-instance clustering.",
      highlights: [
        "Enterprise PAM platform for security teams",
        "Session forensics and audit capabilities",
        "Keystroke and video recording features",
        "Improved deployment speed by 30%",
        "Migrated legacy modules to service-oriented components",
        "RevBits PAM won Gold in 2022 Globee Awards"
      ],
    },
    {
      company: "TenX",
      position: "Software Engineer",
      duration: "Aug 2018 - Oct 2021",
      location: "Lahore, Pakistan",
      description:
        "Developed full-stack applications for Ancera (microbial risk assessment) and Arccos Golf (sports analytics). Engineered distributed, resource-intensive systems for scientific data processing and sports performance analytics.",
      highlights: [
        "Built automated detection pipelines reducing processing time by 50%",
        "Optimized distributed systems for large batch analytics",
        "Implemented automated CI/CD pipelines with 2x release frequency",
        "Improved Arccos features that boosted shot strategy outcomes by 40%",
        "Arccos Golf ranked #3 in sports innovation",
        "Enhanced developer productivity across teams"
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="Professional Experience" subtitle="My journey in tech" />

      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={cn(
              "relative opacity-0 transform translate-x-4 transition-all duration-700",
              mounted && "opacity-100 translate-x-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{exp.position}</h3>
                  <p className="text-blue-400 font-semibold mt-1">{exp.company}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    {exp.location}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-500/10 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/20"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
