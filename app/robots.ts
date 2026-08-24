import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

// Everything on this site is public marketing/profile content — nothing
// behind auth, no sensitive routes — so the policy is permissive by
// default. Only /api/ (server routes, not content) is disallowed.
// Named groups for search-oriented crawlers (traditional + AI) are listed
// explicitly so access is a deliberate, auditable decision rather than an
// accident of the wildcard rule.
const searchCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-User",
  "Applebot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      ...searchCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
