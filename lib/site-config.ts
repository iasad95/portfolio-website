// Single source of truth for site-wide facts used by metadata, JSON-LD,
// the sitemap, robots.txt, and llms.txt. Keeping these in one place avoids
// the domain/name/link drift that metadata tends to accumulate over time.

export const siteConfig = {
  name: "Asad",
  title: "Asad | Principal Software Engineer: Full-Stack, Cloud & AI Systems",
  description:
    "Principal Software Engineer with 8+ years building cloud-native SaaS, AI-enabled products, and Claude/OpenAI/MCP workflows using Node.js, Python, React, Next.js, Angular, and AWS.",
  url: "https://asadcodes.com",
  ogImage: "/images/og-image.jpg",
  favicon: "/favicon.png",
  profileImage: "/images/profile.png",
  email: "asad@asadcodes.com",
  locale: "en_US",
  // Bumped manually when page.tsx / components/sections content changes.
  lastContentUpdate: "2026-04-27",
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
  sameAs: [
    "https://www.linkedin.com/in/i-asad/",
    "https://github.com/iasad95",
    "https://www.upwork.com/freelancers/asad007",
  ],
} as const

// Public, indexable routes on the site. The homepage is a single-page
// profile today; when a new public page ships (e.g. /case-studies,
// /ai-saas-development), add it here and both the sitemap and llms.txt
// references can be extended from this list rather than hand-maintained
// in multiple places.
export const routes = [
  {
    path: "/",
    lastModified: siteConfig.lastContentUpdate,
    changeFrequency: "monthly" as const,
    priority: 1,
  },
]
