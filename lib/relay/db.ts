import { getSql } from "@/lib/db/client"

export type RelayEventType = "open" | "click"

export async function registerLinks(deliveryId: string, links: { index: number; url: string }[]): Promise<void> {
  const sql = getSql()
  for (const link of links) {
    await sql`
      INSERT INTO relay_links (delivery_id, link_index, url)
      VALUES (${deliveryId}, ${link.index}, ${link.url})
      ON CONFLICT (delivery_id, link_index) DO UPDATE SET url = EXCLUDED.url
    `
  }
}

export async function getLinkDestination(deliveryId: string, linkIndex: number): Promise<string | null> {
  const sql = getSql()
  const { rows } = await sql`
    SELECT url FROM relay_links WHERE delivery_id = ${deliveryId} AND link_index = ${linkIndex} LIMIT 1
  `
  return (rows[0]?.url as string | undefined) ?? null
}

export interface RelayEventInput {
  eventType: RelayEventType
  deliveryId: string
  linkIndex: number | null
  userAgent: string | null
  ipHash: string | null
  likelyAutomated: boolean
}

export async function insertRelayEvent(event: RelayEventInput): Promise<void> {
  const sql = getSql()
  await sql`
    INSERT INTO relay_events (event_type, delivery_id, link_index, user_agent, ip_hash, likely_automated)
    VALUES (${event.eventType}, ${event.deliveryId}, ${event.linkIndex}, ${event.userAgent}, ${event.ipHash}, ${event.likelyAutomated})
  `
}

export interface RelayEventRow {
  id: string
  eventType: string
  deliveryId: string
  linkIndex: number | null
  userAgent: string | null
  ipHash: string | null
  likelyAutomated: boolean
  createdAt: string
}

export async function getEventsSince(sinceId: number, limit: number): Promise<RelayEventRow[]> {
  const sql = getSql()
  const { rows } = await sql`
    SELECT id, event_type, delivery_id, link_index, user_agent, ip_hash, likely_automated, created_at
    FROM relay_events
    WHERE id > ${sinceId}
    ORDER BY id ASC
    LIMIT ${limit}
  `
  return rows.map((r) => ({
    id: String(r.id),
    eventType: r.event_type as string,
    deliveryId: r.delivery_id as string,
    linkIndex: r.link_index as number | null,
    userAgent: r.user_agent as string | null,
    ipHash: r.ip_hash as string | null,
    likelyAutomated: Boolean(r.likely_automated),
    createdAt: r.created_at as string,
  }))
}

export async function getLastAckedId(): Promise<number> {
  const sql = getSql()
  const { rows } = await sql`SELECT last_acked_id FROM relay_checkpoint WHERE id = 1`
  return rows[0] ? Number(rows[0].last_acked_id) : 0
}

export async function ackThrough(cursor: number): Promise<number> {
  const sql = getSql()
  const { rows } = await sql`
    UPDATE relay_checkpoint
    SET last_acked_id = GREATEST(last_acked_id, ${cursor})
    WHERE id = 1
    RETURNING last_acked_id
  `
  return rows[0] ? Number(rows[0].last_acked_id) : cursor
}
