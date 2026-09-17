import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

let sqlClient: NeonQueryFunction<false, true> | null = null

export function getSql(): NeonQueryFunction<false, true> {
  if (!sqlClient) {
    const connectionString =
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.POSTGRES_URL_NON_POOLING

    if (!connectionString) {
      throw new Error("Missing Postgres connection string. Set DATABASE_URL (or POSTGRES_URL) in your environment.")
    }

    sqlClient = neon(connectionString, { fullResults: true })
  }
  return sqlClient
}
