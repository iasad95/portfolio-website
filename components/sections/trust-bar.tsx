"use client"

import { motion } from "framer-motion"
import { Award, Users, TrendingUp, Code2, Zap } from "lucide-react"

export default function TrustBar() {
  const stats = [
    {
      icon: Code2,
      label: "Years Experience",
      value: "8+",
      color: "from-blue-500 to-blue-400",
    },
    {
      icon: Award,
      label: "AWS Certified",
      value: "Developer",
      color: "from-orange-500 to-orange-400",
    },
    {
      icon: Users,
      label: "Users Served",
      value: "12M+",
      color: "from-green-500 to-green-400",
    },
    {
      icon: TrendingUp,
      label: "Latency Reduction",
      value: "45%",
      color: "from-purple-500 to-purple-400",
    },
    {
      icon: Zap,
      label: "Dev Effort Cut",
      value: "40%",
      color: "from-pink-500 to-pink-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-12 relative px-4 bg-gradient-to-b from-blue-500/5 to-transparent border-b border-blue-500/10">
      <motion.div
        className="flex justify-center flex-wrap gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants} className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
