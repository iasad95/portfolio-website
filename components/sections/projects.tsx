"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Projects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      title: "Auto-Sports Platform",
      description:
        "AI-powered sports club management system with intelligent scheduling, resource management, and real-time club tracking via GPS. Achieved 30% revenue increase and 80% resource availability.",
      tech: ["Angular", "NestJS", "MySQL", "Bootstrap", "GPS Tracking"],
      year: "2018-2019",
      impact: "30% revenue lift | 80% resource availability",
    },
    {
      title: "Privileged Access Management (RevBits)",
      description:
        "Enterprise security solution with privileged session management, CI/CD integration, and comprehensive security features. Received Globee Gold Award against Thycotic.",
      tech: ["React", "Node.js", "Microservices", "Security", "Logging"],
      year: "2021-2023",
      impact: "Gold-level Globee Award",
    },
    {
      title: "Arccos Golf - Performance Tracking",
      description:
        "First fully automated golf performance tracking system with Microsoft. Real-time wind, slope, and environmental adjustment. 40% improvement in shot accuracy.",
      tech: ["React", "Node.js", "GPS", "Real-time Analytics"],
      year: "2019-2021",
      impact: "40% odds improvement | Rank 3rd most innovative",
    },
    {
      title: "Ancera - Microbial Risk Assessment",
      description:
        "Food contamination detection system for early biological threat identification. Optimized detection process by 90%, generating millions in revenue for Merck & Co.",
      tech: ["React", "Node.js", "Machine Learning", "Data Analytics"],
      year: "2019-2021",
      impact: "90% time reduction | Millions in revenue",
    },
    {
      title: "Airline Management System",
      description:
        "Enterprise-grade web application with MVC architecture, RESTful APIs, and comprehensive security measures against XSS and SQL injection attacks.",
      tech: ["Angular", "Java", "MySQL", "REST API", "Security"],
      year: "2018",
      impact: "Enterprise-level system",
    },
    {
      title: "E-Commerce Platform (PSL)",
      description:
        "Full-featured e-commerce website with modern front-end technologies and enterprise backend using ASP.NET with advanced database operations.",
      tech: ["JavaScript", "ASP.NET", "MSSQL", "Bootstrap", "AJAX"],
      year: "2017",
      impact: "Full e-commerce functionality",
    },
  ]

  return (
    <section id="projects" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="Featured Projects" subtitle="Innovative solutions I've built" />

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "opacity-0 transform translate-y-8 transition-all duration-700",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 100}ms` : "0ms",
            }}
          >
            <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="text-lg font-bold text-gray-100 flex-1 leading-tight">{project.title}</h3>
                <span className="text-xs font-medium text-blue-400 whitespace-nowrap bg-blue-500/10 px-2 py-1 rounded">
                  {project.year}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs bg-blue-500/15 text-blue-300 px-2.5 py-1 rounded border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-blue-500/10">
                  <p className="text-xs font-semibold text-blue-300">{project.impact}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
