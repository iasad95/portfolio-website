import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker"
import "./globals.css"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const SITE_URL = "https://www.asadcodes.com"
const SITE_TITLE = "Asad | Principal Software Engineer — Full-Stack, Cloud & AI Systems"
const SITE_DESCRIPTION =
  "Principal Software Engineer with 8+ years building cloud-native SaaS, AI-enabled products, and Claude/OpenAI/MCP workflows using Node.js, Python, React, Next.js, Angular, and AWS."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  authors: [{ name: "Muhammad Asadullah", url: SITE_URL }],
  creator: "Muhammad Asadullah",
  publisher: "Muhammad Asadullah",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Asad | Principal Software Engineer",
    images: [{ url: "/images/profile.png", width: 400, height: 400, alt: "Muhammad Asadullah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/profile.png"],
  },
  keywords: [
    "Principal Software Engineer",
    "Full-Stack Engineer",
    "Node.js Developer",
    "NestJS Developer",
    "Python Developer",
    "FastAPI Developer",
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "AWS Developer",
    "AI Engineer",
    "LLM Developer",
    "MCP Server Developer",
    ".NET Developer",
    "Django Developer",
    "Microservices Architect",
    "Remote Developer",
    "Freelance Developer",
  ],
  icons: {
    icon: "/favicon.png",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Asadullah",
  alternateName: "Asad",
  jobTitle: "Principal Software Engineer",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.png`,
  email: "mailto:asad@asadcodes.com",
  sameAs: [
    "https://www.linkedin.com/in/i-asad/",
    "https://github.com/iasad95",
    "https://www.upwork.com/freelancers/asad007",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Biztree",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University of Computer and Emerging Sciences (FAST-NUCES)",
  },
  knowsAbout: [
    "Node.js",
    "NestJS",
    "Python",
    "FastAPI",
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "AWS",
    "Microservices",
    "AI/LLM Engineering",
    "Claude API",
    "OpenAI API",
    "MCP Server Development",
    "RAG",
    "MongoDB",
    "PostgreSQL",
  ],
  knowsLanguage: ["English", "Urdu"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "AWS Certified Developer - Associate",
    credentialCategory: "certification",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
          <AnalyticsTracker />
        </ThemeProvider>
      </body>
    </html>
  )
}
