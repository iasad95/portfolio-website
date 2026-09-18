"use client"

import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalyticsTabs({
  defaultTab,
  site,
  email,
}: {
  defaultTab: "site" | "email"
  site: ReactNode
  email: ReactNode
}) {
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="site">Site Analytics</TabsTrigger>
        <TabsTrigger value="email">Email Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="site">{site}</TabsContent>
      <TabsContent value="email">{email}</TabsContent>
    </Tabs>
  )
}
