import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import WhatIBuild from "@/components/sections/what-i-build"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import Certifications from "@/components/sections/certifications"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <WhatIBuild />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </div>
    </main>
  )
}
