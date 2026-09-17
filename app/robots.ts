import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

// Everything public on this site is marketing/profile content — nothing
// behind auth. Disallowed paths are all non-content server routes: /api
// (API routes in general), /admin (the analytics dashboard), and /r (the
// outreach-relay tracking/redirect routes — pixel, click, and open
// endpoints that should never be indexed).
// Named groups for search-oriented crawlers (traditional + AI) are listed
// explicitly so access is a deliberate, auditable decision rather than an
// accident of the wildcard rule.
const disallow = ["/admin", "/api/", "/r"]

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
        disallow,
      },
      ...searchCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
