"use client"

import { useState, useEffect } from "react"
import { Award, GraduationCap } from "lucide-react"
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
      icon: Award,
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "National University of Computer and Emerging Sciences (FAST-NUCES)",
      duration: "2014 - 2018",
      location: "Islamabad, Pakistan",
    },
  ]

  return (
    <section id="certifications" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="Certifications & Awards" subtitle="Professional credentials and recognition" />

      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-100 mb-6">Certifications</h3>
        <div className="space-y-6 mb-12">
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
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-400">{cert.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-100 mb-6">Education</h3>
        <div className="space-y-6 mb-12">
          {education.map((edu, index) => (
            <div
              key={index}
              className={cn(
                "relative opacity-0 transform translate-y-4 transition-all duration-700",
                mounted && "opacity-100 translate-y-0",
              )}
              style={{
                transitionDelay: mounted ? `${(index + certifications.length) * 150}ms` : "0ms",
              }}
            >
              <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/20 text-blue-400">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-100">{edu.degree}</h3>
                    <p className="text-blue-400 font-semibold mt-1">{edu.institution}</p>
                    <p className="text-sm text-gray-400 mt-2">{edu.location}</p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-400">{edu.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Key Achievements & Recognition</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>45% API Latency Reduction</strong> - Implemented BullMQ + RabbitMQ distributed queue system at Biztree</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>40% Backend Development Effort Reduction</strong> - Architected unified NestJS microservices backend</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Zero-Downtime Migration</strong> - Successfully migrated 50M+ MongoDB records from V1 to V2</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>RevBits PAM Gold Award</strong> - 2022 Globee Awards for security platform excellence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Arccos Golf #3 in Sports Innovation</strong> - Contributed to features improving shot strategy by 40%</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
