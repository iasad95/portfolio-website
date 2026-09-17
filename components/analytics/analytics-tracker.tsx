"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import type { TrackPayload } from "@/lib/analytics/types"

const SESSION_KEY = "ac_session_id"
const CAMPAIGN_KEY = "ac_campaign_ref"
const RESUME_PATH_HINTS = ["/asad-resume.pdf", "/resume.pdf"]

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return "no-storage"
  }
}

// Picks up ?ref=<deliveryId> from an outreach-relay redirect, remembers it for the rest of
// the browser tab's session, and strips it from the visible URL.
function getCampaignRef(): string | undefined {
  try {
    const url = new URL(window.location.href)
    const fromUrl = url.searchParams.get("ref")
    if (fromUrl) {
      sessionStorage.setItem(CAMPAIGN_KEY, fromUrl)
      url.searchParams.delete("ref")
      window.history.replaceState({}, "", url.toString())
      return fromUrl
    }
    return sessionStorage.getItem(CAMPAIGN_KEY) || undefined
  } catch {
    return undefined
  }
}

function isTrackingAllowed(): boolean {
  try {
    return navigator.doNotTrack !== "1"
  } catch {
    return true
  }
}

function send(payload: TrackPayload, useBeacon = false) {
  if (!isTrackingAllowed()) return
  try {
    const body = JSON.stringify(payload)
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))
      return
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Never let analytics break the page.
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return

    const sessionId = getSessionId()
    const currentPath = pathname
    const campaignRef = getCampaignRef()
    const base = () => ({ sessionId, path: currentPath, campaignRef })

    send({ ...base(), eventType: "pageview", referrer: document.referrer || undefined })

    const viewedSections = new Set<string>()
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting && id && !viewedSections.has(id)) {
            viewedSections.add(id)
            send({ ...base(), eventType: "section_view", section: id })
          }
        }
      },
      { threshold: 0.5 },
    )
    sections.forEach((section) => observer.observe(section))

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute("href") || ""
      const label = anchor.getAttribute("aria-label") || anchor.textContent?.trim().slice(0, 100) || href

      if (RESUME_PATH_HINTS.some((hint) => href.toLowerCase().includes(hint))) {
        send({ ...base(), eventType: "resume_download", label: "Resume", href })
      } else if (href.startsWith("#") || href.startsWith("/#")) {
        send({ ...base(), eventType: "nav_click", label, href })
      } else if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me")) {
        send({ ...base(), eventType: "contact_click", label, href })
      } else if (anchor.target === "_blank" || /^https?:\/\//.test(href)) {
        send({ ...base(), eventType: "external_link", label, href })
      }
    }
    document.addEventListener("click", handleClick, true)

    let visibleSince: number | null = document.visibilityState === "visible" ? Date.now() : null
    let accumulatedMs = 0

    const flushEngagement = () => {
      if (visibleSince !== null) {
        accumulatedMs += Date.now() - visibleSince
        visibleSince = null
      }
      if (accumulatedMs > 0) {
        send({ ...base(), eventType: "engagement", durationMs: accumulatedMs }, true)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushEngagement()
      } else {
        visibleSince = Date.now()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("pagehide", flushEngagement)

    return () => {
      observer.disconnect()
      document.removeEventListener("click", handleClick, true)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("pagehide", flushEngagement)
      flushEngagement()
    }
  }, [pathname])

  return null
}
