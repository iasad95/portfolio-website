"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function WhatIDo() {
  const services = [
    "Build scalable SaaS platforms",
    "Design microservices architectures",
    "Optimize backend performance and latency",
    "Migrate legacy systems without downtime",
    "Build AI-enabled workflows and tools",
  ]

  return (
    <section className="py-24 px-4 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="What I Do" subtitle="Services and expertise areas" />
        
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="flex items-start gap-4 text-lg text-gray-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
