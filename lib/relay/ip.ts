import { createHash } from "crypto"

function truncateIp(ip: string): string {
  if (ip.includes(":")) {
    // IPv6 — keep the first 4 groups (~/64), drop the rest.
    const parts = ip.split(":")
    return parts.slice(0, 4).join(":") + "::"
  }
  const parts = ip.split(".")
  if (parts.length === 4) {
    parts[3] = "0" // IPv4 — zero the last octet (~/24).
    return parts.join(".")
  }
  return ip
}

// Never store a raw or reversible IP. This truncates to a rough subnet, then salts and
// hashes it — enough to dedupe/bucket, not enough to reconstruct the original address.
export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null
  const trimmed = ip.trim()
  if (!trimmed) return null
  const salt = process.env.IP_HASH_SALT || "asadcodes-relay-default-salt"
  const truncated = truncateIp(trimmed)
  return createHash("sha256").update(`${salt}:${truncated}`).digest("hex").slice(0, 24)
}

export function clientIpFromHeaders(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null
  }
  return null
}
