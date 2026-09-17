export const dynamic = "force-dynamic"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <form
        method="POST"
        action="/admin/login/submit"
        className="w-full max-w-sm space-y-4 border border-border rounded-lg p-6"
      >
        <div>
          <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue.</p>
        </div>

        {error && <p className="text-sm text-red-500">Incorrect username or password.</p>}

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium block">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium block">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium"
        >
          Sign in
        </button>
      </form>
    </main>
  )
}
