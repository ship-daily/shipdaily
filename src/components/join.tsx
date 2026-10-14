import { ArrowRight } from "lucide-react";
import { Burst, DiscordIcon, Heart, Sparkle, Underline } from "@/components/doodles";
import { CHANNELS, DISCORD_URL } from "@/lib/site";

export function Join() {
  return (
    <section className="relative mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8 md:py-32">
      <Burst aria-hidden className="chalk-rough absolute top-16 left-0 hidden size-10 text-mint/80 md:block" />
      <Heart aria-hidden className="chalk-rough absolute top-24 right-2 hidden size-9 rotate-12 text-[#f5a3b8]/85 md:block" />
      <Sparkle aria-hidden className="chalk-rough absolute right-10 bottom-24 hidden size-5 text-chalk/60 md:block" />

      <h2 className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight md:text-6xl">
        <span className="chalk">Building something?</span>
        <br />
        <span className="relative inline-block">
          <span className="chalk">Come ship with us.</span>
          <Underline className="absolute -bottom-2 left-0 h-4 w-full md:h-5" />
        </span>
      </h2>
      <p className="chalk-text mx-auto mt-8 max-w-md text-xl text-chalk/90">
        We&apos;re just getting started. Early members shape what ShipDaily becomes.
      </p>

      <a
        href={DISCORD_URL}
        className="group mt-9 inline-flex items-center gap-2.5 rounded-xl bg-mint px-7 py-4 text-lg font-semibold text-ink shadow-[0_4px_0_var(--mint-deep),0_14px_28px_-10px_rgb(0_0_0/0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--mint-deep),0_18px_30px_-10px_rgb(0_0_0/0.7)] active:translate-y-1 active:shadow-[0_1px_0_var(--mint-deep)]"
      >
        <DiscordIcon className="size-5" />
        Join our Discord
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </a>

      <ul className="chalk-text mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg text-chalk-dim">
        {CHANNELS.map((c) => (
          <li key={c.label}>
            <a href={c.href} className="transition-colors hover:text-chalk">
              <span className="font-semibold text-chalk">{c.label}</span> · {c.note}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
