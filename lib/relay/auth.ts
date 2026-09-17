import { timingSafeEqual } from "crypto"

export function verifyRelaySecret(request: Request): boolean {
  const expected = process.env.RELAY_SHARED_SECRET
  if (!expected) return false

  const auth = request.headers.get("authorization")
  if (!auth?.startsWith("Bearer ")) return false

  const provided = auth.slice("Bearer ".length)
  const expectedBuf = Buffer.from(expected)
  const providedBuf = Buffer.from(provided)
  if (expectedBuf.length !== providedBuf.length) return false

  return timingSafeEqual(expectedBuf, providedBuf)
}
