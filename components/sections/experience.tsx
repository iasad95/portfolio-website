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
        "Built CloudDrive: 500K daily file operations with secure access",
        "Led zero-downtime MongoDB migration: 50M+ records",
        "Reduced API latency by 45% using BullMQ and RabbitMQ",
        "Built HRM backend with PostgreSQL, TypeORM, CQRS",
        "Built AI middleware for document workflows and chat systems",
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
        "Built enterprise PAM platform: credential and session management",
        "Designed scalable microservices with load balancing and clustering",
        "Added session forensics: keystroke and video recording for auditing",
        "Improved deployment speed by 30% with CI/CD automation",
        "Hardened security: XSS, SQL injection, brute-force protection",
        "Won Globee Gold Award for security innovation (2022)",
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
        "Built automated contamination detection system. Reduced processing by 90%",
        "Built real-time golf performance tracking with Microsoft. Improved accuracy by 40%",
        "Designed distributed systems for high-throughput scientific computing",
        "Doubled release frequency with CI/CD automation and testing",
        "Optimized internal NPM packages to improve developer productivity",
        "Won #3 ranking in global sports innovation awards (Arccos)",
      ],
    },
  ]

  return (
    <section id="experience" className="py-24 px-4 scroll-mt-16">
      <SectionHeading title="Experience" subtitle="8+ years of proven results" />

      <div className="max-w-4xl mx-auto space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded whitespace-nowrap">
                {exp.duration}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {exp.location}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{exp.description}</p>

            <ul className="space-y-2">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
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
