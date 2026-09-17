import type { NextRequest } from "next/server"
import { transparentGifResponse } from "@/lib/relay/gif"
import { clientIpFromHeaders, hashIp } from "@/lib/relay/ip"
import { isLikelyAutomated } from "@/lib/relay/ua"
import { insertRelayEvent } from "@/lib/relay/db"
import { ensureSchema } from "@/lib/db/schema"

export async function GET(request: NextRequest, { params }: { params: Promise<{ deliveryId: string }> }) {
  const { deliveryId } = await params

  try {
    await ensureSchema()
    const userAgent = request.headers.get("user-agent")
    const ip = clientIpFromHeaders(request.headers)
    await insertRelayEvent({
      eventType: "open",
      deliveryId: deliveryId.slice(0, 200),
      linkIndex: null,
      userAgent: userAgent?.slice(0, 500) ?? null,
      ipHash: hashIp(ip),
      likelyAutomated: isLikelyAutomated(userAgent),
    })
  } catch (err) {
    console.error("relay open tracking error", err)
    // Fall through — the pixel must always render, even if logging the event failed.
  }

  return transparentGifResponse()
}
