import type { MetadataRoute } from "next"
import { routes, siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
