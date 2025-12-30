"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapPin, Mail, Linkedin, Github } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail: "asad@asadcodes.com",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError("Failed to send message. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setLoading(false)
    }
  }

  const contactLinks = [
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/i-asad/",
      text: "Connect with me",
    },
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      href: "https://github.com",
      text: "View my code",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      href: "mailto:asad@asadcodes.com",
      text: "Send me an email",
    },
  ]

  return (
    <section id="contact" className="py-20 relative scroll-mt-16 px-4">
      <SectionHeading title="Let's Connect" subtitle="I'd love to hear from you" />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div
          className={cn(
            "space-y-8 opacity-0 transform -translate-x-8 transition-all duration-1000",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Get in Touch</h3>
            <p className="text-gray-400 leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to chat, feel free to reach out. I'm
              always interested in hearing about new opportunities and challenges.
            </p>
          </div>

          <div className="space-y-4">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm border border-blue-500/20 rounded-lg hover:border-blue-500/40 hover:bg-gray-900/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-all">
                  {link.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">{link.label}</h4>
                  <p className="text-sm text-gray-400">{link.text}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-blue-500/20">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span>Based in Pakistan</span>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "opacity-0 transform translate-x-8 transition-all duration-1000 delay-300",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-100">Send Me a Message</h3>

            {submitted && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm font-medium">Thanks! I'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="bg-gray-800/50 border-blue-500/20 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="bg-gray-800/50 border-blue-500/20 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-gray-300 mb-2 block">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or inquiry..."
                required
                className="bg-gray-800/50 border-blue-500/20 focus:border-blue-500/50 focus:ring-blue-500/20 min-h-[120px] resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-blue-500/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Asad. All rights reserved.</p>
      </div>
    </section>
  )
}
