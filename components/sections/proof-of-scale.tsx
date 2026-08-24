"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function ProofOfScale() {
  const stats = [
    { value: "12M+", label: "Users Served" },
    { value: "500K", label: "Daily Operations" },
    { value: "50M+", label: "Records Migrated" },
    { value: "45%", label: "Latency Reduction" },
  ]

  return (
    <section id="proof-of-scale" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Proof of Scale" subtitle="Delivering results at enterprise level" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
