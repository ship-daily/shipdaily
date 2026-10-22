/** Shared button styles, matching the landing page buttons. */
export const buttonStyles = {
  primary:
    "group inline-flex items-center justify-center gap-2 rounded-lg bg-mint px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_3px_0_var(--mint-deep),0_10px_20px_-8px_rgb(0_0_0/0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_0_var(--mint-deep),0_14px_24px_-8px_rgb(0_0_0/0.6)] active:translate-y-0.5 active:shadow-[0_1px_0_var(--mint-deep)] disabled:pointer-events-none disabled:opacity-60",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-chalk/25 px-4 py-2.5 text-sm font-semibold text-chalk transition-colors hover:border-chalk/50 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-60",
} as const;
