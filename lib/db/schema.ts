import { getSql } from "./client"

let schemaReady: Promise<void> | null = null

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = getSql()
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id BIGSERIAL PRIMARY KEY,
          session_id TEXT NOT NULL,
          event_type TEXT NOT NULL,
          path TEXT,
          section TEXT,
          label TEXT,
          href TEXT,
          referrer TEXT,
          country TEXT,
          city TEXT,
          device_type TEXT,
          browser TEXT,
          os TEXT,
          duration_ms INTEGER,
          campaign_ref TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      await sql`ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS campaign_ref TEXT`
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events (session_id)`
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events (created_at DESC)`
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events (event_type)`
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_campaign ON analytics_events (campaign_ref)`

      await sql`
        CREATE TABLE IF NOT EXISTS relay_links (
          delivery_id TEXT NOT NULL,
          link_index INTEGER NOT NULL,
          url TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          PRIMARY KEY (delivery_id, link_index)
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS relay_events (
          id BIGSERIAL PRIMARY KEY,
          event_type TEXT NOT NULL,
          delivery_id TEXT NOT NULL,
          link_index INTEGER,
          user_agent TEXT,
          ip_hash TEXT,
          likely_automated BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      await sql`CREATE INDEX IF NOT EXISTS idx_relay_events_delivery ON relay_events (delivery_id)`
      await sql`CREATE INDEX IF NOT EXISTS idx_relay_events_created ON relay_events (created_at DESC)`

      await sql`
        CREATE TABLE IF NOT EXISTS relay_checkpoint (
          id INTEGER PRIMARY KEY DEFAULT 1,
          last_acked_id BIGINT NOT NULL DEFAULT 0,
          CONSTRAINT relay_checkpoint_single_row CHECK (id = 1)
        )
      `
      await sql`INSERT INTO relay_checkpoint (id, last_acked_id) VALUES (1, 0) ON CONFLICT (id) DO NOTHING`
    })().catch((err) => {
      schemaReady = null
      throw err
    })
  }
  return schemaReady
}
