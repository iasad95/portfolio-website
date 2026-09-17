import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { readSession, SESSION_COOKIE } from "@/lib/admin-auth/session"

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/admin/login/submit", "/admin/logout"])

export async function middleware(request: NextRequest) {
  if (PUBLIC_ADMIN_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
