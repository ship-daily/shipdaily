import { ArrowRight, ArrowUpRight, Check, Rocket } from "lucide-react";
import { Globe, Sparkle, Spiral, SwoopArrow } from "@/components/doodles";
import { APP_LIVE, APP_URL } from "@/lib/site";

const PAGE_HAS = [
  "What it does, in your words",
  "Founder details and your story",
  "Website and every launch link in one place",
  "Product updates and blog posts over time",
];

const LAUNCH_PLATFORMS = ["Product Hunt", "Hacker News", "Peerlist", "Reddit"];

export function Showcase() {
  return (
    <section id="showcase" className="relative mx-auto w-full max-w-6xl scroll-mt-8 px-5 py-16 sm:px-8 md:py-24">
      <Spiral aria-hidden className="chalk-rough absolute top-10 -right-12 hidden size-12 text-chalk/60 xl:block" />
      <Globe aria-hidden className="chalk-rough absolute bottom-0 -left-20 hidden h-24 w-28 -rotate-6 text-chalk/50 xl:block" />
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="chalk font-hand text-2xl text-mint">The product showcase</p>
          <h2 className="chalk mt-2 font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight md:text-[3.4rem]">
            A home for what you&apos;re building.
          </h2>
          <p className="chalk-text mt-5 max-w-md text-xl leading-snug text-chalk/90">
            A public wall of community products. Every product gets its own page that you keep up to date, so people can
            follow along long after launch day.
          </p>

          <ul className="mt-8 space-y-3">
            {PAGE_HAS.map((item) => (
              <li key={item} className="chalk-text flex items-start gap-3 text-xl text-chalk/90">
                <Check className="mt-0.5 size-5 shrink-0 text-mint" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>

          {APP_LIVE ? (
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`${APP_URL}/submit`}
                className="group inline-flex items-center gap-2 rounded-xl bg-chalk px-5 py-3 font-semibold text-ink shadow-[0_10px_24px_-10px_rgb(0_0_0/0.7)] transition-transform hover:-translate-y-0.5"
              >
                Submit your product
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 rounded-xl border border-chalk/25 px-5 py-3 font-semibold transition-colors hover:border-chalk/50 hover:bg-white/5"
              >
                Browse the wall
              </a>
            </div>
          ) : (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-chalk/50 px-5 py-3 font-semibold text-ink/70"
              >
                Submit your product
                <ArrowRight className="size-4" />
              </span>
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-chalk/15 px-5 py-3 font-semibold text-chalk/50"
              >
                Browse the wall
              </span>
              <span className="chalk ml-1 -rotate-3 font-hand text-2xl text-mint">Coming soon!</span>
            </div>
          )}
        </div>

        {/* Example product page */}
        <div className="relative">
          <div className="note relative bg-[#f4f1e8] p-6 text-ink [--tilt:1.2deg] sm:p-8">
            <span aria-hidden className="tape -top-3 left-8 rotate-[-5deg]" />
            <span className="absolute -top-3 right-6 rounded-full bg-ink px-3 py-1 text-chalk! shadow-md text-[11px] font-semibold tracking-wide text-ink/60 uppercase">
              Example
            </span>

            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-xl bg-ink text-chalk">
                <Rocket className="size-7" />
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Your Product</h3>
                <p className="text-ink/70">One line on what it does and who it&apos;s for.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-dashed border-ink/20 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-note-blush text-xs font-bold">You</span>
                <div className="leading-tight">
                  <p className="font-semibold">Built by you</p>
                  <p className="text-sm text-ink/60">Solo founder</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-chalk">
                Visit website <ArrowUpRight className="size-4" />
              </span>
            </div>

            <p className="mt-5 text-xs font-semibold tracking-wider text-ink/50 uppercase">Recent launches</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {LAUNCH_PLATFORMS.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 rounded-md border border-ink/20 bg-white/60 px-2.5 py-1 text-sm">
                  {p} <ArrowUpRight className="size-3.5 text-ink/50" />
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-note-mint/70 p-4">
                <p className="text-xs font-semibold tracking-wider text-ink/50 uppercase">Updates</p>
                <p className="mt-2 font-medium">Shipped v1.1</p>
                <div className="mt-2 h-2 w-4/5 rounded bg-ink/10" />
                <div className="mt-1.5 h-2 w-3/5 rounded bg-ink/10" />
              </div>
              <div className="rounded-lg bg-note-sky/70 p-4">
                <p className="text-xs font-semibold tracking-wider text-ink/50 uppercase">Blog</p>
                <p className="mt-2 font-medium">What launch week taught me</p>
                <div className="mt-2 h-2 w-full rounded bg-ink/10" />
                <div className="mt-1.5 h-2 w-2/3 rounded bg-ink/10" />
              </div>
            </div>
          </div>

          {/* Chalk annotations */}
          <div aria-hidden className="pointer-events-none absolute -bottom-20 right-2 hidden items-start gap-1 lg:flex">
            <SwoopArrow className="chalk-rough h-14 w-12 -scale-x-100 -rotate-[150deg] text-chalk/80" />
            <p className="chalk mt-6 -rotate-3 font-hand text-[22px] leading-tight text-chalk/90">every launch, one page</p>
          </div>
          <Sparkle aria-hidden className="chalk-rough absolute -top-6 -left-6 hidden size-6 text-chalk/70 lg:block" />
        </div>
      </div>
    </section>
  );
}
