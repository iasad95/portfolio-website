import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

const EXACT_NAMES = ["DATABASE_URL", "POSTGRES_URL", "DATABASE_URL_UNPOOLED", "POSTGRES_URL_NON_POOLING"]

// Vercel Marketplace storage integrations (e.g. Neon) prefix these with the resource's name —
// e.g. "analyticsdb_DATABASE_URL" instead of "DATABASE_URL" — so fall back to a suffix scan.
const PREFIXED_SUFFIXES = ["_DATABASE_URL", "_POSTGRES_URL", "_DATABASE_URL_UNPOOLED", "_POSTGRES_URL_NON_POOLING"]

function findConnectionString(): string | undefined {
  for (const name of EXACT_NAMES) {
    const value = process.env[name]
    if (value) return value
  }

  for (const suffix of PREFIXED_SUFFIXES) {
    const match = Object.entries(process.env).find(([key, value]) => Boolean(value) && key.endsWith(suffix))
    if (match) return match[1]
  }

  return undefined
}

let sqlClient: NeonQueryFunction<false, true> | null = null

export function getSql(): NeonQueryFunction<false, true> {
  if (!sqlClient) {
    const connectionString = findConnectionString()

    if (!connectionString) {
      throw new Error(
        "Missing Postgres connection string. Set DATABASE_URL (or POSTGRES_URL), or connect a Postgres storage integration in Vercel.",
      )
    }

    sqlClient = neon(connectionString, { fullResults: true })
  }
  return sqlClient
}
