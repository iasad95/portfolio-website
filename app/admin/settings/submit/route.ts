import { NextResponse, type NextRequest } from "next/server"
import { setCredentials, verifyCredentials } from "@/lib/admin-auth/credentials"
import { createSessionToken, readSession, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/admin-auth/session"

export async function POST(request: NextRequest) {
  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303)
  }

  const formData = await request.formData()
  const currentPassword = String(formData.get("currentPassword") || "")
  const newPassword = String(formData.get("newPassword") || "")
  const confirmPassword = String(formData.get("confirmPassword") || "")

  const currentOk = await verifyCredentials(session.u, currentPassword)
  if (!currentOk) {
    return NextResponse.redirect(new URL("/admin/settings?error=current", request.url), 303)
  }
  if (newPassword.length < 12) {
    return NextResponse.redirect(new URL("/admin/settings?error=short", request.url), 303)
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.redirect(new URL("/admin/settings?error=mismatch", request.url), 303)
  }

  await setCredentials(session.u, newPassword)

  const response = NextResponse.redirect(new URL("/admin/settings?success=1", request.url), 303)
  response.cookies.set(SESSION_COOKIE, await createSessionToken(session.u), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
  return response
}
