"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Code, Briefcase, GraduationCap, Award } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const highlights = [
    {
      icon: <Briefcase className="h-5 w-5 text-blue-400" />,
      title: "8+ Years Experience",
      description: "Senior Software Engineer at Biztree and previously at InvoZone, TenX",
    },
    {
      icon: <Code className="h-5 w-5 text-blue-400" />,
      title: "Senior Software Engineer",
      description: "JavaScript, TypeScript, React, Angular, Node.js, AWS, Microservices",
    },
    {
      icon: <Award className="h-5 w-5 text-blue-400" />,
      title: "Top 1% Developer",
      description: "Recognized by Andela and Turing for technical excellence",
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-blue-400" />,
      title: "Computer Science",
      description: "BS from National University of Computer and Emerging Sciences",
    },
  ]

  return (
    <section id="about" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="About Me" subtitle="Get to know my background and expertise" />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div
          className={cn(
            "relative opacity-0 transform -translate-x-8 transition-all duration-1000",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-300/20 rounded-3xl -rotate-3 transform scale-95"></div>
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-blue-500/30"></div>
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/profile.png"
                alt="Asad"
                width={400}
                height={400}
                className="object-cover h-full w-full"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "space-y-6 opacity-0 transform translate-x-8 transition-all duration-1000 delay-300",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 space-y-4">
            <p className="text-gray-300 leading-relaxed text-lg">
              Senior Full-Stack Developer with 8+ years of experience building and scaling SaaS platforms using MERN and MEAN stacks on AWS. I specialize in Node.js, NestJS, React, Angular, microservices, event-driven architectures, and serverless solutions with a proven track record of reducing API latency by 45%, cutting backend development effort by 40%, and executing zero-downtime migrations for systems serving 12M+ users.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              At Biztree, I architected a unified NestJS microservices backend powering 5+ SaaS applications and built the CloudDrive platform supporting 500K daily file operations. Previously at InvoZone, I delivered the enterprise Privileged Access Management platform used by RevBits security teams. At TenX, I engineered distributed systems for Ancera and Arccos Golf, improving processing efficiency and enabling the Arccos platform to win #3 in sports innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/30 backdrop-blur-sm p-5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:bg-gray-900/50"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-100 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
