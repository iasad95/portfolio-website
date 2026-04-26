import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import TrustBar from "@/components/sections/trust-bar"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import WhatIBuild from "@/components/sections/what-i-build"
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
        <Projects />
        <Experience />
        <Skills />
        <WhatIBuild />
        <Freelance />
        <Contact />
      </div>
    </main>
  )
}
