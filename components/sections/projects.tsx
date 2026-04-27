"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function Projects() {
  const projects = [
    {
      title: "Biztree Business-in-a-Box",
      problem: "Multiple SaaS applications needed unified backend with reduced latency",
      solution: "Architected microservices backend with BullMQ and RabbitMQ for async processing",
      tech: ["NestJS", "React", "MongoDB", "AWS", "Microservices"],
      year: "2023-Present",
      highlights: ["12M+ Users", "45% Latency Reduction", "40% Dev Effort Cut"],
    },
    {
      title: "RevBits PAM",
      problem: "Enterprise teams needed unified privilege access management with real-time auditing",
      solution: "Engineered microservices platform with session forensics and comprehensive audit logs",
      tech: ["React", "NestJS", "Microservices", "Security"],
      year: "2021-2023",
      highlights: ["Globee Gold Award", "Real-time Auditing", "Enterprise Scale"],
    },
    {
      title: "Arccos Golf",
      problem: "Golfers needed real-time performance tracking with environmental adjustments",
      solution: "Built real-time tracking system with Microsoft, integrating wind and slope data",
      tech: ["React", "Node.js", "Real-time Analytics", "GPS"],
      year: "2019-2021",
      highlights: ["40% Accuracy Improvement", "#3 Global Innovation", "Real-time Tracking"],
    },
    {
      title: "Ancera",
      problem: "Food safety required fast, automated contamination detection",
      solution: "Built ML-powered detection pipelines with distributed processing",
      tech: ["React", "Node.js", "Machine Learning", "Data Analytics"],
      year: "2019-2021",
      highlights: ["90% Processing Speed", "ML-Powered", "Revenue Generation"],
    },
  ]

  return (
    <section id="projects" className="py-24 px-4 scroll-mt-16">
      <SectionHeading title="Projects" subtitle="Systems built, shipped, and running at scale" />

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 group flex flex-col">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{project.title}</h3>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/20 px-2.5 py-1 rounded-full flex-shrink-0">
                {project.year}
              </span>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Problem</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.problem}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Solution</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.solution}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-2">Key Results</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
