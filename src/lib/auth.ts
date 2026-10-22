import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins/magic-link";
import { cache } from "react";
import { getDb } from "@/db";
import * as schema from "@/db/schema";

type SocialProviders = NonNullable<Parameters<typeof betterAuth>[0]["socialProviders"]>;

// OAuth providers are optional so contributors can run the app without creating OAuth apps.
function socialProviders(): SocialProviders {
  const providers: SocialProviders = {};
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    providers.github = { clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET };
  }
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    providers.google = { clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET };
  }
  return providers;
}

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    socialProviders: socialProviders(),
    user: {
      additionalFields: {
        handle: { type: "string", required: false, input: false },
      },
    },
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          // TODO: send through an email provider. Until then the link is only logged.
          if (process.env.NODE_ENV === "production") {
            throw new Error("Email sign-in is not configured yet.");
          }
          console.info(`[auth] Magic link for ${email}: ${url}`);
        },
      }),
      // Must stay last: lets server actions set auth cookies.
      nextCookies(),
    ],
  });
}

/** Better Auth instance for the current request (it holds a per-request database client). */
export const getAuth = cache(createAuth);

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];
