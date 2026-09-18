// Flags opens/clicks that are very likely automated fetches rather than a person, using
// public, self-identifying signals only (e.g. Gmail's image proxy names itself in its own
// User-Agent). This is a data-quality heuristic for your own open-rate numbers — it is not
// an attempt to detect or unmask privacy-preserving proxies like Apple Mail Privacy
// Protection, which deliberately avoid self-identifying for that reason (see ip.ts for the
// IP-range check that catches those instead).
//
// Mirrors the outreach backend's fuller MACHINE_AGENTS list
// (job-rss-aggregator/backend/src/outreach/open-tracking-classification.ts) — mirrored by
// hand rather than imported, since these are separate deployments. Keep the two in sync.
const AUTOMATED_UA_PATTERNS = [
  /GoogleImageProxy/i,
  /YahooMailProxy/i,
  /Google-Read-Aloud/i,
  // Vendor names are distinctive enough to match anywhere in the string — scanners run them
  // together with product names, as in ProofpointURLScanner.
  /barracuda/i,
  /proofpoint/i,
  /mimecast/i,
  /forcepoint/i,
  /symantec/i,
  /fireeye/i,
  /Microsoft Office (?:Existence|Protocol) Discovery/i,
  /\bBingPreview\b/i,
  /SkypeUriPreview/i,
  /\bSlackbot\b/i,
  /facebookexternalhit/i,
  /\bTwitterbot\b/i,
  /\bDiscordbot\b/i,
  /LinkedInBot/i,
  /WhatsApp/i,
  /TelegramBot/i,
  /\bbot\b/i,
  /\bcrawler\b/i,
  /\bspider\b/i,
  /\bcurl\//i,
  /\bWget\//i,
  /python-requests/i,
  /Go-http-client/i,
  /\bokhttp\b/i,
  /\bJava\//i,
  /HeadlessChrome/i,
  /\bPhantomJS\b/i,
  /\bmonitoring\b/i,
  /\bpingdom\b/i,
  /\buptime\b/i,
  /node-fetch|axios/i,
]

export function isLikelyAutomated(ua: string | null | undefined): boolean {
  if (!ua || !ua.trim()) return true
  return AUTOMATED_UA_PATTERNS.some((pattern) => pattern.test(ua))
}
