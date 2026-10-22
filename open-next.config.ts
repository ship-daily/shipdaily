import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache override yet. Add a KV or R2 incremental cache once we rely on
// ISR / revalidation. See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({});
