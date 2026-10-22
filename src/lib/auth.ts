import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins/email-otp";
import { getDb } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email";
import { SIGN_IN_CODE_SECONDS, signInCodeEmail } from "@/lib/emails/sign-in-code";
import { perRequest } from "@/lib/per-request";

type SocialProviders = NonNullable<Parameters<typeof betterAuth>[0]["socialProviders"]>;

export type OAuthProvider = "github" | "google";

/** OAuth providers with credentials set. They're optional so contributors can run the app without OAuth apps. */
export function configuredOAuthProviders(): OAuthProvider[] {
  return Object.keys(socialProviders()) as OAuthProvider[];
}

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
    account: {
      // GitHub and Google verify emails, so signing in with either joins an existing account with that email.
      accountLinking: { enabled: true, trustedProviders: ["github", "google"] },
    },
    rateLimit: {
      // Enabled in production by default. Stored in Postgres: Workers don't share memory between requests.
      storage: "database",
      modelName: "rateLimit",
      customRules: {
        "/email-otp/send-verification-otp": { window: 60, max: 3 },
        "/sign-in/email-otp": { window: 60, max: 10 },
      },
    },
    advanced: {
      // Real client IP for rate limiting on Cloudflare, falling back for other hosts.
      ipAddress: { ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"] },
    },
    user: {
      additionalFields: {
        handle: { type: "string", required: false, input: false },
      },
    },
    plugins: [
      emailOTP({
        otpLength: 6,
        expiresIn: SIGN_IN_CODE_SECONDS,
        allowedAttempts: 5,
        storeOTP: "hashed",
        sendVerificationOTP: async ({ email, otp }) => {
          await sendEmail({ to: email, ...signInCodeEmail(otp) });
        },
      }),
      // Must stay last: lets server actions set auth cookies.
      nextCookies(),
    ],
  });
}

/** Better Auth instance for the current request (it holds a per-request database client). */
export const getAuth = perRequest(createAuth);

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];
