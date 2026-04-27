"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function HowIThink() {
  return (
    <section className="py-24 px-4 bg-gray-950/40 border-t border-b border-gray-800 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="How I Think" subtitle="My approach to building systems" />
        
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-8 leading-relaxed text-gray-300">
          <p className="text-lg">
            I focus on building systems that remain stable under scale. I prioritize simplicity in architecture, clear separation of concerns, and predictable performance. I make decisions based on tradeoffs, not trends, and aim to reduce long-term complexity rather than just ship features quickly.
          </p>
        </div>
      </div>
    </section>
  )
}
