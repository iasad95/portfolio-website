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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <div key={index} className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-4 md:p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="p-1.5 md:p-2 bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white leading-tight">{category.title}</h3>
              </div>

              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
