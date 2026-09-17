import { NextResponse, type NextRequest } from "next/server"
import { ensureSchema } from "@/lib/db/schema"
import { getEventsSince, getLastAckedId } from "@/lib/relay/db"
import { verifyRelaySecret } from "@/lib/relay/auth"

const DEFAULT_LIMIT = 100
const MAX_LIMIT = 500

export async function GET(request: NextRequest) {
  if (!verifyRelaySecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "", 10)
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, MAX_LIMIT) : DEFAULT_LIMIT

  await ensureSchema()

  const sinceParam = searchParams.get("since")
  let since: number
  if (sinceParam !== null) {
    const parsed = Number.parseInt(sinceParam, 10)
    since = Number.isFinite(parsed) ? parsed : 0
  } else {
    // No cursor supplied — resume from the last position this consumer acknowledged.
    since = await getLastAckedId()
  }

  const events = await getEventsSince(since, limit)
  const nextCursor = events.length > 0 ? events[events.length - 1].id : String(since)

  return NextResponse.json({
    events,
    nextCursor,
    hasMore: events.length === limit,
  })
}
