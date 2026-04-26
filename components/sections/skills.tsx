"use client"

import { Code2, Zap, Brain, Database } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"

export default function Skills() {
  const skillCategories = [
    {
      icon: Code2,
      title: "Backend",
      skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "GraphQL"],
    },
    {
      icon: Code2,
      title: "Frontend",
      skills: ["React", "Angular", "Redux", "NgRx", "RxJS", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
    {
      icon: Zap,
      title: "Cloud & DevOps",
      skills: ["AWS", "Lambda", "S3", "EC2", "Docker", "Kubernetes", "CI/CD"],
    },
    {
      icon: Brain,
      title: "Architecture",
      skills: ["Microservices", "Distributed Systems", "Event-Driven", "CQRS", "System Design"],
    },
    {
      icon: Brain,
      title: "AI / LLM",
      skills: ["Claude", "Cursor", "AI-assisted dev", "AI middleware", "Chat systems"],
    },
    {
      icon: Code2,
      title: "Testing",
      skills: ["Jest", "Cypress", "Unit Testing", "Integration Testing", "TDD"],
    },
    {
      icon: Zap,
      title: "Tools",
      skills: ["Git", "Jira", "Swagger", "OpenAPI", "PM2"],
    },
  ]

  return (
    <section id="skills" className="py-24 px-4 scroll-mt-16">
      <SectionHeading title="Skills & Expertise" subtitle="Technologies I work with" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <div key={index} className="bg-gray-900/40 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>

              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
