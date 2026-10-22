"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GitHubIcon, GoogleIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import type { OAuthProvider } from "@/lib/auth";
import { emailOtp, signIn } from "@/lib/auth-client";

type Props = {
  providers: OAuthProvider[];
  redirectTo: string;
  oauthError?: string;
  isDev: boolean;
  /** No email provider configured: codes are printed in the server terminal instead. */
  emailsLogged: boolean;
};

const PROVIDER_LABELS: Record<OAuthProvider, string> = { github: "GitHub", google: "Google" };
const CODE_LENGTH = 6;
const RESEND_AFTER_SECONDS = 30;

const inputStyles =
  "rounded-lg border border-ink/20 bg-white/70 px-3.5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink/50 focus:ring-2 focus:ring-mint-deep/40 focus:outline-none";

function codeErrorMessage(code: string | undefined, fallback: string) {
  switch (code) {
    case "INVALID_OTP":
      return "That code isn't right. Check it and try again.";
    case "OTP_EXPIRED":
      return "That code expired. Send yourself a new one.";
    case "TOO_MANY_ATTEMPTS":
      return "Too many tries. Send yourself a new code.";
    default:
      return fallback;
  }
}

export function SignInForm({ providers, redirectTo, oauthError, isDev, emailsLogged }: Props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  // Address the code was sent to; switches the note to the code step.
  const [sentTo, setSentTo] = useState<string | null>(null);
  // Which action is in flight; also guards against double submits.
  const [pending, setPending] = useState<OAuthProvider | "send" | "verify" | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [error, setError] = useState<string | null>(oauthError ? "Sign-in didn't go through. Please try again." : null);
  const codeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  async function continueWith(provider: OAuthProvider) {
    if (pending) return;
    setPending(provider);
    setError(null);
    const result = await signIn.social({ provider, callbackURL: redirectTo, errorCallbackURL: "/sign-in" });
    if (result.error) {
      setError(result.error.message ?? `Couldn't connect to ${PROVIDER_LABELS[provider]}. Try again.`);
      setPending(null);
    }
  }

  async function sendCode(address: string) {
    if (pending) return;
    setPending("send");
    setError(null);
    const result = await emailOtp.sendVerificationOtp({ email: address, type: "sign-in" });
    setPending(null);
    if (result.error) {
      setError(
        result.error.status === 429
          ? "Too many codes requested. Wait a minute and try again."
          : (result.error.message ?? "Couldn't send the code. Check the address and try again."),
      );
      return;
    }
    setSentTo(address);
    setCode("");
    setResendIn(RESEND_AFTER_SECONDS);
    requestAnimationFrame(() => codeInput.current?.focus());
  }

  async function verifyCode(value: string) {
    if (pending || !sentTo || value.length !== CODE_LENGTH) return;
    setPending("verify");
    setError(null);
    const result = await signIn.emailOtp({ email: sentTo, otp: value });
    if (result.error) {
      setPending(null);
      setCode("");
      setError(codeErrorMessage(result.error.code, result.error.message ?? "Couldn't sign you in. Try again."));
      requestAnimationFrame(() => codeInput.current?.focus());
      return;
    }
    // Full navigation so server components pick up the new session.
    window.location.assign(redirectTo);
  }

  function onCodeChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    if (digits.length === CODE_LENGTH) void verifyCode(digits);
  }

  return (
    <div className="note note-still relative w-full bg-note-butter px-7 pt-10 pb-7 text-ink [--tilt:-1.5deg] sm:px-9">
      <span className="tape -top-3 left-1/2 -ml-11 rotate-[3deg]" />

      {sentTo ? (
        <div>
          <h2 className="font-hand text-[34px] leading-none">
            Check your inbox
            <svg viewBox="0 0 120 10" aria-hidden className="mt-1 block h-2.5 w-28 text-mint-deep">
              <path d="M2 7 C30 2, 70 2, 118 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="mt-3 text-sm text-ink/70" role="status">
            We sent a {CODE_LENGTH}-digit code to <strong className="break-all text-ink">{sentTo}</strong>.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void verifyCode(code);
            }}
            className="mt-6 flex flex-col gap-3"
          >
            <label htmlFor="code" className="text-sm font-semibold text-ink/80">
              Sign-in code
            </label>
            <input
              ref={codeInput}
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={CODE_LENGTH}
              placeholder="••••••"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              disabled={pending === "verify"}
              className={`${inputStyles} text-center font-mono text-[28px] tracking-[0.45em] placeholder:tracking-[0.45em]`}
            />
            <button
              type="submit"
              disabled={pending !== null || code.length !== CODE_LENGTH}
              className={`${buttonStyles.primary} py-3`}
            >
              {pending === "verify" ? "Signing you in…" : "Sign in"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {isDev && emailsLogged && (
            <p className="mt-4 rounded-md bg-ink/5 px-3 py-2 text-xs text-ink/70">
              Local dev without RESEND_API_KEY: the code is printed in the terminal running <code>bun dev</code>.
            </p>
          )}

          <div className="mt-5 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => {
                setSentTo(null);
                setError(null);
              }}
              className="font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Use a different email
            </button>
            <button
              type="button"
              onClick={() => void sendCode(sentTo)}
              disabled={resendIn > 0 || pending !== null}
              className="font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink disabled:no-underline disabled:opacity-50"
            >
              {pending === "send" ? "Sending…" : resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-hand text-[34px] leading-none">
            Sign in
            <svg viewBox="0 0 120 10" aria-hidden className="mt-1 block h-2.5 w-24 text-mint-deep">
              <path d="M2 7 C30 2, 70 2, 118 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="mt-3 mb-7 text-sm text-ink/65">New here? Same buttons. We&apos;ll set you up in a minute.</p>

          {providers.length > 0 && (
            <div className="flex flex-col gap-3">
              {providers.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => continueWith(provider)}
                  disabled={pending !== null}
                  className={
                    provider === "github"
                      ? "inline-flex items-center justify-center gap-2.5 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-chalk shadow-[0_3px_0_rgb(0_0_0/0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-60"
                      : "inline-flex items-center justify-center gap-2.5 rounded-lg border border-ink/15 bg-white/80 px-4 py-3 text-sm font-semibold text-ink shadow-[0_3px_0_rgb(0_0_0/0.12)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-60"
                  }
                >
                  {provider === "github" ? <GitHubIcon className="size-5" /> : <GoogleIcon className="size-5" />}
                  {pending === provider ? "Connecting…" : `Continue with ${PROVIDER_LABELS[provider]}`}
                </button>
              ))}
            </div>
          )}

          {providers.length > 0 && (
            <div className="my-6 flex items-center gap-3 font-hand text-lg text-ink/55" aria-hidden>
              <span className="h-px flex-1 border-t border-dashed border-ink/25" />
              or
              <span className="h-px flex-1 border-t border-dashed border-ink/25" />
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendCode(email.trim());
            }}
            className="flex flex-col gap-3"
          >
            <label htmlFor="email" className="text-sm font-semibold text-ink/80">
              Email me a sign-in code
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyles}
            />
            <button type="submit" disabled={pending !== null} className={`${buttonStyles.primary} py-3`}>
              {pending === "send" ? "Sending…" : "Send code"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-6 text-center font-hand text-lg text-ink/55">No passwords. No spam. Just shipping.</p>

          {isDev && providers.length === 0 && (
            <p className="mt-4 text-xs text-ink/60">
              Local dev: add GitHub or Google keys to <code>.env.local</code> to show those buttons.
            </p>
          )}
        </>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-[#c2410c]/10 px-3 py-2 text-sm text-[#9a3412]">
          {error}
        </p>
      )}
    </div>
  );
}
