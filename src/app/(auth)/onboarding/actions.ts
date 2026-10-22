"use server";

import { and, eq, ne } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { user } from "@/db/schema";
import { validateHandle } from "@/lib/handles";
import { requireUser } from "@/lib/session";

export type OnboardingState = { error?: string; handle?: string; name?: string };

const UNIQUE_VIOLATION = "23505";

export type HandleCheck = { handle: string; available: boolean; reason?: string };

/** Live availability check while the user types. */
export async function checkHandle(raw: string): Promise<HandleCheck> {
  const current = await requireUser();
  const handle = raw.trim().toLowerCase();
  const invalid = validateHandle(handle);
  if (invalid) return { handle, available: false, reason: invalid };

  const [taken] = await getDb()
    .select({ id: user.id })
    .from(user)
    .where(and(eq(user.handle, handle), ne(user.id, current.id)))
    .limit(1);
  return taken ? { handle, available: false, reason: `@${handle} is taken. Try another.` } : { handle, available: true };
}

export async function completeOnboarding(_prev: OnboardingState, formData: FormData): Promise<OnboardingState> {
  const current = await requireUser();
  if (current.handle) redirect("/home");

  const handle = String(formData.get("handle") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);

  if (!name) return { error: "Tell us what to call you.", handle, name };
  const invalid = validateHandle(handle);
  if (invalid) return { error: invalid, handle, name };

  try {
    await getDb().update(user).set({ handle, name }).where(eq(user.id, current.id));
  } catch (error) {
    const code = (error as { code?: string; cause?: { code?: string } }).cause?.code ?? (error as { code?: string }).code;
    if (code === UNIQUE_VIOLATION) return { error: `@${handle} is taken. Try another.`, handle, name };
    throw error;
  }

  redirect("/home");
}
