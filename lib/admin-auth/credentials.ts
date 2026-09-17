import { timingSafeEqual } from "crypto"
import { getSql } from "@/lib/db/client"
import { ensureSchema } from "@/lib/db/schema"
import { hashPassword, verifyPassword } from "./password"

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

// Two ways to log in: the ANALYTICS_DASHBOARD_USER/PASSWORD env vars always work (a recovery
// path you can always find in Vercel's dashboard, so you can never be permanently locked
// out), or whatever password was last set via /admin/settings.
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (!username || !password) return false

  const envUser = process.env.ANALYTICS_DASHBOARD_USER || "asad"
  const envPassword = process.env.ANALYTICS_DASHBOARD_PASSWORD
  if (envPassword && safeEqual(username, envUser) && safeEqual(password, envPassword)) {
    return true
  }

  try {
    await ensureSchema()
    const sql = getSql()
    const { rows } = await sql`SELECT username, password_hash FROM dashboard_credentials WHERE id = 1`
    const row = rows[0] as { username: string; password_hash: string } | undefined
    if (!row) return false
    if (!safeEqual(username, row.username)) return false
    return verifyPassword(password, row.password_hash)
  } catch (err) {
    console.error("verifyCredentials error", err)
    return false
  }
}

export async function setCredentials(username: string, password: string): Promise<void> {
  await ensureSchema()
  const sql = getSql()
  const hash = hashPassword(password)
  await sql`
    INSERT INTO dashboard_credentials (id, username, password_hash, updated_at)
    VALUES (1, ${username}, ${hash}, now())
    ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, password_hash = EXCLUDED.password_hash, updated_at = now()
  `
}
