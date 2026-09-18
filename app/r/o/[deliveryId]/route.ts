import type { NextRequest } from "next/server"
import { transparentGifResponse } from "@/lib/relay/gif"
import { clientIpFromHeaders, hashIp } from "@/lib/relay/ip"
import { classifyHit } from "@/lib/relay/classify"
import { insertRelayEvent } from "@/lib/relay/db"
import { ensureSchema } from "@/lib/db/schema"

export async function GET(request: NextRequest, { params }: { params: Promise<{ deliveryId: string }> }) {
  const { deliveryId } = await params

  try {
    await ensureSchema()
    const userAgent = request.headers.get("user-agent")
    const ip = clientIpFromHeaders(request.headers)
    const trimmedId = deliveryId.slice(0, 200)
    const likelyAutomated = await classifyHit({ userAgent, ip, deliveryId: trimmedId, kind: "open" })
    await insertRelayEvent({
      eventType: "open",
      deliveryId: trimmedId,
      linkIndex: null,
      userAgent: userAgent?.slice(0, 500) ?? null,
      ipHash: hashIp(ip),
      likelyAutomated,
    })
  } catch (err) {
    console.error("relay open tracking error", err)
    // Fall through — the pixel must always render, even if logging the event failed.
  }

  return transparentGifResponse()
}
