import { NextResponse, type NextRequest } from "next/server"
import { ensureSchema } from "@/lib/db/schema"
import { registerLinks } from "@/lib/relay/db"
import { verifyRelaySecret } from "@/lib/relay/auth"

interface RegisterBody {
  deliveryId?: unknown
  links?: unknown
}

export async function POST(request: NextRequest) {
  if (!verifyRelaySecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: RegisterBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const deliveryId = typeof body.deliveryId === "string" ? body.deliveryId.trim().slice(0, 200) : ""
  if (!deliveryId) {
    return NextResponse.json({ error: "deliveryId is required" }, { status: 400 })
  }

  if (!Array.isArray(body.links) || body.links.length === 0 || body.links.length > 50) {
    return NextResponse.json({ error: "links must be a non-empty array of at most 50 entries" }, { status: 400 })
  }

  const links: { index: number; url: string }[] = []
  for (const entry of body.links) {
    if (typeof entry !== "object" || entry === null) {
      return NextResponse.json({ error: "Invalid link entry" }, { status: 400 })
    }
    const { index, url } = entry as { index?: unknown; url?: unknown }
    if (typeof index !== "number" || !Number.isInteger(index) || index < 0) {
      return NextResponse.json({ error: "Each link needs a non-negative integer index" }, { status: 400 })
    }
    if (typeof url !== "string") {
      return NextResponse.json({ error: "Each link needs a url" }, { status: 400 })
    }
    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      return NextResponse.json({ error: `Invalid URL for link ${index}` }, { status: 400 })
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return NextResponse.json({ error: `Link ${index} must be http or https` }, { status: 400 })
    }
    links.push({ index, url: parsed.toString() })
  }

  try {
    await ensureSchema()
    await registerLinks(deliveryId, links)
  } catch (err) {
    console.error("relay register error", err)
    return NextResponse.json({ error: "Failed to register links" }, { status: 500 })
  }

  return NextResponse.json({ ok: true, deliveryId, registered: links.length })
}
