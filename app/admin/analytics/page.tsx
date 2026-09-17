import { getDashboardStats, getRecentSessions } from "@/lib/analytics/queries"
import { getRecentRelayEvents, getRelayStats } from "@/lib/relay/queries"
import { VisitsChart } from "./visits-chart"

export const dynamic = "force-dynamic"

function formatDuration(ms: number | null): string {
  if (!ms || ms < 1000) return "—"
  const totalSeconds = Math.round(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default async function AnalyticsDashboard() {
  const [stats, sessions, relayStats, relayEvents] = await Promise.all([
    getDashboardStats(),
    getRecentSessions(50),
    getRelayStats(),
    getRecentRelayEvents(50),
  ])

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-2xl font-bold">Site Analytics</h1>
          <p className="text-sm text-muted-foreground">Internal dashboard — not indexed, not linked publicly.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Visits" value={stats.totalSessions} />
          <StatCard label="Pageviews" value={stats.totalPageviews} />
          <StatCard label="Resume Downloads" value={stats.resumeDownloads} />
          <StatCard
            label="Avg. Pages / Visit"
            value={stats.totalSessions ? (stats.totalPageviews / stats.totalSessions).toFixed(1) : "0"}
          />
        </div>

        <section>
          <h2 className="text-lg font-semibold mb-3">Visits — last 30 days</h2>
          <VisitsChart data={stats.visitsByDay} />
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <BreakdownTable title="Top Sections Viewed" rows={stats.topSections.map((s) => [s.section, s.views])} />
          <BreakdownTable title="Top Pages" rows={stats.topPaths.map((p) => [p.path, p.views])} />
          <BreakdownTable
            title="Links Clicked"
            rows={stats.topLinks.map((l) => [l.label, l.clicks])}
          />
          <BreakdownTable title="Referrers" rows={stats.topReferrers.map((r) => [r.referrer, r.visits])} />
          <BreakdownTable title="Countries" rows={stats.topCountries.map((c) => [c.country, c.visits])} />
          <BreakdownTable title="Devices" rows={stats.deviceBreakdown.map((d) => [d.deviceType, d.visits])} />
        </div>

        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Sessions ({sessions.length})</h2>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Device</th>
                  <th className="p-3">Referrer</th>
                  <th className="p-3">Campaign</th>
                  <th className="p-3">Sections Viewed</th>
                  <th className="p-3">Links Clicked</th>
                  <th className="p-3">Resume</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.sessionId} className="border-t border-border align-top">
                    <td className="p-3 whitespace-nowrap">{formatDate(s.firstSeen)}</td>
                    <td className="p-3 whitespace-nowrap">{formatDuration(s.durationMs)}</td>
                    <td className="p-3 whitespace-nowrap">{[s.city, s.country].filter(Boolean).join(", ") || "Unknown"}</td>
                    <td className="p-3 whitespace-nowrap">{[s.browser, s.deviceType].filter(Boolean).join(" / ") || "Unknown"}</td>
                    <td className="p-3 whitespace-nowrap">{s.referrer || "Direct"}</td>
                    <td className="p-3 whitespace-nowrap">{s.campaignRef || "—"}</td>
                    <td className="p-3">{s.sectionsViewed.join(", ") || "—"}</td>
                    <td className="p-3">{s.linksClicked.join(", ") || "—"}</td>
                    <td className="p-3">{s.downloadedResume ? "Yes" : "—"}</td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td className="p-3 text-muted-foreground" colSpan={9}>
                      No sessions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold">Outreach Relay</h2>
            <p className="text-xs text-muted-foreground">
              Delivery IDs are opaque — matching them to a recipient happens in your outreach backend, not here.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Opens" value={relayStats.totalOpens} />
            <StatCard label="Clicks" value={relayStats.totalClicks} />
            <StatCard label="Unique Deliveries" value={relayStats.uniqueDeliveries} />
            <StatCard label="Likely Automated Opens" value={relayStats.likelyAutomatedOpens} />
          </div>

          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Delivery ID</th>
                  <th className="p-3">Link #</th>
                  <th className="p-3">Likely Automated</th>
                </tr>
              </thead>
              <tbody>
                {relayEvents.map((e) => (
                  <tr key={e.id} className="border-t border-border align-top">
                    <td className="p-3 whitespace-nowrap">{formatDate(e.createdAt)}</td>
                    <td className="p-3 capitalize">{e.eventType}</td>
                    <td className="p-3 whitespace-nowrap">{e.deliveryId}</td>
                    <td className="p-3">{e.linkIndex ?? "—"}</td>
                    <td className="p-3">{e.likelyAutomated ? "Yes" : "—"}</td>
                  </tr>
                ))}
                {relayEvents.length === 0 && (
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
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}

function BreakdownTable({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <ul className="space-y-1.5 text-sm">
          {rows.map(([label, count]) => (
            <li key={label} className="flex justify-between gap-4">
              <span className="text-foreground/80 truncate">{label}</span>
              <span className="text-muted-foreground tabular-nums">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
