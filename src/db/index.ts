import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { cache } from "react";
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
 * DATABASE_URL wins when set (local dev, self-hosting): one pool is shared for the process.
 * On Cloudflare, leave DATABASE_URL unset: connections can't be shared across requests there,
 * so each request gets its own small pool through the HYPERDRIVE binding.
 */
export const getDb = cache(() => {
  const url = process.env.DATABASE_URL;
  if (url) {
    selfHostedDb ??= createDb(url);
    return selfHostedDb;
  }

  const hyperdrive = hyperdriveConnectionString();
  if (!hyperdrive) throw new Error("Set DATABASE_URL or add a HYPERDRIVE binding.");
  return createDb(hyperdrive, 5);
});

export type Db = ReturnType<typeof getDb>;
