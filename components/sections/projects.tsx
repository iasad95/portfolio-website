"use client"

import { TrendingUp, Users, Zap } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"

export default function Projects() {
  const projects = [
    {
      title: "Biztree Business-in-a-Box",
      problem: "Multiple SaaS applications needed unified backend with reduced latency",
      solution: "Architected microservices backend with BullMQ and RabbitMQ for async processing",
      description:
        "Unified microservices backend serving 12M+ users across Biztree's SaaS ecosystem. Reduced API latency by 45% using BullMQ + RabbitMQ, cut backend development effort by 40%, and enabled zero-downtime migration of 50M+ MongoDB records.",
      tech: ["NestJS", "React", "MongoDB", "AWS", "Microservices"],
      year: "2023-Present",
      highlights: ["12M+ Users", "45% Latency Reduction", "40% Dev Effort Cut"],
    },
    {
      title: "RevBits PAM",
      problem: "Enterprise teams needed unified privilege access management with real-time auditing",
      solution: "Engineered microservices platform with session forensics and comprehensive audit logs",
      description:
        "Enterprise security solution with privileged session management, CI/CD integration, and comprehensive security features. Received Globee Gold Award against Thycotic.",
      tech: ["React", "NestJS", "Microservices", "Security"],
      year: "2021-2023",
      highlights: ["Globee Gold Award", "Real-time Auditing", "Enterprise Scale"],
    },
    {
      title: "Arccos Golf",
      problem: "Golfers needed real-time performance tracking with environmental adjustments",
      solution: "Built real-time tracking system with Microsoft, integrating wind and slope data",
      description:
        "First fully automated golf performance tracking system with Microsoft. Real-time wind, slope, and environmental adjustment. 40% improvement in shot accuracy.",
      tech: ["React", "Node.js", "Real-time Analytics", "GPS"],
      year: "2019-2021",
      highlights: ["40% Accuracy Improvement", "#3 Global Innovation", "Real-time Tracking"],
    },
    {
      title: "Ancera",
      problem: "Food safety required fast, automated contamination detection",
      solution: "Built ML-powered detection pipelines with distributed processing",
      description:
        "Food contamination detection system for early biological threat identification. Optimized detection process by 90%, generating millions in revenue for Merck & Co.",
      tech: ["React", "Node.js", "Machine Learning", "Data Analytics"],
      year: "2019-2021",
      highlights: ["90% Processing Speed", "ML-Powered", "Revenue Generation"],
    },
  ]

  return (
    <section id="projects" className="py-24 px-4 scroll-mt-16">
      <SectionHeading title="Impact Delivered" subtitle="High-leverage systems at scale" />

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-900/40 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 group flex flex-col">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{project.title}</h3>
              <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2.5 py-1 rounded-full flex-shrink-0">
                {project.year}
              </span>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Problem</p>
                <p className="text-sm text-gray-400 mt-1">{project.problem}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Solution</p>
                <p className="text-sm text-gray-400 mt-1">{project.solution}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Key Results</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
