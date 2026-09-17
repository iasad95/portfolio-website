import { getSql } from "@/lib/db/client"
import { ensureSchema } from "@/lib/db/schema"

export interface DashboardStats {
  totalPageviews: number
  totalSessions: number
  resumeDownloads: number
  visitsByDay: { day: string; visitors: number }[]
  topPaths: { path: string; views: number }[]
  topSections: { section: string; views: number }[]
  topLinks: { label: string; href: string; clicks: number }[]
  topReferrers: { referrer: string; visits: number }[]
  topCountries: { country: string; visits: number }[]
  deviceBreakdown: { deviceType: string; visits: number }[]
  browserBreakdown: { browser: string; visits: number }[]
}

export interface RecentSession {
  sessionId: string
  firstSeen: string
  lastSeen: string
  durationMs: number | null
  country: string | null
  city: string | null
  deviceType: string | null
  browser: string | null
  os: string | null
  referrer: string | null
  campaignRef: string | null
  pageviews: number
  downloadedResume: boolean
  sectionsViewed: string[]
  linksClicked: string[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await ensureSchema()
  const sql = getSql()

  const [
    totals,
    visitsByDay,
    topPaths,
    topSections,
    topLinks,
    topReferrers,
    topCountries,
    deviceBreakdown,
    browserBreakdown,
  ] = await Promise.all([
    sql`
      SELECT
        COUNT(*) FILTER (WHERE event_type = 'pageview') AS pageviews,
        COUNT(DISTINCT session_id) AS sessions,
        COUNT(*) FILTER (WHERE event_type = 'resume_download') AS resume_downloads
      FROM analytics_events
    `,
    sql`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
             COUNT(DISTINCT session_id) AS visitors
      FROM analytics_events
      WHERE event_type = 'pageview' AND created_at > now() - interval '30 days'
      GROUP BY 1 ORDER BY 1
    `,
    sql`
      SELECT path, COUNT(*) AS views
      FROM analytics_events
      WHERE event_type = 'pageview' AND path IS NOT NULL
      GROUP BY path ORDER BY views DESC LIMIT 10
    `,
    sql`
      SELECT section, COUNT(*) AS views
      FROM analytics_events
      WHERE event_type = 'section_view' AND section IS NOT NULL
      GROUP BY section ORDER BY views DESC LIMIT 15
    `,
    sql`
      SELECT label, href, COUNT(*) AS clicks
      FROM analytics_events
      WHERE event_type IN ('external_link', 'contact_click') AND label IS NOT NULL
      GROUP BY label, href ORDER BY clicks DESC LIMIT 15
    `,
    sql`
      SELECT COALESCE(NULLIF(referrer, ''), 'Direct') AS referrer, COUNT(DISTINCT session_id) AS visits
      FROM analytics_events
      WHERE event_type = 'pageview'
      GROUP BY 1 ORDER BY visits DESC LIMIT 10
    `,
    sql`
      SELECT COALESCE(NULLIF(country, ''), 'Unknown') AS country, COUNT(DISTINCT session_id) AS visits
      FROM analytics_events
      WHERE event_type = 'pageview'
      GROUP BY 1 ORDER BY visits DESC LIMIT 10
    `,
    sql`
      SELECT COALESCE(NULLIF(device_type, ''), 'Unknown') AS device_type, COUNT(DISTINCT session_id) AS visits
      FROM analytics_events
      WHERE event_type = 'pageview'
      GROUP BY 1 ORDER BY visits DESC
    `,
    sql`
      SELECT COALESCE(NULLIF(browser, ''), 'Unknown') AS browser, COUNT(DISTINCT session_id) AS visits
      FROM analytics_events
      WHERE event_type = 'pageview'
      GROUP BY 1 ORDER BY visits DESC
    `,
  ])

  const totalsRow = totals.rows[0] as
    | { pageviews: string; sessions: string; resume_downloads: string }
    | undefined

  return {
    totalPageviews: Number(totalsRow?.pageviews ?? 0),
    totalSessions: Number(totalsRow?.sessions ?? 0),
    resumeDownloads: Number(totalsRow?.resume_downloads ?? 0),
    visitsByDay: visitsByDay.rows.map((r) => ({ day: r.day as string, visitors: Number(r.visitors) })),
    topPaths: topPaths.rows.map((r) => ({ path: r.path as string, views: Number(r.views) })),
    topSections: topSections.rows.map((r) => ({ section: r.section as string, views: Number(r.views) })),
    topLinks: topLinks.rows.map((r) => ({ label: r.label as string, href: r.href as string, clicks: Number(r.clicks) })),
    topReferrers: topReferrers.rows.map((r) => ({ referrer: r.referrer as string, visits: Number(r.visits) })),
    topCountries: topCountries.rows.map((r) => ({ country: r.country as string, visits: Number(r.visits) })),
    deviceBreakdown: deviceBreakdown.rows.map((r) => ({ deviceType: r.device_type as string, visits: Number(r.visits) })),
    browserBreakdown: browserBreakdown.rows.map((r) => ({ browser: r.browser as string, visits: Number(r.visits) })),
  }
}

export async function getRecentSessions(limit = 50): Promise<RecentSession[]> {
  await ensureSchema()
  const sql = getSql()

  const { rows } = await sql`
    SELECT
      session_id,
      MIN(created_at) AS first_seen,
      MAX(created_at) AS last_seen,
      MAX(duration_ms) AS duration_ms,
      MAX(country) AS country,
      MAX(city) AS city,
      MAX(device_type) AS device_type,
      MAX(browser) AS browser,
      MAX(os) AS os,
      (array_agg(referrer ORDER BY created_at) FILTER (WHERE referrer IS NOT NULL AND referrer != ''))[1] AS referrer,
      MAX(campaign_ref) AS campaign_ref,
      COUNT(*) FILTER (WHERE event_type = 'pageview') AS pageviews,
      BOOL_OR(event_type = 'resume_download') AS downloaded_resume,
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT CASE WHEN event_type = 'section_view' THEN section END), NULL) AS sections_viewed,
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT CASE WHEN event_type IN ('external_link', 'contact_click') THEN label END), NULL) AS links_clicked
    FROM analytics_events
    WHERE created_at > now() - interval '90 days'
    GROUP BY session_id
    ORDER BY MAX(created_at) DESC
    LIMIT ${limit}
  `

  return rows.map((r) => ({
    sessionId: r.session_id as string,
    firstSeen: r.first_seen as string,
    lastSeen: r.last_seen as string,
    durationMs: r.duration_ms !== null ? Number(r.duration_ms) : null,
    country: r.country as string | null,
    city: r.city as string | null,
    deviceType: r.device_type as string | null,
    browser: r.browser as string | null,
    os: r.os as string | null,
    referrer: r.referrer as string | null,
    campaignRef: r.campaign_ref as string | null,
    pageviews: Number(r.pageviews),
    downloadedResume: Boolean(r.downloaded_resume),
    sectionsViewed: (r.sections_viewed as string[] | null) ?? [],
    linksClicked: (r.links_clicked as string[] | null) ?? [],
  }))
}
