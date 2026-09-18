import { isLikelyAutomated } from "./ua"
import { isAppleMailPrivacyRelay } from "./ip"
import { getEarliestLinkRegistrationTime } from "./db"

// Mirrors the outreach backend's open-tracking-classification.ts windows — a hit this soon
// after send is a prefetch, not a reader. Clicks get a much shorter window: a human has to
// notice, unlock their phone, open the client and read enough to decide, which takes several
// seconds even for a fast reader, while corporate link-safety scanners that "detonate" every
// link in a message typically fetch within a second or two of delivery.
const OPEN_PREFETCH_WINDOW_MS = 15_000
const CLICK_PREFETCH_WINDOW_MS = 5_000

export interface ClassifyHitInput {
  userAgent: string | null
  /** Raw, pre-hash IP — never stored, only used for this classification. */
  ip: string | null
  deliveryId: string
  kind: "open" | "click"
}

/** True when this hit is very likely a bot/proxy/scanner rather than a person. */
export async function classifyHit(input: ClassifyHitInput): Promise<boolean> {
  if (isLikelyAutomated(input.userAgent)) return true
  // Apple's network only gives away Mail Privacy Protection's automatic image prefetch —
  // it never proxies an actual link tap. A recipient using iCloud Private Relay in Safari
  // routes their *genuine* clicks through the same Apple-owned range, so applying this to
  // clicks would misclassify a real human as a bot. Opens only.
  if (input.kind === "open" && isAppleMailPrivacyRelay(input.ip)) return true

  const sentAt = await getEarliestLinkRegistrationTime(input.deliveryId)
  if (sentAt) {
    const windowMs = input.kind === "click" ? CLICK_PREFETCH_WINDOW_MS : OPEN_PREFETCH_WINDOW_MS
    const elapsed = Date.now() - sentAt.getTime()
    if (elapsed >= 0 && elapsed < windowMs) return true
  }

  return false
}
