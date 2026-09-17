"use client"

import SectionHeading from "@/components/ui/section-heading"

type CaseStudy = {
  title: string
  problem: string
  solution: string
  decisions: { label: string; detail: string }[]
  impact?: { value: string; label: string }[]
  outcomes?: string[]
  tech: string[]
}

const caseStudies: CaseStudy[] = [
  {
    title: "CloudDrive: 500K Daily Operations at Scale",
    problem:
      "Biztree needed a unified file storage system that could handle 500K daily operations, support multiple SaaS applications, and provide role-based access control with enterprise-grade security. Sub-100ms response times were a hard requirement.",
    solution:
      "I architected CloudDrive as a distributed microservice using NestJS with event-driven processing. It uses AWS S3 for storage, Lambda for thumbnail generation, and BullMQ for async job processing. The system handles peak loads without degradation.",
    decisions: [
      { label: "Async Processing", detail: "BullMQ queues for thumbnail generation and metadata processing" },
      { label: "Caching Layer", detail: "Redis for frequently accessed file metadata" },
      { label: "AWS Integration", detail: "S3 presigned URLs for secure direct uploads, Lambda for image optimization" },
      { label: "RBAC", detail: "Fine-grained permission system with role inheritance" },
    ],
    impact: [
      { value: "500K+", label: "Daily Operations" },
      { value: "45%", label: "Faster Uploads" },
      { value: "99.9%", label: "Uptime" },
    ],
    tech: ["NestJS", "TypeScript", "AWS S3", "Lambda", "BullMQ", "Redis", "MongoDB", "Docker", "Kubernetes"],
  },
  {
    title: "ConvertCalculator: From Drag-and-Drop Builder to AI-Native App Generator",
    problem:
      "ConvertCalculator is a no-code SaaS for building calculators, quote forms, and pricing engines. Building one still meant manually dragging, configuring, and wiring fields by hand — slow for non-technical users and a ceiling on how fast new templates could ship.",
    solution:
      "I led the shift from a pure drag-and-drop builder to a prompt-driven AI experience: users describe what they need in plain language, and the system generates a working calculator, quote form, landing page, or lead-capture flow — fully wired into the existing rules-driven workflow engine and ready to embed on WordPress, Shopify, Wix, or Framer.",
    decisions: [
      { label: "Prompt-to-App Generation", detail: "LLM-driven pipeline maps user intent to structured app definitions (fields, logic, pricing rules) instead of free-form output" },
      { label: "Rules Engine Integration", detail: "Generated assets plug directly into the existing rules-driven workflow engine, so AI output behaves like a hand-built configuration" },
      { label: "Platform Embeds", detail: "Generated tools ship as embeddable widgets across WordPress, Shopify, Wix, and Framer" },
      { label: "Data Layer", detail: "PostgreSQL-backed configuration and lead-capture pipeline behind every generated asset" },
    ],
    outcomes: [
      "Replaced manual drag-and-drop configuration with natural-language app generation",
      "Generated output plugs directly into the existing rules engine — structured, not freeform",
      "Shipped as embeddable widgets across WordPress, Shopify, Wix, and Framer",
    ],
    tech: ["TypeScript", "LLM Integration", "Claude / OpenAI", "PostgreSQL", "Rules Engine", "WordPress", "Shopify", "Wix", "Framer"],
  },
]

export default function FeaturedCaseStudy() {
  return (
    <section className="py-24 px-4 scroll-mt-16">
      <div className="max-w-4xl mx-auto space-y-20">
        <SectionHeading title="Featured Case Studies" subtitle="Two systems built to scale — one for data, one for AI" />

        {caseStudies.map((cs, index) => (
          <div key={index} className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">{cs.title}</h3>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Problem</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{cs.problem}</p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Solution</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{cs.solution}</p>
              <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-semibold">Key Architecture Decisions:</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {cs.decisions.map((d) => (
                    <li key={d.label}>
                      • <span className="font-semibold">{d.label}:</span> {d.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Impact & Results</h4>
              {cs.impact && (
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {cs.impact.map((stat) => (
                    <div key={stat.label} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {cs.outcomes && (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {cs.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {cs.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1.5 rounded-lg"
                  >
                    {tech}
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
