import { Crown, CurlyArrow, Squiggle } from "@/components/marketing/doodles";

const STEPS = [
  { title: "Add the badge", body: "Put the ShipDaily badge on your site to unlock your starter credits." },
  { title: "Try 3 products", body: "Open other founders' launches and react. Trying earns the credits you launch with." },
  { title: "Launch in a Launch Week", body: "Grab a slot in an upcoming Launch Week and get real people trying your product." },
  { title: "Ship and relaunch", body: "Post every update to your ship graph. Shipped enough? Relaunch and past testers hear about it." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto w-full max-w-6xl scroll-mt-8 px-5 py-16 sm:px-8 md:py-24">
      <Crown aria-hidden className="chalk-rough absolute top-20 -left-14 hidden h-8 w-11 -rotate-12 text-[#f6d365]/85 xl:block" />
      <h2 className="chalk font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight md:text-[3.4rem]">
        How it works
      </h2>
      <Squiggle aria-hidden className="chalk-rough mt-3 h-4 w-32 text-mint/80" />

      <ol className="relative mt-14 grid gap-12 md:grid-cols-4 md:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="chalk block font-display text-6xl font-semibold text-mint">{i + 1}</span>
            <h3 className="chalk mt-3 font-display text-xl font-semibold">{step.title}</h3>
            <p className="chalk-text mt-2 text-lg leading-snug text-chalk-dim">{step.body}</p>
            {i < STEPS.length - 1 && (
              <CurlyArrow
                aria-hidden
                className="chalk-rough absolute top-2 -right-6 hidden h-10 w-16 -rotate-12 text-chalk/50 md:block"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
