"use client"

import { useState, useEffect } from "react"
import { Code2, Zap, Brain, Database } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Skills() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skillCategories = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Frontend",
      skills: ["React", "Angular", "Vue.js", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend",
      skills: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "Microservices", "SQL", "NoSQL"],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "GitHub", "Jira", "CI/CD", "Bitbucket", "NPM", "Webpack"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Specializations",
      skills: ["Microservices Architecture", "Scalable Systems", "Security", "Performance Optimization", "Agile/SDLC"],
    },
  ]

  return (
    <section id="skills" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="Skills & Expertise" subtitle="Technologies I work with" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-500 opacity-0 transform translate-y-8",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 100}ms` : "0ms",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-100">{category.title}</h3>
              </div>

              <div className="flex-grow">
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-sm text-gray-300 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
