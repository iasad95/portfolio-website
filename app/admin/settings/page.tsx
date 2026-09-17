import { cookies } from "next/headers"
import { SESSION_COOKIE, readSession } from "@/lib/admin-auth/session"

export const dynamic = "force-dynamic"

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const { error, success } = await searchParams
  const cookieStore = await cookies()
  const session = await readSession(cookieStore.get(SESSION_COOKIE)?.value)

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-sm mx-auto space-y-6">
        <div>
          <h1 className="text-lg font-semibold">Account Settings</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{session?.u}</span>
          </p>
        </div>

        {success && <p className="text-sm text-green-600">Password updated.</p>}
        {error === "current" && <p className="text-sm text-red-500">Current password is incorrect.</p>}
        {error === "short" && <p className="text-sm text-red-500">New password must be at least 12 characters.</p>}
        {error === "mismatch" && <p className="text-sm text-red-500">New passwords don&apos;t match.</p>}

        <form method="POST" action="/admin/settings/submit" className="space-y-4 border border-border rounded-lg p-6">
          <PasswordField id="currentPassword" name="currentPassword" label="Current password" autoComplete="current-password" />
          <PasswordField id="newPassword" name="newPassword" label="New password" autoComplete="new-password" />
          <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm new password" autoComplete="new-password" />
          <button
            type="submit"
            className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium"
          >
            Update password
          </button>
        </form>

        <form method="POST" action="/admin/logout">
          <button type="submit" className="text-sm text-muted-foreground underline">
            Log out
          </button>
        </form>

        <a href="/admin/analytics" className="block text-sm text-muted-foreground underline">
          ← Back to dashboard
        </a>
      </div>
    </main>
  )
}

function PasswordField({
  id,
  name,
  label,
  autoComplete,
}: {
  id: string
  name: string
  label: string
  autoComplete: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium block">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="password"
        autoComplete={autoComplete}
        required
        minLength={12}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </div>
  )
}
