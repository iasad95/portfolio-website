import { NextResponse, type NextRequest } from "next/server"
import { ensureSchema } from "@/lib/db/schema"
import { getLinkDestination, insertRelayEvent } from "@/lib/relay/db"
import { clientIpFromHeaders, hashIp } from "@/lib/relay/ip"
import { classifyHit } from "@/lib/relay/classify"

const SITE_HOSTNAMES = new Set(["asadcodes.com", "www.asadcodes.com", "localhost"])

// Appends ?ref=<deliveryId> only when the destination is our own site, so a session there
// can be attributed back to the outreach delivery. Never touches third-party destinations.
function withAttribution(destination: string, deliveryId: string): string {
  try {
    const url = new URL(destination)
    const bareHost = url.hostname.replace(/^www\./, "")
    if (SITE_HOSTNAMES.has(url.hostname) || SITE_HOSTNAMES.has(bareHost)) {
      url.searchParams.set("ref", deliveryId)
    }
    return url.toString()
  } catch {
    return destination
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deliveryId: string; linkIndex: string }> },
) {
  const { deliveryId, linkIndex: linkIndexRaw } = await params
  const linkIndex = Number.parseInt(linkIndexRaw, 10)

  if (!deliveryId || !Number.isFinite(linkIndex)) {
    return new NextResponse("Not found", { status: 404 })
  }

  await ensureSchema()

  // The destination is looked up server-side only — never accepted from the query string,
  // so this can't be turned into an open redirect wearing this domain.
  const destination = await getLinkDestination(deliveryId, linkIndex)
  if (!destination) {
    return new NextResponse("Not found", { status: 404 })
  }

  try {
    const userAgent = request.headers.get("user-agent")
    const ip = clientIpFromHeaders(request.headers)
    const trimmedId = deliveryId.slice(0, 200)
    const likelyAutomated = await classifyHit({ userAgent, ip, deliveryId: trimmedId, kind: "click" })
    await insertRelayEvent({
      eventType: "click",
      deliveryId: trimmedId,
      linkIndex,
      userAgent: userAgent?.slice(0, 500) ?? null,
      ipHash: hashIp(ip),
      likelyAutomated,
    })
  } catch (err) {
    console.error("relay click tracking error", err)
  }

  return NextResponse.redirect(withAttribution(destination, deliveryId), {
    status: 302,
    headers: { "Referrer-Policy": "no-referrer" },
  })
}
