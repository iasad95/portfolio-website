import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Navbar />
      <div className="container mx-auto px-4 relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
