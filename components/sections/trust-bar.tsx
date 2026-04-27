"use client"

import { Code2, Award, Users, TrendingUp, Zap } from "lucide-react"

export default function TrustBar() {
  const stats = [
    { icon: Code2, label: "Experience", value: "8+ Years" },
    { icon: Users, label: "Users", value: "12M+" },
    { icon: TrendingUp, label: "Latency", value: "45% Better" },
    { icon: Zap, label: "Efficiency", value: "40% Faster" },
    { icon: Award, label: "AWS", value: "Certified" },
  ]

  return (
    <section className="py-12 border-b border-gray-200 dark:border-gray-800 px-4">
      <div className="flex justify-center flex-wrap gap-8 md:gap-12 max-w-5xl mx-auto">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
