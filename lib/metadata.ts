import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

interface PageMetadataInput {
  title?: string
  description?: string
  /** Path relative to the site root, e.g. "/" or "/case-studies/clouddrive". */
  path?: string
  image?: string
  noIndex?: boolean
}

/**
 * Builds a consistent Metadata object (title, description, canonical,
 * Open Graph, Twitter card) for a page. Future routes (case studies,
 * service pages) should call this instead of hand-rolling metadata so
 * canonical URLs and social previews stay consistent site-wide.
 */
export function pageMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString()

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
