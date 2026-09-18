import { NextResponse, type NextRequest } from "next/server"
import { readSession, SESSION_COOKIE } from "@/lib/admin-auth/session"
import { resetEmailAnalytics } from "@/lib/relay/db"
import { ensureSchema } from "@/lib/db/schema"

export async function POST(request: NextRequest) {
  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303)
  }

  await ensureSchema()
  await resetEmailAnalytics()

  return NextResponse.redirect(new URL("/admin/analytics?tab=email&reset=email", request.url), 303)
}
