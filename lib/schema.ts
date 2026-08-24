import { siteConfig } from "@/lib/site-config"

// JSON-LD builders. Every builder returns a plain object (not a string) so
// callers can compose them into a single <script type="application/ld+json">
// per page via JSON.stringify — one graph per page, no duplicate blocks.
//
// Stable @id anchors let schemas reference each other (e.g. ProfilePage's
// mainEntity pointing at Person) without repeating the full object.

const personId = `${siteConfig.url}/#person`
const websiteId = `${siteConfig.url}/#website`

/** Areas of expertise, reused verbatim from the Skills section on the homepage. */
const knowsAbout = [
  "Node.js",
  "NestJS",
  "Express.js",
  "React",
  "Angular",
  "TypeScript",
  "REST APIs",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "AWS",
  "AWS Lambda",
  "Docker",
  "Kubernetes",
  "Microservices Architecture",
  "Distributed Systems",
  "Event-Driven Architecture",
  "System Design",
  "AI-Assisted Development",
]

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    image: new URL(siteConfig.profileImage, siteConfig.url).toString(),
    jobTitle: "Senior Full-Stack Engineer",
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
    knowsAbout,
  }
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": personId },
  }
}

export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    dateModified: siteConfig.lastContentUpdate,
  }
}

interface ArticleSchemaInput {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  image?: string
}

/**
 * Not wired into any route yet — no blog/article content exists on the site.
 * Kept ready so a future /blog/[slug] page can import this instead of
 * hand-writing Article JSON-LD.
 */
export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image = siteConfig.ogImage,
}: ArticleSchemaInput) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    image: new URL(image, siteConfig.url).toString(),
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
    publisher: { "@id": personId },
  }
}

interface CaseStudySchemaInput {
  title: string
  description: string
  path: string
  image?: string
  dateCreated?: string
  keywords?: string[]
}

/**
 * Not wired into any route yet — no dedicated case-study pages exist.
 * Uses CreativeWork rather than Article: these are engineering write-ups
 * of shipped work, not editorial articles, and schema.org has no
 * "case study" type. CreativeWork is the accurate generic fit without
 * forcing a type that implies something the content isn't.
 */
export function caseStudySchema({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  dateCreated,
  keywords,
}: CaseStudySchemaInput) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    name: title,
    description,
    url,
    image: new URL(image, siteConfig.url).toString(),
    ...(dateCreated ? { dateCreated } : {}),
    ...(keywords ? { keywords } : {}),
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
  }
}
