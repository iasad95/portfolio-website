import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asad | Senior Full-Stack Developer, Node.js, AWS, React, AI Systems",
  description:
    "Senior Full-Stack Developer with 8+ years of experience building scalable SaaS platforms with Node.js, NestJS, React, Angular, AWS, microservices, and AI-enabled workflows.",
  openGraph: {
    title: "Asad | Senior Full-Stack Developer, Node.js, AWS, React, AI Systems",
    description:
      "Senior Full-Stack Developer with 8+ years of experience building scalable SaaS platforms with Node.js, NestJS, React, Angular, AWS, microservices, and AI-enabled workflows.",
    type: "website",
    locale: "en_US",
    url: "https://www.asadcodes.com",
    siteName: "Asad | Senior Full-Stack Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad | Senior Full-Stack Developer, Node.js, AWS, React, AI Systems",
    description:
      "Senior Full-Stack Developer with 8+ years of experience building scalable SaaS platforms with Node.js, NestJS, React, Angular, AWS, microservices, and AI-enabled workflows.",
  },
  keywords: [
    "Senior Full Stack Developer",
    "Node.js Developer",
    "NestJS Developer",
    "AWS Developer",
    "React Developer",
    "Angular Developer",
    "AI Engineer",
    "LLM Developer",
    "Microservices Architect",
    "Remote Developer",
    "Freelance Developer",
  ],
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
