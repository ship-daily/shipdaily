import { ArrowRight, Code2, Handshake, LifeBuoy, MessageSquareHeart, Wrench } from "lucide-react";
import { ArrowLeft, ChalkBox, Heart, Leaf } from "@/components/marketing/doodles";
import { DISCORD_URL } from "@/lib/site";

const ASKS = [
  { icon: LifeBuoy, title: "Ask for help", example: "Stuck on Stripe webhooks. Anyone been here?", bg: "bg-note-lilac", tape: "-4deg", tilt: "-2deg" },
  { icon: Wrench, title: "Discover tools", example: "What are you all using for transactional email?", bg: "bg-note-butter", tape: "3deg", tilt: "1.6deg" },
  { icon: Code2, title: "Technical guidance", example: "Postgres or SQLite for a v1?", bg: "bg-note-blush", tape: "-2deg", tilt: "-1.2deg" },
  { icon: MessageSquareHeart, title: "Share feedback", example: "Be brutal: does my landing page make sense?", bg: "bg-note-mint", tape: "5deg", tilt: "2deg" },
  { icon: Handshake, title: "Find collaborators", example: "Looking for a designer who wants to build with me.", bg: "bg-note-sky", tape: "-3deg", tilt: "-1.6deg" },
];

export function Community() {
  return (
    <section id="community" className="relative mx-auto w-full max-w-6xl scroll-mt-8 px-5 py-16 sm:px-8 md:py-24">
      <Heart aria-hidden className="chalk-rough absolute top-44 -right-12 hidden size-9 -rotate-12 text-[#f5a3b8]/85 xl:block" />
      <Leaf aria-hidden className="chalk-rough absolute bottom-16 -left-14 hidden h-14 w-10 rotate-12 text-mint/70 xl:block" />
      <div className="relative">
        <p className="chalk font-hand text-2xl text-mint">The founder community</p>
        <h2 className="chalk mt-2 font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight md:text-[3.4rem]">
          Real help, not just upvotes.
        </h2>
        <p className="chalk-text mt-5 max-w-xl text-xl leading-snug text-chalk/90">
          Ask questions, swap tools, get unstuck on the technical stuff, and find people to build with. The point is to
          actually help each other grow.
        </p>

        <div aria-hidden className="pointer-events-none absolute top-2 right-0 hidden items-start gap-3 md:flex">
          <ArrowLeft className="chalk-rough mt-8 h-12 w-24 text-chalk/80" />
          <p className="chalk rotate-3 font-hand text-[23px] leading-[1.1] text-chalk/90">
            Founders
            <br />
            Helping
            <br />
            Founders
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {ASKS.map(({ icon: Icon, title, example, bg, tape, tilt }) => (
          <article key={title} style={{ ["--tilt" as string]: tilt }} className={`note flex min-h-48 flex-col p-6 pt-7 text-ink ${bg}`}>
            <span aria-hidden className="tape -top-3 left-1/2 -ml-[46px]" style={{ rotate: tape }} />
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-ink text-chalk">
                <Icon className="size-5" strokeWidth={2.2} />
              </span>
              <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            </div>
            <p className="mt-5 font-hand text-[22px] leading-snug text-ink/80">&ldquo;{example}&rdquo;</p>
          </article>
        ))}

        <a href={DISCORD_URL} className="group relative flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center">
          <ChalkBox className="chalk-rough absolute inset-0 size-full text-chalk/70 transition-colors group-hover:text-mint" />
          <p className="chalk font-display text-2xl leading-tight font-semibold">
            Got a question
            <br />
            of your own?
          </p>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-chalk px-4 py-2 text-sm font-semibold text-ink transition-transform group-hover:-translate-y-0.5">
            Ask on Discord <ArrowRight className="size-4" />
          </span>
        </a>
      </div>
    </section>
  );
}
