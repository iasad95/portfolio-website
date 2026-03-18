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
        "Architected a unified NestJS microservices backend powering 5+ SaaS applications, serving 12M+ users, reducing backend development effort by 40%. Built the CloudDrive platform (NestJS, MongoDB) supporting 500K daily file operations with secure access (RBAC), S3 presigned URLs and thumbnail generation via AWS Lambda.",
      highlights: [
        "Led MongoDB V1 to V2 migration (50M+ records) with zero downtime",
        "Reduced API latency by 45% using BullMQ + RabbitMQ",
        "Implemented distributed queue system for async workloads",
        "Built HRM backend with CQRS architecture and TypeORM",
        "Developed AI middleware for 12M+ users and token tracking",
        "Applied event-driven workflows with AWS EventBridge"
      ],
    },
    {
      company: "InvoZone",
      position: "Senior Software Engineer",
      duration: "Oct 2021 - Jan 2023",
      location: "Lahore, Pakistan",
      description:
        "Delivered an enterprise Privileged Access Management (PAM) platform (credential management, session recording, key & certificate management) used by security teams for sensitive infrastructure access. Designed and implemented a scalable microservices architecture with load balancing and multi-instance clustering, enabling high availability and reliable performance in enterprise environments.",
      highlights: [
        "Implemented session forensics and audit capabilities",
        "Built keystroke and video recording features",
        "Modernized legacy modules with service-oriented components",
        "Improved deployment speed by 30%",
        "Strengthened API security against XSS, SQL injection, attacks",
        "RevBits PAM won Gold in 2022 Globee Awards"
      ],
    },
    {
      company: "TenX",
      position: "Software Engineer",
      duration: "Aug 2018 - Oct 2021",
      location: "Lahore, Pakistan",
      description:
        "Developed full-stack application for Ancera (microbial risk assessment), enabling automated detection pipelines that reduced processing time by 50% for enterprise use. Engineered and optimized distributed, resource-intensive systems for scientific data processing, improving throughput and fault tolerance for large batch analytics.",
      highlights: [
        "Built automated detection pipelines reducing processing time by 50%",
        "Implemented automated CI/CD pipelines with 2x release frequency",
        "Achieved 30% reduction in environment-related downtime",
        "Collaborated on Arccos Golf platform improving shot strategy by 40%",
        "Arccos Golf ranked #3 in sports innovation",
        "Optimized internal NPM packages and components for productivity"
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
