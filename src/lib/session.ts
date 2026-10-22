import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getAuth } from "@/lib/auth";

/** The signed-in session for this request, or null. */
export const getSession = cache(async () => {
  return getAuth().api.getSession({ headers: await headers() });
});

/** Signed-in user, or redirect to sign-in. */
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session.user;
}

/** Signed-in user who has picked a handle, or redirect to the step they're missing. */
export async function requireOnboardedUser() {
  const user = await requireUser();
  if (!user.handle) redirect("/onboarding");
  return { ...user, handle: user.handle };
}

/** Only allow redirects to paths on this site. */
export function safeRedirectPath(value: unknown, fallback = "/home"): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
