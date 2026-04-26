"use client"

import { useState, useEffect } from "react"
import { Star, TrendingUp, CheckCircle, Award } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Freelance() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const credentials = [
    {
      icon: Star,
      title: "Top Rated Plus",
      description: "Upwork's highest freelancer badge",
      color: "text-yellow-400",
    },
    {
      icon: TrendingUp,
      title: "Complex Systems",
      description: "Trusted for backend work and product improvements",
      color: "text-green-400",
    },
    {
      icon: CheckCircle,
      title: "Proven Work",
      description: "SaaS, security, migrations, dashboards",
      color: "text-blue-400",
    },
    {
      icon: Award,
      title: "Reliable Delivery",
      description: "Clean communication. Engineering decisions that hold up.",
      color: "text-purple-400",
    },
  ]

  return (
    <section id="freelance" className="py-24 relative scroll-mt-16 px-4">
      <SectionHeading title="Freelance Credibility" subtitle="Trust and proven results across platforms" />

      <div className="max-w-4xl mx-auto">
        <div
          className={cn(
            "bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-12 opacity-0 transform translate-y-8 transition-all duration-1000",
            mounted && "opacity-100 translate-y-0",
          )}
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-8 text-center">
            Top Rated Plus on Upwork. Delivered work across SaaS, security, migrations, and custom systems. Remote collaboration. Reliable delivery.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {credentials.map((credential, index) => {
              const Icon = credential.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-4 p-4 bg-gray-900/30 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all duration-300 opacity-0 transform translate-y-8",
                    mounted && "opacity-100 translate-y-0",
                  )}
                  style={{
                    transitionDelay: mounted ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <div className={`${credential.color} flex-shrink-0 mt-1`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-1">{credential.title}</h4>
                    <p className="text-sm text-gray-400">{credential.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-blue-500/20 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.upwork.com/freelancers/asad007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Star className="h-4 w-4" />
              View Upwork Profile
            </a>
            <a
              href="https://wa.me/923164363605"
              className="inline-flex items-center justify-center gap-2 bg-gray-900/60 hover:bg-gray-900 text-blue-300 border border-blue-500/40 font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-blue-400/60 hover:text-blue-200"
            >
              Discuss Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
