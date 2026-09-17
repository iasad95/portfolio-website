// Flags opens/clicks that are very likely automated fetches rather than a person, using
// public, self-identifying signals only (e.g. Gmail's image proxy names itself in its own
// User-Agent). This is a data-quality heuristic for your own open-rate numbers — it is not
// an attempt to detect or unmask privacy-preserving proxies like Apple Mail Privacy
// Protection, which deliberately avoid self-identifying for that reason.
const AUTOMATED_UA_PATTERNS = [
  /GoogleImageProxy/i,
  /bot|spider|crawler/i,
  /curl|wget|python-requests|axios|node-fetch|go-http-client/i,
  /facebookexternalhit|slackbot|discordbot|whatsapp/i,
]

export function isLikelyAutomated(ua: string | null | undefined): boolean {
  if (!ua || !ua.trim()) return true
  return AUTOMATED_UA_PATTERNS.some((pattern) => pattern.test(ua))
}
