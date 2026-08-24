import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import TrustBar from "@/components/sections/trust-bar"
import WhatIDo from "@/components/sections/what-i-do"
import FeaturedCaseStudy from "@/components/sections/featured-case-study"
import Projects from "@/components/sections/projects"
import ProofOfScale from "@/components/sections/proof-of-scale"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import HowIWork from "@/components/sections/how-i-work"
import HowIThink from "@/components/sections/how-i-think"
import Freelance from "@/components/sections/freelance"
import Contact from "@/components/sections/contact"
import { profilePageSchema } from "@/lib/schema"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [profilePageSchema()],
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustBar />
        <WhatIDo />
        <FeaturedCaseStudy />
        <Projects />
        <ProofOfScale />
        <Experience />
        <Skills />
        <HowIWork />
        <HowIThink />
        <Freelance />
        <Contact />
      </main>
      <footer className="py-8 px-4 border-t border-blue-500/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Asad. All rights reserved.</p>
      </footer>
    </div>
  )
}
