"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function VisitsChart({ data }: { data: { day: string; visitors: number }[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No visits recorded yet.</p>
  }

  return (
    <div className="h-64 w-full rounded-lg border border-border p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} tickFormatter={(d: string) => d.slice(5)} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={30} />
          <Tooltip />
          <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
