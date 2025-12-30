"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import AchievementCard from "@/components/ui/achievement-card"
import { cn } from "@/lib/utils"

export default function Achievements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const achievements = [
    {
      icon: "🏆",
      title: "Smart India Hackathon 2024 – Semifinalist",
      description: "Recognized for innovative problem-solving approach",
    },
    {
      icon: "🥇",
      title: "Machine Learning Specialization – Coursera",
      description: "Completed comprehensive ML curriculum with distinction",
    },
    {
      icon: "💻",
      title: "Top Contributor – GSSoC 2024",
      description: "Recognized for significant open-source contributions",
    },
    {
      icon: "☁️",
      title: "Cleared NPTEL Cloud Computing Exam",
      description: "Demonstrated proficiency in cloud technologies",
    },
  ]

  return (
    <section id="achievements" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Achievements" subtitle="Recognition and accomplishments" />

      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={cn(
              "opacity-0 transform translate-y-8 transition-all duration-700",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <AchievementCard icon={achievement.icon} title={achievement.title} description={achievement.description} />
          </div>
        ))}
      </div>
    </section>
  )
}
