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
      position: "Software Engineer",
      duration: "Jan 2023 - Present (2+ years)",
      location: "Pakistan",
      description:
        "Building scalable web applications and leading technical initiatives. Collaborating with cross-functional teams to deliver high-quality solutions.",
      highlights: ["Full-stack development", "System architecture", "Technical leadership"],
    },
    {
      company: "InvoZone",
      position: "Software Engineer",
      duration: "Oct 2021 - Jan 2023",
      location: "Lahore, Pakistan",
      description:
        "Delivered Privileged Access Management solutions with RevBits, implementing microservices architecture and cyber security features.",
      highlights: ["Microservices architecture", "Security implementation", "Legacy code migration"],
    },
    {
      company: "TenX",
      position: "Software Engineer",
      duration: "Aug 2019 - Oct 2021",
      location: "Lahore, Pakistan",
      description:
        "Built large-scale distributed systems for Ancera and Arccos. Developed golf performance tracking system with Microsoft and optimized microbial detection by 90%.",
      highlights: ["Distributed systems", "Performance optimization", "Microsoft partnership"],
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
