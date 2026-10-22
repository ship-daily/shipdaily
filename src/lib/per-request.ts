import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

function cloudflareRequestContext(): object | undefined {
  try {
    return getCloudflareContext().ctx;
  } catch {
    // Not running on Cloudflare (e.g. `next dev` without bindings, or self-hosted with `next start`).
    return undefined;
  }
}

/**
 * Creates the value once per request.
 *
 * On Cloudflare, I/O objects such as database sockets can't be shared across requests, and React's
 * cache() isn't request-scoped in route handlers. So values are keyed by the request's
 * ExecutionContext there, and fall back to React's cache() elsewhere.
 */
export function perRequest<T>(create: () => T): () => T {
  const byRequest = new WeakMap<object, T>();
  const cached = cache(create);

  return () => {
    const ctx = cloudflareRequestContext();
    if (!ctx) return cached();
    if (!byRequest.has(ctx)) byRequest.set(ctx, create());
    return byRequest.get(ctx)!;
  };
}
