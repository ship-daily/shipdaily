import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CurlyArrow, Sparkle, Squiggle, Star } from "@/components/marketing/doodles";
import { getBalance } from "@/lib/credits";
import { requireOnboardedUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Home · ShipDaily",
};

const LAUNCH_COST = 50;

export default async function HomePage() {
  const user = await requireOnboardedUser();
  const balance = await getBalance(user.id);
  const firstName = user.name.split(" ")[0] || user.handle;

  const steps = [
    { label: "Pick your handle", done: true },
    { label: "Add the ShipDaily badge to your site", reward: "+25 credits", done: false },
    { label: "Add your product", done: false },
    { label: "Try 3 products in this week's launch", reward: "+10 each", done: false },
    { label: "Launch in the next Launch Week", done: false },
  ];

  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 pt-12 pb-24 sm:px-8 md:pt-16">
      <Sparkle aria-hidden className="chalk-rough absolute top-10 right-1/4 hidden size-5 text-chalk/70 lg:block" />

      <h1 className="chalk font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight md:text-[3.6rem]">
        Hey {firstName}, welcome aboard.
      </h1>
      <Squiggle aria-hidden className="chalk-rough mt-3 h-4 w-32 text-mint/80" />
      <p className="chalk-text mt-5 max-w-xl text-xl leading-snug text-chalk-dim">
        This is your board. Add the badge, try a few products, then launch your own.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
        <section className="note bg-note-butter px-7 pt-9 pb-8 text-ink [--tilt:-1.5deg] md:row-span-2">
          <span className="tape -top-3 left-8 rotate-[-4deg]" />
          <h2 className="font-hand text-[28px] leading-tight">Getting started</h2>
          <ol className="mt-5 flex flex-col gap-4">
            {steps.map((step, i) => (
              <li key={step.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 font-hand text-base ${
                    step.done ? "border-mint-deep bg-mint text-ink" : "border-ink/30 text-ink/70"
                  }`}
                >
                  {step.done ? <Check className="size-4" aria-label="Done" /> : i + 1}
                </span>
                <span className="flex flex-1 flex-wrap items-baseline gap-x-2">
                  <span className={`font-hand text-xl leading-snug ${step.done ? "text-ink/50 line-through" : ""}`}>
                    {step.label}
                  </span>
                  {step.reward && <span className="text-xs font-semibold text-[#2f7d4f]">{step.reward}</span>}
                  {!step.done && i > 0 && <span className="text-[11px] font-semibold tracking-wide text-ink/40 uppercase">Soon</span>}
                </span>
              </li>
            ))}
          </ol>
          <Star aria-hidden className="absolute right-4 bottom-4 size-6 text-ink/60" />
        </section>

        <section className="note bg-note-mint px-7 pt-9 pb-8 text-ink [--tilt:2deg]">
          <span className="tape -top-3 right-8 rotate-[5deg]" />
          <h2 className="font-hand text-[28px] leading-tight">Your credits</h2>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-6xl font-semibold">{balance}</span>
            <span className="font-hand text-xl text-ink/70">credits</span>
          </p>
          <p className="mt-3 text-sm text-ink/75">
            A launch costs {LAUNCH_COST}. Earn credits by trying other founders&apos; products and leaving honest feedback.
          </p>
        </section>

        <section className="note bg-note-sky px-7 pt-9 pb-8 text-ink [--tilt:-1deg]">
          <span className="tape -top-3 left-1/2 -ml-11 rotate-[2deg]" />
          <h2 className="font-hand text-[28px] leading-tight">This week&apos;s Launch Week</h2>
          <p className="mt-3 text-sm text-ink/75">
            Launch Weeks open every Monday with up to 20 products. The first one opens soon. Get your product ready to be
            in it.
          </p>
        </section>
      </div>

      <section className="relative mt-20">
        <h2 className="chalk font-display text-3xl font-semibold tracking-tight md:text-4xl">Your ship graph</h2>
        <p className="chalk-text mt-3 max-w-xl text-lg leading-snug text-chalk-dim">
          Every update you ship fills a square. No streaks, no guilt.
        </p>
        <CurlyArrow aria-hidden className="chalk-rough absolute top-2 -left-20 hidden h-10 w-16 rotate-12 text-chalk/50 xl:block" />
        <div aria-hidden className="mt-6 max-w-full overflow-x-auto pb-2">
          <div className="grid w-fit grid-flow-col grid-rows-7 gap-1.5">
          {Array.from({ length: 7 * 26 }, (_, i) => (
            <span key={i} className="size-3 rounded-[3px] border border-chalk/20" />
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}
