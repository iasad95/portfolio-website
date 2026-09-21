"use client"

import { MapPin, GraduationCap, Award } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"

type ExperienceItem = {
  company: string
  position: string
  duration: string
  location: string
  type?: string
  description: string
  highlights: string[]
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "Biztree",
      position: "Principal Software Engineer",
      duration: "Jan 2023 - Present",
      location: "Remote, Canada",
      description:
        "Architected a unified NestJS microservices backend powering 5+ SaaS applications serving 12M+ users, cutting backend development effort by 40%. Reduced API latency by 45% with BullMQ and RabbitMQ, and led a zero-downtime MongoDB migration for 50M+ records using safe batch processing and rollback strategies. Built CloudDrive, a file platform supporting 500K+ daily operations with RBAC, S3 presigned URLs, and AWS Lambda thumbnail generation. Designed a centralized AI middleware and MCP server layer for document intelligence and conversational workflows, integrating Claude and OpenAI with structured outputs, secure tool access, token tracking, and subscription enforcement.",
      highlights: [
        "Architected unified microservices backend for 12M+ users, cutting backend effort by 40%",
        "Designed AI middleware & MCP server layer: Claude/OpenAI workflows with secure tool access and token tracking",
        "Built CloudDrive: 500K+ daily file operations with RBAC and secure access",
        "Led zero-downtime MongoDB migration: 50M+ records with rollback-safe batch processing",
        "Reduced API latency by 45% using BullMQ and RabbitMQ",
        "Built HRM backend with PostgreSQL, TypeORM, CQRS",
        "Strengthened engineering foundations: Docker, CI/CD, structured logging, and automated testing",
      ],
    },
    {
      company: "ConvertSite (ConvertCalculator)",
      position: "Senior Software Engineer",
      duration: "Jun 2024 - Aug 2025",
      location: "Remote, Netherlands",
      type: "Part-time Contract",
      description:
        "Full-stack engineer for ConvertCalculator, a configurable no-code SaaS for building calculators, quote forms, pricing engines, and lead-capture flows. Led the platform's shift into AI-native territory, evolving the drag-and-drop builder into a prompt-driven experience that generates calculators, quote forms, landing pages, and other business assets directly from user intent. Built the rules-driven workflow engine and shipped embeddable integrations for WordPress, Shopify, Wix, and Framer, backed by PostgreSQL.",
      highlights: [
        "Evolved a drag-and-drop builder into a prompt-driven AI app generator",
        "Generated calculators, quote forms, and landing pages directly from user intent",
        "Built a rules-driven workflow engine for pricing logic and lead capture",
        "Shipped embeddable integrations for WordPress, Shopify, Wix, and Framer",
        "Delivered full-stack features on a PostgreSQL-backed platform",
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
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded whitespace-nowrap">
                  {exp.duration}
                </span>
                {exp.type && (
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded whitespace-nowrap">
                    {exp.type}
                  </span>
                )}
              </div>
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

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-2">
              <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Education
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Bachelor of Science in Computer Science (BSCS)</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">FAST-NUCES, Lahore, Pakistan · 2014 - 2018</p>
          </div>
          <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-2">
              <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Certification
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">AWS Certified Developer – Associate</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Amazon Web Services</p>
          </div>
        </div>
      </div>
    </section>
  )
}
