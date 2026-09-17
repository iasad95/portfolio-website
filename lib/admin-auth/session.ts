// Uses Web Crypto (available on both the Edge and Node.js runtimes) rather than Node's
// `crypto` module, so middleware can verify sessions without opting into experimental
// Node.js middleware support.

export const SESSION_COOKIE = "ac_admin_session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

export interface SessionPayload {
  u: string
  exp: number
}

function getSecret(): string {
  return process.env.SESSION_SECRET || process.env.ANALYTICS_DASHBOARD_PASSWORD || "insecure-dev-only-fallback-secret"
}

function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const array = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let binary = ""
  for (const byte of array) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(value.length + ((4 - (value.length % 4)) % 4), "=")
  const binary = atob(padded)
  return Uint8Array.from(binary, (c) => c.charCodeAt(0))
}

async function sign(payload: string): Promise<string> {
  const key = await getKey()
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
  return toBase64Url(signature)
}

export async function createSessionToken(username: string): Promise<string> {
  const payloadJson = JSON.stringify({
    u: username,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  } satisfies SessionPayload)
  const payload = toBase64Url(new TextEncoder().encode(payloadJson))
  const sig = await sign(payload)
  return `${payload}.${sig}`
}

export async function readSession(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return null

  const expected = await sign(payload)
  const sigBytes = fromBase64Url(sig)
  const expectedBytes = fromBase64Url(expected)
  if (sigBytes.length !== expectedBytes.length) return null

  let diff = 0
  for (let i = 0; i < sigBytes.length; i++) diff |= sigBytes[i] ^ expectedBytes[i]
  if (diff !== 0) return null

  try {
    const json = new TextDecoder().decode(fromBase64Url(payload))
    const data = JSON.parse(json) as SessionPayload
    if (typeof data.u !== "string" || typeof data.exp !== "number" || data.exp < Date.now()) return null
    return data
  } catch {
    return null
  }
}
