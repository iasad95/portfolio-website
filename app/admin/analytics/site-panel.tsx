import type { DashboardStats, RecentSession } from "@/lib/analytics/queries"
import { VisitsChart } from "./visits-chart"
import { StatCard, BreakdownTable, formatDate } from "./stat-card"
import { ResetForm } from "./reset-form"

function formatDuration(ms: number | null): string {
  if (!ms || ms < 1000) return "—"
  const totalSeconds = Math.round(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

export function SiteAnalyticsPanel({
  stats,
  sessions,
  justReset,
}: {
  stats: DashboardStats
  sessions: RecentSession[]
  justReset: boolean
}) {
  return (
    <div className="space-y-10">
      {justReset && (
        <p className="text-sm text-green-600 bg-green-600/10 border border-green-600/20 rounded-md px-3 py-2">
          Site analytics reset.
        </p>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <StatCard label="Total Visits" value={stats.totalSessions} />
          <StatCard label="Pageviews" value={stats.totalPageviews} />
          <StatCard label="Resume Downloads" value={stats.resumeDownloads} />
          <StatCard
            label="Avg. Pages / Visit"
            value={stats.totalSessions ? (stats.totalPageviews / stats.totalSessions).toFixed(1) : "0"}
          />
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Visits — last 30 days</h2>
        <VisitsChart data={stats.visitsByDay} />
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <BreakdownTable title="Top Sections Viewed" rows={stats.topSections.map((s) => [s.section, s.views])} />
        <BreakdownTable title="Top Pages" rows={stats.topPaths.map((p) => [p.path, p.views])} />
        <BreakdownTable title="Links Clicked" rows={stats.topLinks.map((l) => [l.label, l.clicks])} />
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

      <section className="flex items-center justify-between border-t border-border pt-6">
        <div>
          <h2 className="text-sm font-semibold">Reset site analytics</h2>
          <p className="text-xs text-muted-foreground">
            Clears all visit/session data above. Cannot be undone.
          </p>
        </div>
        <ResetForm
          action="/admin/analytics/reset-site"
          label="Reset Site Analytics"
          confirmText="Delete all site analytics data? This cannot be undone."
        />
      </section>
    </div>
  )
}
