"use client";

import { ArrowRight, Check, LoaderCircle, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { HANDLE_MAX, validateHandle } from "@/lib/handles";
import { checkHandle, completeOnboarding, type HandleCheck, type OnboardingState } from "./actions";

type Props = { defaultName: string; defaultHandle: string; image?: string | null };

const inputStyles =
  "rounded-lg border border-ink/20 bg-white/70 px-3.5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink/50 focus:ring-2 focus:ring-mint-deep/40 focus:outline-none";

export function OnboardingForm({ defaultName, defaultHandle, image }: Props) {
  const [state, formAction, pending] = useActionState<OnboardingState, FormData>(completeOnboarding, {});
  const [name, setName] = useState(state.name ?? defaultName);
  const [handle, setHandle] = useState(state.handle ?? defaultHandle);
  const [check, setCheck] = useState<HandleCheck | null>(null);

  const formatError = handle ? validateHandle(handle) : null;
  const current = check?.handle === handle ? check : null;
  const checking = Boolean(handle) && !formatError && !current;

  // Debounced availability check, only for handles that pass the format rules.
  useEffect(() => {
    if (!handle || formatError) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const result = await checkHandle(handle);
      if (!cancelled) setCheck(result);
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [handle, formatError]);

  const hint = formatError
    ? { tone: "error", text: formatError }
    : current && !current.available
      ? { tone: "error", text: current.reason ?? "That handle isn't available." }
      : current?.available
        ? { tone: "ok", text: `@${handle} is yours. Nice.` }
        : { tone: "muted", text: "Lowercase letters, numbers and dashes." };

  const displayName = name.trim() || "Your name";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-6">
      {/* Left: heading and a live name-tag preview */}
      <section className="relative">
        <ol className="chalk-text flex items-center gap-3 text-lg text-chalk-dim">
          <li className="flex items-center gap-1.5 text-mint">
            <Check aria-hidden className="size-4" /> Signed in
          </li>
          <li aria-hidden className="text-chalk/40">
            ⟶
          </li>
          <li className="text-chalk" aria-current="step">
            Pick your handle
          </li>
        </ol>
        <h1 className="chalk mt-4 font-display text-[3rem] leading-[1.02] font-semibold tracking-tight sm:text-[3.6rem] lg:text-[4.2rem]">
          One last thing.
        </h1>
        <p className="chalk-text mt-6 max-w-md text-xl leading-snug text-chalk-dim">
          Pick the handle for your founder page. It&apos;s where your products and ship graph live.
        </p>

        <div aria-hidden className="relative mt-12 hidden w-fit sm:block">
          <div className="w-[22rem] -rotate-3 overflow-hidden rounded-2xl bg-[#fbf8ec] text-ink shadow-[0_18px_30px_-12px_rgb(0_0_0/0.6)]">
            <div className="bg-mint px-6 pt-4 pb-3 text-center">
              <p className="font-display text-3xl leading-none font-bold tracking-wide">HELLO</p>
              <p className="mt-1 font-hand text-lg leading-none">my name is</p>
            </div>
            <div className="flex items-center gap-4 px-6 pt-5 pb-4">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element -- avatars come from OAuth providers on arbitrary hosts
                <img src={image} alt="" className="size-14 shrink-0 rounded-full border-2 border-ink/15 object-cover" />
              ) : (
                <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-dashed border-ink/30 font-display text-2xl font-semibold">
                  {initial}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate font-hand text-[34px] leading-none">{displayName}</p>
                <p className="mt-1 truncate text-sm font-semibold text-ink/60">@{handle || "your-handle"}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-dashed border-ink/15 px-6 py-3">
              <span className="truncate text-xs text-ink/50">shipdaily.ai/u/{handle || "your-handle"}</span>
              <span className="flex gap-[3px]">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className={`size-2 rounded-[2px] ${i % 3 === 0 ? "bg-mint-deep" : "border border-ink/20"}`} />
                ))}
              </span>
            </div>
          </div>
          <span className="tape -top-3 left-1/2 -ml-11 rotate-[-6deg]" />
          <p className="chalk absolute -right-36 bottom-6 rotate-[5deg] font-hand text-[22px] leading-tight text-chalk/90">
            this is you
            <br />
            on ShipDaily
          </p>
        </div>
      </section>

      {/* Right: the form note */}
      <section className="relative mx-auto w-full max-w-[26rem]">
        <div
          aria-hidden
          className="note absolute inset-0 translate-x-1 translate-y-3 rotate-[-3deg] bg-note-sky opacity-90 sm:-translate-x-3 sm:rotate-[-5deg]"
        />
        <form
          action={formAction}
          className="note note-still relative flex w-full flex-col gap-5 bg-note-mint px-7 pt-10 pb-7 text-ink [--tilt:1.5deg] sm:px-9"
        >
          <span className="tape -top-3 left-1/2 -ml-11 rotate-[-3deg]" />

          <h2 className="font-hand text-[34px] leading-none">
            Your founder page
            <svg viewBox="0 0 120 10" aria-hidden className="mt-1 block h-2.5 w-28 text-mint-deep">
              <path d="M2 7 C30 2, 70 2, 118 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-ink/80">
              Your name
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="handle" className="text-sm font-semibold text-ink/80">
              Handle
            </label>
            <div className="flex items-center rounded-lg border border-ink/20 bg-white/70 focus-within:border-ink/50 focus-within:ring-2 focus-within:ring-mint-deep/40">
              <span className="pl-3.5 text-sm text-ink/50">shipdaily.ai/u/</span>
              <input
                id="handle"
                name="handle"
                required
                maxLength={HANDLE_MAX}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                aria-describedby="handle-hint"
                aria-invalid={hint.tone === "error"}
                className="min-w-0 flex-1 bg-transparent py-3 pr-2 text-sm text-ink focus:outline-none"
              />
              <span className="pr-3" aria-hidden>
                {checking ? (
                  <LoaderCircle className="size-4 animate-spin text-ink/40" />
                ) : hint.tone === "ok" ? (
                  <Check className="size-4 text-[#2f7d4f]" />
                ) : hint.tone === "error" ? (
                  <X className="size-4 text-[#9a3412]" />
                ) : null}
              </span>
            </div>
            <p
              id="handle-hint"
              aria-live="polite"
              className={`text-xs ${hint.tone === "error" ? "text-[#9a3412]" : hint.tone === "ok" ? "font-semibold text-[#2f7d4f]" : "text-ink/60"}`}
            >
              {checking ? "Checking…" : hint.text}
            </p>
          </div>

          <button
            type="submit"
            disabled={pending || checking || hint.tone === "error" || !handle}
            className={`${buttonStyles.primary} py-3`}
          >
            {pending ? "Saving…" : "Let's ship"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          {state.error && (
            <p role="alert" className="rounded-md bg-[#c2410c]/10 px-3 py-2 text-sm text-[#9a3412]">
              {state.error}
            </p>
          )}

          <p className="text-center font-hand text-lg text-ink/55">You can change your name any time.</p>
        </form>
      </section>
    </div>
  );
}
