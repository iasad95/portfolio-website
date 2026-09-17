import { NextResponse, type NextRequest } from "next/server"
import { verifyCredentials } from "@/lib/admin-auth/credentials"
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/admin-auth/session"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const username = String(formData.get("username") || "").trim()
  const password = String(formData.get("password") || "")

  const ok = await verifyCredentials(username, password)
  if (!ok) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303)
  }

  const response = NextResponse.redirect(new URL("/admin/analytics", request.url), 303)
  response.cookies.set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
  return response
}
