import type { EmailAnalyticsStats, LinkBreakdownRow, DailyEngagement, RecentRelayEvent } from "@/lib/relay/queries"
import { EngagementChart } from "./engagement-chart"
import { StatCard, formatDate } from "./stat-card"
import { ResetForm } from "./reset-form"

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`
}

export function EmailAnalyticsPanel({
  stats,
  links,
  daily,
  events,
  justReset,
}: {
  stats: EmailAnalyticsStats
  links: LinkBreakdownRow[]
  daily: DailyEngagement[]
  events: RecentRelayEvent[]
  justReset: boolean
}) {
  return (
    <div className="space-y-10">
      {justReset && (
        <p className="text-sm text-green-600 bg-green-600/10 border border-green-600/20 rounded-md px-3 py-2">
          Email analytics reset.
        </p>
      )}

      <div>
        <p className="text-xs text-muted-foreground max-w-2xl">
          Numbers below exclude bot/proxy/scanner hits (Apple Mail Privacy Protection, corporate
          link-safety scanners, image proxies) and developer test sends — see the secondary row
          and the Test Sends count for the excluded totals. Replies, bounces, and the
          authoritative "emails sent" count live on the job-rss-aggregator Deliveries page; this
          relay only ever learns whether a delivery ID it was told about got opened or clicked,
          never who it belongs to.
        </p>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Real engagement</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Tracked Deliveries" value={stats.trackedDeliveries} />
          <StatCard label="Human Opens" value={stats.uniqueHumanOpens} sub={pct(stats.humanOpenRate)} />
          <StatCard label="Human Clicks" value={stats.uniqueHumanClicks} sub={pct(stats.humanClickRate)} />
          <StatCard label="Click-to-Open Rate" value={pct(stats.clickToOpenRate)} />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Raw &amp; excluded</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Raw Opens" value={stats.totalOpens} sub={`${stats.automatedOpens} automated`} />
          <StatCard label="Raw Clicks" value={stats.totalClicks} sub={`${stats.automatedClicks} automated`} />
          <StatCard label="Test Sends" value={stats.testSends} sub="excluded above" />
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Opens &amp; Clicks — last 30 days</h2>
        <EngagementChart data={daily} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Link Performance</h2>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Link</th>
                <th className="p-3">Clicks</th>
                <th className="p-3">Human Clicks</th>
              </tr>
            </thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.url} className="border-t border-border">
                  <td className="p-3 truncate max-w-xs">{l.url}</td>
                  <td className="p-3 tabular-nums">{l.clicks}</td>
                  <td className="p-3 tabular-nums">{l.humanClicks}</td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td className="p-3 text-muted-foreground" colSpan={3}>
                    No link clicks recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Events ({events.length})</h2>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Type</th>
                <th className="p-3">Delivery ID</th>
                <th className="p-3">Link #</th>
                <th className="p-3">Classification</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className={`border-t border-border align-top ${e.isTest ? "opacity-50" : ""}`}>
                  <td className="p-3 whitespace-nowrap">{formatDate(e.createdAt)}</td>
                  <td className="p-3 capitalize">{e.eventType}</td>
                  <td className="p-3 whitespace-nowrap">{e.deliveryId}</td>
                  <td className="p-3">{e.linkIndex ?? "—"}</td>
                  <td className="p-3">{e.isTest ? "Test send" : e.likelyAutomated ? "Automated" : "Human"}</td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td className="p-3 text-muted-foreground" colSpan={5}>
                    No outreach events recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex items-center justify-between border-t border-border pt-6">
        <div>
          <h2 className="text-sm font-semibold">Reset email analytics</h2>
          <p className="text-xs text-muted-foreground">
            Clears all tracked opens/clicks and link registrations above — useful after testing
            the tracking pipeline itself. Cannot be undone, and never touches job-rss-aggregator.
          </p>
        </div>
        <ResetForm
          action="/admin/analytics/reset-email"
          label="Reset Email Analytics"
          confirmText="Delete all email tracking data (opens, clicks, links)? This cannot be undone."
        />
      </section>
    </div>
  )
}
