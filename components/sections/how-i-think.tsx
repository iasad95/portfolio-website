"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function HowIThink() {
  return (
    <section className="py-24 px-4 bg-gray-100 dark:bg-gray-950/40 border-t border-b border-gray-200 dark:border-gray-800 scroll-mt-16" id="about">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="About" />

        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-lg p-8 space-y-4 leading-relaxed text-gray-600 dark:text-gray-300">
          <p className="text-lg">
            I build software that needs to work under pressure. Most of my work has been in SaaS, backend systems, and product engineering, where the goal is not just to ship features but to keep things fast, reliable, and easy for teams to work with.
          </p>
          <p className="text-lg">
            I am comfortable working remotely, collaborating across time zones, and taking ownership from planning to delivery. I have worked as a core team member at product companies and delivered complete systems as a freelancer on Upwork.
          </p>
          <p className="text-lg">
            I also use AI tools like Claude and Cursor to move faster while keeping architecture, testing, and production quality strong.
          </p>
        </div>
      </div>
    </section>
  )
}
