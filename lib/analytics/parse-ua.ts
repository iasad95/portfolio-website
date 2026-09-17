export interface ParsedUserAgent {
  deviceType: "mobile" | "tablet" | "desktop"
  browser: string
  os: string
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  const deviceType: ParsedUserAgent["deviceType"] = /iPad|Tablet/i.test(ua)
    ? "tablet"
    : /Mobi|Android|iPhone/i.test(ua)
      ? "mobile"
      : "desktop"

  let browser = "Other"
  if (/Edg\//.test(ua)) browser = "Edge"
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera"
  else if (/CriOS/.test(ua)) browser = "Chrome"
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome"
  else if (/Firefox\//.test(ua)) browser = "Firefox"
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = "Safari"

  let os = "Other"
  if (/Windows/.test(ua)) os = "Windows"
  else if (/Android/.test(ua)) os = "Android"
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS"
  else if (/Mac OS X/.test(ua)) os = "macOS"
  else if (/Linux/.test(ua)) os = "Linux"

  return { deviceType, browser, os }
}
