import { getSql } from "@/lib/db/client"
import { ensureSchema } from "@/lib/db/schema"

// Ad hoc test sends (see mailbox-send.service.ts's sendTrackedTestEmail()) use a
// "test-"-prefixed id instead of a bare delivery id, specifically so real funnel numbers here
// never include a developer poking the tracking pipeline. Kept out of every stat below except
// the dedicated "test sends" counter.
const TEST_ID_PREFIX = "test-"

export interface EmailAnalyticsStats {
  /** Distinct real deliveries the relay has any record of (registered links and/or events). */
  trackedDeliveries: number
  testSends: number
  totalOpens: number
  humanOpens: number
  automatedOpens: number
  uniqueHumanOpens: number
  totalClicks: number
  humanClicks: number
  automatedClicks: number
  uniqueHumanClicks: number
  /** Share of tracked deliveries with at least one human open. */
  humanOpenRate: number
  /** Share of tracked deliveries with at least one human click. */
  humanClickRate: number
  /** Of deliveries with a human open, the share that also got a human click. */
  clickToOpenRate: number
}

export interface LinkBreakdownRow {
  url: string
  clicks: number
  humanClicks: number
}

export interface DailyEngagement {
  day: string
  humanOpens: number
  humanClicks: number
}

export interface RecentRelayEvent {
  id: string
  eventType: string
  deliveryId: string
  linkIndex: number | null
  likelyAutomated: boolean
  isTest: boolean
  createdAt: string
}

export async function getEmailAnalyticsStats(): Promise<EmailAnalyticsStats> {
  await ensureSchema()
  const sql = getSql()

  const [deliveryCounts, eventCounts] = await Promise.all([
    sql`
      WITH all_ids AS (
        SELECT delivery_id FROM relay_links
        UNION
        SELECT delivery_id FROM relay_events
      )
      SELECT
        COUNT(*) FILTER (WHERE delivery_id NOT LIKE ${TEST_ID_PREFIX + "%"}) AS tracked_deliveries,
        COUNT(*) FILTER (WHERE delivery_id LIKE ${TEST_ID_PREFIX + "%"}) AS test_sends
      FROM all_ids
    `,
    sql`
      SELECT
        COUNT(*) FILTER (WHERE event_type = 'open') AS total_opens,
        COUNT(*) FILTER (WHERE event_type = 'open' AND NOT likely_automated) AS human_opens,
        COUNT(*) FILTER (WHERE event_type = 'open' AND likely_automated) AS automated_opens,
        COUNT(DISTINCT delivery_id) FILTER (WHERE event_type = 'open' AND NOT likely_automated) AS unique_human_opens,
        COUNT(*) FILTER (WHERE event_type = 'click') AS total_clicks,
        COUNT(*) FILTER (WHERE event_type = 'click' AND NOT likely_automated) AS human_clicks,
        COUNT(*) FILTER (WHERE event_type = 'click' AND likely_automated) AS automated_clicks,
        COUNT(DISTINCT delivery_id) FILTER (WHERE event_type = 'click' AND NOT likely_automated) AS unique_human_clicks
      FROM relay_events
      WHERE delivery_id NOT LIKE ${TEST_ID_PREFIX + "%"}
    `,
  ])

  const d = deliveryCounts.rows[0] as
    | { tracked_deliveries: string; test_sends: string }
    | undefined
  const e = eventCounts.rows[0] as
    | {
        total_opens: string
        human_opens: string
        automated_opens: string
        unique_human_opens: string
        total_clicks: string
        human_clicks: string
        automated_clicks: string
        unique_human_clicks: string
      }
    | undefined

  const trackedDeliveries = Number(d?.tracked_deliveries ?? 0)
  const uniqueHumanOpens = Number(e?.unique_human_opens ?? 0)
  const uniqueHumanClicks = Number(e?.unique_human_clicks ?? 0)

  return {
    trackedDeliveries,
    testSends: Number(d?.test_sends ?? 0),
    totalOpens: Number(e?.total_opens ?? 0),
    humanOpens: Number(e?.human_opens ?? 0),
    automatedOpens: Number(e?.automated_opens ?? 0),
    uniqueHumanOpens,
    totalClicks: Number(e?.total_clicks ?? 0),
    humanClicks: Number(e?.human_clicks ?? 0),
    automatedClicks: Number(e?.automated_clicks ?? 0),
    uniqueHumanClicks,
    humanOpenRate: trackedDeliveries > 0 ? uniqueHumanOpens / trackedDeliveries : 0,
    humanClickRate: trackedDeliveries > 0 ? uniqueHumanClicks / trackedDeliveries : 0,
    clickToOpenRate: uniqueHumanOpens > 0 ? uniqueHumanClicks / uniqueHumanOpens : 0,
  }
}

export async function getLinkBreakdown(limit = 15): Promise<LinkBreakdownRow[]> {
  await ensureSchema()
  const sql = getSql()
  const { rows } = await sql`
    SELECT
      rl.url AS url,
      COUNT(re.id) AS clicks,
      COUNT(re.id) FILTER (WHERE NOT re.likely_automated) AS human_clicks
    FROM relay_links rl
    LEFT JOIN relay_events re
      ON re.delivery_id = rl.delivery_id AND re.link_index = rl.link_index AND re.event_type = 'click'
    WHERE rl.delivery_id NOT LIKE ${TEST_ID_PREFIX + "%"}
    GROUP BY rl.url
    HAVING COUNT(re.id) > 0
    ORDER BY clicks DESC
    LIMIT ${limit}
  `
  return rows.map((r) => ({
    url: r.url as string,
    clicks: Number(r.clicks),
    humanClicks: Number(r.human_clicks),
  }))
}

export async function getDailyEngagement(days = 30): Promise<DailyEngagement[]> {
  await ensureSchema()
  const sql = getSql()
  const { rows } = await sql`
    SELECT
      to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
      COUNT(*) FILTER (WHERE event_type = 'open' AND NOT likely_automated) AS human_opens,
      COUNT(*) FILTER (WHERE event_type = 'click' AND NOT likely_automated) AS human_clicks
    FROM relay_events
    WHERE created_at > now() - (${days}::text || ' days')::interval
      AND delivery_id NOT LIKE ${TEST_ID_PREFIX + "%"}
    GROUP BY 1 ORDER BY 1
  `
  return rows.map((r) => ({
    day: r.day as string,
    humanOpens: Number(r.human_opens),
    humanClicks: Number(r.human_clicks),
  }))
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
    isTest: (r.delivery_id as string).startsWith(TEST_ID_PREFIX),
    createdAt: r.created_at as string,
  }))
}
