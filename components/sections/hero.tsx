import Image from "next/image"
import { Github, Linkedin, Mail, FileText, MessageCircle } from "lucide-react"
import { UpworkIcon } from "@/components/icons/upwork"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative pt-20 px-4" id="hero">
      <div className="text-center space-y-8 max-w-4xl w-full">

        {/* Profile Image */}
        <div className="flex justify-center animate-fade-up anim-delay-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/images/profile.png"
              alt="Asad"
              width={128}
              height={128}
              className="rounded-full border-2 border-blue-500/50 shadow-lg object-cover object-top w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-3 animate-fade-up anim-delay-120">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            Senior Full-Stack Engineer
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
            for Remote Teams and Product Builds
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2 animate-fade-up anim-delay-240">
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I build and scale SaaS products, backend systems, and AI-enabled workflows with Node.js, NestJS, React, Angular, and AWS. I work well with remote teams, ship fast, and focus on clean, reliable delivery.
          </p>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Open to remote roles and freelance work. Comfortable with US and EU time zones.
          </p>
        </div>

        {/* Availability Badge */}
        <div className="flex justify-center animate-fade-up anim-delay-360">
          <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-700 dark:text-green-300 text-sm font-medium">
            Currently available for new opportunities
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up anim-delay-480">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg"
          >
            Hire Me
          </a>
          <a
            href="/resume.pdf"
            download="Asad-Resume.pdf"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-300 border border-blue-500/40 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-5 pt-2 animate-fade-up anim-delay-600">
          <a
            href="https://www.linkedin.com/in/i-asad/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 flex-shrink-0" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/iasad95"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 flex-shrink-0" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.upwork.com/freelancers/asad007"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
            aria-label="Upwork"
          >
            <UpworkIcon className="h-5 w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Upwork</span>
          </a>
          <a
            href="mailto:asad@asadcodes.com"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
            aria-label="Email"
          >
            <Mail className="h-5 w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a
            href="https://wa.me/923164363605"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200 text-sm"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5 flex-shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  )
}
