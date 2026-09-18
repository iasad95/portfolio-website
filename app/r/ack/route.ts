import { NextResponse, type NextRequest } from "next/server"
import { ensureSchema } from "@/lib/db/schema"
import { ackThrough, pruneAckedRelayEvents, pruneStaleRelayLinks } from "@/lib/relay/db"
import { verifyRelaySecret } from "@/lib/relay/auth"

export async function POST(request: NextRequest) {
  if (!verifyRelaySecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { cursor?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const cursor =
    typeof body.cursor === "number"
      ? body.cursor
      : typeof body.cursor === "string"
        ? Number.parseInt(body.cursor, 10)
        : NaN

  if (!Number.isFinite(cursor) || cursor < 0) {
    return NextResponse.json({ error: "cursor must be a non-negative integer" }, { status: 400 })
  }

  await ensureSchema()
  const ackedThrough = await ackThrough(cursor)

  // Piggyback storage cleanup on this already-periodic call (the outreach backend acks every
  // few minutes) rather than running a separate cron. Best-effort — never let a housekeeping
  // failure turn a successful ack into an error the backend would retry.
  try {
    await Promise.all([pruneAckedRelayEvents(), pruneStaleRelayLinks()])
  } catch (err) {
    console.error("relay retention prune error", err)
  }

  return NextResponse.json({ ok: true, ackedThrough })
}
