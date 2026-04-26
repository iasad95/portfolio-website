"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function HowIWork() {
  const approaches = [
    {
      title: "Team or Solo",
      description: "I work with product teams or take ownership of features. Either way, I deliver clean code and reliable results.",
    },
    {
      title: "Clear Communication",
      description: "Async-friendly. Regular updates, honest about trade-offs and timelines. No surprises.",
    },
    {
      title: "Remote-First",
      description: "Comfortable with US and EU time zones. I adjust my schedule as needed and keep things transparent.",
    },
    {
      title: "Get It Done",
      description: "Full-stack work. I don't hand things off halfway. I build, test, deploy, and support what I ship.",
    },
  ]

  return (
    <section className="py-24 px-4 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="How I Work" />

        <div className="grid md:grid-cols-2 gap-6">
          {approaches.map((item, index) => (
            <div key={index} className="bg-gray-900/40 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
