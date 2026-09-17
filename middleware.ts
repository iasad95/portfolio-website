import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const expectedUser = process.env.ANALYTICS_DASHBOARD_USER || "asad"
  const expectedPassword = process.env.ANALYTICS_DASHBOARD_PASSWORD

  if (!expectedPassword) {
    return new NextResponse("Analytics dashboard is not configured. Set ANALYTICS_DASHBOARD_PASSWORD.", {
      status: 503,
    })
  }

  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6))
    const separatorIndex = decoded.indexOf(":")
    const user = decoded.slice(0, separatorIndex)
    const password = decoded.slice(separatorIndex + 1)

    if (user === expectedUser && password === expectedPassword) {
      return NextResponse.next()
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Analytics Dashboard"' },
  })
}

export const config = {
  matcher: "/admin/:path*",
}
