import { type NextRequest, NextResponse } from "next/server"
import { insertEvent } from "@/lib/analytics/db"
import { parseUserAgent } from "@/lib/analytics/parse-ua"
import { ensureSchema } from "@/lib/db/schema"
import type { AnalyticsEventType, TrackPayload } from "@/lib/analytics/types"

const ALLOWED_EVENTS: AnalyticsEventType[] = [
  "pageview",
  "section_view",
  "nav_click",
  "resume_download",
  "external_link",
  "contact_click",
  "engagement",
]

function clip(value: unknown, max = 500): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, max)
}

export async function POST(request: NextRequest) {
  let body: Partial<TrackPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const sessionId = clip(body.sessionId, 100)
  const eventType = body.eventType
  const path = clip(body.path, 300) ?? "/"

  if (!sessionId || !eventType || !ALLOWED_EVENTS.includes(eventType as AnalyticsEventType)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const durationMsRaw = typeof body.durationMs === "number" ? body.durationMs : null
  const sixHoursMs = 1000 * 60 * 60 * 6
  const durationMs =
    durationMsRaw !== null && Number.isFinite(durationMsRaw) && durationMsRaw >= 0 && durationMsRaw < sixHoursMs
      ? Math.round(durationMsRaw)
      : null

  let referrerHost: string | null = null
  const rawReferrer = clip(body.referrer, 500)
  if (rawReferrer) {
    try {
      referrerHost = new URL(rawReferrer).hostname.replace(/^www\./, "")
    } catch {
      referrerHost = null
    }
  }

  const ua = request.headers.get("user-agent") ?? ""
  const { deviceType, browser, os } = parseUserAgent(ua)

  const country = request.headers.get("x-vercel-ip-country")
  const rawCity = request.headers.get("x-vercel-ip-city")
  const city = rawCity ? decodeURIComponent(rawCity) : null

  try {
    await ensureSchema()
    await insertEvent({
      sessionId,
      eventType: eventType as AnalyticsEventType,
      path,
      section: clip(body.section, 100),
      label: clip(body.label, 200),
      href: clip(body.href, 500),
      referrer: referrerHost,
      country,
      city,
      deviceType,
      browser,
      os,
      durationMs,
      campaignRef: clip(body.campaignRef, 200),
    })
  } catch (err) {
    console.error("analytics track error", err)
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
