"use client"

import { useState, useEffect } from "react"
import { Award } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Certifications() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const certifications = [
    {
      title: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      date: "Current",
      description: "Demonstrates expertise in developing, deploying, and debugging cloud-based applications using AWS services.",
      skills: ["AWS Services", "Cloud Development", "Serverless Architecture", "API Gateway", "Lambda"],
    },
  ]

  return (
    <section id="certifications" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="Certifications & Awards" subtitle="Professional credentials and recognition" />

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={cn(
                "relative opacity-0 transform translate-y-4 transition-all duration-700",
                mounted && "opacity-100 translate-y-0",
              )}
              style={{
                transitionDelay: mounted ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/20 text-blue-400">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-100">{cert.title}</h3>
                    <p className="text-blue-400 font-semibold mt-1">{cert.issuer}</p>
                    <p className="text-sm text-gray-400 mt-2">{cert.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-block bg-blue-500/10 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-400">{cert.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Recognition</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span>RevBits PAM won <strong>Gold in 2022 Globee Awards</strong> - helped improve competitiveness against established security platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Arccos Golf ranked #3 in sports innovation</strong> - contributed to features that improved shot strategy outcomes by 40%</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Top 1% developer globally</strong> - recognized by Andela and Turing for technical excellence</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
