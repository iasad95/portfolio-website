"use client"

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { DailyEngagement } from "@/lib/relay/queries"

export function EngagementChart({ data }: { data: DailyEngagement[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No email engagement recorded yet.</p>
  }

  return (
    <div className="h-64 w-full rounded-lg border border-border p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} tickFormatter={(d: string) => d.slice(5)} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={30} />
          <Tooltip />
          <Legend verticalAlign="top" height={28} iconType="line" wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="humanOpens"
            name="Human opens"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "hsl(var(--card))" }}
          />
          <Line
            type="monotone"
            dataKey="humanClicks"
            name="Human clicks"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "hsl(var(--card))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
