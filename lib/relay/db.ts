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

// registerLinks() runs at send time, before any tracking URL is embedded, so the earliest
// registration for a delivery is a reasonable proxy for "when was this sent" — the relay is
// never told a send happened for deliveries with click-tracking off or with no links in the
// body, so this only covers the common case, not every delivery. Used for the prefetch-window
// check in classify.ts.
export async function getEarliestLinkRegistrationTime(deliveryId: string): Promise<Date | null> {
  const sql = getSql()
  const { rows } = await sql`
    SELECT MIN(created_at) AS sent_at FROM relay_links WHERE delivery_id = ${deliveryId}
  `
  const value = rows[0]?.sent_at as string | Date | undefined
  return value ? new Date(value) : null
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

const EVENT_RETENTION_DAYS = 3
const LINK_RETENTION_DAYS = 180

/**
 * Keeps relay_events bounded on a free-tier database. Only ever deletes events the outreach
 * backend has already acked through — this backend runs locally and is frequently offline, so
 * an unacked event is the only durable copy of that open/click and must never be pruned before
 * it's been consumed, however old it gets. The retention window is just a grace period for
 * hand-debugging a sync issue after the fact, once a row is already safely acked.
 */
export async function pruneAckedRelayEvents(): Promise<number> {
  const sql = getSql()
  const { rows } = await sql`
    WITH deleted AS (
      DELETE FROM relay_events
      WHERE created_at < now() - (${EVENT_RETENTION_DAYS}::text || ' days')::interval
        AND id <= (SELECT last_acked_id FROM relay_checkpoint WHERE id = 1)
      RETURNING 1
    )
    SELECT COUNT(*) AS deleted FROM deleted
  `
  return Number(rows[0]?.deleted ?? 0)
}

/** relay_links has no "consumed" concept (the backend never reads it directly), so age alone is fine. */
export async function pruneStaleRelayLinks(): Promise<number> {
  const sql = getSql()
  const { rows } = await sql`
    WITH deleted AS (
      DELETE FROM relay_links
      WHERE created_at < now() - (${LINK_RETENTION_DAYS}::text || ' days')::interval
      RETURNING 1
    )
    SELECT COUNT(*) AS deleted FROM deleted
  `
  return Number(rows[0]?.deleted ?? 0)
}

/** Clears all email-tracking data. Leaves relay_checkpoint alone — its cursor only ever needs
 *  to move forward, so future real events stay correctly ordered without touching it.
 *  Both deletes run as one non-interactive transaction so a mid-request failure can never
 *  leave relay_links behind without relay_events (or vice versa) — half a reset. */
export async function resetEmailAnalytics(): Promise<void> {
  const sql = getSql()
  await sql.transaction([sql`DELETE FROM relay_events`, sql`DELETE FROM relay_links`])
}
