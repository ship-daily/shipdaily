import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { perRequest } from "@/lib/per-request";
import * as schema from "./schema";

function hyperdriveConnectionString(): string | undefined {
  try {
    return getCloudflareContext().env.HYPERDRIVE?.connectionString;
  } catch {
    // Not running on Cloudflare (e.g. self-hosted with `next start`).
    return undefined;
  }
}

function createDb(connectionString: string, max?: number) {
  return drizzle(new Pool({ connectionString, max }), { schema });
}

let selfHostedDb: ReturnType<typeof createDb> | undefined;

/**
 * Database client for the current request.
 *
 * DATABASE_URL wins when set (local dev, Vercel, self-hosting): one pool is shared for the process.
 * On Cloudflare, leave DATABASE_URL unset: connections can't be shared across requests there,
 * so each request gets its own small pool through the HYPERDRIVE binding.
 */
export const getDb = perRequest(() => {
  const url = process.env.DATABASE_URL;
  if (url) {
    if (!selfHostedDb) {
      const pool = new Pool({ connectionString: url });
      // On Vercel (Fluid compute), keeps the instance alive long enough to close idle connections.
      if (process.env.VERCEL) attachDatabasePool(pool);
      selfHostedDb = drizzle(pool, { schema });
    }
    return selfHostedDb;
  }

  const hyperdrive = hyperdriveConnectionString();
  if (!hyperdrive) throw new Error("Set DATABASE_URL or add a HYPERDRIVE binding.");
  return createDb(hyperdrive, 5);
});

export type Db = ReturnType<typeof getDb>;
