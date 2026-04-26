import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import TrustBar from "@/components/sections/trust-bar"
import WhatIDo from "@/components/sections/what-i-do"
import FeaturedCaseStudy from "@/components/sections/featured-case-study"
import Projects from "@/components/sections/projects"
import ProofOfScale from "@/components/sections/proof-of-scale"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import HowIThink from "@/components/sections/how-i-think"
import Freelance from "@/components/sections/freelance"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <TrustBar />
        <WhatIDo />
        <FeaturedCaseStudy />
        <Projects />
        <ProofOfScale />
        <Experience />
        <Skills />
        <HowIThink />
        <Freelance />
        <Contact />
      </div>
    </main>
  )
}
