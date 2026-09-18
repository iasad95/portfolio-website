import { getDashboardStats, getRecentSessions } from "@/lib/analytics/queries"
import { getEmailAnalyticsStats, getLinkBreakdown, getDailyEngagement, getRecentRelayEvents } from "@/lib/relay/queries"
import { AnalyticsTabs } from "./analytics-tabs"
import { SiteAnalyticsPanel } from "./site-panel"
import { EmailAnalyticsPanel } from "./email-panel"

export const dynamic = "force-dynamic"

export default async function AnalyticsDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; reset?: string }>
}) {
  const { tab, reset } = await searchParams

  const [stats, sessions, emailStats, links, daily, relayEvents] = await Promise.all([
    getDashboardStats(),
    getRecentSessions(50),
    getEmailAnalyticsStats(),
    getLinkBreakdown(15),
    getDailyEngagement(30),
    getRecentRelayEvents(50),
  ])

  const defaultTab = tab === "email" ? "email" : "site"

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">Internal dashboard — not indexed, not linked publicly.</p>
          </div>
          <a href="/admin/settings" className="text-sm text-muted-foreground underline whitespace-nowrap">
            Settings
          </a>
        </div>

        <AnalyticsTabs
          defaultTab={defaultTab}
          site={<SiteAnalyticsPanel stats={stats} sessions={sessions} justReset={reset === "site"} />}
          email={
            <EmailAnalyticsPanel
              stats={emailStats}
              links={links}
              daily={daily}
              events={relayEvents}
              justReset={reset === "email"}
            />
          }
        />
      </div>
    </main>
  )
}
