// Single source of truth for site-wide facts used by metadata, JSON-LD,
// the sitemap, robots.txt, and llms.txt. Keeping these in one place avoids
// the domain/name/link drift that metadata tends to accumulate over time.

export const siteConfig = {
  name: "Asad",
  title: "Asad | Senior Full-Stack Developer, Node.js, AWS, React, AI Systems",
  description:
    "Senior Full-Stack Developer with 8+ years of experience building scalable SaaS platforms with Node.js, NestJS, React, Angular, AWS, microservices, and AI-enabled workflows.",
  url: "https://asadcodes.com",
  ogImage: "/images/og-image.jpg",
  favicon: "/favicon.png",
  profileImage: "/images/profile.png",
  email: "asad@asadcodes.com",
  locale: "en_US",
  // Bumped manually when page.tsx / components/sections content changes.
  lastContentUpdate: "2026-04-27",
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
