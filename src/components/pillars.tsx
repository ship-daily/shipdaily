import { Burst, ChalkDivider, ChatIcon, CompassIcon, MegaphoneIcon, ToolboxIcon } from "@/components/doodles";

const PILLARS = [
  { icon: MegaphoneIcon, title: "Launch promotion", body: "Share your launch and get real eyes on it from people who know how hard shipping is." },
  { icon: ChatIcon, title: "Honest feedback", body: "Thoughtful notes on your product, onboarding and pitch. Not drive-by likes." },
  { icon: CompassIcon, title: "Guidance", body: "Ask founders a few steps ahead of you about pricing, tech, growth and everything between." },
  { icon: ToolboxIcon, title: "Resource sharing", body: "Tools, templates and hard-won lessons, passed around freely." },
];

export function Pillars() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <Burst aria-hidden className="chalk-rough absolute top-14 -left-12 hidden size-10 text-[#f6d365]/85 xl:block" />
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="chalk font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight md:text-[3.4rem]">
          Shipping is lonely.
          <br />
          <span className="text-mint">It doesn&apos;t have to be.</span>
        </h2>
        <p className="chalk-text max-w-sm text-xl leading-snug text-chalk-dim md:text-right">
          ShipDaily is a place to support each other through every launch, not just the big one.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className="group relative">
            {i > 0 && <ChalkDivider className="chalk-rough absolute top-0 -left-4 hidden h-full w-2 text-chalk/25 lg:block" />}
            <Icon className="chalk-rough h-14 w-16 text-chalk transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-3" />
            <h3 className="chalk mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="chalk-text mt-2 text-lg leading-snug text-chalk-dim">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
