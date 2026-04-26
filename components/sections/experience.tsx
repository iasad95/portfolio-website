"use client"

import { MapPin } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"

export default function Experience() {
  const experiences = [
    {
      company: "Biztree",
      position: "Senior Software Engineer",
      duration: "Jan 2023 - Present",
      location: "Remote",
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

  return (
    <section id="experience" className="py-24 px-4 scroll-mt-16">
      <SectionHeading title="Experience" subtitle="8+ years of proven results" />

      <div className="max-w-4xl mx-auto space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-gray-900/40 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                <p className="text-blue-400 font-semibold">{exp.company}</p>
              </div>
              <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2.5 py-1 rounded whitespace-nowrap">
                {exp.duration}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-400" />
                {exp.location}
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">{exp.description}</p>

            <ul className="space-y-2">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
