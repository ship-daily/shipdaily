import { ArrowRight } from "lucide-react";
import { Burst, ChalkOval, Crown, CurlyArrow, DiscordIcon, Heart, Leaf, Smiley, Sparkle, Star, SwoopArrow, Underline } from "@/components/doodles";
import { DISCORD_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:px-8 md:pt-20 md:pb-28">
      {/* Left margin scribbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <p className="chalk absolute top-6 left-8 -rotate-6 font-hand text-[24px] leading-[1.1] text-chalk/90">
          Launch
          <br />
          Feedback
          <br />
          Guidance
          <br />
          Resources
          <br />
          Together.
        </p>
        <Star className="chalk-rough absolute top-48 left-24 size-9 text-chalk/80" />
        <Smiley className="chalk-rough absolute top-[17rem] left-6 size-20 text-chalk/85" />
        <p className="chalk absolute bottom-[4.5rem] -left-2 -rotate-6 px-7 py-4 font-hand text-[23px] leading-tight text-chalk/90">
          Founders helping
          <br />
          founders.
          <ChalkOval className="absolute inset-0 size-full text-mint/80" />
        </p>
        <Leaf className="chalk-rough absolute top-[23rem] -left-14 hidden h-14 w-10 -rotate-12 text-mint/70 xl:block" />
        <CurlyArrow className="chalk-rough absolute bottom-6 left-40 h-14 w-24 rotate-6 text-chalk/80" />
        <Sparkle className="chalk-rough absolute top-2 left-[22rem] size-5 text-chalk/70" />
        <Sparkle className="chalk-rough absolute bottom-28 left-[17rem] size-4 text-chalk/60" />
      </div>

      {/* Right sticky note + scribble */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="note float absolute top-14 right-4 w-48 bg-note-butter px-6 pt-8 pb-7 text-ink [--tilt:6deg]">
          <span className="tape -top-3 left-1/2 -ml-11 rotate-[-4deg]" />
          <p className="font-hand text-[23px] leading-[1.1]">
            Build
            <br />
            Launch
            <br />
            Get feedback
            <br />
            Help someone
            <br />
            Ship daily.
          </p>
          <Star className="absolute right-3 bottom-3 size-6 text-ink/70" />
        </div>
        <Burst className="chalk-rough absolute top-4 right-[17rem] size-9 text-mint/80" />
        <Sparkle className="chalk-rough absolute top-[24rem] right-[15rem] size-4 text-chalk/60" />
        <Heart className="chalk-rough absolute top-[25rem] -right-12 hidden size-9 rotate-12 text-[#f5a3b8]/85 xl:block" />
        <Crown className="chalk-rough absolute right-16 bottom-[9.5rem] h-7 w-10 -rotate-6 text-[#f6d365]/85" />
        <SwoopArrow className="chalk-rough absolute top-[20.5rem] right-28 h-16 w-14 text-chalk/80" />
        <p className="chalk absolute right-6 bottom-10 rotate-3 text-center font-hand text-[23px] leading-[1.05] text-chalk/90">
          Indie hackers
          <br />
          SaaS builders
          <br />
          Early founders
        </p>
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="font-display text-[3.6rem] leading-[1.02] font-semibold tracking-tight sm:text-7xl md:text-[7.25rem]">
          <span className="chalk block">Ship Daily</span>
          <span className="relative inline-block">
            <span className="chalk">Together.</span>
            <Underline className="absolute -bottom-2 -left-[2%] h-5 w-[104%] md:-bottom-3 md:h-7" />
          </span>
        </h1>

        <p className="chalk-text mt-10 max-w-xl text-xl leading-snug text-chalk/90 md:text-[1.6rem]">
          A community where early-stage founders, indie hackers and SaaS builders back each other: launch promotion,
          honest feedback, guidance and shared resources.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <a
            href={DISCORD_URL}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-mint px-6 py-3.5 font-semibold text-ink shadow-[0_4px_0_var(--mint-deep),0_14px_28px_-10px_rgb(0_0_0/0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--mint-deep),0_18px_30px_-10px_rgb(0_0_0/0.7)] active:translate-y-1 active:shadow-[0_1px_0_var(--mint-deep)]"
          >
            <DiscordIcon className="size-5" />
            Join our Discord
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 rounded-xl border border-chalk/25 px-6 py-3.5 font-semibold text-chalk transition-colors hover:border-chalk/50 hover:bg-white/5"
          >
            See the showcase
          </a>
        </div>
        <p className="chalk-text mt-5 text-lg text-chalk-dim">Free for founders. Open source.</p>
      </div>
    </section>
  );
}
