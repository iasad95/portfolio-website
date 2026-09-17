import { randomBytes, scryptSync, timingSafeEqual } from "crypto"

const KEY_LENGTH = 64

// scrypt is a memory-hard KDF built into Node — no extra dependency, and appropriate for
// password hashing (unlike a plain SHA-256 hash). Stored as "salt:hash", both hex.
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false

  const hashBuf = Buffer.from(hash, "hex")
  const candidateBuf = scryptSync(password, salt, KEY_LENGTH)
  if (hashBuf.length !== candidateBuf.length) return false

  return timingSafeEqual(hashBuf, candidateBuf)
}
