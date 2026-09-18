import { getSql } from "@/lib/db/client"
import type { AnalyticsEventType } from "./types"

export interface InsertEventInput {
  sessionId: string
  eventType: AnalyticsEventType
  path: string
  section: string | null
  label: string | null
  href: string | null
  referrer: string | null
  country: string | null
  city: string | null
  deviceType: string | null
  browser: string | null
  os: string | null
  durationMs: number | null
  campaignRef: string | null
}

export async function resetSiteAnalytics(): Promise<void> {
  const sql = getSql()
  await sql`DELETE FROM analytics_events`
}

export async function insertEvent(event: InsertEventInput): Promise<void> {
  const sql = getSql()
  await sql`
    INSERT INTO analytics_events (
      session_id, event_type, path, section, label, href, referrer,
      country, city, device_type, browser, os, duration_ms, campaign_ref
    ) VALUES (
      ${event.sessionId}, ${event.eventType}, ${event.path}, ${event.section}, ${event.label}, ${event.href}, ${event.referrer},
      ${event.country}, ${event.city}, ${event.deviceType}, ${event.browser}, ${event.os}, ${event.durationMs}, ${event.campaignRef}
    )
  `
}
