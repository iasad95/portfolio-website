"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function WhatIDo() {
  const services = [
    "Build new SaaS features and products",
    "Join remote product teams as a full-stack engineer",
    "Fix slow or messy backend systems",
    "Migrate legacy code safely with zero downtime",
    "Build APIs and microservices architectures",
    "Improve performance and system reliability",
    "Add AI features and document workflows",
  ]

  return (
    <section id="what-i-build" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="What I Can Help With" subtitle="Available for remote roles and freelance work" />

        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="flex items-start gap-4 text-lg text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
