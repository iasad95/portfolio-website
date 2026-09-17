export type AnalyticsEventType =
  | "pageview"
  | "section_view"
  | "nav_click"
  | "resume_download"
  | "external_link"
  | "contact_click"
  | "engagement"

export interface TrackPayload {
  sessionId: string
  eventType: AnalyticsEventType
  path: string
  section?: string
  label?: string
  href?: string
  referrer?: string
  durationMs?: number
  campaignRef?: string
}
