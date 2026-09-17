import { getSql } from "@/lib/db/client"
import { ensureSchema } from "@/lib/db/schema"

export interface RelayStats {
  totalOpens: number
  totalClicks: number
  uniqueDeliveries: number
  likelyAutomatedOpens: number
}

export interface RecentRelayEvent {
  id: string
  eventType: string
  deliveryId: string
  linkIndex: number | null
  likelyAutomated: boolean
  createdAt: string
}

export async function getRelayStats(): Promise<RelayStats> {
  await ensureSchema()
  const sql = getSql()
  const { rows } = await sql`
    SELECT
      COUNT(*) FILTER (WHERE event_type = 'open') AS total_opens,
      COUNT(*) FILTER (WHERE event_type = 'click') AS total_clicks,
      COUNT(DISTINCT delivery_id) AS unique_deliveries,
      COUNT(*) FILTER (WHERE event_type = 'open' AND likely_automated) AS likely_automated_opens
    FROM relay_events
  `
  const row = rows[0] as
    | { total_opens: string; total_clicks: string; unique_deliveries: string; likely_automated_opens: string }
    | undefined

  return {
    totalOpens: Number(row?.total_opens ?? 0),
    totalClicks: Number(row?.total_clicks ?? 0),
    uniqueDeliveries: Number(row?.unique_deliveries ?? 0),
    likelyAutomatedOpens: Number(row?.likely_automated_opens ?? 0),
  }
}

export async function getRecentRelayEvents(limit = 50): Promise<RecentRelayEvent[]> {
  await ensureSchema()
  const sql = getSql()
  const { rows } = await sql`
    SELECT id, event_type, delivery_id, link_index, likely_automated, created_at
    FROM relay_events
    ORDER BY id DESC
    LIMIT ${limit}
  `
  return rows.map((r) => ({
    id: String(r.id),
    eventType: r.event_type as string,
    deliveryId: r.delivery_id as string,
    linkIndex: r.link_index as number | null,
    likelyAutomated: Boolean(r.likely_automated),
    createdAt: r.created_at as string,
  }))
}
